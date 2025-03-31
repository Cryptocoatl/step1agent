import { defineConfig, loadEnv } from "vite";
import type { Plugin } from 'vite';
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 5174,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS"
      }
    },
    envPrefix: 'VITE_',
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
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
      assetsInlineLimit: 0,
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
              '@/pages/Home.tsx',
              '@/pages/DigitalID.tsx',
              '@/pages/WalletDashboard.tsx',
              '@/pages/DAOGovernance.tsx'
            ]
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    // Updated base URL configuration for ICP deployment
    base: mode === 'production' ? `https://${env.VITE_CANISTER_ID_FRONTEND}.ic0.app` : '/',
    optimizeDeps: {
      include: [
        '@dfinity/auth-client',
        '@dfinity/agent',
        '@dfinity/candid',
        '@dfinity/principal',
        '@dfinity/identity'
      ],
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis',
          'process.env': JSON.stringify({})
        }
      }
    },
    define: {
      'process.env.VITE_DFX_NETWORK': JSON.stringify(env.VITE_DFX_NETWORK),
      'process.env.VITE_CANISTER_ID_FRONTEND': JSON.stringify(env.VITE_CANISTER_ID_FRONTEND),
      'process.env.VITE_CANISTER_ID_BACKEND': JSON.stringify(env.VITE_CANISTER_ID_BACKEND),
      'process.env.VITE_CANISTER_ID_DIGITAL_IDENTITY_MANAGER': JSON.stringify(env.VITE_CANISTER_ID_DIGITAL_IDENTITY_MANAGER),
      'process.env.VITE_CANISTER_ID_DAO_ENGINE': JSON.stringify(env.VITE_CANISTER_ID_DAO_ENGINE),
      'process.env.VITE_CANISTER_ID_CROSS_CHAIN_WALLET_ADAPTER': JSON.stringify(env.VITE_CANISTER_ID_CROSS_CHAIN_WALLET_ADAPTER),
      'process.env.VITE_CANISTER_ID_LAUNCHPAD_FACTORY': JSON.stringify(env.VITE_CANISTER_ID_LAUNCHPAD_FACTORY),
      'process.env.VITE_CANISTER_ID_AI_AGENT_ORCHESTRATOR': JSON.stringify(env.VITE_CANISTER_ID_AI_AGENT_ORCHESTRATOR),
    }
  };
});
