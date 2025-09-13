import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useAuth } from '../../modules/auth/hooks/useAuth';

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
`;

const SearchContainer = styled(Box)`
  position: relative;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  margin-left: 16px;
  margin-right: 16px;
  width: 100%;
  max-width: 400px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const SearchIconWrapper = styled(Box)`
  padding: 8px 16px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledInputBase = styled(InputBase)`
  color: white;
  width: 100%;

  & .MuiInputBase-input {
    padding: 8px 8px 8px 48px;
    transition: width 0.3s ease;
    width: 100%;
  }
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

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

        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar clases, profesores..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchContainer>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

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
        </Box>

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
        >
          <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
          <MenuItem onClick={handleMenuClose}>Configuración</MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};