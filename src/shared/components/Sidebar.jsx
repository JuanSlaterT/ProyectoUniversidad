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
import { useAuth } from '../../modules/auth/hooks/useAuth.js';

const drawerWidth = 240;

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
  }
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  min-height: 64px;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
`;

const Logo = styled(Typography)`
  font-weight: 700;
  font-size: 1.25rem;
`;

const NavigationSection = styled(Box)`
  padding: 16px 0;
`;

const SectionTitle = styled(Typography)`
  padding: 0 16px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledListItemButton = styled(ListItemButton)`
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(76, 175, 80, 0.08);
  }

  &.active {
    background-color: #4CAF50;
    color: white;

    .MuiListItemIcon-root {
      color: white;
    }

    .MuiListItemText-primary {
      color: white;
      font-weight: 600;
    }
  }
`;

const SocialSection = styled(Box)`
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  margin-top: auto;
`;

const SocialButton = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 8px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SocialIcon = styled(Box)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
`;

const FacebookIconStyled = styled(SocialIcon)`
  background-color: #1877F2;
`;

const InstagramIconStyled = styled(SocialIcon)`
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
`;

const SidebarContent = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasRole } = useAuth();

  const navigationItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/', roles: [] },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['teacher', 'admin'] },
    { text: 'Clases en Vivo', icon: <PlayIcon />, path: '/live/1', roles: [] },
    { text: 'Aula Virtual', icon: <SchoolIcon />, path: '/classroom', roles: [] },
    { text: 'Biblioteca', icon: <VideoLibraryIcon />, path: '/player/1', roles: [] },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat', roles: [] },
    { text: 'Configuración', icon: <SettingsIcon />, path: '/settings', roles: [] },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const filteredItems = navigationItems.filter(item => 
    item.roles.length === 0 || item.roles.some(role => hasRole(role))
  );

  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
    >
      <SidebarContent>
        <DrawerHeader>
          <Logo>EduStreaming</Logo>
        </DrawerHeader>

        <NavigationSection>
          <SectionTitle>Navegación</SectionTitle>
          <List>
            {filteredItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <StyledListItemButton
                  onClick={() => handleNavigation(item.path)}
                  className={isActive(item.path) ? 'active' : ''}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </StyledListItemButton>
              </ListItem>
            ))}
          </List>
        </NavigationSection>

        <Box sx={{ flexGrow: 1 }} />

        <SocialSection>
          <SectionTitle>Conectar</SectionTitle>
          <SocialButton
            onClick={() => window.open('https://facebook.com', '_blank')}
          >
            <FacebookIconStyled>
              <FacebookIcon fontSize="small" />
            </FacebookIconStyled>
            <Typography variant="body2">Facebook</Typography>
          </SocialButton>
          <SocialButton
            onClick={() => window.open('https://instagram.com', '_blank')}
          >
            <InstagramIconStyled>
              <InstagramIcon fontSize="small" />
            </InstagramIconStyled>
            <Typography variant="body2">Instagram</Typography>
          </SocialButton>
        </SocialSection>
      </SidebarContent>
    </StyledDrawer>
  );
};