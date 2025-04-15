
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Identity } from "@dfinity/agent";
import { createActor as createBackendActor } from "@/declarations/backend";
import { createActor as createDigitalIdentityManagerActor } from "@/declarations/digital_identity_manager";
import { LOCAL_CANISTERS, HOST } from "@/config/canister.config";

// Initialize a global AuthClient
let authClient: AuthClient | null = null;

// State to cache authentication info
let authState = {
  isAuthenticated: false,
  identity: null as Identity | null,
};

// Initialize the auth client
export const initAuth = async (): Promise<AuthClient> => {
  if (!authClient) {
    authClient = await AuthClient.create();
    
    // Check if user is already authenticated
    if (await authClient.isAuthenticated()) {
      authState.isAuthenticated = true;
      authState.identity = authClient.getIdentity();
      console.log("User already authenticated with identity:", authState.identity);
    }
  }
  return authClient;
};

// Login with Internet Identity
export const login = async (): Promise<boolean> => {
  try {
    const client = await initAuth();

    // Check if already authenticated
    if (await client.isAuthenticated()) {
      console.log("User is already authenticated");
      authState.isAuthenticated = true;
      authState.identity = client.getIdentity();
      return true;
    }

    return new Promise<boolean>((resolve) => {
      client.login({
        identityProvider: process.env.II_URL || 'https://identity.ic0.app',
        onSuccess: () => {
          console.log("Successfully logged in");
          authState.isAuthenticated = true;
          authState.identity = client.getIdentity();
          resolve(true);
        },
        onError: (error) => {
          console.error("Login failed:", error);
          resolve(false);
        },
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

// Logout from Internet Identity
export const logout = async (): Promise<void> => {
  try {
    const client = await initAuth();
    await client.logout();
    authState.isAuthenticated = false;
    authState.identity = null;
    console.log("Successfully logged out");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Get current authentication state
export const getAuthState = async (): Promise<{
  isAuthenticated: boolean;
  identity: Identity | null;
}> => {
  if (!authClient) {
    await initAuth();
  }
  return authState;
};

// Create an authenticated actor for the Backend canister
export const getBackendActor = async () => {
  try {
    const client = await initAuth();
    
    // Create an agent with the user's identity or an anonymous one
    const agent = new HttpAgent({
      host: HOST,
      identity: client.getIdentity(),
    });
    
    // Fetch the root key when in development mode
    if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
      // Set global for CBOR decoder if needed
      if (typeof window !== 'undefined' && !window.global) {
        window.global = window;
      }
      
      await agent.fetchRootKey();
    }
    
    // Create the actor with the agent
    const actor = createBackendActor(LOCAL_CANISTERS.backend, {
      agent,
    });
    
    return actor;
  } catch (error) {
    console.error("Error getting backend actor:", error);
    throw error;
  }
};

// Create an authenticated actor for the Digital Identity Manager canister
export const getDigitalIdentityManagerActor = async () => {
  try {
    const client = await initAuth();
    
    // Create an agent with the user's identity or an anonymous one
    const agent = new HttpAgent({
      host: HOST,
      identity: client.getIdentity(),
    });
    
    // Fetch the root key when in development mode
    if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
      // Set global for CBOR decoder if needed
      if (typeof window !== 'undefined' && !window.global) {
        window.global = window;
      }
      
      await agent.fetchRootKey();
    }
    
    // Create the actor with the agent
    const actor = createDigitalIdentityManagerActor(LOCAL_CANISTERS.digital_identity_manager, {
      agent,
    });
    
    return actor;
  } catch (error) {
    console.error("Error getting digital identity manager actor:", error);
    throw error;
  }
};

// Check if the canister methods are available
export const checkCanisterConnection = async (): Promise<boolean> => {
  try {
    const actor = await getBackendActor();
    const response = await actor.heartbeat();
    console.log("Canister connection check result:", response);
    return true;
  } catch (error) {
    console.error("Canister connection check failed:", error);
    return false;
  }
};
