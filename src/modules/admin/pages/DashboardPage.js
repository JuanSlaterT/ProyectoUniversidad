import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import styled from 'styled-components';

const StatsCard = styled(Card)`
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  height: 120px;
`;

const DashboardPage = () => {
  const stats = [
    { title: 'Estudiantes Activos', value: '1,247', icon: <PeopleIcon />, change: '+12%' },
    { title: 'Clases en Vivo', value: '8', icon: <PlayIcon />, change: '+3' },
    { title: 'Clases Grabadas', value: '156', icon: <SchoolIcon />, change: '+24' },
    { title: 'Engagement', value: '89%', icon: <TrendingIcon />, change: '+5%' },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Dashboard del Profesor
      </Typography>

      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {stat.change} esta semana
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.8 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Clases Programadas
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mb: 2 }}>
              Crear Nueva Clase
            </Button>
            <List>
              <ListItem>
                <ListItemText
                  primary="Matemáticas Avanzadas"
                  secondary="Hoy 14:00 - 2:30h estimadas"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Física Cuántica"
                  secondary="Mañana 16:00 - 2:00h estimadas"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Actividad Reciente
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Nueva pregunta en chat"
                  secondary="hace 5 min"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="156 estudiantes conectados"
                  secondary="hace 12 min"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;