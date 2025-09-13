import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  Divider,
} from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
`;

const LoginPaper = styled(Paper)`
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const LogoSection = styled(Box)`
  text-align: center;
  margin-bottom: 32px;
`;

const Logo = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const SocialSection = styled(Box)`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 24px 0;
`;

const SocialButton = styled(Button)`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <LoginContainer>
      <LoginPaper elevation={0}>
        <LogoSection>
          <Logo variant="h3">
            EduStreaming
          </Logo>
          <Typography variant="body1" color="textSecondary">
            Inicia sesión para acceder a tus clases
          </Typography>
        </LogoSection>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>o conecta con</Divider>

        <SocialSection>
          <SocialButton
            variant="outlined"
            startIcon={<Facebook />}
            sx={{ borderColor: '#1877F2', color: '#1877F2' }}
          >
            Facebook
          </SocialButton>
          <SocialButton
            variant="outlined"
            startIcon={<Instagram />}
            sx={{ borderColor: '#E4405F', color: '#E4405F' }}
          >
            Instagram
          </SocialButton>
        </SocialSection>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            ¿No tienes cuenta?{' '}
            <Link component={RouterLink} to="/register" color="primary">
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginPage;