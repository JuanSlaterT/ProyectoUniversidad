import React, { useMemo, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
} from '@mui/material';
import { Visibility, VisibilityOff, InfoOutlined, Replay } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(120deg, #0f172a, #0b3b2e, #1f7a4c);
  background-size: 200% 200%;
  animation: ${gradientShift} 16s ease infinite;
`;

const Split = styled(Box)`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.35);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    border-radius: 12px;
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

const Card = styled(Paper)`
  padding: 48px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  backdrop-filter: blur(8px);
  border-radius: 0;
`;

const StepActions = styled(Box)`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const canSubmitStep0 = useMemo(() => /.+@.+\..+/.test(email), [email]);
  const canSubmitStep1 = useMemo(() => code.trim().length === 6, [code]);
  const canSubmitStep2 = useMemo(
    () => password.length >= 8 && password === confirmPassword,
    [password, confirmPassword]
  );

  const simulate = (fn) => {
    setLoading(true);
    setTimeout(() => {
      fn();
      setLoading(false);
    }, 700);
  };

  const handleSendCode = () => {
    setError('');
    if (!canSubmitStep0) return;
    simulate(() => setStep(1));
  };

  const handleVerifyCode = () => {
    setError('');
    if (!canSubmitStep1) return;
    simulate(() => setStep(2));
  };

  const handleResetPassword = () => {
    setError('');
    if (!canSubmitStep2) return;
    simulate(() => navigate('/login'));
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    const timer = setInterval(() => {
      setResendCooldown((v) => {
        if (v <= 1) clearInterval(timer);
        return v - 1;
      });
    }, 1000);
  };

  return (
    <PageContainer maxWidth={false}>
      <Split>
        <Showcase>
          <Typography variant="overline" sx={{ opacity: 0.85, letterSpacing: 2 }}>Recuperar acceso</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 1 }}>
            Olvidaste tu contraseña
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 520, opacity: 0.9 }}>
            Te guiaremos en tres pasos para restablecer tu contraseña de forma segura.
          </Typography>
        </Showcase>

        <Card elevation={0}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {step === 0 && '1. Verifica tu correo'}
              {step === 1 && '2. Ingresa el código'}
              {step === 2 && '3. Crea una nueva contraseña'}
            </Typography>
          </Box>

          <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
            <Step><StepLabel>Correo</StepLabel></Step>
            <Step><StepLabel>Código</StepLabel></Step>
            <Step><StepLabel>Nueva clave</StepLabel></Step>
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}

          {step === 0 && (
            <>
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                variant="outlined"
                placeholder="tu@correo.com"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Usa tu correo registrado">
                        <InfoOutlined sx={{ color: 'action.active' }} />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                helperText="Te enviaremos un código de verificación"
              />
              <StepActions>
                <Button onClick={() => navigate('/login')} color="inherit">Volver</Button>
                <Button onClick={handleSendCode} disabled={!canSubmitStep0 || loading} variant="contained">
                  {loading ? 'Enviando...' : 'Enviar código'}
                </Button>
              </StepActions>
            </>
          )}

          {step === 1 && (
            <>
              <TextField
                fullWidth
                label="Código de verificación"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                margin="normal"
                required
                variant="outlined"
                placeholder="123456"
                helperText="Revisa tu correo. El código tiene 6 dígitos"
              />
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Link component="button" type="button" onClick={handleResend} disabled={resendCooldown > 0} underline="hover">
                  Reenviar código {resendCooldown > 0 ? `(${resendCooldown}s)` : ''}
                </Link>
                <IconButton onClick={() => setCode('')} title="Limpiar">
                  <Replay />
                </IconButton>
              </Box>
              <StepActions>
                <Button onClick={() => setStep(0)} color="inherit">Atrás</Button>
                <Button onClick={handleVerifyCode} disabled={!canSubmitStep1 || loading} variant="contained">
                  {loading ? 'Verificando...' : 'Verificar'}
                </Button>
              </StepActions>
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                fullWidth
                label="Nueva contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                variant="outlined"
                helperText="Mínimo 8 caracteres, incluye mayúsculas y números"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirmar contraseña"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                variant="outlined"
                error={password !== confirmPassword && confirmPassword !== ''}
                helperText={
                  password !== confirmPassword && confirmPassword !== ''
                    ? 'Las contraseñas no coinciden'
                    : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm((v) => !v)} edge="end">
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StepActions>
                <Button onClick={() => setStep(1)} color="inherit">Atrás</Button>
                <Button onClick={handleResetPassword} disabled={!canSubmitStep2 || loading} variant="contained">
                  {loading ? 'Guardando...' : 'Guardar y continuar'}
                </Button>
              </StepActions>
            </>
          )}

          <Box textAlign="center" mt={3}>
            <Typography variant="body2">
              ¿Recordaste tu contraseña?{' '}
              <Link component={RouterLink} to="/login" color="primary">
                Inicia sesión
              </Link>
            </Typography>
          </Box>
        </Card>
      </Split>
    </PageContainer>
  );
};

export default ForgotPasswordPage;


