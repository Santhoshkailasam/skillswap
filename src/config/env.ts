import {
  CODEPUSH_SERVER_URL,
  CODEPUSH_API_KEY,
  CODEPUSH_APP_ID,
  CODEPUSH_APP_VERSION,
} from '@env';

export const Env = {
  CODEPUSH_SERVER_URL: CODEPUSH_SERVER_URL || 'https://codepushs.netlify.app',
  CODEPUSH_API_KEY: CODEPUSH_API_KEY || 'cp_live_rCYp1a_mvdfs5j4_live_key',
  CODEPUSH_APP_ID: CODEPUSH_APP_ID || 'app_rCYp1a_mvdfs5j4_w9dyc',
  CODEPUSH_APP_VERSION: CODEPUSH_APP_VERSION || '1.0.0',
};
