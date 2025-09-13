// Servicio mockeado para streaming
export const streamingService = {
  // Obtener streams en vivo
  getLiveStreams: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        title: 'Matemáticas Avanzadas - Cálculo Integral',
        teacher: 'Prof. María González',
        viewers: 245,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Matemáticas',
        duration: '2:30:00',
        rating: 4.8,
        startTime: '14:00',
        description: 'En esta clase revisaremos los conceptos fundamentales del cálculo integral.',
        streamUrl: 'mock-stream-url-1',
        quality: ['360p', '720p', '1080p']
      },
      {
        id: 2,
        title: 'Historia Universal - Segunda Guerra Mundial',
        teacher: 'Prof. Carlos Ruiz',
        viewers: 189,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Historia',
        duration: '1:45:00',
        rating: 4.6,
        startTime: '15:30',
        description: 'Análisis detallado de los eventos de la Segunda Guerra Mundial.',
        streamUrl: 'mock-stream-url-2',
        quality: ['360p', '720p', '1080p']
      }
    ];
  },

  // Obtener streams grabados
  getRecordedStreams: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 3,
        title: 'Programación en Python - Estructuras de Datos',
        teacher: 'Prof. Ana Martínez',
        viewers: 342,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Programación',
        duration: '3:15:00',
        rating: 4.9,
        uploadDate: '2024-01-15',
        description: 'Curso completo sobre estructuras de datos en Python.',
        videoUrl: 'mock-video-url-3',
        quality: ['360p', '720p', '1080p']
      },
      {
        id: 4,
        title: 'Física Cuántica - Principios Fundamentales',
        teacher: 'Prof. Roberto Silva',
        viewers: 156,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Física',
        duration: '2:00:00',
        rating: 4.7,
        uploadDate: '2024-01-10',
        description: 'Introducción a los principios de la física cuántica.',
        videoUrl: 'mock-video-url-4',
        quality: ['360p', '720p', '1080p']
      }
    ];
  },

  // Obtener detalles de un stream específico
  getStreamDetails: async (streamId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockStream = {
      id: parseInt(streamId),
      title: 'Matemáticas Avanzadas - Cálculo Integral',
      teacher: 'Prof. María González',
      description: 'En esta clase revisaremos los conceptos fundamentales del cálculo integral, incluyendo técnicas de integración y aplicaciones prácticas.',
      category: 'Matemáticas',
      startTime: '14:00',
      estimatedDuration: '2:30:00',
      viewers: 245,
      isLive: true,
      streamUrl: 'mock-stream-url-' + streamId,
      quality: ['360p', '720p', '1080p'],
      chatEnabled: true,
      recordingEnabled: true
    };
    
    return mockStream;
  },

  // Iniciar stream
  startStream: async (streamData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      streamId: Math.floor(Math.random() * 1000) + 1,
      streamUrl: `mock-stream-url-${Date.now()}`,
      message: 'Stream iniciado correctamente'
    };
  },

  // Detener stream
  stopStream: async (streamId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Stream detenido correctamente'
    };
  }
}; 