// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: 'localhost',
    port: 5173,
    // Force-clear the cache on startup
    clearScreen: false,

    proxy: {
      // Forward any request that starts with /api to http://localhost:5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,    // so the Host header is rewritten to the target
        secure: false,         // if you're using self-signed certs on backend
        ws: false,             // if you don't need WebSocket proxying

        // No path rewrite needed if your backend routes are mounted at /api
        // If you ever mount authRoutes at just '/auth', uncomment:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // Optional: Explicitly silence Vite’s own HTML fallback so you see proxy errors
  logLevel: 'info'
});
