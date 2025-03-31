import { Actor, HttpAgent, AnonymousIdentity } from '@dfinity/agent';
import type { _SERVICE as CrossChainService, ChainType, Wallet } from '../declarations/cross_chain_wallet_adapter/cross_chain_wallet_adapter.did.d';
import { createActor as crossChainCreateActor } from '../declarations/cross_chain_wallet_adapter';
import { LOCAL_CANISTERS, HOST } from '../config/canister.config';

// Debug logging
const debug = (...args: any[]) => {
  console.log('[CrossChain Service]', ...args);
};

// Define the specific type for cross-chain wallets handled here
type HandledCrossChainType = 'Solana' | 'Ethereum' | 'Bitcoin';

let crossChainActor: CrossChainService | null = null;

const setupCrossChainActorConfig = () => {
  // Use an anonymous identity for interacting with the cross-chain adapter
  const identity = new AnonymousIdentity();
  const agent = new HttpAgent({
    host: HOST,
    identity
  });

  // Fetch root key for local development
  if (HOST.includes('127.0.0.1')) {
    agent.fetchRootKey().catch(err => {
      console.warn('Unable to fetch root key for cross-chain service. Error:', err);
    });
  }

  return { agent };
};

export const getCrossChainActor = async (): Promise<CrossChainService> => {
  if (!crossChainActor) {
    const { agent } = setupCrossChainActorConfig();
    crossChainActor = crossChainCreateActor(LOCAL_CANISTERS.cross_chain_wallet_adapter, {
      agent,
    });
    debug('Cross-chain actor created');
  }
  return crossChainActor;
};

// --- Placeholder functions for Browser Wallet Interactions ---
const getSolanaAuthBlob = async (): Promise<Uint8Array> => {
  debug('Placeholder: Connecting to Solana wallet...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return new TextEncoder().encode("solana-placeholder-pubkey");
};

const getEthereumAuthBlob = async (): Promise<Uint8Array> => {
  debug('Placeholder: Connecting to Ethereum wallet...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return new TextEncoder().encode("ethereum-placeholder-address");
};

const getBitcoinAuthBlob = async (): Promise<Uint8Array> => {
  debug('Placeholder: Connecting to Bitcoin wallet...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return new TextEncoder().encode("bitcoin-placeholder-data");
};

const getHolochainAuthBlob = async (): Promise<Uint8Array> => {
    debug('Placeholder: Connecting to Holochain...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return new TextEncoder().encode("holochain-placeholder-agent-pubkey");
};
// --- End Placeholder Functions ---


/**
 * Connects a non-ICP wallet using the cross_chain_wallet_adapter canister.
 * Note: This function currently uses placeholder logic to simulate obtaining
 * authentication data (blob) from browser wallet extensions.
 *
 * @param chain - The type of blockchain wallet to connect (Solana, Ethereum, Bitcoin).
 * @returns The connected wallet information or null if connection failed.
 */
export const connectCrossChainWallet = async (chain: HandledCrossChainType): Promise<Wallet | null> => {
  debug(`Attempting to connect ${chain} wallet`);

  try {
    let authBlob: Uint8Array;
    // The type expected by actor.connectWallet is the variant object like { Solana: null }
    let chainTypeVariant: { [key in HandledCrossChainType]?: null };

    // Get placeholder auth data based on chain
    switch (chain) {
      case 'Solana':
        authBlob = await getSolanaAuthBlob();
        chainTypeVariant = { Solana: null };
        break;
      case 'Ethereum':
        authBlob = await getEthereumAuthBlob();
        chainTypeVariant = { Ethereum: null };
        break;
      case 'Bitcoin':
        authBlob = await getBitcoinAuthBlob();
        chainTypeVariant = { Bitcoin: null };
        break;
      default:
        // This should be unreachable due to the HandledCrossChainType constraint
        console.error(`Unsupported chain type for cross-chain connection: ${chain}`);
        return null;
    }

    const actor = await getCrossChainActor();
    debug(`Calling connectWallet on canister for ${chain}`);

    // The DID expects the variant type, e.g., { Solana: null }
    // We need to cast chainTypeVariant to the broader ChainType for the actor call
    const result = await actor.connectWallet(chainTypeVariant as unknown as ChainType, authBlob);
    debug(`connectWallet result for ${chain}:`, result);

    if (result && result.length > 0) {
      debug(`${chain} wallet connected successfully.`);
      return result[0]; // connectWallet returns opt Wallet which is Wallet[] | []
    } else {
      debug(`Failed to connect ${chain} wallet via canister.`);
      return null;
    }
  } catch (error) {
    console.error(`Error connecting ${chain} wallet:`, error);
    return null;
  }
};

// Note: The DID doesn't specify a disconnect function for cross-chain wallets.
// Disconnection might involve clearing local state or specific actions within the canister
// if implemented differently later. For now, we only handle connection.
