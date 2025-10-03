import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip, Paper, IconButton, Tooltip } from '@mui/material';
import { PlayArrow as PlayIcon, History as HistoryIcon, Replay } from '@mui/icons-material';
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

const Row = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 12px;
`;

const HistoryPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const r = await streamingService.getRecordedStreams();
      // mock: agregar progreso y última vista
      setItems(r.slice(0, 12).map((x, idx) => ({
        ...x,
        progress: Math.floor(((idx + 3) * 13) % 97),
        lastViewed: new Date(Date.now() - idx * 86400000).toLocaleString('es-ES'),
      })));
    };
    load();
  }, []);

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <Header>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Historial</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>Retoma tus clases recientes</Typography>
        </Header>

        <List>
          {items.map(item => (
            <Row key={item.id}>
              <ListItem disableGutters sx={{ flex: 1 }}>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={item.thumbnail}>
                    <HistoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                      <Typography variant="body2" color="text.secondary">{item.teacher}</Typography>
                      <Chip size="small" label={`Visto: ${item.lastViewed}`} />
                      <Chip size="small" color="primary" label={`Progreso: ${item.progress}%`} />
                    </Box>
                  }
                />
              </ListItem>
              <Tooltip title="Continuar">
                <IconButton color="primary" onClick={() => navigate(`/player/${item.id}`)}>
                  <PlayIcon />
                </IconButton>
              </Tooltip>
            </Row>
          ))}
        </List>
      </Container>
    </PageContainer>
  );
};

export default HistoryPage;


