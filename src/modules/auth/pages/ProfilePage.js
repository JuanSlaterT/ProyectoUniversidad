import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Mi Perfil
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box>
          <Typography variant="h6">
            Perfil de Usuario
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Funcionalidad en desarrollo...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;