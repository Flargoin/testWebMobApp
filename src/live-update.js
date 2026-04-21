import { LiveUpdate } from "@capawesome/capacitor-live-update";
import { Capacitor } from "@capacitor/core";

const GITHUB_API_URL = "https://api.github.com/repos/Flargoin/testWebMobApp/releases/latest";

async function fetchLatestRelease() {
  const response = await fetch(GITHUB_API_URL);
  if (!response.ok) return null;
  return response.json();
}

function getBundleAssetUrl(release) {
  if (!release || !release.assets) return null;
  const asset = release.assets.find((a) => a.name === "dist.zip");
  return asset ? asset.browser_download_url : null;
}

export async function checkForUpdate() {
  if (!Capacitor.isNativePlatform()) {
    console.log("[LiveUpdate] Not a native platform, skipping.");
    return null;
  }

  try {
    const currentResult = await LiveUpdate.getCurrentBundle();
    const currentBundleId = currentResult.bundleId || "default";

    const release = await fetchLatestRelease();
    if (!release) {
      console.log("[LiveUpdate] No releases found.");
      return null;
    }

    const latestTag = release.tag_name;

    if (currentBundleId === latestTag) {
      console.log("[LiveUpdate] Already on latest version:", latestTag);
      return null;
    }

    const downloadUrl = getBundleAssetUrl(release);
    if (!downloadUrl) {
      console.log("[LiveUpdate] No dist.zip asset found in release.");
      return null;
    }

    console.log("[LiveUpdate] New version available:", latestTag);
    return { tag: latestTag, downloadUrl };
  } catch (error) {
    console.error("[LiveUpdate] Check failed:", error);
    return null;
  }
}

export async function downloadAndApply(tag, downloadUrl) {
  if (!Capacitor.isNativePlatform()) return;

  try {
    console.log("[LiveUpdate] Downloading bundle:", tag);
    await LiveUpdate.downloadBundle({ url: downloadUrl, bundleId: tag });

    console.log("[LiveUpdate] Setting next bundle:", tag);
    await LiveUpdate.setNextBundle({ bundleId: tag });

    console.log("[LiveUpdate] Reloading app...");
    await LiveUpdate.reload();
  } catch (error) {
    console.error("[LiveUpdate] Download/apply failed:", error);
    throw error;
  }
}

export async function notifyAppReady() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const result = await LiveUpdate.ready();
    if (result.rollback) {
      console.log("[LiveUpdate] App was rolled back to default bundle.");
    } else if (result.currentBundleId) {
      console.log("[LiveUpdate] App ready, current bundle:", result.currentBundleId);
    }
  } catch (error) {
    console.error("[LiveUpdate] Ready check failed:", error);
  }
}
