
import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./cross_chain_wallet_adapter.did.js";
export { idlFactory } from "./cross_chain_wallet_adapter.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
  import.meta.env.VITE_CANISTER_ID_CROSS_CHAIN_WALLET_ADAPTER ||
  import.meta.env.CROSS_CHAIN_WALLET_ADAPTER_CANISTER_ID ||
  "be2us-64aaa-aaaaa-qaabq-cai"; // Fallback to local development ID

export const createActor = (canisterId, options = {}) => {
  // Ensure we have a valid canisterId
  if (!canisterId) {
    console.error("Canister ID is undefined for cross_chain_wallet_adapter. Using fallback value.");
    canisterId = "be2us-64aaa-aaaaa-qaabq-cai"; // Fallback local development ID
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

export const cross_chain_wallet_adapter = createActor(canisterId);
