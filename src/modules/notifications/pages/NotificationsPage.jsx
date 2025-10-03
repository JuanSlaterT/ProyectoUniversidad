import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Button,
  Tabs,
  Tab,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  MarkEmailRead as MarkReadIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  CheckCircle as AchievementIcon,
  Schedule as ReminderIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNotification } from '../../../features/notifications/contexts/NotificationContext';

const NotificationsContainer = styled(Box)`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  padding: 24px 0;
`;

const Header = styled(Paper)`
  padding: 32px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  border-radius: 16px;
`;

const NotificationItem = styled(ListItem)`
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(76, 175, 80, 0.05);
    transform: translateX(4px);
  }
  
  &.unread {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid #4CAF50;
  }
`;

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`notifications-tabpanel-${index}`}
      aria-labelledby={`notifications-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotification();
  const [activeTab, setActiveTab] = useState(0);
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  useEffect(() => {
    setFilteredNotifications(notifications);
  }, [notifications]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    filterNotifications(newValue);
  };

  const filterNotifications = (tabIndex) => {
    switch (tabIndex) {
      case 0: // Todas
        setFilteredNotifications(notifications);
        break;
      case 1: // No leídas
        setFilteredNotifications(notifications.filter(n => !n.isRead));
        break;
      case 2: // Cursos
        setFilteredNotifications(notifications.filter(n => n.type === 'course'));
        break;
      case 3: // Tareas
        setFilteredNotifications(notifications.filter(n => n.type === 'assignment'));
        break;
      default:
        setFilteredNotifications(notifications);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'course':
        return <SchoolIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      case 'achievement':
        return <AchievementIcon />;
      case 'reminder':
        return <ReminderIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'course':
        return '#2196F3';
      case 'assignment':
        return '#FF9800';
      case 'achievement':
        return '#4CAF50';
      case 'reminder':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'course':
        return 'Curso';
      case 'assignment':
        return 'Tarea';
      case 'achievement':
        return 'Logro';
      case 'reminder':
        return 'Recordatorio';
      default:
        return 'Notificación';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationsContainer>
      <Container maxWidth="lg">
        <Header elevation={0}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Notificaciones
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Mantente al día con tus actividades de aprendizaje
          </Typography>
          
          <Box display="flex" gap={2} alignItems="center">
            <Chip
              label={`${unreadCount} sin leer`}
              color="error"
              sx={{ backgroundColor: 'white', color: '#F44336' }}
            />
            <Button
              variant="contained"
              startIcon={<MarkReadIcon />}
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              sx={{
                backgroundColor: 'white',
                color: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Marcar todas como leídas
            </Button>
          </Box>
        </Header>

        <Paper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab 
                label={`Todas (${notifications.length})`} 
                icon={<NotificationsIcon />}
                iconPosition="start"
              />
              <Tab 
                label={`Sin leer (${unreadCount})`} 
                icon={<MarkReadIcon />}
                iconPosition="start"
              />
              <Tab 
                label={`Cursos (${notifications.filter(n => n.type === 'course').length})`} 
                icon={<SchoolIcon />}
                iconPosition="start"
              />
              <Tab 
                label={`Tareas (${notifications.filter(n => n.type === 'assignment').length})`} 
                icon={<AssignmentIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <List>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  className={!notification.isRead ? 'unread' : ''}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6">
                          {notification.title}
                        </Typography>
                        <Chip
                          label={getTypeLabel(notification.type)}
                          size="small"
                          sx={{ 
                            backgroundColor: getNotificationColor(notification.type),
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.timestamp).toLocaleString('es-ES')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    {!notification.isRead && (
                      <IconButton
                        edge="end"
                        onClick={() => handleMarkAsRead(notification.id)}
                        color="primary"
                      >
                        <MarkReadIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </NotificationItem>
              ))}
            </List>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <List>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  className="unread"
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getNotificationColor(notification.type) }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6">
                          {notification.title}
                        </Typography>
                        <Chip
                          label={getTypeLabel(notification.type)}
                          size="small"
                          sx={{ 
                            backgroundColor: getNotificationColor(notification.type),
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.timestamp).toLocaleString('es-ES')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleMarkAsRead(notification.id)}
                      color="primary"
                    >
                      <MarkReadIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </NotificationItem>
              ))}
            </List>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <List>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  className={!notification.isRead ? 'unread' : ''}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#2196F3' }}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6">
                          {notification.title}
                        </Typography>
                        <Chip
                          label="Curso"
                          size="small"
                          sx={{ 
                            backgroundColor: '#2196F3',
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.timestamp).toLocaleString('es-ES')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    {!notification.isRead && (
                      <IconButton
                        edge="end"
                        onClick={() => handleMarkAsRead(notification.id)}
                        color="primary"
                      >
                        <MarkReadIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </NotificationItem>
              ))}
            </List>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <List>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  className={!notification.isRead ? 'unread' : ''}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#FF9800' }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6">
                          {notification.title}
                        </Typography>
                        <Chip
                          label="Tarea"
                          size="small"
                          sx={{ 
                            backgroundColor: '#FF9800',
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.timestamp).toLocaleString('es-ES')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    {!notification.isRead && (
                      <IconButton
                        edge="end"
                        onClick={() => handleMarkAsRead(notification.id)}
                        color="primary"
                      >
                        <MarkReadIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </NotificationItem>
              ))}
            </List>
          </TabPanel>
        </Paper>
      </Container>
    </NotificationsContainer>
  );
};

export default NotificationsPage;
