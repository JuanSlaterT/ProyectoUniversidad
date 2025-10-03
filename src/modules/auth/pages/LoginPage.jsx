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
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from '@mui/material';
import { Facebook, Instagram, Visibility, VisibilityOff, InfoOutlined } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
  100% { transform: translateY(0px) }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 24px;
  background: linear-gradient(120deg, #0f172a, #0b3b2e, #1f7a4c);
  background-size: 200% 200%;
  animation: ${gradientShift} 16s ease infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -20% -10% auto -10%;
    height: 60%;
    filter: blur(80px);
    pointer-events: none;
    background: radial-gradient(600px 400px at 15% 20%, rgba(76, 175, 80, 0.35), transparent 60%),
                radial-gradient(500px 300px at 85% 10%, rgba(33, 150, 243, 0.25), transparent 60%),
                radial-gradient(600px 400px at 50% 100%, rgba(255, 255, 255, 0.08), transparent 60%);
  }
`;

const LoginSplit = styled(Box)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.35);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    border-radius: 0;
    max-width: 100%;
  }
`;

const Showcase = styled(Box)`
  position: relative;
  padding: 56px 48px;
  color: #e6fff3;
  background: radial-gradient(1200px 600px at -10% -10%, rgba(16,185,129,0.25), transparent 60%),
              radial-gradient(800px 400px at 120% -20%, rgba(59,130,246,0.25), transparent 60%),
              linear-gradient(160deg, rgba(4,69,59,0.9), rgba(3,30,36,0.92));
  backdrop-filter: blur(8px);

  &::after {
    content: '';
    position: absolute;
    right: -80px;
    bottom: -80px;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(76,175,80,0.65), rgba(76,175,80,0) 60%);
    animation: ${float} 6s ease-in-out infinite;
    filter: blur(2px);
  }
`;

const LoginPaper = styled(Paper)`
  padding: 48px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  backdrop-filter: blur(8px);
  border-radius: 0;
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
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

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
      if (remember) {
        // Persistencia mock: ya se guarda token en login(); aquí podríamos extender TTL si hubiera backend
      }
      navigate('/');
    }
  };

  return (
    <LoginContainer maxWidth={false}>
      <LoginSplit>
        <Showcase>
          <Typography variant="overline" sx={{ opacity: 0.85, letterSpacing: 2 }}>Bienvenido a</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 1 }}>
            EduStreaming
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 520, opacity: 0.9 }}>
            Accede a clases en vivo y contenido bajo demanda con una experiencia moderna y fluida.
          </Typography>

          <Box mt={6} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
            {[
              { title: 'En vivo', desc: 'Clases y eventos' },
              { title: 'On-Demand', desc: 'Biblioteca HD' },
              { title: 'Progreso', desc: 'Seguimiento smart' },
            ].map((item) => (
              <Box key={item.title} sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>{item.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Showcase>

        <LoginPaper elevation={0}>
          <LogoSection>
            <Logo variant="h4">Inicia Sesión</Logo>
            <Typography variant="body1" color="textSecondary">
              Ingresa tus credenciales para continuar
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
            placeholder="tu@correo.com"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Usa tu correo institucional si aplica">
                    <InfoOutlined sx={{ color: 'action.active' }} />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="mostrar/ocultar contraseña"
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  color="primary"
                />
              }
              label="Recordarme"
            />
            <Link component={RouterLink} to="/forgot-password" underline="hover" color="primary">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

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
              fullWidth
            >
              Facebook
            </SocialButton>
            <SocialButton
              variant="outlined"
              startIcon={<Instagram />}
              sx={{ borderColor: '#E4405F', color: '#E4405F' }}
              fullWidth
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
      </LoginSplit>
    </LoginContainer>
  );
};

export default LoginPage;