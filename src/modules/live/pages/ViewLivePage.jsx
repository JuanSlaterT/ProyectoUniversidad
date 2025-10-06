import React, { useRef, useState, useEffect } from 'react';
import { Box, Paper, Button, TextField, Typography } from '@mui/material';

const RTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    // Servidores adicionales para mejor conectividad global
    { urls: 'stun:stun.ekiga.net' },
    { urls: 'stun:stun.ideasip.com' },
    { urls: 'stun:stun.schlund.de' },
    { urls: 'stun:stun.stunprotocol.org:3478' },
    { urls: 'stun:stun.voiparound.com' },
    { urls: 'stun:stun.voipbuster.com' },
    { urls: 'stun:stun.voipstunt.com' },
  ],
  iceCandidatePoolSize: 10, // Más candidatos ICE
  iceTransportPolicy: 'all', // Permitir todos los transportes
};

const waitIceComplete = (pc) => new Promise((res) => {
  if (pc.iceGatheringState === 'complete') return res();
  const onChange = () => {
    if (pc.iceGatheringState === 'complete') {
      pc.removeEventListener('icegatheringstatechange', onChange);
      res();
    }
  };
  pc.addEventListener('icegatheringstatechange', onChange);
});

export default function ViewLivePage() {
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);

  const [offerText, setOfferText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const createAnswer = async () => {
    setError('');
    try {
      const offer = JSON.parse(offerText);
      const pc = new RTCPeerConnection(RTC_CONFIG);
      pcRef.current = pc;

      // Configurar eventos de conexión con mejor manejo
      pc.onconnectionstatechange = () => {
        console.log('Viewer - Connection state:', pc.connectionState);
        if (pc.connectionState === 'connected') {
          setStatus('connected');
          setError('');
        } else if (pc.connectionState === 'connecting') {
          setStatus('connecting');
        } else if (pc.connectionState === 'failed') {
          setStatus('failed');
          setError('Conexión falló - verifica la Offer');
        } else if (pc.connectionState === 'disconnected') {
          setStatus('disconnected');
          setError('Conexión perdida');
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log('Viewer - ICE connection state:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          setStatus('connected');
          setError('');
        } else if (pc.iceConnectionState === 'checking') {
          setStatus('connecting');
        } else if (pc.iceConnectionState === 'failed') {
          setStatus('failed');
          setError('ICE falló - verifica la Offer');
        } else if (pc.iceConnectionState === 'disconnected') {
          setStatus('disconnected');
          setError('ICE desconectado');
        }
      };

      // Agregar evento para candidatos ICE
      pc.onicecandidate = (event) => {
        console.log('Viewer - ICE candidate:', event.candidate);
      };

      pc.ontrack = (e) => {
        console.log('Viewer - Received track:', e.track.kind);
        if (remoteVideoRef.current && e.streams[0]) {
          remoteVideoRef.current.srcObject = e.streams[0];
          remoteVideoRef.current.play().catch(() => {});
        }
      };

      // Agregar timeout para la conexión
      const connectionTimeout = setTimeout(() => {
        if (pc.connectionState !== 'connected') {
          console.log('Viewer - Timeout de conexión');
          setError('Timeout: La conexión tardó demasiado');
        }
      }, 15000); // 15 segundos timeout

      // Limpiar timeout si se conecta
      const originalOnConnectionChange = pc.onconnectionstatechange;
      pc.onconnectionstatechange = () => {
        if (originalOnConnectionChange) originalOnConnectionChange();
        if (pc.connectionState === 'connected') {
          clearTimeout(connectionTimeout);
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
      
      console.log('Viewer - Answer creada, esperando conexión...');
    } catch (e) {
      setError('Offer inválida: ' + e.message);
    }
  };

  const copy = async (txt) => {
    try { await navigator.clipboard.writeText(txt); } catch {}
  };

  const stopAll = () => {
    try { pcRef.current && pcRef.current.close(); } catch {}
    pcRef.current = null;
    setStatus('idle');
    setOfferText('');
    setAnswerText('');
  };

  useEffect(() => () => stopAll(), []);

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Viewer (WebRTC)</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <video ref={remoteVideoRef} style={{ width: '100%', borderRadius: 8, background:'#000' }} playsInline autoPlay />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>Estado: {status}</Typography>
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">Pega aquí la Offer del host</Typography>
        <TextField
          multiline fullWidth minRows={4}
          value={offerText} onChange={e => setOfferText(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Button sx={{ mt: 1 }} variant="contained" onClick={createAnswer} disabled={!offerText}>Generar Answer</Button>
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