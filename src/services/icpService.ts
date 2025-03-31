import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import type { _SERVICE } from '../declarations/backend/backend.did';
import { createActor as backendCreateActor } from '../declarations/backend';
import { LOCAL_CANISTERS, HOST } from '../config/canister.config';

// Debug logging
const debug = (...args: any[]) => {
  console.log('[ICP Service]', ...args);
};

// Authentication configuration
const AUTH_CONFIG = {
  identityProvider: import.meta.env.VITE_DFX_NETWORK === 'local' 
    ? `http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai` 
    : 'https://identity.ic0.app',
  maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days in nanoseconds
};

debug('Environment:', {
  network: import.meta.env.VITE_DFX_NETWORK,
  backendCanister: import.meta.env.VITE_CANISTER_ID_BACKEND,
  frontendCanister: import.meta.env.VITE_CANISTER_ID_FRONTEND,
  identityProvider: AUTH_CONFIG.identityProvider
});

interface AuthState {
  isAuthenticated: boolean;
  identity: Identity | null;
  principal: string | null;
}

let authClient: AuthClient | null = null;
let authState: AuthState = {
  isAuthenticated: false,
  identity: null,
  principal: null,
};

const setupIcpActorConfig = (identity?: Identity) => {
  const agent = new HttpAgent({ 
    host: HOST,
    identity 
  });

  // Only fetch root key when in local development
  if (HOST.includes('127.0.0.1')) {
    try {
      // We need to provide the global object for the CBOR decoder
      (window as any).global = window;
      agent.fetchRootKey().catch(err => {
        console.warn('Unable to fetch root key. Error:', err);
        console.warn('Ensure your local replica is running');
      });
    } catch (error) {
      console.error('Error setting up agent:', error);
    }
  }
  
  return { agent };
};

export const createActor = async (identity?: Identity): Promise<_SERVICE> => {
  const { agent } = setupIcpActorConfig(identity);
  
  // Create actor using the generated createActor function
  const actor = backendCreateActor(LOCAL_CANISTERS.backend, {
    agent,
  });
  
  // Verify the actor works by calling a simple query method
  try {
    const heartbeat = await actor.heartbeat();
    debug('Actor initialized successfully:', heartbeat);
  } catch (error) {
    console.error('Failed to initialize actor:', error);
    throw error;
  }
  
  return actor;
};

let actor: _SERVICE | null = null;

export const getBackendActor = async (): Promise<_SERVICE> => {
  if (!actor || authState.identity) {
    actor = await createActor(authState.identity ?? undefined);
  }
  return actor;
};

// Authentication Methods
export const initAuth = async (): Promise<void> => {
  debug('Initializing auth client');
  if (!authClient) {
    authClient = await AuthClient.create();
    debug('Auth client created');
    const isAuthenticated = await authClient.isAuthenticated();
    
    if (isAuthenticated) {
      const identity = authClient.getIdentity();
      authState = {
        isAuthenticated: true,
        identity,
        principal: identity.getPrincipal().toString(),
      };
      // Recreate actor with authenticated identity
      actor = null;
      await getBackendActor();
    }
  }
};

export const login = async (): Promise<boolean> => {
  debug('Starting login process');
  if (!authClient) await initAuth();
  
  try {
    debug('Attempting login with identity provider:', AUTH_CONFIG.identityProvider);
    const success = await authClient!.login({
      identityProvider: AUTH_CONFIG.identityProvider,
      maxTimeToLive: AUTH_CONFIG.maxTimeToLive,
      onSuccess: async () => {
        const identity = authClient!.getIdentity();
        authState = {
          isAuthenticated: true,
          identity,
          principal: identity.getPrincipal().toString(),
        };
        // Recreate actor with authenticated identity
        actor = null;
        await getBackendActor();
      },
    });
    
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  debug('Starting logout process');
  if (!authClient) await initAuth();
  
  await authClient!.logout();
  debug('Successfully logged out');
  authState = {
    isAuthenticated: false,
    identity: null,
    principal: null,
  };
  // Recreate actor with anonymous identity
  actor = null;
  await getBackendActor();
};

export const getAuthState = (): AuthState => {
  return { ...authState };
};

// Admin verification methods
export const verifyAdmin = (): boolean => {
  if (!authState.principal) return false;
  const adminId = import.meta.env.VITE_ADMIN_ICP_ID;
  return authState.principal === adminId;
};

export const getAdminId = (): string | null => {
  return import.meta.env.VITE_ADMIN_ICP_ID || null;
};

// Re-export the ICP wallet service from the new location
export * from './icp/icpWalletService';
