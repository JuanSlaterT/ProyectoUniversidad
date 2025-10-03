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
  Rating,
  Avatar,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  School as SchoolIcon,
  VideoLibrary as VideoLibraryIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { streamingService } from '../../../services/streamingService';

const HeroSection = styled(Paper)`
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  padding: 64px 32px;
  text-align: center;
  margin-bottom: 48px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const StreamCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #4CAF50;
  }
`;

const LiveBadge = styled(Chip)`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(45deg, #F44336 30%, #FF5722 90%);
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  z-index: 2;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const ViewersBadge = styled(Box)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  z-index: 2;
`;

const CategoryChip = styled(Chip)`
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  color: white;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const StatsContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const StatItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 0.875rem;
`;

const TeacherCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const HomePage = () => {
  const [liveStreams, setLiveStreams] = useState([]);
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleStreamClick = (streamId) => {
    navigate(`/player/${streamId}`);
  };

  const handleLiveStreamClick = (streamId) => {
    navigate(`/live/${streamId}`);
  };

  const handleExploreClasses = () => {
    // Scroll a la sección de clases grabadas
    const recordedSection = document.getElementById('recorded-classes');
    if (recordedSection) {
      recordedSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si no existe, navegar a la biblioteca
      navigate('/player/1');
    }
  };

  const handleStartNow = () => {
    // Mostrar modal de registro o navegar a la primera clase disponible
    if (liveStreams.length > 0) {
      navigate(`/live/${liveStreams[0].id}`);
    } else if (recordedClasses.length > 0) {
      navigate(`/player/${recordedClasses[0].id}`);
    } else {
      // Si no hay contenido, mostrar mensaje
      alert('¡Pronto tendremos contenido disponible! Mientras tanto, explora nuestro catálogo.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Box textAlign="center">
            <Box
              sx={{
                width: 60,
                height: 60,
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #4CAF50',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px',
              }}
            />
            <Typography variant="h6" color="text.secondary">
              Cargando contenido...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <HeroSection elevation={0}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 3 }}>
          Aprende en Vivo
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.95, maxWidth: '600px', margin: '0 auto 32px' }}>
          Accede a las mejores clases en vivo y contenido bajo demanda de los mejores profesores
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayIcon />}
          onClick={handleExploreClasses}
          sx={{
            backgroundColor: 'white',
            color: '#4CAF50',
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          Explorar Clases
        </Button>
      </HeroSection>

      {/* Live Streams */}
      <Box mb={6}>
        <Box display="flex" alignItems="center" mb={4}>
          <Box
            sx={{
              width: 4,
              height: 32,
              backgroundColor: '#F44336',
              borderRadius: 2,
              mr: 2,
            }}
          />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mr: 2 }}>
            En Vivo Ahora
          </Typography>
          <Chip
            label={`${liveStreams.length} transmisiones`}
            color="error"
            size="medium"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Grid container spacing={3}>
          {liveStreams.slice(0, 6).map((stream) => (
            <Grid item xs={12} sm={6} md={4} key={stream.id}>
              <StreamCard onClick={() => handleLiveStreamClick(stream.id)}>
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={stream.thumbnail}
                    alt={stream.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <LiveBadge label="EN VIVO" />
                  <ViewersBadge>
                    <PeopleIcon sx={{ fontSize: 16 }} />
                    {stream.viewers}
                  </ViewersBadge>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {stream.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {stream.description}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      sx={{ width: 32, height: 32, mr: 1, bgcolor: '#4CAF50' }}
                    >
                      <SchoolIcon />
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {stream.teacher}
                    </Typography>
                  </Box>

                  <Box display="flex" flexWrap="wrap" mb={2}>
                    <CategoryChip label={stream.category} size="small" />
                    <Chip 
                      label={stream.level} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#E8F5E8', 
                        color: '#2E7D32',
                        fontWeight: 600,
                        mr: 1,
                        mb: 1
                      }} 
                    />
                    <Chip 
                      label={stream.language} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#E3F2FD', 
                        color: '#1976D2',
                        fontWeight: 600,
                        mr: 1,
                        mb: 1
                      }} 
                    />
                  </Box>

                  <StatsContainer>
                    <StatItem>
                      <TimeIcon sx={{ fontSize: 16 }} />
                      {stream.duration}
                    </StatItem>
                    <StatItem>
                      <StarIcon sx={{ fontSize: 16, color: '#FFD700' }} />
                      {stream.rating}
                    </StatItem>
                    <StatItem>
                      <TrendingIcon sx={{ fontSize: 16 }} />
                      {stream.startTime}
                    </StatItem>
                  </StatsContainer>
                </CardContent>
              </StreamCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recorded Classes */}
      <Box mb={6} id="recorded-classes">
        <Box display="flex" alignItems="center" mb={4}>
          <Box
            sx={{
              width: 4,
              height: 32,
              backgroundColor: '#2196F3',
              borderRadius: 2,
              mr: 2,
            }}
          />
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mr: 2 }}>
            Clases Grabadas
          </Typography>
          <Chip
            label={`${recordedClasses.length} videos`}
            color="primary"
            size="medium"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Grid container spacing={3}>
          {recordedClasses.slice(0, 6).map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <StreamCard onClick={() => handleStreamClick(video.id)}>
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <ViewersBadge>
                    <VideoLibraryIcon sx={{ fontSize: 16 }} />
                    {video.viewers}
                  </ViewersBadge>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {video.description}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      sx={{ width: 32, height: 32, mr: 1, bgcolor: '#2196F3' }}
                    >
                      <SchoolIcon />
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {video.teacher}
                    </Typography>
                  </Box>

                  <Box display="flex" flexWrap="wrap" mb={2}>
                    <CategoryChip label={video.category} size="small" />
                    <Chip 
                      label={video.level} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#E8F5E8', 
                        color: '#2E7D32',
                        fontWeight: 600,
                        mr: 1,
                        mb: 1
                      }} 
                    />
                    <Chip 
                      label={video.language} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#E3F2FD', 
                        color: '#1976D2',
                        fontWeight: 600,
                        mr: 1,
                        mb: 1
                      }} 
                    />
                  </Box>

                  <StatsContainer>
                    <StatItem>
                      <TimeIcon sx={{ fontSize: 16 }} />
                      {video.duration}
                    </StatItem>
                    <StatItem>
                      <StarIcon sx={{ fontSize: 16, color: '#FFD700' }} />
                      {video.rating}
                    </StatItem>
                    <StatItem>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(video.uploadDate).toLocaleDateString('es-ES')}
                      </Typography>
                    </StatItem>
                  </StatsContainer>
                </CardContent>
              </StreamCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
          color: 'white',
          p: 6,
          textAlign: 'center',
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          ¿Listo para comenzar tu aprendizaje?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Únete a miles de estudiantes que ya están aprendiendo con nosotros
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<SchoolIcon />}
          onClick={handleStartNow}
          sx={{
            backgroundColor: 'white',
            color: '#2196F3',
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 3,
            '&:hover': {
              backgroundColor: '#f5f5f5',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Comenzar Ahora
        </Button>
      </Paper>
    </Container>
  );
};

export default HomePage;