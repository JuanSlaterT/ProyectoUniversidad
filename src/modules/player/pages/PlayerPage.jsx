import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Slider,
  Chip,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Settings as SettingsIcon,
  PlaylistPlay as PlaylistIcon,
  ThumbUp as LikeIcon,
  ThumbDown as DislikeIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  Send as SendIcon,
  MoreVert as MoreIcon,
  Speed as SpeedIcon,
  ClosedCaption as CaptionIcon,
  PictureInPicture as PiPIcon,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { streamingService } from '../../../services/streamingService';

const VideoContainer = styled(Paper)`
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
  margin-bottom: 24px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoControls = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${VideoContainer}:hover & {
    opacity: 1;
  }
`;

const ProgressContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const ControlButtons = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftControls = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightControls = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VideoInfo = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
`;

const VideoTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 8px;
`;

const VideoStats = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const ActionButtons = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const CommentSection = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
`;

const CommentInput = styled(Box)`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const PlaylistSection = styled(Paper)`
  padding: 24px;
`;

const PlaylistItem = styled(Card)`
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &.active {
    border-left: 4px solid #4CAF50;
    background-color: rgba(76, 175, 80, 0.05);
  }
`;

const PlayerPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoData, setVideoData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadVideoData = async () => {
      try {
        setLoading(true);
        const video = await streamingService.getVideoDetails(videoId);
        setVideoData(video);
        setLikes(video.likes || 0);
        setDislikes(video.dislikes || 0);
        setComments(video.comments || []);
        setPlaylist(video.playlist || []);
      } catch (error) {
        console.error('Error loading video data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideoData();
  }, [videoId]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.volume = newValue;
      setVolume(newValue);
      setIsMuted(newValue === 0);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handlePlaybackRateChange = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: 'Usuario Actual',
        avatar: null,
        text: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes(prev => prev - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(prev => prev - 1);
      setIsDisliked(false);
    } else {
      setDislikes(prev => prev + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes(prev => prev - 1);
        setIsLiked(false);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6">Cargando video...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* Video Player */}
        <Grid item xs={12} lg={8}>
          <VideoContainer elevation={3}>
            <VideoPlayer
              ref={videoRef}
              src={videoData?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
              poster={videoData?.thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={handlePlayPause}
            />
            
            <VideoControls>
              <ProgressContainer>
                <Typography variant="caption" color="white">
                  {formatTime(currentTime)}
                </Typography>
                <Slider
                  value={currentTime}
                  min={0}
                  max={duration}
                  onChange={handleSeek}
                  sx={{ color: '#4CAF50' }}
                />
                <Typography variant="caption" color="white">
                  {formatTime(duration)}
                </Typography>
              </ProgressContainer>

              <ControlButtons>
                <LeftControls>
                  <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </IconButton>
                  
                  <IconButton onClick={handleMute} sx={{ color: 'white' }}>
                    {isMuted ? <VolumeOffIcon /> : <VolumeIcon />}
                  </IconButton>
                  
                  <Slider
                    value={volume}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={handleVolumeChange}
                    sx={{ width: 80, color: '#4CAF50' }}
                  />
                  
                  <Typography variant="caption" color="white">
                    {Math.round(volume * 100)}%
                  </Typography>
                </LeftControls>

                <RightControls>
                  <Tooltip title="Velocidad de reproducción">
                    <IconButton 
                      onClick={() => setShowSettings(!showSettings)}
                      sx={{ color: 'white' }}
                    >
                      <SpeedIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Subtítulos">
                    <IconButton sx={{ color: 'white' }}>
                      <CaptionIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Pantalla completa">
                    <IconButton onClick={handleFullscreen} sx={{ color: 'white' }}>
                      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                  </Tooltip>
                </RightControls>
              </ControlButtons>
            </VideoControls>
          </VideoContainer>

          {/* Video Info */}
          <VideoInfo elevation={1}>
            <VideoTitle variant="h4">
              {videoData?.title || 'Título del Video'}
            </VideoTitle>
            
            <VideoStats>
              <Typography variant="body2" color="text.secondary">
                {videoData?.views?.toLocaleString() || '0'} visualizaciones
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {videoData?.uploadDate || 'Hace 2 días'}
              </Typography>
              <Chip label={videoData?.category || 'Educación'} color="primary" size="small" />
            </VideoStats>

            <ActionButtons>
              <Button
                variant={isLiked ? "contained" : "outlined"}
                startIcon={<LikeIcon />}
                onClick={handleLike}
                sx={{ 
                  color: isLiked ? 'white' : '#4CAF50',
                  borderColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: isLiked ? '#45a049' : 'rgba(76, 175, 80, 0.1)',
                  }
                }}
              >
                {likes}
              </Button>
              
              <Button
                variant={isDisliked ? "contained" : "outlined"}
                startIcon={<DislikeIcon />}
                onClick={handleDislike}
                sx={{ 
                  color: isDisliked ? 'white' : '#666',
                  borderColor: '#666',
                  '&:hover': {
                    backgroundColor: isDisliked ? '#555' : 'rgba(102, 102, 102, 0.1)',
                  }
                }}
              >
                {dislikes}
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
              >
                Compartir
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<BookmarkIcon />}
                onClick={() => setIsBookmarked(!isBookmarked)}
                sx={{ 
                  borderColor: isBookmarked ? '#FF9800' : '#4CAF50',
                  color: isBookmarked ? '#FF9800' : '#4CAF50',
                }}
              >
                {isBookmarked ? 'Guardado' : 'Guardar'}
              </Button>
            </ActionButtons>

            <Typography variant="body1" sx={{ mt: 2 }}>
              {videoData?.description || 'Descripción del video no disponible.'}
            </Typography>
          </VideoInfo>

          {/* Comments Section */}
          <CommentSection elevation={1}>
            <Typography variant="h6" gutterBottom>
              Comentarios ({comments.length})
            </Typography>
            
            <CommentInput>
              <Avatar sx={{ bgcolor: '#4CAF50' }}>
                U
              </Avatar>
              <TextField
                fullWidth
                placeholder="Añadir un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                variant="outlined"
                size="small"
              />
              <IconButton 
                color="primary" 
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
              >
                <SendIcon />
              </IconButton>
            </CommentInput>

            <List>
              {comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#4CAF50' }}>
                      {comment.user[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {comment.user}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                    secondary={comment.text}
                  />
                </ListItem>
              ))}
            </List>
          </CommentSection>
        </Grid>

        {/* Playlist Sidebar */}
        <Grid item xs={12} lg={4}>
          <PlaylistSection elevation={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6">
                Lista de Reproducción
              </Typography>
              <IconButton onClick={() => setShowPlaylist(!showPlaylist)}>
                <PlaylistIcon />
              </IconButton>
            </Box>

            <List>
              {playlist.map((item, index) => (
                <PlaylistItem 
                  key={item.id}
                  className={item.id === parseInt(videoId) ? 'active' : ''}
                  onClick={() => navigate(`/player/${item.id}`)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box display="flex" gap={2}>
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 68, borderRadius: 1 }}
                        image={item.thumbnail}
                        alt={item.title}
                      />
                      <Box flex={1}>
                        <Typography variant="subtitle2" noWrap>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.teacher}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {item.duration}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </PlaylistItem>
              ))}
            </List>
          </PlaylistSection>
        </Grid>
      </Grid>

      {/* Settings Menu */}
      <Menu
        anchorEl={showSettings}
        open={Boolean(showSettings)}
        onClose={() => setShowSettings(false)}
      >
        <MenuItem onClick={() => handlePlaybackRateChange(0.5)}>
          0.5x
        </MenuItem>
        <MenuItem onClick={() => handlePlaybackRateChange(0.75)}>
          0.75x
        </MenuItem>
        <MenuItem onClick={() => handlePlaybackRateChange(1)}>
          1x (Normal)
        </MenuItem>
        <MenuItem onClick={() => handlePlaybackRateChange(1.25)}>
          1.25x
        </MenuItem>
        <MenuItem onClick={() => handlePlaybackRateChange(1.5)}>
          1.5x
        </MenuItem>
        <MenuItem onClick={() => handlePlaybackRateChange(2)}>
          2x
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default PlayerPage;