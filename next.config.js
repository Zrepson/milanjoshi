/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
];

const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      // Disable Webpack filesystem pack cache in development to prevent PackFileCacheStrategy ENOENT rename errors in virtualized environments
      config.cache = false;
    }

    if (isServer) {

      // Plugin to ensure both _not-found and not-found client reference manifests exist
      config.plugins.push({
        apply(compiler) {
          compiler.hooks.emit.tap("SyncNotFoundManifestPlugin", (compilation) => {
            const prodKey = "server/app/_not-found_client-reference-manifest.js";
            const devKey = "server/app/not-found_client-reference-manifest.js";
            const { RawSource } = compiler.webpack.sources;

            if (compilation.assets[prodKey] && !compilation.assets[devKey]) {
              const src = compilation.assets[prodKey].source();
              const content = typeof src === "string" ? src : src.toString();
              const devContent = content.replace(/"\/_not-found"/g, '"/not-found"');
              compilation.assets[devKey] = new RawSource(devContent);
            } else if (compilation.assets[devKey] && !compilation.assets[prodKey]) {
              const src = compilation.assets[devKey].source();
              const content = typeof src === "string" ? src : src.toString();
              const prodContent = content.replace(/"\/not-found"/g, '"/_not-found"');
              compilation.assets[prodKey] = new RawSource(prodContent);
            }

            const prodJsKey = "server/app/_not-found.js";
            const devJsKey = "server/app/not-found.js";
            if (compilation.assets[prodJsKey] && !compilation.assets[devJsKey]) {
              compilation.assets[devJsKey] = compilation.assets[prodJsKey];
            } else if (compilation.assets[devJsKey] && !compilation.assets[prodJsKey]) {
              compilation.assets[prodJsKey] = compilation.assets[devJsKey];
            }
          });
        },
      });
    }
    return config;
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
