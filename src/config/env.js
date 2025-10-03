export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8080',
    streamingUrl: import.meta.env.VITE_STREAMING_URL || 'http://localhost:8080/stream',
  },
  webrtc: {
    stunServer: import.meta.env.VITE_STUN_SERVER || 'stun:stun.l.google.com:19302',
    turnServer: import.meta.env.VITE_TURN_SERVER,
    turnUsername: import.meta.env.VITE_TURN_USERNAME,
    turnPassword: import.meta.env.VITE_TURN_PASSWORD,
  },
  social: {
    facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID,
    instagramToken: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN,
  },
  features: {
    enableChat: import.meta.env.VITE_ENABLE_CHAT === 'true',
    enableRecording: import.meta.env.VITE_ENABLE_RECORDING === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  streaming: {
    maxBitrate: parseInt(import.meta.env.VITE_MAX_BITRATE) || 5000,
    minBitrate: parseInt(import.meta.env.VITE_MIN_BITRATE) || 500,
  },
};