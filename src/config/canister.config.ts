
// Read canister IDs from environment variables set during build
// Fallback to hardcoded local IDs if environment variables are not set (should not happen with dfx deploy)

const getCanisterId = (envVar: string, localId: string): string => {
  const id = import.meta.env[envVar] || localId;
  if (!id) {
    console.error(`FATAL: Canister ID environment variable ${envVar} is not set and no fallback provided.`);
  }
  console.log(`Using Canister ID for ${envVar.replace('VITE_CANISTER_ID_', '')}: ${id}`);
  return id;
};

export const LOCAL_CANISTERS = {
  backend: getCanisterId('VITE_CANISTER_ID_BACKEND', 'bd3sg-teaaa-aaaaa-qaaba-cai'),
  digital_identity_manager: getCanisterId('VITE_CANISTER_ID_DIGITAL_IDENTITY_MANAGER', 'bw4dl-smaaa-aaaaa-qaacq-cai'),
  dao_engine: getCanisterId('VITE_CANISTER_ID_DAO_ENGINE', 'br5f7-7uaaa-aaaaa-qaaca-cai'),
  frontend: getCanisterId('VITE_CANISTER_ID_FRONTEND', 'b77ix-eeaaa-aaaaa-qaada-cai'),
  cross_chain_wallet_adapter: getCanisterId('VITE_CANISTER_ID_CROSS_CHAIN_WALLET_ADAPTER', 'be2us-64aaa-aaaaa-qaabq-cai'),
  launchpad_factory: getCanisterId('VITE_CANISTER_ID_LAUNCHPAD_FACTORY', 'by6od-j4aaa-aaaaa-qaadq-cai'),
  ai_agent_orchestrator: getCanisterId('VITE_CANISTER_ID_AI_AGENT_ORCHESTRATOR', 'bkyz2-fmaaa-aaaaa-qaaaq-cai')
};

// Network configuration
export const DFX_NETWORK = import.meta.env.VITE_DFX_NETWORK || 'local';
export const HOST = DFX_NETWORK === 'local' ? 'http://127.0.0.1:4943' : 'https://ic0.app';

console.log(`Network: ${DFX_NETWORK}, Host: ${HOST}`);
console.log('Canister configuration loaded:', LOCAL_CANISTERS);
