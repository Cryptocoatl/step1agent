
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backendIDL } from "../declarations/backend/backend.did.js";
import { _SERVICE as BackendService } from "../declarations/backend/backend.did.d.ts";

// Local canister IDs from .env
const backendCanisterId = import.meta.env.VITE_CANISTER_ID_BACKEND;
const isProduction = import.meta.env.MODE === "production";

// Create agent with correct host based on production status
const createAgent = () => {
  const host = isProduction 
    ? "https://ic0.app" 
    : "http://localhost:8000";
  
  const agent = new HttpAgent({ host });
  
  // When in development, we need to fetch the root key
  if (!isProduction) {
    // Fetch the root key for the local replica
    return agent.fetchRootKey().then(() => agent);
  }
  
  return Promise.resolve(agent);
};

// Create backend actor
export const getBackendActor = async (): Promise<BackendService> => {
  const agent = await createAgent();
  
  // Create an actor to interact with the backend canister
  return Actor.createActor<BackendService>(backendIDL, {
    agent,
    canisterId: backendCanisterId,
  });
};

// Digital ID functions
export const registerDigitalID = async (displayName: string): Promise<boolean> => {
  const backend = await getBackendActor();
  return backend.registerDigitalID(displayName);
};

export const getDigitalID = async () => {
  const backend = await getBackendActor();
  return backend.getDigitalID();
};

export const linkWallet = async (walletAddress: string, chainType: string): Promise<boolean> => {
  const backend = await getBackendActor();
  return backend.linkWallet(walletAddress, chainType);
};
