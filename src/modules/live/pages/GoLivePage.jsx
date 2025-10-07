import React, { useRef, useState, useEffect } from 'react';
import { Box, Paper, Button, TextField, Typography, Stack } from '@mui/material';

const RTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.cloudflare.com:3478' },
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: "5ba02db1dfc79ad9e5e149a9",
      credential: "sVQXYgfjx8X7Yns+",
    },
    {
      urls: "turn:standard.relay.metered.ca:80?transport=tcp",
      username: "5ba02db1dfc79ad9e5e149a9",
      credential: "sVQXYgfjx8X7Yns+",
    },
    {
      urls: "turn:standard.relay.metered.ca:443",
      username: "5ba02db1dfc79ad9e5e149a9",
      credential: "sVQXYgfjx8X7Yns+",
    },
    {
      urls: "turns:standard.relay.metered.ca:443?transport=tcp",
      username: "5ba02db1dfc79ad9e5e149a9",
      credential: "sVQXYgfjx8X7Yns+",
    },
  ],
  iceCandidatePoolSize: 10,
  iceTransportPolicy: 'all',
};

const waitIceComplete = (pc) => new Promise((res, rej) => {
  if (pc.iceGatheringState === 'complete') return res();
  
  const timeout = setTimeout(() => {
    console.log('Host - ICE gathering timeout');
    rej(new Error('ICE gathering timeout'));
  }, 15000); // 15 segundos timeout
  
  const onChange = () => {
    if (pc.iceGatheringState === 'complete') {
      clearTimeout(timeout);
      pc.removeEventListener('icegatheringstatechange', onChange);
      res();
    }
  };
  pc.addEventListener('icegatheringstatechange', onChange);
});

// Función para validar y limpiar la Answer
const validateAndCleanAnswer = (answerText) => {
  console.log('Host - Validando Answer...');
  
  // Verificar que no esté vacía
  if (!answerText || !answerText.trim()) {
    throw new Error('La Answer no puede estar vacía');
  }

  // Limpiar espacios y caracteres extra
  let cleanedAnswer = answerText.trim();
  
  // Verificar longitud mínima
  if (cleanedAnswer.length < 100) {
    throw new Error('La Answer parece estar incompleta (muy corta)');
  }

  // Verificar que contenga elementos básicos de SDP
  if (!cleanedAnswer.includes('v=0') || !cleanedAnswer.includes('m=')) {
    throw new Error('La Answer no parece ser un SDP válido');
  }

  // Intentar parsear como JSON
  let answer;
  try {
    answer = JSON.parse(cleanedAnswer);
  } catch (parseError) {
    console.error('Host - Error parseando Answer como JSON:', parseError);
    throw new Error('La Answer no es un JSON válido. Verifica que se copió completa.');
  }

  // Validar estructura de la Answer
  if (!answer || typeof answer !== 'object') {
    throw new Error('La Answer no es un objeto válido');
  }

  if (!answer.type) {
    throw new Error('La Answer no tiene el campo "type"');
  }

  if (!answer.sdp) {
    throw new Error('La Answer no tiene el campo "sdp"');
  }

  if (answer.type !== 'answer') {
    throw new Error(`El tipo de descripción debe ser "answer", pero es "${answer.type}"`);
  }

  if (typeof answer.sdp !== 'string' || answer.sdp.length < 100) {
    throw new Error('El campo "sdp" no es válido o está incompleto');
  }

  // Validar contenido SDP básico
  if (!answer.sdp.includes('v=0') || !answer.sdp.includes('m=')) {
    throw new Error('El SDP no tiene el formato correcto');
  }

  console.log('Host - Answer validada correctamente');
  console.log('Host - Tipo:', answer.type);
  console.log('Host - SDP length:', answer.sdp.length);
  console.log('Host - SDP preview:', answer.sdp.substring(0, 100) + '...');

  return answer;
};

