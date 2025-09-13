// Servicio mockeado para usuarios
export const userService = {
  // Obtener perfil de usuario
  getUserProfile: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id: userId,
      name: 'Usuario Demo',
      email: 'demo@example.com',
      avatar: null,
      roles: ['student', 'teacher', 'admin'],
      preferences: {
        language: 'es',
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          chat: true
        }
      },
      stats: {
        totalClasses: 45,
        hoursWatched: 120,
        certificates: 3,
        joinDate: '2023-01-15'
      }
    };
  },

  // Actualizar perfil de usuario
  updateUserProfile: async (userId, profileData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Perfil actualizado correctamente',
      user: {
        id: userId,
        ...profileData
      }
    };
  },

  // Obtener lista de usuarios (para admin)
  getUsers: async (page = 1, limit = 20) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockUsers = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      name: `Usuario ${(page - 1) * limit + i + 1}`,
      email: `user${(page - 1) * limit + i + 1}@example.com`,
      roles: ['student'],
      isActive: Math.random() > 0.1,
      lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));
    
    return {
      users: mockUsers,
      total: 1000,
      page,
      limit,
      totalPages: Math.ceil(1000 / limit)
    };
  }
};
