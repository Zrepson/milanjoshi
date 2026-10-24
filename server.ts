import { createServer } from "http";
import { parse } from "url";
import fs from "fs";
import path from "path";
import next from "next";

function ensureNotFoundManifest() {
  const appDir = path.join(process.cwd(), ".next/server/app");
  if (!fs.existsSync(appDir)) return;

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
    } catch (e) {
      console.warn("[server] Could not sync not-found manifests:", e);
    }
  }

  const prodJs = path.join(appDir, "_not-found.js");
  const devJs = path.join(appDir, "not-found.js");
  if (fs.existsSync(prodJs) && !fs.existsSync(devJs)) {
    try { fs.copyFileSync(prodJs, devJs); } catch (e) {}
  } else if (fs.existsSync(devJs) && !fs.existsSync(prodJs)) {
    try { fs.copyFileSync(devJs, prodJs); } catch (e) {}
  }
}

// Ensure manifest before preparing Next.js
ensureNotFoundManifest();

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling request:", err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  });

  server.listen(port, hostname, () => {
    console.log(`> Server ready on http://${hostname}:${port}`);
  });
});
