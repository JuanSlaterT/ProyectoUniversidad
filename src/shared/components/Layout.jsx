import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

import { Header } from './Header.jsx';
import { Sidebar } from './Sidebar.jsx';
import { Footer } from './Footer.jsx';

const LayoutContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
`;

const MainContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  margin-left: 240px; /* Compensar el ancho del sidebar */
  min-height: 100vh;
`;

const ContentArea = styled(Box)`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  min-height: calc(100vh - 64px - 60px); /* Altura total - header - footer */
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