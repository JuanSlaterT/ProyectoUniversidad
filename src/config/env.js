export const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    wsUrl: process.env.REACT_APP_WS_URL || 'ws://localhost:8080',
    streamingUrl: process.env.REACT_APP_STREAMING_URL || 'http://localhost:8080/stream',
  },
  webrtc: {
    stunServer: process.env.REACT_APP_STUN_SERVER || 'stun:stun.l.google.com:19302',
    turnServer: process.env.REACT_APP_TURN_SERVER,
    turnUsername: process.env.REACT_APP_TURN_USERNAME,
    turnPassword: process.env.REACT_APP_TURN_PASSWORD,
  },
  social: {
    facebookAppId: process.env.REACT_APP_FACEBOOK_APP_ID,
    instagramToken: process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN,
  },
  features: {
    enableChat: process.env.REACT_APP_ENABLE_CHAT === 'true',
    enableRecording: process.env.REACT_APP_ENABLE_RECORDING === 'true',
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  },
  streaming: {
    maxBitrate: parseInt(process.env.REACT_APP_MAX_BITRATE) || 5000,
    minBitrate: parseInt(process.env.REACT_APP_MIN_BITRATE) || 500,
  },
};