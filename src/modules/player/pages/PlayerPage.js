import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const PlayerPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Reproductor de Video
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box>
          <Typography variant="h6">
            Reproductor de Clases Grabadas
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Funcionalidad en desarrollo...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PlayerPage;