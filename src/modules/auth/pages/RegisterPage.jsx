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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const RegisterContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(120deg, #0f172a, #0b3b2e, #1f7a4c);
  background-size: 200% 200%;
  animation: ${gradientShift} 16s ease infinite;
  position: relative;
  overflow: hidden;
`;

const Split = styled(Box)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
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
`;

const RegisterPaper = styled(Paper)`
  padding: 48px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  backdrop-filter: blur(8px);
  border-radius: 0;
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    if (result.success) {
      navigate('/');
    }
  };

  return (
    <RegisterContainer maxWidth={false}>
      <Split>
        <Showcase>
          <Typography variant="overline" sx={{ opacity: 0.85, letterSpacing: 2 }}>Nuevo usuario</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 1 }}>
            Crea tu cuenta
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 520, opacity: 0.9 }}>
            Únete y comienza a aprender con clases en vivo y contenido bajo demanda.
          </Typography>
        </Showcase>

        <RegisterPaper elevation={0}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Crear Cuenta
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Únete a nuestra plataforma educativa
          </Typography>
        </Box>

        <Stepper alternativeLabel activeStep={2} sx={{ mb: 3 }}>
          <Step><StepLabel>Datos</StepLabel></Step>
          <Step><StepLabel>Seguridad</StepLabel></Step>
          <Step><StepLabel>Confirmación</StepLabel></Step>
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
          />

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

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Tipo de usuario</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Tipo de usuario"
            >
              <MenuItem value="student">Estudiante</MenuItem>
              <MenuItem value="teacher">Profesor</MenuItem>
            </Select>
          </FormControl>

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
            helperText="Mínimo 8 caracteres, incluye mayúsculas y números"
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

          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
            helperText={
              formData.password !== formData.confirmPassword && formData.confirmPassword !== ''
                ? 'Las contraseñas no coinciden'
                : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="mostrar/ocultar confirmación"
                    onClick={() => setShowConfirm((v) => !v)}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || formData.password !== formData.confirmPassword}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            ¿Ya tienes cuenta?{' '}
            <Link component={RouterLink} to="/login" color="primary">
              Inicia sesión aquí
            </Link>
          </Typography>
        </Box>
        </RegisterPaper>
      </Split>
    </RegisterContainer>
  );
};

export default RegisterPage;