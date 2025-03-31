
// Wallet type definition
export interface Wallet {
  id: string;
  wallet_address: string;
  wallet_type: string;
  chain_type: string;
  created_at: string;
}

// Define reward actions for wallet connections
export type WalletRewardAction = 'wallet_connect';
