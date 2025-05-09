
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
      hmr: {
        // Ensure HMR is properly configured
        protocol: 'ws',
        host: 'localhost',
        clientPort: 8080
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    // Make all env variables available to the app
    define: {
      // Ensure env variables are properly stringified
      '__APP_ENV__': JSON.stringify(env),
      // Add a fallback for the WebSocket token if it's not defined
      '__WS_TOKEN__': JSON.stringify(process.env.WS_TOKEN || 'development')
    }
  };
});
