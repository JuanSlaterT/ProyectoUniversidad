// Servicio mockeado para chat
export const chatService = {
  // Conectar al chat de un stream
  connectToChat: async (streamId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      connectionId: `chat-${streamId}-${Date.now()}`,
      message: 'Conectado al chat'
    };
  },

  // Desconectar del chat
  disconnectFromChat: async (connectionId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      message: 'Desconectado del chat'
    };
  },

  // Enviar mensaje
  sendMessage: async (streamId, message, userId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      success: true,
      messageId: Date.now(),
      timestamp: new Date().toISOString(),
      message: 'Mensaje enviado correctamente'
    };
  },

  // Obtener mensajes del chat
  getChatMessages: async (streamId, limit = 50) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const mockMessages = [
      {
        id: 1,
        user: 'Ana M.',
        userId: 'user-1',
        message: '¡Excelente clase!',
        timestamp: '14:25:30',
        isModerator: false
      },
      {
        id: 2,
        user: 'Carlos R.',
        userId: 'user-2',
        message: '¿Podrías repetir la última parte?',
        timestamp: '14:26:15',
        isModerator: false
      },
      {
        id: 3,
        user: 'María G.',
        userId: 'user-3',
        message: 'Muy clara la explicación',
        timestamp: '14:27:45',
        isModerator: true
      },
      {
        id: 4,
        user: 'Prof. María',
        userId: 'teacher-1',
        message: 'Gracias por sus preguntas, continuemos...',
        timestamp: '14:28:20',
        isModerator: true,
        isTeacher: true
      }
    ];
    
    return mockMessages.slice(0, limit);
  },

  // Suscribirse a nuevos mensajes (simulado)
  subscribeToMessages: (streamId, callback) => {
    // Simular mensajes en tiempo real
    const interval = setInterval(() => {
      const randomMessages = [
        '¡Muy interesante!',
        '¿Podrías explicar más sobre esto?',
        'Excelente explicación',
        'Gracias profesor',
        '¿Hay tarea para la próxima clase?',
        'Muy clara la explicación',
        '¿Podrías repetir el último ejemplo?'
      ];
      
      const randomUser = ['Ana', 'Carlos', 'María', 'Luis', 'Sofia', 'Diego', 'Elena'][Math.floor(Math.random() * 7)];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      const newMessage = {
        id: Date.now(),
        user: randomUser,
        userId: `user-${Math.floor(Math.random() * 100)}`,
        message: randomMessage,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        isModerator: Math.random() > 0.9
      };
      
      callback(newMessage);
    }, 5000 + Math.random() * 10000); // Entre 5-15 segundos
    
    return () => clearInterval(interval);
  }
}; 