import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Send as SendIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Fullscreen as FullscreenIcon,
  VolumeUp as VolumeIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const StreamContainer = styled(Paper)`
  background: #000;
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StreamControls = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${StreamContainer}:hover & {
    opacity: 1;
  }
`;

const StreamInfo = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
`;

const ChatContainer = styled(Paper)`
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChatMessages = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

const ChatInput = styled(Box)`
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 8px;
`;

const QualitySelector = styled(FormControl)`
  min-width: 120px;
`;

const LiveStreamPage = () => {
  const { streamId } = useParams();
  const videoRef = useRef(null);
  const [viewers] = useState(245);
  const [chatMessage, setChatMessage] = useState('');
  const [quality, setQuality] = useState('auto');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ana M.', message: '¡Excelente clase!', time: '14:25' },
    { id: 2, user: 'Carlos R.', message: '¿Podrías repetir la última parte?', time: '14:26' },
    { id: 3, user: 'María G.', message: 'Muy clara la explicación', time: '14:27' },
  ]);

  // Mock stream data
  const streamData = {
    title: 'Matemáticas Avanzadas - Cálculo Integral',
    teacher: 'Prof. María González',
    description: 'En esta clase revisaremos los conceptos fundamentales del cálculo integral, incluyendo técnicas de integración y aplicaciones prácticas.',
    category: 'Matemáticas',
    startTime: '14:00',
    estimatedDuration: '2:30:00',
  };

  const qualityOptions = [
    { value: 'auto', label: 'Auto' },
    { value: '1080p', label: '1080p HD' },
    { value: '720p', label: '720p' },
    { value: '480p', label: '480p' },
    { value: '360p', label: '360p' },
  ];

  useEffect(() => {
    // Simulación de calidad adaptativa
    const adaptiveQuality = () => {
      const connection = navigator.connection || {};
      const effectiveType = connection.effectiveType;
      
      if (quality === 'auto') {
        if (effectiveType === '4g') {
          setQuality('1080p');
        } else if (effectiveType === '3g') {
          setQuality('720p');
        } else {
          setQuality('480p');
        }
      }
    };

    adaptiveQuality();
  }, [quality]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'Tú',
        message: chatMessage,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Video Player */}
        <Grid item xs={12} lg={8}>
          <StreamContainer>
            <VideoPlayer
              ref={videoRef}
              poster="https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=800"
              controls={false}
              autoPlay
              muted
            />
            <StreamControls>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label="EN VIVO"
                    size="small"
                    sx={{ backgroundColor: '#F44336', color: 'white' }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <PeopleIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {viewers.toLocaleString()} espectadores
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <QualitySelector size="small" variant="outlined">
                <InputLabel sx={{ color: 'white' }}>Calidad</InputLabel>
                <Select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  label="Calidad"
                  sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                >
                  {qualityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </QualitySelector>

              <IconButton sx={{ color: 'white' }}>
                <VolumeIcon />
              </IconButton>

              <IconButton sx={{ color: 'white' }}>
                <SettingsIcon />
              </IconButton>

              <IconButton sx={{ color: 'white' }} onClick={handleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </StreamControls>
          </StreamContainer>

          {/* Stream Info */}
          <StreamInfo>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: '#4CAF50' }}>
                {streamData.teacher.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {streamData.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {streamData.teacher}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={streamData.category} color="primary" size="small" />
                  <Chip label={`Iniciado: ${streamData.startTime}`} variant="outlined" size="small" />
                  <Chip label={`Duración: ${streamData.estimatedDuration}`} variant="outlined" size="small" />
                </Box>
                <Typography variant="body1">
                  {streamData.description}
                </Typography>
              </Box>
            </Box>
          </StreamInfo>
        </Grid>

        {/* Chat */}
        <Grid item xs={12} lg={4}>
          <ChatContainer>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">
                Chat en Vivo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {viewers.toLocaleString()} participantes
              </Typography>
            </Box>

            <ChatMessages>
              <List dense>
                {messages.map((msg) => (
                  <ListItem key={msg.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                        {msg.user[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {msg.user}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {msg.time}
                          </Typography>
                        </Box>
                      }
                      secondary={msg.message}
                    />
                  </ListItem>
                ))}
              </List>
            </ChatMessages>

            <ChatInput>
              <TextField
                fullWidth
                size="small"
                placeholder="Escribe un mensaje..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
              >
                <SendIcon />
              </IconButton>
            </ChatInput>
          </ChatContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LiveStreamPage;