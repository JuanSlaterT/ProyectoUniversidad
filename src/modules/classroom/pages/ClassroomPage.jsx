import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
  Chip,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Badge,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  VideoCall as VideoIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as CameraIcon,
  VideocamOff as CameraOffIcon,
  ScreenShare as ShareIcon,
  StopScreenShare as StopShareIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  MoreVert as MoreIcon,
  Send as SendIcon,
  AttachFile as AttachIcon,
  EmojiEmotions as EmojiIcon,
  Poll as PollIcon,
  Quiz as QuizIcon,
  Assignment as AssignmentIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useAuth } from '../../auth/hooks/useAuth';

const ClassroomContainer = styled(Container)`
  padding: 0;
  max-width: 100vw;
`;

const MainContent = styled(Grid)`
  height: calc(100vh - 64px);
`;

const VideoSection = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000;
  position: relative;
`;

const VideoGrid = styled(Box)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
  overflow-y: auto;
`;

const VideoBox = styled(Box)`
  position: relative;
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16/9;
  min-height: 200px;
`;

const VideoControls = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserName = styled(Typography)`
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ControlButtons = styled(Box)`
  display: flex;
  gap: 8px;
`;

const Sidebar = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0;
`;

const TabPanel = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatMessages = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const ChatInput = styled(Box)`
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 8px;
`;

const ParticipantsList = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const ParticipantItem = styled(ListItem)`
  border-radius: 8px;
  margin-bottom: 8px;
  background: ${props => props.isActive ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};
  border: ${props => props.isActive ? '1px solid #4CAF50' : '1px solid transparent'};
`;

