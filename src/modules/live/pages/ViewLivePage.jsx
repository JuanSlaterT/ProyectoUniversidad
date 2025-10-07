import React, { useRef, useState, useEffect } from 'react';
import { Box, Paper, Button, TextField, Typography } from '@mui/material';

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
    console.log('Viewer - ICE gathering timeout');
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

// Función para validar y limpiar la Offer
const validateAndCleanOffer = (offerText) => {
  console.log('Viewer - Validando Offer...');

  // Verificar que no esté vacía
  if (!offerText || !offerText.trim()) {
    throw new Error('La Offer no puede estar vacía');
  }

  // Limpiar espacios y caracteres extra
  let cleanedOffer = offerText.trim();

  // Verificar longitud mínima
  if (cleanedOffer.length < 100) {
    throw new Error('La Offer parece estar incompleta (muy corta)');
  }

  // Verificar que contenga elementos básicos de SDP
  if (!cleanedOffer.includes('v=0') || !cleanedOffer.includes('m=')) {
    throw new Error('La Offer no parece ser un SDP válido');
  }

  // Intentar parsear como JSON
  let offer;
  try {
    offer = JSON.parse(cleanedOffer);
  } catch (parseError) {
    console.error('Viewer - Error parseando Offer como JSON:', parseError);
    throw new Error('La Offer no es un JSON válido. Verifica que se copió completa.');
  }

  // Validar estructura de la Offer
  if (!offer || typeof offer !== 'object') {
    throw new Error('La Offer no es un objeto válido');
  }

  if (!offer.type) {
    throw new Error('La Offer no tiene el campo "type"');
  }

  if (!offer.sdp) {
    throw new Error('La Offer no tiene el campo "sdp"');
  }

  if (offer.type !== 'offer') {
    throw new Error(`El tipo de descripción debe ser "offer", pero es "${offer.type}"`);
  }

  if (typeof offer.sdp !== 'string' || offer.sdp.length < 100) {
    throw new Error('El campo "sdp" no es válido o está incompleto');
  }

  // Validar contenido SDP básico
  if (!offer.sdp.includes('v=0') || !offer.sdp.includes('m=')) {
    throw new Error('El SDP no tiene el formato correcto');
  }

  console.log('Viewer - Offer validada correctamente');
  console.log('Viewer - Tipo:', offer.type);
  console.log('Viewer - SDP length:', offer.sdp.length);
  console.log('Viewer - SDP preview:', offer.sdp.substring(0, 100) + '...');

  return offer;
};

