
import { Actor, ActorSubclass, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { backend } from "@/declarations/backend";
import { _SERVICE } from "@/declarations/backend/backend.did";

// Initialize auth client
let authClient: AuthClient | null = null;

// Get the backend actor
export const getBackendActor = async (): Promise<ActorSubclass<_SERVICE>> => {
  return backend;
};

// Initialize auth client
const initAuthClient = async (): Promise<AuthClient> => {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
  return authClient;
};

// Login with Internet Identity
export const login = async (): Promise<boolean> => {
  const client = await initAuthClient();
  
  return new Promise((resolve) => {
    client.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => resolve(true),
      onError: (error) => {
        console.error("Login error:", error);
        resolve(false);
      },
    });
  });
};

// Logout
export const logout = async (): Promise<void> => {
  const client = await initAuthClient();
  await client.logout();
};

// Get auth state
export const getAuthState = async (): Promise<{
  isAuthenticated: boolean;
  identity: Identity | null;
}> => {
  const client = await initAuthClient();
  const isAuthenticated = await client.isAuthenticated();
  const identity = isAuthenticated ? client.getIdentity() : null;
  
  return {
    isAuthenticated,
    identity,
  };
};

// Get principal ID
export const getPrincipal = async (): Promise<string | null> => {
  const { isAuthenticated, identity } = await getAuthState();
  return isAuthenticated && identity ? identity.getPrincipal().toText() : null;
};
