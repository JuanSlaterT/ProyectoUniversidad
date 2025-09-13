import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { streamingService } from '../../../services/streamingService';

const HeroSection = styled(Paper)`
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  padding: 48px 24px;
  text-align: center;
  margin-bottom: 32px;
  border-radius: 16px;
`;

const StreamCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const LiveBadge = styled(Chip)`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #F44336;
  color: white;
  font-weight: 600;
`;

const ViewersBadge = styled(Box)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
`;

const mockStreams = [
  {
    id: 1,
    title: 'Matemáticas Avanzadas - Cálculo Integral',
    teacher: 'Prof. María González',
    viewers: 245,
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Matemáticas',
    duration: '2:30:00',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Historia Universal - Segunda Guerra Mundial',
    teacher: 'Prof. Carlos Ruiz',
    viewers: 189,
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Historia',
    duration: '1:45:00',
    rating: 4.6,
  },
  {
    id: 3,
    title: 'Programación en Python - Estructuras de Datos',
    teacher: 'Prof. Ana Martínez',
    viewers: 342,
    isLive: false,
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Programación',
    duration: '3:15:00',
    rating: 4.9,
  },
  {
    id: 4,
    title: 'Física Cuántica - Principios Fundamentales',
    teacher: 'Prof. Roberto Silva',
    viewers: 156,
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Física',
    duration: '2:00:00',
    rating: 4.7,
  },
  {
    id: 5,
    title: 'Literatura Española - Generación del 98',
    teacher: 'Prof. Elena Vargas',
    viewers: 98,
    isLive: false,
    thumbnail: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Literatura',
    duration: '1:30:00',
    rating: 4.5,
  },
  {
    id: 6,
    title: 'Química Orgánica - Reacciones y Síntesis',
    teacher: 'Prof. Miguel Torres',
    viewers: 201,
    isLive: true,
    thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Química',
    duration: '2:45:00',
    rating: 4.8,
  },
];

const HomePage = () => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStreams = async () => {
      try {
        setLoading(true);
        const [liveData, recordedData] = await Promise.all([
          streamingService.getLiveStreams(),
          streamingService.getRecordedStreams()
        ]);
        setLiveStreams(liveData);
        setRecordedClasses(recordedData);
      } catch (error) {
        console.error('Error loading streams:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6">Cargando contenido...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <HeroSection elevation={0}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Aprende en Vivo
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 3, opacity: 0.9 }}>
          Accede a las mejores clases en vivo y contenido bajo demanda
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'white',
            color: '#4CAF50',
            '&:hover': { 
              backgroundColor: '#f5f5f5',
              color: '#4CAF50'
            },
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            }
          }}
        >
          Explorar Clases
        </Button>
      </HeroSection>

      {/* Live Streams */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <PlayIcon sx={{ color: '#F44336', mr: 1 }} />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            En Vivo Ahora
          </Typography>
          <Chip
            label={`${liveStreams.length} transmisiones`}
            color="secondary"
            size="small"
            sx={{ ml: 2 }}
          />
        </Box>

        <Grid container spacing={3}>
          {liveStreams.map((stream) => (
            <Grid item xs={12} sm={6} md={4} key={stream.id}>
              <StreamCard>
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={stream.thumbnail}
                    alt={stream.title}
                  />
                  <LiveBadge label="EN VIVO" size="small" />
                  <ViewersBadge>
                    <PeopleIcon fontSize="small" />
                    {stream.viewers.toLocaleString()}
                  </ViewersBadge>
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom noWrap>
                    {stream.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stream.teacher}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Chip label={stream.category} size="small" color="primary" variant="outlined" />
                    <Box display="flex" alignItems="center">
                      <StarIcon sx={{ fontSize: 16, color: '#FFD700', mr: 0.5 }} />
                      <Typography variant="body2">{stream.rating}</Typography>
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayIcon />}
                    sx={{ 
                      mt: 2,
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#45a049',
                      },
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1.2
                    }}
                  >
                    Ver Ahora
                  </Button>
                </CardContent>
              </StreamCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recorded Classes */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <TimeIcon sx={{ color: '#4CAF50', mr: 1 }} />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            Clases Grabadas
          </Typography>
          <Chip
            label={`${recordedClasses.length} disponibles`}
            color="primary"
            size="small"
            sx={{ ml: 2 }}
          />
        </Box>

        <Grid container spacing={3}>
          {recordedClasses.map((stream) => (
            <Grid item xs={12} sm={6} md={4} key={stream.id}>
              <StreamCard>
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={stream.thumbnail}
                    alt={stream.title}
                  />
                  <ViewersBadge>
                    <TimeIcon fontSize="small" />
                    {stream.duration}
                  </ViewersBadge>
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom noWrap>
                    {stream.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stream.teacher}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Chip label={stream.category} size="small" color="primary" variant="outlined" />
                    <Box display="flex" alignItems="center">
                      <StarIcon sx={{ fontSize: 16, color: '#FFD700', mr: 0.5 }} />
                      <Typography variant="body2">{stream.rating}</Typography>
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PlayIcon />}
                    sx={{ 
                      mt: 2,
                      borderColor: '#4CAF50',
                      color: '#4CAF50',
                      '&:hover': {
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderColor: '#4CAF50',
                      },
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1.2
                    }}
                  >
                    Reproducir
                  </Button>
                </CardContent>
              </StreamCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;