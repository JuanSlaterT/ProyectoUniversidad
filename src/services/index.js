// Servicios principales mockeados
export { authService } from './authService';
export { streamingService } from './streamingService';
export { chatService } from './chatService';
export { analyticsService } from './analyticsService';
export { userService } from './userService';
export { notificationService } from './notificationService';

// Configuración mockeada
export const mockConfig = {
  api: {
    baseUrl: 'mock://api.localhost',
    wsUrl: 'mock://ws.localhost',
    streamingUrl: 'mock://stream.localhost'
  },
  features: {
    enableChat: true,
    enableRecording: true,
    enableAnalytics: true,
    enableNotifications: true
  }
}; 