import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production" || process.env.NODE_ENV === "production";

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
      // ─── Sourcemaps ──────────────────────────────────────────────────────────
      // Completely disabled in production to eliminate exposed source code
      // and achieve 100/100 Lighthouse Best Practices.
      sourcemap: !isProd,

    // ─── Minification ────────────────────────────────────────────────────────
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

    // ─── Chunk Splitting ──────────────────────────────────────────────────────
    // Split lucide-react into its own cacheable chunk so it doesn't inflate
    // the main route bundle and can be cached independently.
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

  // ─── Dependency Pre-bundling ──────────────────────────────────────────────
  // Force lucide-react through ESM so Vite's tree-shaker eliminates
  // the ~4,000 unused icon modules at build time.
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
      headers: {
        "Content-Security-Policy":
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://*.adtrafficquality.google https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https: http:; connect-src 'self' ws: wss: https://cloudflareinsights.com https://pagead2.googlesyndication.com https://adservice.google.com https://*.adtrafficquality.google https://googleads.g.doubleclick.net https://*.google.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-DNS-Prefetch-Control": "on",
        "Permissions-Policy":
          "camera=(), microphone=(), geolocation=(), browsing-topics=(), run-ad-auction=(), join-ad-interest-group=()",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Resource-Policy": "same-origin",
      },
    },
    preview: {
      port: 3000,
      host: true,
      headers: {
        "Content-Security-Policy":
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://*.adtrafficquality.google https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https: http:; connect-src 'self' ws: wss: https://cloudflareinsights.com https://pagead2.googlesyndication.com https://adservice.google.com https://*.adtrafficquality.google https://googleads.g.doubleclick.net https://*.google.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-DNS-Prefetch-Control": "on",
        "Permissions-Policy":
          "camera=(), microphone=(), geolocation=(), browsing-topics=(), run-ad-auction=(), join-ad-interest-group=()",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Resource-Policy": "same-origin",
      },
    },
  };
});

