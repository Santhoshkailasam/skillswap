import { Platform, Alert } from 'react-native';
import { Env } from '../config/env';

export interface UpdateResponse {
  updateAvailable: boolean;
  downloadUrl: string | null;
  latestVersion: string;
  mandatory: boolean;
  hash: string;
  releaseNotes?: string;
  alertMessage?: string;
  alertTitle?: string;
  alertId?: string;
  alertType?: string;
}

export const CodePushService = {
  /**
   * Connects to CodePush console to check for updates and live in-app broadcast alerts.
   */
  async checkForUpdates(): Promise<void> {
    try {
      const platform = Platform.OS; // 'android' | 'ios'
      const currentVersion = Env.CODEPUSH_APP_VERSION;

      console.log(
        `[CodePush] Checking updates for ${platform} (Active: v${currentVersion}, App: ${Env.CODEPUSH_APP_ID})...`
      );

      const queryParams = new URLSearchParams({
        platform,
        currentVersion,
        apiKey: Env.CODEPUSH_API_KEY,
        projectId: Env.CODEPUSH_APP_ID,
      });

      const response = await fetch(
        `${Env.CODEPUSH_SERVER_URL}/.netlify/functions/check-update?${queryParams.toString()}`,
        {
          headers: {
            'x-codepush-api-key': Env.CODEPUSH_API_KEY,
          },
        }
      );

      if (!response.ok) {
        console.warn(`[CodePush] Server responded with status: ${response.status}`);
        return;
      }

      const data: UpdateResponse = await response.json();
      console.log('[CodePush] Handshake successful. Server response:', data);

      // 1. In-App Broadcast Alerts sent from CodePush Console
      if (data.alertMessage) {
        Alert.alert(
          data.alertTitle || 'CodePush Alert Testing',
          data.alertMessage,
          [{ text: 'OK' }]
        );
      }

      // 2. Over-The-Air Update Available
      if (data.updateAvailable && data.downloadUrl) {
        console.log(`⚡ [CodePush] New OTA update available: v${data.latestVersion}`);
        Alert.alert(
          'OTA Update Available',
          `Version ${data.latestVersion} is ready to download.\nNotes: ${data.releaseNotes || 'Bug fixes and performance improvements.'}`,
          [{ text: 'Later', style: 'cancel' }, { text: 'Install', onPress: () => console.log('Downloading bundle...') }]
        );
      } else {
        console.log('✅ [CodePush] App is up to date.');
      }
    } catch (error) {
      console.warn('[CodePush] Update check failed:', error);
    }
  },

  /**
   * 📡 REAL-TIME LISTENER:
   * Checks for alerts live in the background every 2 seconds.
   * When you click "Send" on the dashboard, it pops up on the phone immediately!
   */
  startLiveAlertListener(): () => void {
    let lastSeenAlertId: string | null = null;
    const checkLiveAlert = async () => {
      try {
        const res = await fetch(
          'https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/alerts/latest.json'
        );
        if (!res.ok) return;
        const alert = await res.json();
        // If an alert was sent and hasn't popped up yet:
        if (alert && alert.active && alert.id && alert.id !== lastSeenAlertId) {
          lastSeenAlertId = alert.id;
          Alert.alert(
            alert.title || 'CodePush Alert Testing',
            alert.message,
            [{ text: 'OK' }]
          );
        }
      } catch (err) {
        // Silent failure in background
      }
    };
    checkLiveAlert();
    const interval = setInterval(checkLiveAlert, 2000); // Checks every 2 seconds
    return () => clearInterval(interval);
  },
};
