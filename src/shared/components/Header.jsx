import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  VideoLibrary as VideoLibraryIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { useNotification } from '../../features/notifications/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
`;

const SearchContainer = styled(Box)`
  position: relative;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.15);
  margin-left: 16px;
  margin-right: 16px;
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
  &:focus-within {
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

const SearchIconWrapper = styled(Box)`
  padding: 8px 12px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1;
`;

const StyledInputBase = styled(InputBase)`
  color: white;
  width: 100%;

  & .MuiInputBase-input {
    padding: 8px 8px 8px 40px;
    transition: width 0.3s ease;
    width: 100%;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const SearchResults = styled(Paper)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const SearchResultItem = styled(ListItem)`
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(76, 175, 80, 0.1);
  }
`;

const NotificationDropdown = styled(Paper)`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const NotificationItem = styled(ListItem)`
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(76, 175, 80, 0.05);
  }
  &.unread {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 3px solid #4CAF50;
  }
`;

const UserMenu = styled(Paper)`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  min-width: 200px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const MenuItemStyled = styled(MenuItem)`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgba(76, 175, 80, 0.1);
  }
`;

const FilterChips = styled(Box)`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const EmptyState = styled(Box)`
  text-align: center;
  padding: 32px 16px;
  color: #666;
`;

const LoadingState = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #ffffff 30%, #f1f8e9 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Header = () => {
  const { user, logout } = useAuth();
  const { notifications, markAsRead } = useNotification();
  const navigate = useNavigate();
  
  // Estados para búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('all');
  
  // Estados para notificaciones
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState('all');
  
  // Estados para menús
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Datos mockeados para búsqueda
  const mockSearchData = {
    courses: [
      { id: 1, title: 'Programación en Python', teacher: 'Prof. Ana Martínez', type: 'course', thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 2, title: 'JavaScript Avanzado', teacher: 'Prof. Luis García', type: 'course', thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 3, title: 'React y Redux', teacher: 'Prof. Elena Rodríguez', type: 'course', thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    teachers: [
      { id: 1, name: 'Prof. Ana Martínez', subject: 'Programación', type: 'teacher', avatar: null },
      { id: 2, name: 'Prof. Luis García', subject: 'Desarrollo Web', type: 'teacher', avatar: null },
      { id: 3, name: 'Prof. Elena Rodríguez', subject: 'Frontend', type: 'teacher', avatar: null },
    ],
    videos: [
      { id: 1, title: 'Estructuras de Datos en Python', teacher: 'Prof. Ana Martínez', type: 'video', duration: '3:15:00', thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 2, title: 'Hooks en React', teacher: 'Prof. Elena Rodríguez', type: 'video', duration: '2:45:00', thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ]
  };

  // Datos mockeados para notificaciones
  const mockNotifications = [
    {
      id: 1,
      title: 'Nueva clase disponible',
      message: 'La clase "Algoritmos de Ordenamiento" ya está disponible',
      type: 'course',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
    },
    {
      id: 2,
      title: 'Recordatorio de clase',
      message: 'Tu clase de "JavaScript Avanzado" comienza en 30 minutos',
      type: 'reminder',
      timestamp: '2024-01-20T09:00:00Z',
      read: false,
    },
    {
      id: 3,
      title: 'Nueva tarea asignada',
      message: 'Se ha asignado una nueva tarea: "Implementar Quick Sort"',
      type: 'assignment',
      timestamp: '2024-01-19T16:45:00Z',
      read: true,
    },
    {
      id: 4,
      title: 'Clase completada',
      message: '¡Felicitaciones! Has completado "React Hooks"',
      type: 'achievement',
      timestamp: '2024-01-19T14:20:00Z',
      read: true,
    }
  ];

  // Función de búsqueda
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    
    // Simular delay de búsqueda
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allResults = [
      ...mockSearchData.courses,
      ...mockSearchData.teachers,
      ...mockSearchData.videos
    ];
    
    const filtered = allResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.name?.toLowerCase().includes(query.toLowerCase()) ||
      item.teacher?.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowSearchResults(true);
    setSearchLoading(false);
  };

  // Manejar cambio en búsqueda
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Manejar selección de resultado
  const handleResultClick = (result) => {
    if (result.type === 'course') {
      navigate(`/player/${result.id}`);
    } else if (result.type === 'teacher') {
      navigate(`/profile/${result.id}`);
    } else if (result.type === 'video') {
      navigate(`/player/${result.id}`);
    }
    setShowSearchResults(false);
    setSearchQuery('');
  };

  // Manejar búsqueda con Enter
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchResults.length > 0) {
        handleResultClick(searchResults[0]);
      } else if (searchQuery.trim()) {
        // Si no hay resultados, navegar a una página de búsqueda general
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setShowSearchResults(false);
        setSearchQuery('');
      }
    }
  };

  // Manejar notificaciones
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    // Navegar según el tipo de notificación
    if (notification.type === 'course') {
      navigate('/player/1');
    } else if (notification.type === 'assignment') {
      navigate('/classroom');
    } else if (notification.type === 'reminder') {
      navigate('/live/1');
    } else if (notification.type === 'achievement') {
      navigate('/profile');
    }
    setShowNotifications(false);
  };

  // Manejar "Ver todas las notificaciones"
  const handleViewAllNotifications = () => {
    navigate('/notifications');
    setShowNotifications(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
      if (!event.target.closest('.notification-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <LogoContainer sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Logo variant="h6">
            EduStreaming
          </Logo>
        </LogoContainer>

        {/* Búsqueda mejorada */}
        <Box className="search-container" sx={{ position: 'relative', flex: 1, maxWidth: 500 }}>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar clases, profesores, videos..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchContainer>

          {/* Resultados de búsqueda */}
          <Fade in={showSearchResults}>
            <SearchResults style={{ display: showSearchResults ? 'block' : 'none' }}>
              {searchLoading ? (
                <LoadingState>
                  <Typography variant="body2">Buscando...</Typography>
                </LoadingState>
              ) : searchResults.length > 0 ? (
                <>
                  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Resultados para "{searchQuery}"
                    </Typography>
                  </Box>
                  <List>
                    {searchResults.map((result) => (
                      <SearchResultItem 
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleResultClick(result)}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            src={result.thumbnail || result.avatar}
                            sx={{ 
                              bgcolor: result.type === 'teacher' ? '#4CAF50' : '#2196F3',
                              width: 40,
                              height: 40
                            }}
                          >
                            {result.type === 'teacher' ? <PersonIcon /> : <VideoLibraryIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={result.title || result.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {result.teacher || result.subject}
                              </Typography>
                              {result.duration && (
                                <Chip 
                                  label={result.duration} 
                                  size="small" 
                                  color="primary"
                                  sx={{ mt: 0.5 }}
                                />
                              )}
                            </Box>
                          }
                        />
                        <Box>
                          <Chip 
                            label={result.type === 'course' ? 'Curso' : 
                                   result.type === 'teacher' ? 'Profesor' : 'Video'}
                            size="small"
                            color={result.type === 'course' ? 'primary' : 
                                   result.type === 'teacher' ? 'success' : 'secondary'}
                          />
                        </Box>
                      </SearchResultItem>
                    ))}
                  </List>
                </>
              ) : searchQuery && (
                <EmptyState>
                  <Typography variant="body2">
                    No se encontraron resultados para "{searchQuery}"
                  </Typography>
                </EmptyState>
              )}
            </SearchResults>
          </Fade>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notificaciones mejoradas */}
          <Box className="notification-container" sx={{ position: 'relative' }}>
            <Tooltip title="Notificaciones">
              <IconButton 
                color="inherit"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Fade in={showNotifications}>
              <NotificationDropdown style={{ display: showNotifications ? 'block' : 'none' }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Notificaciones</Typography>
                    <Chip 
                      label={`${unreadCount} sin leer`} 
                      size="small" 
                      color="primary"
                    />
                  </Box>
                  <FilterChips>
                    <Chip 
                      label="Todas" 
                      size="small" 
                      color={notificationFilter === 'all' ? 'primary' : 'default'}
                      onClick={() => setNotificationFilter('all')}
                    />
                    <Chip 
                      label="Cursos" 
                      size="small" 
                      color={notificationFilter === 'course' ? 'primary' : 'default'}
                      onClick={() => setNotificationFilter('course')}
                    />
                    <Chip 
                      label="Tareas" 
                      size="small" 
                      color={notificationFilter === 'assignment' ? 'primary' : 'default'}
                      onClick={() => setNotificationFilter('assignment')}
                    />
                  </FilterChips>
                </Box>
                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {mockNotifications
                    .filter(n => notificationFilter === 'all' || n.type === notificationFilter)
                    .map((notification) => (
                    <NotificationItem 
                      key={notification.id}
                      className={!notification.read ? 'unread' : ''}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#4CAF50' }}>
                          <NotificationsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={notification.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(notification.timestamp).toLocaleDateString('es-ES')}
                            </Typography>
                          </Box>
                        }
                      />
                      {!notification.read && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#4CAF50',
                            ml: 1
                          }}
                        />
                      )}
                    </NotificationItem>
                  ))}
                </List>
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    size="small"
                    onClick={handleViewAllNotifications}
                  >
                    Ver todas las notificaciones
                  </Button>
                </Box>
              </NotificationDropdown>
            </Fade>
          </Box>

          {/* Menú de usuario mejorado */}
          <Tooltip title="Mi perfil">
            <IconButton
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
                src={user?.avatar} 
                alt={user?.name}
                sx={{ width: 32, height: 32 }}
              >
                <AccountIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Menú de usuario mejorado */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              minWidth: 200,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          <MenuItemStyled onClick={() => { navigate('/profile'); handleMenuClose(); }}>
            <PersonIcon />
            <Box>
              <Typography variant="subtitle2">Mi Perfil</Typography>
              <Typography variant="caption" color="text.secondary">
                Ver y editar perfil
              </Typography>
            </Box>
          </MenuItemStyled>
          <MenuItemStyled onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
            <SchoolIcon />
            <Box>
              <Typography variant="subtitle2">Dashboard</Typography>
              <Typography variant="caption" color="text.secondary">
                Estadísticas y progreso
              </Typography>
            </Box>
          </MenuItemStyled>
          <Divider />
          <MenuItemStyled onClick={() => { setShowSettings(true); handleMenuClose(); }}>
            <SettingsIcon />
            <Typography variant="subtitle2">Configuración</Typography>
          </MenuItemStyled>
          <MenuItemStyled onClick={handleLogout} sx={{ color: 'error.main' }}>
            <LogoutIcon />
            <Typography variant="subtitle2">Cerrar Sesión</Typography>
          </MenuItemStyled>
        </Menu>
      </Toolbar>

      {/* Dialog de configuración */}
      <Dialog open={showSettings} onClose={() => setShowSettings(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Configuración</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Notificaciones por email"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Notificaciones push"
            />
            <FormControlLabel
              control={<Switch />}
              label="Modo oscuro"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)}>Cancelar</Button>
          <Button variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </StyledAppBar>
  );
};