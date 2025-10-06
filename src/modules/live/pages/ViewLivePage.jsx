import React, { useRef, useState, useEffect } from 'react';
import { Box, Paper, Button, TextField, Typography } from '@mui/material';

const RTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    // Solo los más confiables para evitar problemas
  ],
  iceCandidatePoolSize: 5, // Reducido para evitar problemas
  iceTransportPolicy: 'all',
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
    let connectionTimeout = null;
    let isAnswerCreated = false;
    
    try {
      const offer = JSON.parse(offerText);
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
        console.log('Viewer - ICE candidate:', event.candidate);
      };

      pc.ontrack = (e) => {
        console.log('Viewer - Received track:', e.track.kind);
        if (remoteVideoRef.current && e.streams[0]) {
          remoteVideoRef.current.srcObject = e.streams[0];
          remoteVideoRef.current.play().catch(() => {});
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