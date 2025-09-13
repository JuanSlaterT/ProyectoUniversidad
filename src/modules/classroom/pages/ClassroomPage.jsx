import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const ClassroomPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Aula Virtual
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box>
          <Typography variant="h6">
            Aula Virtual Interactiva
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Funcionalidad en desarrollo...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ClassroomPage;