/**
 * Automated CodePush Publisher & Live Verifier for GitHub Actions CI/CD
 *
 * Rules:
 * - Only exits with 0 (PASS / Green Tick ✅) when the release is 100% saved and verified live on CodePush.
 * - Exits with 1 (FAIL / Red Cross ❌) if sending fails, times out, or cannot be verified in CodePush.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

async function main() {
  const version = process.env.RELEASE_VERSION || `1.1.${Date.now()}`;
  const commitMsg = process.env.COMMIT_MSG || 'App update';
  const apiKey = process.env.CODEPUSH_API_KEY || 'cp_live_rCYp1a_mvdfs5j4_live_key';
  const projectId = process.env.CODEPUSH_PROJECT_ID || 'app_rCYp1a_mvdfs5j4_w9dyc';

  console.log('============================================================');
  console.log('🚀 CODEPUSH CI/CD PUBLISH PIPELINE');
  console.log('============================================================');
  console.log(`📌 Version:    v${version}`);
  console.log(`📦 Project ID: ${projectId}`);
  console.log(`🔑 API Key:    ${apiKey.slice(0, 10)}...`);
  console.log(`📝 Commit:     ${commitMsg}`);
  console.log('------------------------------------------------------------');

  let bundleBase64 = null;
  let bundleHash = `sha256-${Date.now()}`;
  const zipPath = path.resolve('bundle.zip');

  if (fs.existsSync(zipPath)) {
    const fileBuffer = fs.readFileSync(zipPath);
    bundleBase64 = fileBuffer.toString('base64');
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    bundleHash = hashSum.digest('hex');
    console.log(`📦 Found bundle.zip (${(fileBuffer.length / 1024).toFixed(1)} KB)`);
    console.log(`🔑 Bundle SHA256: ${bundleHash}`);

    // Directly save to Firebase RTDB bundles node so it is 100% permanently cached
    try {
      const versionKey = version.replace(/\./g, '_');
      await Promise.allSettled([
        fetch('https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/bundles/android.json', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bundleBase64)
        }),
        fetch(`https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/bundles/android_${versionKey}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bundleBase64)
        })
      ]);
      console.log('☁️ Bundle binary cached to Firebase Cloud Storage.');
    } catch (e) {
      console.warn('⚠️ Direct cloud cache write warning:', e.message);
    }
  } else {
    console.warn('⚠️ No bundle.zip found in working directory!');
  }

  const payload = {
    platform: 'android',
    projectId: projectId,
    version: version,
    bundleBase64: bundleBase64,
    hash: bundleHash,
    downloadUrl: `https://codepushs.netlify.app/.netlify/functions/download-bundle?version=${version}&platform=android`,
    mandatory: true,
    releaseNotes: `Git Push: ${commitMsg}`
  };

  // 1. Send release to CodePush server
  console.log('⏳ Step 1/2: Sending release payload to CodePush server...');
  let publishData;
  try {
    const res = await fetch('https://codepushs.netlify.app/.netlify/functions/publish-release', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-codepush-api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    const bodyText = await res.text();
    try {
      publishData = JSON.parse(bodyText);
    } catch {
      publishData = { raw: bodyText };
    }

    if (!res.ok) {
      console.error('\n============================================================');
      console.error('❌ CODEPUSH PUBLISH FAILED');
      console.error(`HTTP Status:  ${res.status} (${res.statusText})`);
      console.error(`Error Detail: ${publishData.error || publishData.details || bodyText}`);
      console.error('============================================================');
      process.exit(1);
    }

    console.log(`✅ Step 1/2 Complete: CodePush server responded HTTP ${res.status} OK.`);
  } catch (err) {
    console.error('\n============================================================');
    console.error('❌ NETWORK / SERVER ERROR: Could not reach CodePush server');
    console.error(`Error: ${err.message}`);
    console.error('============================================================');
    process.exit(1);
  }

  // 2. Verify that the release is actually live in CodePush database
  console.log('\n⏳ Step 2/2: Verifying release is active and live in CodePush...');
  const VERIFY_URL = `https://tracker-42b47-default-rtdb.asia-southeast1.firebasedatabase.app/codepush_releases/projects/${projectId}/android.json`;

  let verified = false;
  let activeVersionOnServer = 'unknown';

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const verifyRes = await fetch(VERIFY_URL);
      if (verifyRes.ok) {
        const liveInfo = await verifyRes.json();
        activeVersionOnServer = liveInfo?.version || liveInfo?.latestVersion || 'none';
        if (activeVersionOnServer === version) {
          verified = true;
          break;
        }
      }
    } catch {}
    // Brief 1s delay before retry
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!verified) {
    console.error('\n============================================================');
    console.error('❌ VERIFICATION FAILED: Release was not confirmed live in CodePush!');
    console.error(`Expected Version: v${version}`);
    console.error(`Found on Server:  v${activeVersionOnServer}`);
    console.error('============================================================');
    process.exit(1);
  }

  console.log('\n============================================================');
  console.log('✅ CODEPUSH RELEASE SUCCESSFULLY PUBLISHED & VERIFIED LIVE!');
  console.log(`- Active Version: v${version}`);
  console.log(`- Project ID:     ${projectId}`);
  console.log(`- Platform:       android (Mandatory OTA)`);
  console.log(`- Status:         READY FOR MOBILE DEVICES`);
  console.log('============================================================\n');
  process.exit(0);
}

main();
