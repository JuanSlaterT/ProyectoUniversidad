import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Chip, TextField, InputAdornment, Tabs, Tab } from '@mui/material';
import { Search as SearchIcon, PlayArrow as PlayIcon, VideoLibrary as LibraryIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { streamingService } from '../../../services/streamingService';

const PageContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 24px 0 48px;
`;

const Header = styled(Box)`
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  border-radius: 16px;
  color: white;
  padding: 32px;
  margin-bottom: 24px;
`;

const CourseCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  }
`;

const MyCoursesPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState(0);
  const [live, setLive] = useState([]);
  const [recorded, setRecorded] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [l, r] = await Promise.all([
        streamingService.getLiveStreams(),
        streamingService.getRecordedStreams(),
      ]);
      setLive(l);
      setRecorded(r);
    };
    load();
  }, []);

  const liveWithFlag = live.map(i => ({ ...i, isLive: true }));
  const recordedWithFlag = recorded.map(i => ({ ...i, isLive: false }));
  const list = tab === 0 ? [...liveWithFlag, ...recordedWithFlag] : tab === 1 ? liveWithFlag : recordedWithFlag;
  const filtered = list.filter(i => (
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.teacher.toLowerCase().includes(query.toLowerCase()) ||
    (i.category || '').toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <Header>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Mis Cursos</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>Retoma donde lo dejaste y continúa aprendiendo</Typography>
          <Box mt={3} display="flex" gap={2} alignItems="center">
            <TextField
              placeholder="Buscar por título, profesor o categoría"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ maxWidth: 480, backgroundColor: 'white', borderRadius: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="inherit" indicatorColor="secondary">
              <Tab icon={<LibraryIcon />} iconPosition="start" label="Todos" />
              <Tab icon={<PlayIcon />} iconPosition="start" label="En vivo" />
              <Tab icon={<LibraryIcon />} iconPosition="start" label="Grabados" />
            </Tabs>
          </Box>
        </Header>

        <Grid container spacing={3}>
          {filtered.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${item.id}-${item.title}`}>
              <CourseCard>
                <CardMedia component="img" height="160" image={item.thumbnail} alt={item.title} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.teacher}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {item.category && <Chip label={item.category} size="small" />}
                    <Chip label={item.isLive ? 'En vivo' : 'Grabado'} size="small" color={item.isLive ? 'error' : 'default'} />
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant="contained" onClick={() => navigate(item.isLive ? `/live/${item.id}` : `/player/${item.id}`)}>
                    {item.isLive ? 'Ir a la clase en vivo' : 'Continuar'}
                  </Button>
                </CardActions>
              </CourseCard>
            </Grid>
          ))}

          {filtered.length === 0 && (
            <Grid item xs={12}>
              <Box textAlign="center" py={8}>
                <Typography variant="h6" gutterBottom>No encontramos cursos</Typography>
                <Typography variant="body2" color="text.secondary">Prueba con otros términos o explora el catálogo</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default MyCoursesPage;


