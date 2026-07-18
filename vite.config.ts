import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const vbApiKey = env.VITE_VOCAL_BRIDGE_API_KEY;
  const vbAgentId = env.VITE_VOCAL_BRIDGE_AGENT_ID;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        // Proxy Vocal Bridge token requests to avoid CORS in local dev.
        // Browser calls /api/vb-token → Vite forwards to VocalBridge server-side.
        '/api/vb-token': {
          target: 'https://vocalbridgeai.com',
          changeOrigin: true,
          rewrite: () => '/api/v1/token',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              if (vbApiKey) {
                proxyReq.setHeader('X-API-Key', vbApiKey);
              }
              if (vbAgentId) {
                proxyReq.setHeader('X-Agent-Id', vbAgentId);
              }
              // Forward any body sent by the SDK (context metadata)
              proxyReq.setHeader('Content-Type', 'application/json');
            });
          },
        },
      },
    },
  };
});
