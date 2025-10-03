import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Chip, IconButton, Tooltip } from '@mui/material';
import { Star as StarIcon, PlayArrow as PlayIcon, StarBorder } from '@mui/icons-material';
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

const FavCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  }
`;

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const load = async () => {
      const r = await streamingService.getRecordedStreams();
      const fav = r.slice(0, 8);
      setItems(fav);
      setFavorites(fav.reduce((acc, x) => ({ ...acc, [x.id]: true }), {}));
    };
    load();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <Header>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Favoritos</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>Tus clases y cursos guardados</Typography>
        </Header>

        <Grid container spacing={3}>
          {items.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <FavCard>
                <CardMedia component="img" height="160" image={item.thumbnail} alt={item.title} />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" gap={2}>
                    <Box>
                      <Typography variant="h6" gutterBottom>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>{item.teacher}</Typography>
                      <Box display="flex" gap={1}>
                        {item.category && <Chip label={item.category} size="small" />}
                        <Chip label="Favorito" size="small" color="warning" />
                      </Box>
                    </Box>
                    <Tooltip title={favorites[item.id] ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
                      <IconButton color="warning" onClick={() => toggleFavorite(item.id)}>
                        {favorites[item.id] ? <StarIcon /> : <StarBorder />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant="contained" onClick={() => navigate(`/player/${item.id}`)} startIcon={<PlayIcon />}>Reproducir</Button>
                </CardActions>
              </FavCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default FavoritesPage;


