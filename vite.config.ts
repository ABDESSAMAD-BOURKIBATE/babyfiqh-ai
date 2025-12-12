import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isElectron = process.env.NODE_ENV === 'development' && process.env.ELECTRON === 'true';

  return {
    // Base path: '/' for Electron, '/babyfiqh-ai/' for GitHub Pages
    base: isElectron ? '/' : '/babyfiqh-ai/',
    server: {
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.LIVE_PROXY_PORT': JSON.stringify(process.env.LIVE_PROXY_PORT || 3001)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
