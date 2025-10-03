// Servicio mockeado para usuarios
export const userService = {
  // Obtener perfil de usuario
  getUserProfile: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const profiles = {
      1: {
        id: 1,
        name: 'María González',
        email: 'maria.gonzalez@demo.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        roles: ['student'],
        phone: '+34 612 345 678',
        location: 'Madrid, España',
        bio: 'Estudiante apasionada por la programación y el desarrollo web. Me encanta aprender nuevas tecnologías y compartir conocimiento.',
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
          totalClasses: 25,
          hoursWatched: 120,
          certificates: 5,
          joinDate: '2023-01-15'
        }
      },
      2: {
        id: 2,
        name: 'Prof. Ana Martínez',
        email: 'ana.martinez@demo.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        roles: ['teacher'],
        phone: '+34 611 234 567',
        location: 'Barcelona, España',
        bio: 'Profesora de programación con más de 10 años de experiencia. Especializada en Python, JavaScript y desarrollo web.',
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
          totalClasses: 150,
          hoursWatched: 0,
          certificates: 0,
          joinDate: '2022-06-10',
          students: 1250,
          coursesCreated: 12
        }
      },
      3: {
        id: 3,
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@demo.com',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
        roles: ['student'],
        phone: '+34 655 987 654',
        location: 'Valencia, España',
        bio: 'Desarrollador frontend con experiencia en React y Vue.js. Siempre buscando aprender nuevas tecnologías.',
        preferences: {
          language: 'es',
          theme: 'dark',
          notifications: {
            email: true,
            push: false,
            chat: true
          }
        },
        stats: {
          totalClasses: 18,
          hoursWatched: 85,
          certificates: 3,
          joinDate: '2023-03-20'
        }
      }
    };
    
    return profiles[userId] || profiles[1];
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
