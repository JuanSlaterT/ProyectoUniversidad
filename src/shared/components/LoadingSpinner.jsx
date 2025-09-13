import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledProgress = styled(CircularProgress)`
  color: #4CAF50;
  margin-bottom: 16px;
`;

export const LoadingSpinner = ({ text = "Cargando..." }) => {
  return (
    <LoadingContainer>
      <StyledProgress size={60} />
      <Typography variant="h6" color="textSecondary">
        {text}
      </Typography>
    </LoadingContainer>
  );
};