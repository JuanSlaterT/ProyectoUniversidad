import React, { createContext, useContext, useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { notificationService } from '../../../services/notificationService';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);

  // Cargar notificaciones del usuario al inicializar
  useEffect(() => {
    const loadUserNotifications = async () => {
      try {
        const notifications = await notificationService.getUserNotifications('current-user');
        setUserNotifications(notifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
        // En caso de error, usar notificaciones vacías
        setUserNotifications([]);
      }
    };

    loadUserNotifications();
  }, []);

  const showNotification = (message, severity = 'info', duration = 6000) => {
    const id = Date.now();
    const notification = { id, message, severity, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setUserNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = userNotifications.filter(n => !n.isRead);
      await Promise.all(unreadNotifications.map(n => notificationService.markAsRead(n.id)));
      
      setUserNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getUnreadCount = () => {
    return userNotifications.filter(notification => !notification.isRead).length;
  };

  const getNotificationsByType = (type) => {
    return userNotifications.filter(notification => notification.type === type);
  };

  const value = {
    notifications: userNotifications,
    showNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    getNotificationsByType,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration}
          onClose={() => removeNotification(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => removeNotification(notification.id)}
            severity={notification.severity}
            variant="filled"
            sx={{
              '& .MuiAlert-message': {
                fontWeight: 500,
              }
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider');
  }
  return context;
};