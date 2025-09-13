// Servicio mockeado para analytics
export const analyticsService = {
  // Obtener estadísticas del dashboard
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalStudents: 1247,
      activeStreams: 8,
      recordedClasses: 156,
      engagement: 89,
      weeklyGrowth: {
        students: 12,
        streams: 3,
        classes: 24,
        engagement: 5
      },
      recentActivity: [
        {
          id: 1,
          type: 'new_question',
          message: 'Nueva pregunta en chat',
          timestamp: 'hace 5 min',
          streamId: 1
        },
        {
          id: 2,
          type: 'students_connected',
          message: '156 estudiantes conectados',
          timestamp: 'hace 12 min',
          streamId: 1
        },
        {
          id: 3,
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