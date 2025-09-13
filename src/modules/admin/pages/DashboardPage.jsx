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
import { useState, useEffect } from 'react';
import { analyticsService } from '../../../services/analyticsService';

const StatsCard = styled(Card)`
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  height: 120px;
`;

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardData = await analyticsService.getDashboardStats();
        setStats(dashboardData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Cargando dashboard...
        </Typography>
      </Container>
    );
  }

  const statsData = [
    { 
      title: 'Estudiantes Activos', 
      value: stats?.totalStudents?.toLocaleString() || '0', 
      icon: <PeopleIcon />, 
      change: `+${stats?.weeklyGrowth?.students || 0}%` 
    },
    { 
      title: 'Clases en Vivo', 
      value: stats?.activeStreams?.toString() || '0', 
      icon: <PlayIcon />, 
      change: `+${stats?.weeklyGrowth?.streams || 0}` 
    },
    { 
      title: 'Clases Grabadas', 
      value: stats?.recordedClasses?.toString() || '0', 
      icon: <SchoolIcon />, 
      change: `+${stats?.weeklyGrowth?.classes || 0}` 
    },
    { 
      title: 'Engagement', 
      value: `${stats?.engagement || 0}%`, 
      icon: <TrendingIcon />, 
      change: `+${stats?.weeklyGrowth?.engagement || 0}%` 
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Dashboard del Profesor
      </Typography>

      <Grid container spacing={3} mb={4}>
        {statsData.map((stat, index) => (
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
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                mb: 2,
                backgroundColor: '#4CAF50',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1
              }}
            >
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
              {stats?.recentActivity?.map((activity) => (
                <ListItem key={activity.id}>
                  <ListItemText
                    primary={activity.message}
                    secondary={activity.timestamp}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;