const ActivityCard = styled(Card)`
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ClassroomPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [participants, setParticipants] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showPollDialog, setShowPollDialog] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);

  useEffect(() => {
    // Cargar datos mockeados
    const loadClassroomData = async () => {
      // Simular carga de participantes
      const mockParticipants = [
        { id: 1, name: 'Prof. María González', role: 'teacher', isActive: true, avatar: null },
        { id: 2, name: 'Ana Martínez', role: 'student', isActive: true, avatar: null },
        { id: 3, name: 'Carlos Ruiz', role: 'student', isActive: true, avatar: null },
        { id: 4, name: 'Elena Silva', role: 'student', isActive: false, avatar: null },
        { id: 5, name: 'Luis García', role: 'student', isActive: true, avatar: null },
        { id: 6, name: 'Sofia Torres', role: 'student', isActive: false, avatar: null },
      ];
      setParticipants(mockParticipants);

      // Simular mensajes de chat
      const mockMessages = [
        { id: 1, user: 'Prof. María González', message: '¡Bienvenidos a la clase!', timestamp: '14:00', isTeacher: true },
        { id: 2, user: 'Ana Martínez', message: '¡Hola profesora!', timestamp: '14:01', isTeacher: false },
        { id: 3, user: 'Carlos Ruiz', message: '¿Podemos empezar con el tema de hoy?', timestamp: '14:02', isTeacher: false },
        { id: 4, user: 'Prof. María González', message: 'Por supuesto, hoy veremos algoritmos de ordenamiento', timestamp: '14:03', isTeacher: true },
      ];
      setChatMessages(mockMessages);

      // Simular actividades
      const mockActivities = [
        { id: 1, type: 'quiz', title: 'Quiz: Algoritmos de Ordenamiento', dueDate: '2024-01-20', status: 'pending' },
        { id: 2, type: 'assignment', title: 'Implementar Quick Sort', dueDate: '2024-01-25', status: 'in_progress' },
        { id: 3, type: 'poll', title: '¿Qué tema te gustaría revisar?', status: 'active' },
      ];
      setActivities(mockActivities);
    };

    loadClassroomData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleVideoToggle = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: user?.name || 'Usuario',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        isTeacher: user?.roles?.includes('teacher') || false,
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  const handleCreatePoll = () => {
    setShowPollDialog(true);
  };

  const handleCreateQuiz = () => {
    setShowQuizDialog(true);
  };

  const handleCreateAssignment = () => {
    setShowAssignmentDialog(true);
  };

  const TabPanelComponent = ({ children, value, index, ...other }) => (
    <TabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`classroom-tabpanel-${index}`}
      aria-labelledby={`classroom-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </TabPanel>
  );

  return (
    <ClassroomContainer maxWidth={false}>
      <MainContent container spacing={0}>
        {/* Video Section */}
        <Grid item xs={12} md={8}>
          <VideoSection elevation={0}>
            <VideoGrid>
              {/* Teacher Video */}
              <VideoBox>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                  }}
                >
                  {isVideoOn ? '📹' : '📷'}
                </Box>
                <VideoControls>
                  <Box>
                    <UserName variant="subtitle1">
                      Prof. María González
                    </UserName>
                    <Chip 
                      label="Profesora" 
                      size="small" 
                      sx={{ backgroundColor: '#4CAF50', color: 'white' }}
                    />
                  </Box>
                  <ControlButtons>
                    <Tooltip title={isVideoOn ? "Apagar cámara" : "Encender cámara"}>
                      <IconButton 
                        onClick={handleVideoToggle}
                        sx={{ color: 'white' }}
                      >
                        {isVideoOn ? <CameraIcon /> : <CameraOffIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}>
                      <IconButton 
                        onClick={handleMicToggle}
                        sx={{ color: 'white' }}
                      >
                        {isMicOn ? <MicIcon /> : <MicOffIcon />}
                      </IconButton>
                    </Tooltip>
                  </ControlButtons>
                </VideoControls>
              </VideoBox>

              {/* Student Videos */}
              {participants.filter(p => p.role === 'student' && p.isActive).map((participant) => (
                <VideoBox key={participant.id}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, #2196F3 30%, #64B5F6 90%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                    }}
                  >
                    {participant.name[0]}
                  </Box>
                  <VideoControls>
                    <Box>
                      <UserName variant="body2">
                        {participant.name}
                      </UserName>
                    </Box>
                    <ControlButtons>
                      <IconButton sx={{ color: 'white' }}>
                        <MicIcon />
                      </IconButton>
                    </ControlButtons>
                  </VideoControls>
                </VideoBox>
              ))}
            </VideoGrid>

            {/* Bottom Controls */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" gap={1}>
                  <Tooltip title={isVideoOn ? "Apagar cámara" : "Encender cámara"}>
                    <IconButton 
                      onClick={handleVideoToggle}
                      color={isVideoOn ? "primary" : "default"}
                    >
                      {isVideoOn ? <CameraIcon /> : <CameraOffIcon />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}>
                    <IconButton 
                      onClick={handleMicToggle}
                      color={isMicOn ? "primary" : "default"}
                    >
                      {isMicOn ? <MicIcon /> : <MicOffIcon />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title={isScreenSharing ? "Dejar de compartir" : "Compartir pantalla"}>
                    <IconButton 
                      onClick={handleScreenShare}
                      color={isScreenSharing ? "primary" : "default"}
                    >
                      {isScreenSharing ? <StopShareIcon /> : <ShareIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box display="flex" gap={1}>
                  <Tooltip title="Configuración">
                    <IconButton onClick={() => setShowSettings(true)}>
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Button variant="contained" color="error" size="small">
                    Abandonar clase
                  </Button>
                </Box>
              </Box>
            </Box>
          </VideoSection>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Sidebar elevation={0}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Chat" icon={<ChatIcon />} />
                <Tab label="Participantes" icon={<PeopleIcon />} />
                <Tab label="Actividades" icon={<AssignmentIcon />} />
              </Tabs>
            </Box>

            {/* Chat Tab */}
            <TabPanelComponent value={activeTab} index={0}>
              <ChatContainer>
                <ChatMessages>
                  <List dense>
                    {chatMessages.map((message) => (
                      <ListItem key={message.id} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: message.isTeacher ? '#4CAF50' : '#2196F3',
                            width: 32,
                            height: 32,
                            fontSize: '0.875rem'
                          }}>
                            {message.user[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {message.user}
                              </Typography>
                              {message.isTeacher && (
                                <Chip label="Prof" size="small" color="primary" />
                              )}
                              <Typography variant="caption" color="text.secondary">
                                {message.timestamp}
                              </Typography>
                            </Box>
                          }
                          secondary={message.message}
                        />
                      </ListItem>
                    ))}
                  </List>
                </ChatMessages>
                
                <ChatInput>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Escribe un mensaje..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <IconButton color="primary" onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </ChatInput>
              </ChatContainer>
            </TabPanelComponent>

            {/* Participants Tab */}
            <TabPanelComponent value={activeTab} index={1}>
              <ParticipantsList>
                <Typography variant="h6" gutterBottom>
                  Participantes ({participants.length})
                </Typography>
                <List>
                  {participants.map((participant) => (
                    <ParticipantItem 
                      key={participant.id}
                      isActive={participant.isActive}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: participant.isActive ? '#4CAF50' : '#f44336',
                                border: '2px solid white',
                              }}
                            />
                          }
                        >
                          <Avatar sx={{ 
                            bgcolor: participant.role === 'teacher' ? '#4CAF50' : '#2196F3'
                          }}>
                            {participant.name[0]}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={participant.name}
                        secondary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Chip 
                              label={participant.role === 'teacher' ? 'Profesor' : 'Estudiante'} 
                              size="small" 
                              color={participant.role === 'teacher' ? 'primary' : 'default'}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {participant.isActive ? 'En línea' : 'Desconectado'}
                            </Typography>
                          </Box>
                        }
                      />
                    </ParticipantItem>
                  ))}
                </List>
              </ParticipantsList>
            </TabPanelComponent>

            {/* Activities Tab */}
            <TabPanelComponent value={activeTab} index={2}>
              <Box sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">
                    Actividades
                  </Typography>
                  {user?.roles?.includes('teacher') && (
                    <Box display="flex" gap={1}>
                      <Tooltip title="Crear encuesta">
                        <IconButton onClick={handleCreatePoll} size="small">
                          <PollIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Crear quiz">
                        <IconButton onClick={handleCreateQuiz} size="small">
                          <QuizIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Crear tarea">
                        <IconButton onClick={handleCreateAssignment} size="small">
                          <AssignmentIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>

                {activities.map((activity) => (
                  <ActivityCard key={activity.id}>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box>
                          {activity.type === 'quiz' && <QuizIcon color="primary" />}
                          {activity.type === 'assignment' && <AssignmentIcon color="secondary" />}
                          {activity.type === 'poll' && <PollIcon color="success" />}
                        </Box>
                        <Box flex={1}>
                          <Typography variant="subtitle1" gutterBottom>
                            {activity.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {activity.dueDate ? `Vence: ${activity.dueDate}` : 'Activo'}
                          </Typography>
                          <Chip 
                            label={activity.status} 
                            size="small" 
                            color={
                              activity.status === 'completed' ? 'success' :
                              activity.status === 'in_progress' ? 'warning' : 'default'
                            }
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </ActivityCard>
                ))}
              </Box>
            </TabPanelComponent>
          </Sidebar>
        </Grid>
      </MainContent>

      {/* Poll Dialog */}
      <Dialog open={showPollDialog} onClose={() => setShowPollDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Crear Encuesta</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Pregunta de la encuesta"
            margin="normal"
            placeholder="¿Qué tema te gustaría revisar en la próxima clase?"
          />
          <TextField
            fullWidth
            label="Opción 1"
            margin="normal"
            placeholder="Algoritmos de búsqueda"
          />
          <TextField
            fullWidth
            label="Opción 2"
            margin="normal"
            placeholder="Estructuras de datos avanzadas"
          />
          <TextField
            fullWidth
            label="Opción 3"
            margin="normal"
            placeholder="Optimización de código"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPollDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setShowPollDialog(false)}>
            Crear Encuesta
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Crear Quiz</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Título del Quiz"
            margin="normal"
            placeholder="Quiz: Algoritmos de Ordenamiento"
          />
          <TextField
            fullWidth
            label="Pregunta 1"
            margin="normal"
            placeholder="¿Cuál es la complejidad temporal del Quick Sort en el peor caso?"
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Respuesta correcta"
            margin="normal"
            placeholder="O(n²)"
          />
          <TextField
            fullWidth
            label="Tiempo límite (minutos)"
            margin="normal"
            type="number"
            defaultValue={10}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQuizDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setShowQuizDialog(false)}>
            Crear Quiz
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assignment Dialog */}
      <Dialog open={showAssignmentDialog} onClose={() => setShowAssignmentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Crear Tarea</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Título de la tarea"
            margin="normal"
            placeholder="Implementar algoritmo de ordenamiento"
          />
          <TextField
            fullWidth
            label="Descripción"
            margin="normal"
            placeholder="Implementa el algoritmo Quick Sort en el lenguaje de tu preferencia..."
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Fecha de entrega"
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Puntos"
            margin="normal"
            type="number"
            defaultValue={100}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAssignmentDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setShowAssignmentDialog(false)}>
            Crear Tarea
          </Button>
        </DialogActions>
      </Dialog>
    </ClassroomContainer>
  );
};

export default ClassroomPage;