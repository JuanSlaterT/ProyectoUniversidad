// Servicio mockeado para notificaciones
export const notificationService = {
  // Obtener notificaciones del usuario
  getUserNotifications: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: 1,
        type: 'stream_starting',
        title: 'Clase de Matemáticas en 5 minutos',
        message: 'La clase de Cálculo Integral comenzará pronto',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        isRead: false,
        streamId: 1
      },
      {
        id: 2,
        type: 'new_message',
        title: 'Nuevo mensaje en el chat',
        message: 'Ana M. escribió en el chat de Historia',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        isRead: true,
        streamId: 2
      },
      {
        id: 3,
        type: 'certificate_earned',
        title: '¡Certificado obtenido!',
        message: 'Has completado el curso de Programación en Python',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        courseId: 3
      }
    ];
  },

  // Marcar notificación como leída
  markAsRead: async (notificationId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      success: true,
      message: 'Notificación marcada como leída'
    };
  },

  // Enviar notificación
  sendNotification: async (userId, notification) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      notificationId: Date.now(),
      message: 'Notificación enviada correctamente'
    };
  }
}; 