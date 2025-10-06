import React, { useRef, useState } from 'react';
import { Box, Paper, Button, TextField, Typography } from '@mui/material';

const RTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
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

      pc.ontrack = (e) => {
        if (remoteVideoRef.current && e.streams[0]) {
          remoteVideoRef.current.srcObject = e.streams[0];
          remoteVideoRef.current.play().catch(() => {});
        }
      };

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await waitIceComplete(pc);

      setAnswerText(JSON.stringify(pc.localDescription));
      setStatus('answer-created');
    } catch (e) {
      setError('Offer inválida: ' + e.message);
    }
  };

  const copy = async (txt) => {
    try { await navigator.clipboard.writeText(txt); } catch {}
  };

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
