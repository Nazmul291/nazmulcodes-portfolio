import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production" || process.env.NODE_ENV === "production";

  // ─── Content Security Policy ──────────────────────────────────────────────
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://*.adtrafficquality.google https://googleads.g.doubleclick.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' ws: wss: https://cloudflareinsights.com https://pagead2.googlesyndication.com https://adservice.google.com https://*.adtrafficquality.google https://googleads.g.doubleclick.net https://*.google.com",
    // Fix: Added *.adtrafficquality.google to frame-src to allow verification frames
    "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://*.adtrafficquality.google",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  const securityHeaders = {
    "Content-Security-Policy": cspHeader,
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-DNS-Prefetch-Control": "on",
    // Fix: Unblock AdSense privacy sandbox features while protecting sensitive hardware
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Cross-Origin-Resource-Policy": "cross-origin",
  };

  return {
    plugins: [
      remix({
        presets: process.env.VERCEL ? [vercelPreset()] : [],
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_singleFetch: true,
          v3_lazyRouteDiscovery: true,
        },
      }),
      tsconfigPaths(),
    ],
    build: {
      sourcemap: !isProd,
      minify: isProd ? "terser" : "esbuild",
      terserOptions: isProd
        ? {
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 2,
          },
          mangle: { safari10: true },
          format: { comments: false },
        }
        : undefined,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("lucide-react")) {
              return "icons";
            }
            if (id.includes("canvas-confetti")) {
              return "confetti";
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ["lucide-react"],
      esbuildOptions: {
        sourcemap: isProd ? false : "inline",
      },
    },
    css: {
      devSourcemap: !isProd,
    },
    server: {
      port: 3000,
      host: true,
      allowedHosts: true,
      headers: securityHeaders,
    },
    preview: {
      port: 3000,
      host: true,
      headers: securityHeaders,
    },
  };
});