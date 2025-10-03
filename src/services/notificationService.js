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
        streamId: 1,
        icon: 'school',
        priority: 'high'
      },
      {
        id: 2,
        type: 'new_message',
        title: 'Nuevo mensaje en el chat',
        message: 'María González escribió en el chat de Historia',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        isRead: true,
        streamId: 2,
        icon: 'message',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'certificate_earned',
        title: '¡Certificado obtenido!',
        message: 'Has completado el curso de Programación en Python con 95% de aprovechamiento',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        courseId: 3,
        icon: 'certificate',
        priority: 'high'
      },
      {
        id: 4,
        type: 'assignment_due',
        title: 'Tarea próxima a vencer',
        message: 'La tarea "Implementar algoritmo de ordenamiento" vence en 2 días',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: false,
        assignmentId: 1,
        icon: 'assignment',
        priority: 'high'
      },
      {
        id: 5,
        type: 'new_material',
        title: 'Nuevo material disponible',
        message: 'Se ha añadido material adicional para "Machine Learning con Python"',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        courseId: 4,
        icon: 'book',
        priority: 'low'
      },
      {
        id: 6,
        type: 'teacher_message',
        title: 'Mensaje del profesor',
        message: 'Prof. Ana Martínez te ha enviado un mensaje sobre tu proyecto final',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        teacherId: 2,
        icon: 'person',
        priority: 'medium'
      },
      {
        id: 7,
        type: 'survey_request',
        title: 'Encuesta de satisfacción',
        message: 'Ayúdanos a mejorar calificando la clase "Node.js y Express"',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        courseId: 5,
        icon: 'poll',
        priority: 'low'
      },
      {
        id: 8,
        type: 'payment_success',
        title: 'Pago procesado',
        message: 'Tu pago de €49.99 por "Docker y Kubernetes" ha sido procesado correctamente',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        courseId: 6,
        icon: 'payment',
        priority: 'medium'
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