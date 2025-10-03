// Servicio mockeado para analytics
export const analyticsService = {
  // Obtener estadísticas del dashboard
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalStudents: 1247,
      totalTeachers: 45,
      totalClasses: 180,
      totalHours: 2400,
      activeStreams: 8,
      recordedClasses: 156,
      engagement: 89,
      averageRating: 4.7,
      revenue: 125000,
      weeklyGrowth: {
        students: 12,
        streams: 3,
        classes: 24,
        engagement: 5,
        revenue: 8.3
      },
      monthlyGrowth: {
        students: 12.5,
        revenue: 8.3,
        classes: 15.2
      },
      topCategories: [
        { name: 'Programación', count: 45, percentage: 25 },
        { name: 'Desarrollo Web', count: 38, percentage: 21 },
        { name: 'Data Science', count: 32, percentage: 18 },
        { name: 'Matemáticas', count: 28, percentage: 16 },
        { name: 'Física', count: 20, percentage: 11 },
        { name: 'Historia', count: 17, percentage: 9 }
      ],
      recentActivity: [
        {
          id: 1,
          type: 'new_student',
          message: 'Nuevo estudiante registrado: María González',
          timestamp: '2024-01-20T10:30:00Z',
          streamId: null
        },
        {
          id: 2,
          type: 'class_completed',
          message: 'Clase completada: Python Avanzado',
          timestamp: '2024-01-20T09:15:00Z',
          streamId: 1
        },
        {
          id: 3,
          type: 'new_teacher',
          message: 'Nuevo profesor: Prof. Carlos Ruiz',
          timestamp: '2024-01-19T16:45:00Z',
          streamId: null
        },
        {
          id: 4,
          type: 'payment_received',
          message: 'Pago recibido: €299.99',
          timestamp: '2024-01-19T14:20:00Z',
          streamId: null
        },
        {
          id: 5,
          type: 'new_question',
          message: 'Nueva pregunta en chat',
          timestamp: 'hace 5 min',
          streamId: 1
        },
        {
          id: 6,
          type: 'students_connected',
          message: '156 estudiantes conectados',
          timestamp: 'hace 12 min',
          streamId: 1
        },
        {
          id: 7,
          type: 'stream_started',
          message: 'Nueva transmisión iniciada',
          timestamp: 'hace 1 hora',
          streamId: 2
        }
      ]
    };
  },

  // Obtener métricas de un stream específico
  getStreamAnalytics: async (streamId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      streamId: parseInt(streamId),
      totalViewers: 245,
      peakViewers: 312,
      averageViewers: 198,
      duration: '2:30:00',
      engagement: {
        likes: 45,
        comments: 23,
        shares: 8
      },
      viewerRetention: [
        { minute: 0, viewers: 245 },
        { minute: 30, viewers: 238 },
        { minute: 60, viewers: 221 },
        { minute: 90, viewers: 198 },
        { minute: 120, viewers: 187 },
        { minute: 150, viewers: 156 }
      ]
    };
  },

  // Registrar evento de analytics
  trackEvent: async (eventType, eventData) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('Analytics Event:', eventType, eventData);
    
    return {
      success: true,
      eventId: Date.now()
    };
  }
}; 