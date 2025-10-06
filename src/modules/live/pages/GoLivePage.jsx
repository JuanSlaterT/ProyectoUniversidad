import React, { useRef, useState, useEffect } from 'react';
import { Box, Paper, Button, TextField, Typography, Stack } from '@mui/material';

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

export default function GoLivePage() {
  const localVideoRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus] = useState('idle');
  const [offerText, setOfferText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => () => stopAll(), []);

  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.muted = true;
        localVideoRef.current.play().catch(() => {});
      }
      setStatus('camera-ready');
    } catch (e) {
      setError('No se pudo acceder a la cámara/micrófono: ' + e.message);
    }
  };

  const createOffer = async () => {
    setError('');
    try {
      if (!streamRef.current) await startCamera();
      const pc = new RTCPeerConnection(RTC_CONFIG);
      pcRef.current = pc;

      // Configurar eventos de conexión
      pc.onconnectionstatechange = () => {
        console.log('Host - Connection state:', pc.connectionState);
        if (pc.connectionState === 'connected') {
          setStatus('connected');
        } else if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
          setStatus('disconnected');
          setError('Conexión perdida');
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log('Host - ICE connection state:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          setStatus('connected');
        }
      };

      // publicar tracks locales
      streamRef.current.getTracks().forEach((t) => pc.addTrack(t, streamRef.current));

      // recolectar ICE y generar Offer final
      const offer = await pc.createOffer({ offerToReceiveAudio: false, offerToReceiveVideo: false });
      await pc.setLocalDescription(offer);
      await waitIceComplete(pc);

      const fullOffer = JSON.stringify(pc.localDescription);
      setOfferText(fullOffer);
      setStatus('offer-created');
    } catch (e) {
      setError('Error creando la Offer: ' + e.message);
    }
  };

  const acceptAnswer = async () => {
    setError('');
    try {
      const pc = pcRef.current;
      if (!pc) throw new Error('Primero crea la Offer');
      const desc = JSON.parse(answerText);
      await pc.setRemoteDescription(desc);
      setStatus('connecting');
    } catch (e) {
      setError('Answer inválida: ' + e.message);
    }
  };

  const copy = async (txt) => {
    try { await navigator.clipboard.writeText(txt); } catch {}
  };

  const stopAll = () => {
    try { pcRef.current && pcRef.current.close(); } catch {}
    pcRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setStatus('idle');
    setOfferText('');
    setAnswerText('');
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
        />
        <Button sx={{ mt: 1 }} onClick={() => copy(offerText)}>Copiar Offer</Button>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">Pega aquí la Answer del viewer</Typography>
        <TextField
          multiline fullWidth minRows={4} value={answerText}
          onChange={e => setAnswerText(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Button sx={{ mt: 1 }} variant="contained" onClick={acceptAnswer} disabled={!offerText}>
          3) Aceptar Answer
        </Button>
      </Paper>
    </Box>
  );
}
