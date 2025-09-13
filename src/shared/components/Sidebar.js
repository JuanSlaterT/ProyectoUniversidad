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
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 240px;
    background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
    border-right: 1px solid #dee2e6;
  }
`;

const SidebarHeader = styled(Box)`
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
`;

const LogoText = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SocialSection = styled(Box)`
  padding: 16px;
  border-top: 1px solid #dee2e6;
  margin-top: auto;
`;

const SocialButtons = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasRole } = useAuth();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/', roles: [] },
    { text: 'En Vivo', icon: <PlayIcon />, path: '/live', roles: [] },
    { text: 'Clases', icon: <SchoolIcon />, path: '/classroom', roles: [] },
    { text: 'Biblioteca', icon: <VideoLibraryIcon />, path: '/library', roles: [] },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat', roles: [] },
  ];

  const teacherItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['teacher', 'admin'] },
    { text: 'Configuración', icon: <SettingsIcon />, path: '/settings', roles: ['teacher', 'admin'] },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <StyledDrawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      <SidebarHeader>
        <LogoText variant="h6">
          EduStreaming
        </LogoText>
        <Typography variant="body2" color="textSecondary">
          Aprende en vivo
        </Typography>
      </SidebarHeader>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#388E3C',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {(hasRole('teacher') || hasRole('admin')) && (
        <>
          <Divider sx={{ margin: '8px 0' }} />
          <List>
            {teacherItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={isActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#F44336',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#C62828',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      <SocialSection>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1, textAlign: 'center' }}>
          Síguenos
        </Typography>
        <SocialButtons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon sx={{ color: '#1877F2', fontSize: 28 }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon sx={{ color: '#E4405F', fontSize: 28 }} />
          </a>
        </SocialButtons>
      </SocialSection>
    </StyledDrawer>
  );
};