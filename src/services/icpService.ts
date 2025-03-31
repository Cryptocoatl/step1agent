
import { Actor, HttpAgent } from '@dfinity/agent';
// Note: We're using type imports for the declaration files
import type { _SERVICE } from '../declarations/backend/backend.did';
import { idlFactory } from '../declarations/backend/backend';
// Re-export the ICP wallet service from the new location
export * from './icp/icpWalletService';

const DFX_NETWORK = import.meta.env.VITE_DFX_NETWORK || 'local';
const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND;

const createActor = () => {
  const host = DFX_NETWORK === 'local' ? 'http://localhost:4943' : 'https://ic0.app';
  
  const agent = new HttpAgent({ host });
  
  // Fetch the root key for certificate validation during development
  if (DFX_NETWORK === 'local') {
    agent.fetchRootKey().catch(err => {
      console.warn('Unable to fetch root key. Error:', err);
      console.warn('Ensure your local replica is running');
    });
  }

  return Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId,
  });
};

let actor: any;

export const getBackendActor = () => {
  if (!actor) {
    actor = createActor();
  }
  return actor;
};
