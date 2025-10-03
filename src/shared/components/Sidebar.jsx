import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  PlayArrow as PlayIcon,
  School as SchoolIcon,
  Dashboard as DashboardIcon,
  VideoLibrary as VideoLibraryIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  TrendingUp as TrendingIcon,
  Bookmark as BookmarkIcon,
  History as HistoryIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth.js';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;

  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    box-sizing: border-box;
    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
    border-right: 1px solid #e0e0e0;
    position: relative;
    overflow-x: hidden;
  }
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding: 20px 16px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
`;

const Logo = styled(Typography)`
  font-weight: 800;
  font-size: 1.5rem;
  background: linear-gradient(45deg, #ffffff 30%, #f1f8e9 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const UserInfo = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #e0e0e0;
`;

const UserName = styled(Typography)`
  font-weight: 600;
  color: #2c3e50;
  margin-left: 12px;
`;

const UserRole = styled(Chip)`
  margin-left: 12px;
  background: linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%);
  color: white;
  font-weight: 600;
  font-size: 0.7rem;
`;

const SectionTitle = styled(Typography)`
  font-weight: 700;
  color: #6c757d;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 16px 16px 8px;
  margin-top: 8px;
`;

const StyledListItemButton = styled(ListItemButton)`
  margin: 4px 12px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.Mui-selected {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%);
    border-right: 3px solid #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
    
    .MuiListItemIcon-root {
      color: #4CAF50;
    }
    
    .MuiListItemText-primary {
      color: #4CAF50;
      font-weight: 600;
    }
  }
  
  &:hover:not(.Mui-selected) {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%);
    transform: translateX(4px);
  }
`;

const SocialLinks = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-top: 1px solid #e0e0e0;
`;

const SocialIcon = styled(IconButton)`
  color: #6c757d;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4CAF50;
    transform: scale(1.1);
  }
`;

const QuickStats = styled(Box)`
  padding: 16px;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  margin: 8px 12px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
`;

const StatItem = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatLabel = styled(Typography)`
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
`;

const StatValue = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 700;
  color: #4CAF50;
`;

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const mainMenuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/', exact: true },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['teacher', 'admin'] },
    { text: 'En Vivo', icon: <PlayIcon />, path: '/live/1' },
    { text: 'Aula Virtual', icon: <SchoolIcon />, path: '/classroom' },
    { text: 'Biblioteca', icon: <VideoLibraryIcon />, path: '/player/1' },
  ];

  const learningMenuItems = [
    { text: 'Mis Cursos', icon: <BookmarkIcon />, path: '/my-courses' },
    { text: 'Historial', icon: <HistoryIcon />, path: '/history' },
    { text: 'Favoritos', icon: <StarIcon />, path: '/favorites' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
  ];

  const adminMenuItems = [
    { text: 'Configuración', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleNavigation = (path) => {
    // Cerrar sidebar en móvil si es necesario
    if (window.innerWidth < 768) {
      // Aquí podrías agregar lógica para cerrar el sidebar en móvil
    }
    navigate(path);
  };

  // Manejar clic en redes sociales
  const handleSocialClick = (platform) => {
    const socialUrls = {
      facebook: 'https://facebook.com/edustreaming',
      twitter: 'https://twitter.com/edustreaming',
      instagram: 'https://instagram.com/edustreaming',
      youtube: 'https://youtube.com/edustreaming'
    };
    
    if (socialUrls[platform]) {
      window.open(socialUrls[platform], '_blank');
    }
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      // Verificar roles si es necesario
      if (item.roles && !item.roles.some(role => user?.roles?.includes(role))) {
        return null;
      }
      
      return (
        <ListItem key={item.text} disablePadding>
          <Tooltip title={item.text} placement="right">
            <StyledListItemButton
              selected={isActive(item.path, item.exact)}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: isActive(item.path, item.exact) ? 600 : 400
                }}
              />
            </StyledListItemButton>
          </Tooltip>
        </ListItem>
      );
    });
  };

  // Valores por defecto para evitar errores
  const userStats = user?.stats || {
    totalClasses: 0,
    hoursWatched: 0,
    certificates: 0
  };

  const userRoles = user?.roles || ['student'];

  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
    >
      <DrawerHeader>
        <Logo>EduStreaming</Logo>
      </DrawerHeader>
      
      <UserInfo>
        <Avatar 
          src={user?.avatar} 
          alt={user?.name}
          sx={{ width: 40, height: 40, bgcolor: '#4CAF50' }}
        >
          <SchoolIcon />
        </Avatar>
        <Box>
          <UserName variant="body2">{user?.name || 'Usuario'}</UserName>
          <UserRole 
            label={userRoles.includes('teacher') ? 'Profesor' : 'Estudiante'} 
            size="small" 
          />
        </Box>
      </UserInfo>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <SectionTitle>Principal</SectionTitle>
        <List>
          {renderMenuItems(mainMenuItems)}
        </List>

        <SectionTitle>Aprendizaje</SectionTitle>
        <List>
          {renderMenuItems(learningMenuItems)}
        </List>

        {userRoles.includes('admin') && (
          <>
            <SectionTitle>Administración</SectionTitle>
            <List>
              {renderMenuItems(adminMenuItems)}
            </List>
          </>
        )}

        <QuickStats>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4CAF50', mb: 2 }}>
            Tu Progreso
          </Typography>
          <StatItem>
            <StatLabel>Cursos Completados</StatLabel>
            <StatValue>{userStats.totalClasses}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Horas Estudiadas</StatLabel>
            <StatValue>{userStats.hoursWatched}h</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Certificados</StatLabel>
            <StatValue>{userStats.certificates}</StatValue>
          </StatItem>
        </QuickStats>
      </Box>

      <SocialLinks>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Síguenos en redes sociales
        </Typography>
        <Box display="flex" gap={1}>
          <SocialIcon size="small" onClick={() => handleSocialClick('facebook')}>
            <FacebookIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon size="small" onClick={() => handleSocialClick('twitter')}>
            <TwitterIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon size="small" onClick={() => handleSocialClick('instagram')}>
            <InstagramIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon size="small" onClick={() => handleSocialClick('youtube')}>
            <YouTubeIcon fontSize="small" />
          </SocialIcon>
        </Box>
      </SocialLinks>
    </StyledDrawer>
  );
};