const fs = require("fs");
const path = require("path");

function syncNotFoundManifests() {
  const appDir = path.join(process.cwd(), ".next/server/app");
  if (!fs.existsSync(appDir)) {
    return;
  }

  const prodManifest = path.join(appDir, "_not-found_client-reference-manifest.js");
  const devManifest = path.join(appDir, "not-found_client-reference-manifest.js");

  const sourceManifest = fs.existsSync(prodManifest)
    ? prodManifest
    : fs.existsSync(devManifest)
    ? devManifest
    : null;

  if (sourceManifest) {
    try {
      const content = fs.readFileSync(sourceManifest, "utf8");
      let dualContent = content;
      if (content.includes('["/_not-found"]') && !content.includes('["/not-found"]')) {
        dualContent = content + '\nglobalThis.__RSC_MANIFEST["/not-found"] = globalThis.__RSC_MANIFEST["/_not-found"];';
      } else if (content.includes('["/not-found"]') && !content.includes('["/_not-found"]')) {
        dualContent = content + '\nglobalThis.__RSC_MANIFEST["/_not-found"] = globalThis.__RSC_MANIFEST["/not-found"];';
      }
      fs.writeFileSync(prodManifest, dualContent, "utf8");
      fs.writeFileSync(devManifest, dualContent, "utf8");
      console.log("[sync-manifests] Synchronized dual-key not-found manifests");
    } catch (err) {
      console.error("[sync-manifests] Failed to sync not-found manifests:", err);
    }
  }

  const prodJs = path.join(appDir, "_not-found.js");
  const devJs = path.join(appDir, "not-found.js");

  if (fs.existsSync(prodJs) && !fs.existsSync(devJs)) {
    try {
      fs.copyFileSync(prodJs, devJs);
      console.log("[sync-manifests] Copied _not-found.js to not-found.js");
    } catch (err) {
      console.error("[sync-manifests] Failed to copy not-found.js:", err);
    }
  } else if (fs.existsSync(devJs) && !fs.existsSync(prodJs)) {
    try {
      fs.copyFileSync(devJs, prodJs);
      console.log("[sync-manifests] Copied not-found.js to _not-found.js");
    } catch (err) {
      console.error("[sync-manifests] Failed to copy _not-found.js:", err);
    }
  }
}

syncNotFoundManifests();