export default function ViewLivePage() {
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const retryCountRef = useRef(0);

  const [offerText, setOfferText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const createAnswer = async () => {
    setError('');
    let connectionTimeout = null;
    let isAnswerCreated = false;

    try {
      // 🔥 VALIDACIÓN Y LIMPIEZA DE OFFER
      const offer = validateAndCleanOffer(offerText);

      console.log('Viewer - Creando RTCPeerConnection...');
      const pc = new RTCPeerConnection(RTC_CONFIG);
      pcRef.current = pc;

      // Configurar eventos de conexión con mejor manejo
      pc.onconnectionstatechange = () => {
        console.log('Viewer - Connection state:', pc.connectionState);

        // Solo mostrar errores si ya se creó la answer
        if (pc.connectionState === 'connected') {
          setStatus('connected');
          setError('');
          if (connectionTimeout) {
            clearTimeout(connectionTimeout);
            connectionTimeout = null;
          }
        } else if (pc.connectionState === 'connecting') {
          setStatus('connecting');
        } else if (pc.connectionState === 'failed' && isAnswerCreated) {
          setStatus('failed');
          setError('Conexión falló - verifica la Offer');
        } else if (pc.connectionState === 'disconnected' && isAnswerCreated) {
          setStatus('disconnected');
          setError('Conexión perdida');
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log('Viewer - ICE connection state:', pc.iceConnectionState);

        // Solo mostrar errores si ya se creó la answer
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          setStatus('connected');
          setError('');
          if (connectionTimeout) {
            clearTimeout(connectionTimeout);
            connectionTimeout = null;
          }
        } else if (pc.iceConnectionState === 'checking') {
          setStatus('connecting');
        } else if (pc.iceConnectionState === 'failed' && isAnswerCreated) {
          setStatus('failed');
          setError('ICE falló - verifica la Offer');
        } else if (pc.iceConnectionState === 'disconnected' && isAnswerCreated) {
          console.log('Viewer - ICE desconectado durante creación de answer (normal)');
          // No mostrar error si aún no se creó la answer
        }
      };

      // Agregar evento para candidatos ICE
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('Viewer - ICE candidate:', event.candidate.candidate);
        } else {
          console.log('Viewer - ICE gathering complete');
        }
      };

      pc.ontrack = (e) => {
        console.log('Viewer - Received track:', e.track.kind);
        if (remoteVideoRef.current && e.streams[0]) {
          remoteVideoRef.current.srcObject = e.streams[0];
          remoteVideoRef.current.play().catch(() => { });
        }
      };

      console.log('Viewer - Procesando Offer...');
      await pc.setRemoteDescription(offer);

      console.log('Viewer - Creando Answer...');
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      console.log('Viewer - Esperando ICE candidates...');
      await waitIceComplete(pc);

      setAnswerText(JSON.stringify(pc.localDescription));
      setStatus('answer-created');
      isAnswerCreated = true; // Marcar que la answer ya se creó

      console.log('Viewer - Answer creada, esperando conexión...');

      // Configurar timeout DESPUÉS de crear la answer
      connectionTimeout = setTimeout(() => {
        if (pc.connectionState !== 'connected' && pc.iceConnectionState !== 'connected') {
          console.log('Viewer - Timeout de conexión (2 minutos)');
          setError('Timeout: La conexión tardó demasiado (2 minutos)');
        }
      }, 120000); // 2 minutos timeout

    } catch (e) {
      console.error('Viewer - Error procesando Offer:', e);
      setError('Error procesando Offer: ' + e.message);

      // Limpiar conexión fallida
      if (pcRef.current) {
        try {
          pcRef.current.close();
        } catch (cleanupError) {
          console.error('Viewer - Error limpiando conexión:', cleanupError);
        }
        pcRef.current = null;
      }
    }
  };

  const copy = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      console.log('Viewer - Texto copiado al portapapeles');
    } catch (e) {
      console.error('Viewer - Error copiando texto:', e);
    }
  };

  const stopAll = () => {
    console.log('Viewer - Deteniendo todo...');

    // Limpiar conexión WebRTC
    if (pcRef.current) {
      try {
        pcRef.current.close();
      } catch (e) {
        console.error('Viewer - Error cerrando conexión:', e);
      }
      pcRef.current = null;
    }

    setStatus('idle');
    setOfferText('');
    setAnswerText('');
    retryCountRef.current = 0;
  };

  useEffect(() => () => stopAll(), []);

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Viewer (WebRTC)</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <video ref={remoteVideoRef} style={{ width: '100%', borderRadius: 8, background: '#000' }} playsInline autoPlay />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>Estado: {status}</Typography>
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">Pega aquí la Offer del host</Typography>
        <TextField
          multiline fullWidth minRows={4}
          value={offerText} onChange={e => setOfferText(e.target.value)}
          sx={{ mt: 1 }}
          placeholder="Pega aquí la Offer completa del host..."
        />
        <Button sx={{ mt: 1 }} variant="contained" onClick={createAnswer} disabled={!offerText.trim()}>
          Generar Answer
        </Button>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">Answer (cópiala y envíasela al host)</Typography>
        <TextField
          multiline fullWidth minRows={4}
          value={answerText} onChange={e => setAnswerText(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Button sx={{ mt: 1 }} onClick={() => copy(answerText)}>Copiar Answer</Button>
      </Paper>
    </Box>
  );
}