
import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./frontend.did.js";
export { idlFactory } from "./frontend.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
  import.meta.env.VITE_CANISTER_ID_FRONTEND ||
  import.meta.env.FRONTEND_CANISTER_ID ||
  "b77ix-eeaaa-aaaaa-qaada-cai"; // Fallback to local development ID

export const createActor = (canisterId, options = {}) => {
  // Ensure we have a valid canisterId
  if (!canisterId) {
    console.error("Canister ID is undefined for frontend. Using fallback value.");
    canisterId = "b77ix-eeaaa-aaaaa-qaada-cai"; // Fallback local development ID
  }

  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (import.meta.env.VITE_DFX_NETWORK !== "ic") {
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
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const frontend = createActor(canisterId);