export default function GoLivePage() {
  const localVideoRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);
  const retryCountRef = useRef(0);

  const [status, setStatus] = useState('idle');
  const [offerText, setOfferText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => () => stopAll(), []);

  const startCamera = async () => {
    setError('');
    try {
      console.log('Host - Solicitando acceso a cámara...');
      
      // Verificar si ya tenemos un stream activo
      if (streamRef.current) {
        console.log('Host - Stream ya existe, reutilizando...');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        }, 
        audio: true 
      });
      
      console.log('Host - Stream obtenido:', stream.getTracks().length, 'tracks');
      streamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.muted = true;
        await localVideoRef.current.play();
      }
      
      setStatus('camera-ready');
      console.log('Host - Cámara lista');
    } catch (e) {
      console.error('Host - Error accediendo a cámara:', e);
      setError('No se pudo acceder a la cámara/micrófono: ' + e.message);
    }
  };

  const createOffer = async () => {
    setError('');
    retryCountRef.current = 0;
    
    try {
      // Asegurar que tenemos stream
      if (!streamRef.current) {
        console.log('Host - No hay stream, iniciando cámara...');
        await startCamera();
      }

      // Verificar que el stream esté activo
      if (!streamRef.current || streamRef.current.getTracks().length === 0) {
        throw new Error('No hay tracks de video/audio disponibles');
      }

      console.log('Host - Creando RTCPeerConnection...');
      const pc = new RTCPeerConnection(RTC_CONFIG);
      pcRef.current = pc;

      // Configurar eventos de conexión
      pc.onconnectionstatechange = () => {
        console.log('Host - Connection state:', pc.connectionState);
        if (pc.connectionState === 'connected') {
          setStatus('connected');
          setError('');
        } else if (pc.connectionState === 'connecting') {
          setStatus('connecting');
        } else if (pc.connectionState === 'failed') {
          setStatus('failed');
          setError('Conexión falló - verifica la Answer');
        } else if (pc.connectionState === 'disconnected') {
          setStatus('disconnected');
          setError('Conexión perdida');
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log('Host - ICE connection state:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          setStatus('connected');
          setError('');
        } else if (pc.iceConnectionState === 'checking') {
          setStatus('connecting');
        } else if (pc.iceConnectionState === 'failed') {
          setStatus('failed');
          setError('ICE falló - verifica la Answer');
        }
      };

      // Agregar evento para candidatos ICE
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('Host - ICE candidate:', event.candidate.candidate);
        } else {
          console.log('Host - ICE gathering complete');
        }
      };

      // Agregar tracks locales
      console.log('Host - Agregando tracks locales...');
      streamRef.current.getTracks().forEach((track) => {
        console.log('Host - Agregando track:', track.kind, track.id);
        pc.addTrack(track, streamRef.current);
      });

      // Crear offer
      console.log('Host - Creando offer...');
      const offer = await pc.createOffer({ 
        offerToReceiveAudio: false, 
        offerToReceiveVideo: false 
      });
      
      console.log('Host - Offer creado, estableciendo descripción local...');
      await pc.setLocalDescription(offer);
      
      console.log('Host - Esperando ICE candidates...');
      await waitIceComplete(pc);

      const fullOffer = JSON.stringify(pc.localDescription);
      setOfferText(fullOffer);
      setStatus('offer-created');
      console.log('Host - Offer completado y listo');
      
    } catch (e) {
      console.error('Host - Error creando offer:', e);
      setError('Error creando la Offer: ' + e.message);
      
      // Limpiar conexión fallida
      if (pcRef.current) {
        try {
          pcRef.current.close();
        } catch (cleanupError) {
          console.error('Host - Error limpiando conexión:', cleanupError);
        }
        pcRef.current = null;
      }
    }
  };

  const acceptAnswer = async () => {
    setError('');
    let connectionTimeout = null;
    
    try {
      const pc = pcRef.current;
      if (!pc) throw new Error('Primero crea la Offer');
      
      // 🔥 VALIDACIÓN Y LIMPIEZA DE ANSWER
      const answer = validateAndCleanAnswer(answerText);
      
      console.log('Host - Aceptando Answer...');
      
      // Configurar timeout para la conexión
      connectionTimeout = setTimeout(() => {
        if (pc.connectionState !== 'connected') {
          console.log('Host - Timeout de conexión (2 minutos)');
          setError('Timeout: La conexión tardó demasiado (2 minutos)');
        }
      }, 120000); // 2 minutos timeout
      
      // Limpiar timeout si se conecta
      const originalOnConnectionChange = pc.onconnectionstatechange;
      pc.onconnectionstatechange = () => {
        if (originalOnConnectionChange) originalOnConnectionChange();
        if (pc.connectionState === 'connected') {
          if (connectionTimeout) {
            clearTimeout(connectionTimeout);
            connectionTimeout = null;
          }
        }
      };
      
      await pc.setRemoteDescription(answer);
      setStatus('connecting');
      
      console.log('Host - Answer aceptada, esperando conexión...');
    } catch (e) {
      console.error('Host - Error aceptando answer:', e);
      setError('Error aceptando Answer: ' + e.message);
    }
  };

  const copy = async (txt) => {
    try { 
      await navigator.clipboard.writeText(txt);
      console.log('Host - Texto copiado al portapapeles');
    } catch (e) {
      console.error('Host - Error copiando texto:', e);
    }
  };

  const stopAll = () => {
    console.log('Host - Deteniendo todo...');
    
    // Limpiar conexión WebRTC
    if (pcRef.current) {
      try {
        pcRef.current.close();
      } catch (e) {
        console.error('Host - Error cerrando conexión:', e);
      }
      pcRef.current = null;
    }
    
    // Limpiar stream de cámara
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Host - Track detenido:', track.kind);
      });
      streamRef.current = null;
    }
    
    setStatus('idle');
    setOfferText('');
    setAnswerText('');
    retryCountRef.current = 0;
  };

  const shareScreen = async () => {
    try {
      const scr = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const videoTrack = scr.getVideoTracks()[0];
      const sender = pcRef.current?.getSenders().find(s => s.track?.kind === 'video');
      if (sender && videoTrack) {
        await sender.replaceTrack(videoTrack);
      }
      scr.getVideoTracks()[0].addEventListener('ended', async () => {
        // volver a la cámara al dejar de compartir
        const camTrack = streamRef.current?.getVideoTracks()[0];
        if (sender && camTrack) await sender.replaceTrack(camTrack);
      });
    } catch (e) {
      setError('No se pudo compartir pantalla: ' + e.message);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Go Live (WebRTC)</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <video ref={localVideoRef} style={{ width: '100%', borderRadius: 8, background:'#000' }} playsInline autoPlay />
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={startCamera}>1) Iniciar cámara</Button>
          <Button variant="contained" onClick={createOffer} disabled={status === 'offer-created' || status === 'connected' || status === 'connecting'}>
            2) Crear Offer
          </Button>
          <Button variant="outlined" onClick={shareScreen} disabled={!pcRef.current}>Compartir pantalla</Button>
          <Button color="error" variant="outlined" onClick={stopAll}>Detener</Button>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Estado: {status}
        </Typography>
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">Offer (compártela con el viewer)</Typography>
        <TextField
          multiline fullWidth minRows={4} value={offerText}
          onChange={e => setOfferText(e.target.value)}
          sx={{ mt: 1 }}
          placeholder="La Offer aparecerá aquí cuando se genere..."
        />
        <Button sx={{ mt: 1 }} onClick={() => copy(offerText)}>Copiar Offer</Button>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">Pega aquí la Answer del viewer</Typography>
        <TextField
          multiline fullWidth minRows={4} value={answerText}
          onChange={e => setAnswerText(e.target.value)}
          sx={{ mt: 1 }}
          placeholder="Pega aquí la Answer completa del viewer..."
        />
        <Button sx={{ mt: 1 }} variant="contained" onClick={acceptAnswer} disabled={!answerText.trim()}>
          3) Aceptar Answer
        </Button>
      </Paper>
    </Box>
  );
}