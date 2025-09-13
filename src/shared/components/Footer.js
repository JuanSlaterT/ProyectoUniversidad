import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import styled from 'styled-components';

const FooterContainer = styled(Box)`
  background: linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  padding: 16px 0;
  margin-top: auto;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            © 2025 EduStreaming. Todos los derechos reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="inherit" underline="hover">
              Términos
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Privacidad
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Soporte
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};