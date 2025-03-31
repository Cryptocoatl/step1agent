
import { Principal } from "@dfinity/principal";

// Types for wallet connection options
export type WalletType = 'plug' | 'stoic' | 'bitfinity' | 'infinity' | 'nfid';

export interface ICPWallet {
  name: string;
  type: WalletType;
  icon: string;
  description: string;
  url: string;
  isAvailable: () => boolean;
  connect: () => Promise<string>;
}
