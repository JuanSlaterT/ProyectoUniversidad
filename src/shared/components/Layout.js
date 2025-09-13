import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

const LayoutContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
`;

const MainContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled(Box)`
  flex: 1;
  padding: 24px;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <ContentArea>
          {children}
        </ContentArea>
        <Footer />
      </MainContent>
    </LayoutContainer>
  );
};