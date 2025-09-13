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
} from '@mui/material';
import styled from 'styled-components';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  padding: 20px 0;
`;

const RegisterPaper = styled(Paper)`
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
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
    <RegisterContainer>
      <RegisterPaper elevation={0}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Crear Cuenta
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Únete a nuestra plataforma educativa
          </Typography>
        </Box>

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
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
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
    </RegisterContainer>
  );
};

export default RegisterPage;