import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

import { Header } from './Header.jsx';
import { Sidebar } from './Sidebar.jsx';
import { Footer } from './Footer.jsx';

const LayoutContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const MainContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: transparent;
  margin-left: 280px; /* Compensar el ancho del sidebar */
  min-height: 100vh;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled(Box)`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  min-height: calc(100vh - 64px - 60px); /* Altura total - header - footer */
  background: transparent;
`;

export const Layout = ({ children }) => {
  console.log('Layout renderizando con children:', children);
  
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