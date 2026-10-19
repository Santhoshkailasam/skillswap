import { Platform, Alert, NativeModules } from 'react-native';
import { Env } from '../config/env';

const { CodePushNative } = NativeModules;

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

// Track alerts that have already been shown on this device so they are never repeated
const shownAlertIds = new Set<string>();

/**
 * Deactivates the broadcast alert on the server so it is never delivered again on app restart
 */
async function dismissAlertOnServer(_alertId?: string): Promise<void> {
  try {
    const rtdbAlertUrl =
      'https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/alerts';
    await Promise.allSettled([
      fetch(`${rtdbAlertUrl}/latest.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: false, dismissedAt: new Date().toISOString() }),
      }),
      fetch(`${rtdbAlertUrl}/global.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: false, dismissedAt: new Date().toISOString() }),
      }),
      fetch(`${rtdbAlertUrl}/${Env.CODEPUSH_APP_ID}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: false, dismissedAt: new Date().toISOString() }),
      }),
      fetch(
        `${Env.CODEPUSH_SERVER_URL}/.netlify/functions/send-alert?projectId=${Env.CODEPUSH_APP_ID}`,
        { method: 'DELETE' }
      ),
    ]);
  } catch {
    // Silent fail in background
  }
}

/**
 * Displays an in-app test broadcast alert exactly ONCE
 */
function displayAlertOnce(alert: {
  id?: string;
  title?: string;
  message?: string;
  active?: boolean;
  createdAt?: string;
}): void {
  if (!alert || !alert.message) return;
  if (alert.active === false) return;

  // If the broadcast was sent more than 5 minutes ago, consider it expired
  if (alert.createdAt) {
    const ageMs = Date.now() - new Date(alert.createdAt).getTime();
    if (ageMs > 5 * 60 * 1000) {
      dismissAlertOnServer(alert.id);
      return;
    }
  }

  const id = alert.id || alert.message;
  if (shownAlertIds.has(id)) {
    return; // Already shown! Do not repeat!
  }

  shownAlertIds.add(id);

  // Show the alert only ONCE
  Alert.alert(
    alert.title || 'CodePush Alert Testing',
    alert.message,
    [{ text: 'OK' }]
  );

  // Immediately deactivate on the server so reopening the app will never re-show it
  dismissAlertOnServer(alert.id);
}

/**
 * Sends a real-time mobile device ping to the CodePush Dashboard telemetry stream
 */
async function sendTelemetryPing(action: string, version?: string): Promise<void> {
  try {
    const platform = Platform.OS;
    const currentVersion = version || Env.CODEPUSH_APP_VERSION;
    const device = platform === 'ios' ? 'iPhone Mobile Phone' : 'Android Mobile Phone';
    const ping = {
      id: `ping_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: new Date().toISOString(),
      platform,
      device,
      version: currentVersion,
      action,
      apiKey: Env.CODEPUSH_API_KEY,
      projectId: Env.CODEPUSH_APP_ID,
    };

    // 1. Send to Netlify report-status endpoint
    fetch(`${Env.CODEPUSH_SERVER_URL}/.netlify/functions/report-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ping),
    }).catch(() => {});

    // 2. Also directly update Firebase RTDB for instantaneous dashboard display
    try {
      const rtdbRes = await fetch(
        'https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/telemetry.json'
      );
      let existingLogs: unknown[] = [];
      if (rtdbRes.ok) {
        const data = await rtdbRes.json();
        existingLogs = Array.isArray(data)
          ? data
          : data && typeof data === 'object'
          ? Object.values(data)
          : [];
      }
      existingLogs.unshift(ping);
      if (existingLogs.length > 30) existingLogs = existingLogs.slice(0, 30);

      await fetch(
        'https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/telemetry.json',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(existingLogs),
        }
      );
    } catch {}
  } catch {}
}

export const CodePushService = {
  /**
   * Connects to CodePush console to check for updates.
   * If an update is available, it silently installs the update without asking for permission!
   */
  async checkForUpdates(): Promise<void> {
    try {
      const platform = Platform.OS; // 'android' | 'ios'
      let currentVersion = Env.CODEPUSH_APP_VERSION;

      if (platform === 'android' && CodePushNative?.getCurrentBundleVersion) {
        try {
          const nativeVer = await CodePushNative.getCurrentBundleVersion();
          if (nativeVer && nativeVer.trim().length > 0) {
            currentVersion = nativeVer.trim();
          }
        } catch {}
      }

      console.log(
        `[CodePush] Checking updates for ${platform} (Active: v${currentVersion}, App: ${Env.CODEPUSH_APP_ID})...`
      );

      // Send live ping to dashboard immediately
      sendTelemetryPing(`Mobile app active · Checking update (Active: v${currentVersion})`);

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

      // 1. In-App Broadcast Alerts: show only ONCE if new
      if (data.alertMessage) {
        displayAlertOnce({
          id: data.alertId,
          title: data.alertTitle,
          message: data.alertMessage,
          active: true,
        });
      }

      // 2. Over-The-Air Update: SILENT INSTALL WITHOUT ASKING PERMISSION
      if (data.updateAvailable && data.downloadUrl) {
        console.log(`⚡ [CodePush] New OTA update available: v${data.latestVersion}. Installing silently...`);

        // Send telemetry ping that update was found and ready to download
        sendTelemetryPing(`Update v${data.latestVersion} found · Downloading & autorefreshing...`, data.latestVersion);

        // Download and apply the bundle silently
        await this.installUpdateSilently(data.downloadUrl, data.latestVersion);
      } else {
        console.log('✅ [CodePush] App is up to date.');
        sendTelemetryPing(`Update check complete · App up to date (Active: v${currentVersion})`);
      }
    } catch (error) {
      console.warn('[CodePush] Update check failed:', error);
    }
  },

  /**
   * Silently downloads, extracts the bundle to device disk, updates manifest, and autorefreshes the app
   */
  async installUpdateSilently(downloadUrl: string, version: string): Promise<void> {
    try {
      console.log(`[CodePush] Background download started for v${version} from ${downloadUrl}`);
      sendTelemetryPing(`Update v${version} downloading OTA bundle package...`, version);

      if (Platform.OS === 'android' && CodePushNative?.downloadAndApplyBundle) {
        // 1. Download zip & extract index.android.bundle to app internal storage
        await CodePushNative.downloadAndApplyBundle(downloadUrl, version);

        // 2. Notify dashboard of successful download & autorefresh
        await sendTelemetryPing(`Update v${version} downloaded & autorefreshed (New changes active)`, version);
        console.log(`✅ [CodePush] Bundle v${version} installed. Autorefreshing app...`);

        // 3. Autorefresh app after 1 second so telemetry finishes sending
        setTimeout(() => {
          CodePushNative.restartApp();
        }, 1200);
      } else {
        // Fallback for development / non-native
        const res = await fetch(downloadUrl);
        if (res.ok) {
          sendTelemetryPing(`Update v${version} downloaded in background`, version);
        }
      }
    } catch (err: any) {
      console.warn('[CodePush] Silent update download failed:', err);
      sendTelemetryPing(`Update v${version} installation failed: ${err?.message || 'error'}`, version);
    }
  },

  /**
   * 📡 REAL-TIME LISTENER:
   * Checks for live broadcast alerts sent from the CodePush Dashboard.
   * When you click "Send" or "Test Live HTTP Request", it displays exactly ONCE on mobile!
   */
  startLiveAlertListener(): () => void {
    const checkLiveAlert = async () => {
      try {
        const appId = Env.CODEPUSH_APP_ID;
        const rtdbBase =
          'https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/alerts';

        // 1. Check for App-Specific broadcast first (scoped exclusively to this app)
        let alert: { id?: string; title?: string; message?: string; active?: boolean; createdAt?: string } | null = null;
        if (appId) {
          const appRes = await fetch(`${rtdbBase}/${appId}.json`);
          if (appRes.ok) {
            const data = await appRes.json();
            if (data && data.active && data.message) {
              alert = data;
            }
          }
        }

        // 2. If no app-specific alert, check global channel
        if (!alert) {
          const globalRes = await fetch(`${rtdbBase}/latest.json`);
          if (globalRes.ok) {
            const data = await globalRes.json();
            if (data && data.active && data.message) {
              alert = data;
            }
          }
        }

        // If an alert is active and has not been shown yet:
        if (alert && alert.active && alert.message) {
          displayAlertOnce(alert);
        }
      } catch {
        // Silent failure in background
      }
    };

    checkLiveAlert();
    const interval = setInterval(checkLiveAlert, 2000); // Polls every 2s for live dashboard alerts
    return () => clearInterval(interval);
  },
};
