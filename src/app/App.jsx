import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { Layout } from '../shared/components/Layout.jsx';

// Pages
import HomePage from '../modules/catalog/pages/HomePage.jsx';
import LoginPage from '../modules/auth/pages/LoginPage.jsx';
import RegisterPage from '../modules/auth/pages/RegisterPage.jsx';
import DashboardPage from '../modules/admin/pages/DashboardPage.jsx';
import LiveStreamPage from '../modules/live/pages/LiveStreamPage.jsx';
import ClassroomPage from '../modules/classroom/pages/ClassroomPage.jsx';
import PlayerPage from '../modules/player/pages/PlayerPage.jsx';
import ProfilePage from '../modules/auth/pages/ProfilePage.jsx';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/live/:streamId"
          element={
            <ProtectedRoute>
              <Layout>
                <LiveStreamPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/classroom"
          element={
            <ProtectedRoute>
              <Layout>
                <ClassroomPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/player/:videoId"
          element={
            <ProtectedRoute>
              <Layout>
                <PlayerPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppContainer>
  );
}

export default App;