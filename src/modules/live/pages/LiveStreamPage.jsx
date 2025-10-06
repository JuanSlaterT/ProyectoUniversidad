import React, { useState, useEffect, useRef } from 'react';
import {
  Grid, Paper, Typography, Box, Chip, Avatar, TextField,
  List, ListItem, ListItemAvatar, ListItemText, IconButton,
  FormControl, InputLabel, Select, MenuItem, Button,
} from '@mui/material';
import {
  Send as SendIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Fullscreen as FullscreenIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeOffIcon,
  VideoCall as VideoCallIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import Hls from 'hls.js';
import { streamingService } from '../../../services/streamingService';
import { chatService } from '../../../services/chatService';

const StreamContainer = styled(Paper)`
  background: #000; position: relative; aspect-ratio: 16/9;
  border-radius: 8px; overflow: hidden;
`;
const VideoPlayer = styled.video`
  width: 100%; height: 100%; object-fit: cover; background: #000;
`;
const StreamControls = styled(Box)`
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 16px; display: flex; align-items: center; gap: 12px;
  opacity: 0; transition: opacity .3s ease;
  ${StreamContainer}:hover & { opacity: 1; }
`;
const StreamInfo = styled(Paper)` padding: 16px; margin-bottom: 16px; `;
const ChatContainer = styled(Paper)` height: 400px; display: flex; flex-direction: column; `;
const ChatMessages = styled(Box)` flex: 1; overflow-y: auto; padding: 8px; `;
const ChatInput = styled(Box)` padding: 16px; border-top: 1px solid #e0e0e0; display: flex; gap: 8px; `;
const QualitySelector = styled(FormControl)` min-width: 140px; `;
const WebRTCActions = styled(Box)`
  display: flex; gap: 8px; margin-bottom: 16px;
  flex-wrap: wrap;
`;

export default function LiveStreamPage() {
  const { streamId } = useParams();
  const navigate = useNavigate();
  
  // Refs
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const connectionRef = useRef(null);
  const webrtcStreamRef = useRef(null);

  // State
  const [viewers, setViewers] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [streamData, setStreamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quality, setQuality] = useState('auto');
  const [levels, setLevels] = useState([]);
  const [isNativeHls, setIsNativeHls] = useState(false);
  const [muted, setMuted] = useState(true);
  const [streamProtocol, setStreamProtocol] = useState('hls'); // 'hls' or 'webrtc'

  // Load stream data and setup chat
  useEffect(() => {
    let unsubscribe = null;
    (async () => {
      try {
        setLoading(true);
        const stream = await streamingService.getStreamDetails(streamId);
        setStreamData(stream);
        setViewers(stream.viewers || 0);
        
        // Determine stream protocol
        setStreamProtocol(stream.protocol || 'hls');

        // Setup chat connection
        const { connectionId } = await chatService.connectToChat(streamId);
        connectionRef.current = connectionId;

        const initial = await chatService.getChatMessages(streamId);
        setMessages(initial);

        unsubscribe = chatService.subscribeToMessages(streamId, (m) => {
          setMessages(prev => [...prev, m]);
        });
      } catch (e) {
        console.error('Error loading stream data:', e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      unsubscribe && unsubscribe();
      if (connectionRef.current) chatService.disconnectFromChat(connectionRef.current);
    };
  }, [streamId]);

  // Simulate viewer count variation
  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(0, v + (Math.random() > 0.5 ? 1 : -1)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Setup HLS streaming
  useEffect(() => {
    if (streamProtocol !== 'hls') return;
    
    const video = videoRef.current;
    if (!video || !streamData?.hlsUrl) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setLevels([]);
    setQuality('auto');

    const supportsNative = video.canPlayType('application/vnd.apple.mpegURL');
    setIsNativeHls(!!supportsNative && !Hls.isSupported());

    if (supportsNative && !Hls.isSupported()) {
      video.src = streamData.hlsUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hlsRef.current = hls;
      hls.loadSource(streamData.hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((l, i) => ({
          height: l.height,
          label: `${l.height}p`,
          value: i,
        }));
        setLevels(levels);
      });
    }
  }, [streamData, streamProtocol]);

  // Setup WebRTC streaming
  useEffect(() => {
    if (streamProtocol !== 'webrtc' || !streamData?.webrtcStream) return;
    
    const video = videoRef.current;
    if (!video) return;

    video.srcObject = streamData.webrtcStream;
    video.play().catch(console.error);
  }, [streamData, streamProtocol]);

  // Handle quality change for HLS
  useEffect(() => {
    if (!hlsRef.current || quality === 'auto') return;
    const level = levels.find(l => l.label === quality);
    if (level !== undefined) {
      hlsRef.current.currentLevel = level.value;
    }
  }, [quality, levels]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    try {
      await chatService.sendMessage(streamId, chatMessage, 'current-user', 'Tú');
      setChatMessage('');
    } catch (e) {
      console.error('Error sending message:', e);
    }
  };

  const handleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (container?.requestFullscreen) container.requestFullscreen();
  };

  const handleGoLive = () => {
    navigate('/golive');
  };

  const handleViewLive = () => {
    navigate('/viewlive');
  };

  if (loading) {
    return <Box sx={{ p: 2 }}><Typography variant="h6">Cargando stream...</Typography></Box>;
  }

  const qualityOptions =
    levels.length > 0
      ? [{ value: 'auto', label: 'Auto' }].concat(
        levels
          .slice()
          .sort((a, b) => (b.height || 0) - (a.height || 0))
          .map(l => ({ value: l.label, label: l.label }))
      )
      : [
        { value: 'auto', label: 'Auto' },
        { value: '1080p', label: '1080p' },
        { value: '720p', label: '720p' },
        { value: '480p', label: '480p' },
        { value: '360p', label: '360p' },
      ];

  return (
    <Box sx={{ p: 2 }}>
      {/* WebRTC Actions */}
      <WebRTCActions>
        <Button
          variant="contained"
          startIcon={<VideoCallIcon />}
          onClick={handleGoLive}
          sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
        >
          Ir a Emitir (WebRTC)
        </Button>
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={handleViewLive}
          sx={{ borderColor: '#2196F3', color: '#2196F3', '&:hover': { borderColor: '#1976D2' } }}
        >
          Ver Live (WebRTC)
        </Button>
      </WebRTCActions>

      <Grid container spacing={3}>
        {/* Video */}
        <Grid item xs={12} lg={8}>
          <StreamContainer>
            <VideoPlayer
              ref={videoRef}
              poster={streamData?.poster}
              controls={false}
              autoPlay
              muted={muted}
              playsInline
            />
            <StreamControls>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label="EN VIVO" size="small" sx={{ backgroundColor: '#F44336', color: 'white' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <PeopleIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {viewers.toLocaleString()} espectadores
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {!isNativeHls && streamProtocol === 'hls' && (
                <QualitySelector size="small" variant="outlined">
                  <InputLabel sx={{ color: 'white' }}>Calidad</InputLabel>
                  <Select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    label="Calidad"
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                  >
                    {qualityOptions.map(o => (
                      <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                    ))}
                  </Select>
                </QualitySelector>
              )}

              <IconButton sx={{ color: 'white' }} onClick={() => setMuted(m => !m)}>
                {muted ? <VolumeOffIcon /> : <VolumeIcon />}
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
                {(streamData?.teacher || 'P').split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {streamData?.title || 'Clase en Vivo'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {streamData?.teacher || 'Profesor'} • {streamData?.subject || 'Materia'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {streamData?.description || 'Descripción de la clase...'}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`Protocolo: ${streamProtocol.toUpperCase()}`} 
                size="small" 
                color={streamProtocol === 'webrtc' ? 'primary' : 'default'}
              />
              <Chip 
                label={`${streamData?.duration || '00:00'} min`} 
                size="small" 
                variant="outlined" 
              />
            </Box>
          </StreamInfo>
        </Grid>

        {/* Chat */}
        <Grid item xs={12} lg={4}>
          <ChatContainer>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Chat en Vivo</Typography>
            </Box>
            
            <ChatMessages>
              {messages.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                  No hay mensajes aún
                </Typography>
              ) : (
                <List>
                  {messages.map((msg, index) => (
                    <ListItem key={index} sx={{ px: 2, py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                          {msg.username?.charAt(0) || 'U'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={msg.message}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {msg.username}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
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
}