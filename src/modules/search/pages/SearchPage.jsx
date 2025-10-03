import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  School as SchoolIcon,
  VideoLibrary as VideoLibraryIcon,
  Person as PersonIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { streamingService } from '../../../services/streamingService';

const SearchContainer = styled(Box)`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  padding: 24px 0;
`;

const SearchHeader = styled(Paper)`
  padding: 32px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  border-radius: 16px;
`;

const ResultCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`search-tabpanel-${index}`}
      aria-labelledby={`search-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState({
    courses: [],
    videos: [],
    teachers: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = async (query) => {
    setLoading(true);
    try {
      // Simular búsqueda con delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const [liveStreams, recordedStreams] = await Promise.all([
        streamingService.getLiveStreams(),
        streamingService.getRecordedStreams()
      ]);

      const allCourses = [...liveStreams, ...recordedStreams];
      const allVideos = [...recordedStreams];
      const teachers = [
        { id: 1, name: 'Prof. Ana Martínez', subject: 'Programación', avatar: null },
        { id: 2, name: 'Prof. Luis García', subject: 'Desarrollo Web', avatar: null },
        { id: 3, name: 'Prof. Elena Rodríguez', subject: 'Frontend', avatar: null },
      ];

      const filteredCourses = allCourses.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.teacher.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

      const filteredVideos = allVideos.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.teacher.toLowerCase().includes(query.toLowerCase())
      );

      const filteredTeachers = teachers.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subject.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults({
        courses: filteredCourses,
        videos: filteredVideos,
        teachers: filteredTeachers
      });
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleResultClick = (type, id) => {
    if (type === 'course' || type === 'video') {
      navigate(`/player/${id}`);
    } else if (type === 'teacher') {
      navigate(`/profile/${id}`);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const totalResults = searchResults.courses.length + searchResults.videos.length + searchResults.teachers.length;

  return (
    <SearchContainer>
      <Container maxWidth="xl">
        <SearchHeader elevation={0}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Resultados de Búsqueda
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            {searchQuery ? `"${searchQuery}"` : 'Buscar contenido'}
          </Typography>
          
          <Box component="form" onSubmit={handleSearch}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar clases, profesores, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: 'white',
                        color: '#4CAF50',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      Buscar
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </SearchHeader>

        {searchQuery && (
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab 
                  label={`Todos (${totalResults})`} 
                  icon={<SearchIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Cursos (${searchResults.courses.length})`} 
                  icon={<SchoolIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Videos (${searchResults.videos.length})`} 
                  icon={<VideoLibraryIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Profesores (${searchResults.teachers.length})`} 
                  icon={<PersonIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
              <Grid container spacing={3}>
                {[...searchResults.courses, ...searchResults.videos, ...searchResults.teachers].map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`${item.type || 'course'}-${item.id || index}`}>
                    <ResultCard onClick={() => handleResultClick(item.type || 'course', item.id)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.thumbnail || item.avatar}
                        alt={item.title || item.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {item.title || item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {item.teacher || item.subject || item.description}
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap">
                          <Chip 
                            label={item.type || 'Curso'} 
                            size="small" 
                            color="primary"
                          />
                          {item.category && (
                            <Chip 
                              label={item.category} 
                              size="small" 
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </ResultCard>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Grid container spacing={3}>
                {searchResults.courses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <ResultCard onClick={() => handleResultClick('course', course.id)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={course.thumbnail}
                        alt={course.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {course.teacher}
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap">
                          <Chip label="Curso" size="small" color="primary" />
                          <Chip label={course.category} size="small" variant="outlined" />
                        </Box>
                      </CardContent>
                    </ResultCard>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Grid container spacing={3}>
                {searchResults.videos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id}>
                    <ResultCard onClick={() => handleResultClick('video', video.id)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={video.thumbnail}
                        alt={video.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {video.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {video.teacher}
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap">
                          <Chip label="Video" size="small" color="secondary" />
                          <Chip label={video.category} size="small" variant="outlined" />
                        </Box>
                      </CardContent>
                    </ResultCard>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <Grid container spacing={3}>
                {searchResults.teachers.map((teacher) => (
                  <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                    <ResultCard onClick={() => handleResultClick('teacher', teacher.id)}>
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Avatar
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            mx: 'auto', 
                            mb: 2,
                            bgcolor: '#4CAF50'
                          }}
                        >
                          <PersonIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          {teacher.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {teacher.subject}
                        </Typography>
                        <Chip label="Profesor" size="small" color="success" />
                      </CardContent>
                    </ResultCard>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Paper>
        )}

        {!searchQuery && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              ¿Qué te gustaría aprender hoy?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Busca entre miles de clases, videos y profesores disponibles
            </Typography>
          </Paper>
        )}
      </Container>
    </SearchContainer>
  );
};

export default SearchPage;
