import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 5173,
      host: '0.0.0.0',
      proxy: {
        '/api/tafseer': {
          target: 'https://api.quran-tafseer.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tafseer/, ''),
        },
        '/api/quranpedia': {
          target: 'https://api.quranpedia.net',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/quranpedia/, ''),
        },
        '/api/quran-search': {
          target: 'https://api-quran.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/quran-search/, ''),
        },
      },
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
