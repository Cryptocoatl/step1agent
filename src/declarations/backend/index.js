
import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./backend.did.js";
export { idlFactory } from "./backend.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
  import.meta.env.VITE_CANISTER_ID_BACKEND ||
  import.meta.env.BACKEND_CANISTER_ID;

export const createActor = (canisterId, options = {}) => {
  // Ensure we have a valid canisterId
  if (!canisterId) {
    console.error("Canister ID is undefined. This will cause Actor creation to fail.");
    console.debug("ENV Variables:", {
      VITE_CANISTER_ID_BACKEND: import.meta.env.VITE_CANISTER_ID_BACKEND,
      BACKEND_CANISTER_ID: import.meta.env.BACKEND_CANISTER_ID,
      network: import.meta.env.VITE_DFX_NETWORK
    });
  }

  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
    try {
      // Set global for CBOR decoder
      if (typeof window !== 'undefined' && !window.global) {
        window.global = window;
      }
      
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
        );
        console.error(err);
      });
    } catch (error) {
      console.error("Error during root key fetch:", error);
    }
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const backend = createActor(canisterId);

