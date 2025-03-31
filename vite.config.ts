import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  server: {
    host: "::", // Keep this to listen on all available IPs
    port: 5174, // Explicitly set to default Vite port for clarity
    // host: true, // Remove duplicate host property
  },
  envPrefix: 'VITE_',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    // Ensure assets are included properly for ICP
    assetsInlineLimit: 0,
    // Configure chunking strategy
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@/components/ui/button',
            '@/components/ui/dialog',
            '@/components/ui/form',
            '@/components/ui/input',
            '@/components/ui/toast',
          ],
          'wallet-adapter': [
            '@/services/icpService',
            '@/components/wallet/WalletConnect'
          ],
          'pages': [
            '@/pages/Index',
            '@/pages/DigitalID',
            '@/pages/WalletDashboard',
            '@/pages/DAOGovernance'
          ]
        },
      },
    },
    // Increase warning limit since we're manually chunking
    chunkSizeWarningLimit: 1000,
  },
  // Add base path for ICP canister URLs when in production
  base: mode === 'production' ? './' : '/',
  optimizeDeps: {
    include: [
      '@dfinity/auth-client',
      '@dfinity/agent',
      '@dfinity/candid',
      '@dfinity/principal',
      '@dfinity/identity'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  // Add a polyfill for process
  define: {
    'process.env.VITE_DFX_NETWORK': JSON.stringify(env.VITE_DFX_NETWORK),
    'process.env.VITE_CANISTER_ID_FRONTEND': JSON.stringify(env.VITE_CANISTER_ID_FRONTEND),
    'process.env.VITE_CANISTER_ID_BACKEND': JSON.stringify(env.VITE_CANISTER_ID_BACKEND),
  }
  };
});
