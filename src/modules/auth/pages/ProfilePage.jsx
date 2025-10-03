import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  LinearProgress,
  Badge,
  Tooltip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as CameraIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../../../services/userService';

const ProfileContainer = styled(Container)`
  padding: 24px;
`;

const ProfileHeader = styled(Paper)`
  padding: 32px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const ProfileAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const StatsCard = styled(Card)`
  text-align: center;
  padding: 24px;
  height: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatNumber = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 8px;
`;

const TabPanel = styled(Box)`
  padding: 24px 0;
`;

const AchievementCard = styled(Card)`
  margin-bottom: 16px;
  border-left: 4px solid #4CAF50;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CourseCard = styled(Card)`
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const profile = await userService.getUserProfile(user?.id || 1);
        setProfileData(profile);
        setEditForm(profile);
      } catch (error) {
        console.error('Error loading profile:', error);
        setSnackbar({
          open: true,
          message: 'Error al cargar el perfil',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await userService.updateUserProfile(user?.id || 1, editForm);
      setProfileData(editForm);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: 'Perfil actualizado correctamente',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbar({
        open: true,
        message: 'Error al actualizar el perfil',
        severity: 'error'
      });
    }
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <LinearProgress sx={{ width: '100%' }} />
        </Box>
      </Container>
    );
  }

  const stats = [
    { label: 'Clases Completadas', value: profileData?.stats?.totalClasses || 0, icon: <SchoolIcon /> },
    { label: 'Horas de Estudio', value: profileData?.stats?.hoursWatched || 0, icon: <ScheduleIcon /> },
    { label: 'Certificados', value: profileData?.stats?.certificates || 0, icon: <CheckIcon /> },
    { label: 'Puntuación Promedio', value: '4.8', icon: <StarIcon /> },
  ];

  const achievements = [
    { id: 1, title: 'Primer Curso Completado', description: 'Completaste tu primer curso en la plataforma', date: '2023-02-15', icon: <CheckIcon /> },
    { id: 2, title: 'Estudiante Dedicado', description: 'Estudiaste más de 50 horas en un mes', date: '2023-03-20', icon: <TrendingIcon /> },
    { id: 3, title: 'Especialista en Python', description: 'Completaste todos los cursos de Python', date: '2023-04-10', icon: <SchoolIcon /> },
    { id: 4, title: 'Colaborador Activo', description: 'Participaste en 100+ discusiones', date: '2023-05-15', icon: <AssignmentIcon /> },
  ];

  const recentCourses = [
    { id: 1, title: 'Programación en Python', progress: 100, status: 'completed', thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'JavaScript Avanzado', progress: 75, status: 'in_progress', thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'React y Redux', progress: 30, status: 'in_progress', thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, title: 'Node.js Backend', progress: 0, status: 'not_started', thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const TabPanelComponent = ({ children, value, index, ...other }) => (
    <TabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </TabPanel>
  );

  return (
    <ProfileContainer maxWidth="lg">
      {/* Profile Header */}
      <ProfileHeader elevation={3}>
        <Box display="flex" alignItems="center" gap={3}>
          <Box position="relative">
            <ProfileAvatar src={profileData?.avatar}>
              {profileData?.name?.[0] || 'U'}
            </ProfileAvatar>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'white',
                color: '#4CAF50',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
              onClick={() => setShowAvatarDialog(true)}
            >
              <CameraIcon />
            </IconButton>
          </Box>
          
          <Box flex={1}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              {profileData?.name || 'Usuario'}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
              {profileData?.email || 'usuario@example.com'}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              {profileData?.roles?.map((role) => (
                <Chip
                  key={role}
                  label={role === 'student' ? 'Estudiante' : role === 'teacher' ? 'Profesor' : 'Administrador'}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                />
              ))}
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Miembro desde {new Date(profileData?.stats?.joinDate || '2023-01-15').toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
            </Typography>
          </Box>

          <Box>
            <IconButton
              onClick={() => setShowSettingsDialog(true)}
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>
      </ProfileHeader>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard elevation={2}>
              <Box color="primary.main" mb={1}>
                {stat.icon}
              </Box>
              <StatNumber variant="h3">
                {stat.value}
              </StatNumber>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper elevation={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Información Personal" icon={<PersonIcon />} />
            <Tab label="Cursos" icon={<SchoolIcon />} />
            <Tab label="Logros" icon={<StarIcon />} />
            <Tab label="Configuración" icon={<SettingsIcon />} />
          </Tabs>
        </Box>

        {/* Personal Information Tab */}
        <TabPanelComponent value={activeTab} index={0}>
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Información Personal</Typography>
              {!isEditing ? (
                <Button startIcon={<EditIcon />} onClick={handleEdit}>
                  Editar
                </Button>
              ) : (
                <Box display="flex" gap={1}>
                  <Button startIcon={<SaveIcon />} onClick={handleSave} variant="contained">
                    Guardar
                  </Button>
                  <Button startIcon={<CancelIcon />} onClick={handleCancel}>
                    Cancelar
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  value={isEditing ? editForm.name : profileData?.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  value={isEditing ? editForm.email : profileData?.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={isEditing ? editForm.phone : profileData?.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  value={isEditing ? editForm.location : profileData?.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Biografía"
                  value={isEditing ? editForm.bio : profileData?.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  multiline
                  rows={4}
                  placeholder="Cuéntanos sobre ti..."
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanelComponent>

        {/* Courses Tab */}
        <TabPanelComponent value={activeTab} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Mis Cursos
            </Typography>
            <Grid container spacing={2}>
              {recentCourses.map((course) => (
                <Grid item xs={12} md={6} key={course.id}>
                  <CourseCard>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.thumbnail}
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {course.title}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Chip
                          label={course.status === 'completed' ? 'Completado' : 
                                 course.status === 'in_progress' ? 'En Progreso' : 'No Iniciado'}
                          color={course.status === 'completed' ? 'success' : 
                                 course.status === 'in_progress' ? 'primary' : 'default'}
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {course.progress}% completado
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={course.progress} 
                        sx={{ mb: 2 }}
                      />
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button size="small" variant="outlined">
                          Continuar
                        </Button>
                        <IconButton size="small">
                          <DownloadIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </CourseCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanelComponent>

        {/* Achievements Tab */}
        <TabPanelComponent value={activeTab} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Mis Logros
            </Typography>
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box color="primary.main">
                      {achievement.icon}
                    </Box>
                    <Box flex={1}>
                      <Typography variant="h6" gutterBottom>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {achievement.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Obtenido el {new Date(achievement.date).toLocaleDateString('es-ES')}
                      </Typography>
                    </Box>
                    <CheckIcon color="success" />
                  </Box>
                </CardContent>
              </AchievementCard>
            ))}
          </Box>
        </TabPanelComponent>

        {/* Settings Tab */}
        <TabPanelComponent value={activeTab} index={3}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configuración
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Notificaciones por email"
                  secondary="Recibe notificaciones sobre nuevos cursos y actividades"
                />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Idioma"
                  secondary="Español"
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value="es">
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Tema"
                  secondary="Claro"
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value="light">
                    <MenuItem value="light">Claro</MenuItem>
                    <MenuItem value="dark">Oscuro</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Box>
        </TabPanelComponent>
      </Paper>

      {/* Avatar Dialog */}
      <Dialog open={showAvatarDialog} onClose={() => setShowAvatarDialog(false)}>
        <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={2}>
            <Avatar sx={{ width: 100, height: 100 }}>
              {profileData?.name?.[0] || 'U'}
            </Avatar>
            <Button variant="contained" component="label" startIcon={<CameraIcon />}>
              Seleccionar Imagen
              <input hidden accept="image/*" type="file" />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAvatarDialog(false)}>Cancelar</Button>
          <Button variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onClose={() => setShowSettingsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Configuración Avanzada</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Privacidad del perfil</InputLabel>
              <Select value="public">
                <MenuItem value="public">Público</MenuItem>
                <MenuItem value="friends">Solo amigos</MenuItem>
                <MenuItem value="private">Privado</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Mostrar progreso de cursos"
            />
            <FormControlLabel
              control={<Switch />}
              label="Permitir mensajes directos"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettingsDialog(false)}>Cancelar</Button>
          <Button variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
};

export default ProfilePage;