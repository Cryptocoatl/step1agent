
import { toast } from "@/hooks/use-toast";

// Types for wallet connection options
export type WalletType = 'plug' | 'stoic' | 'bitfinity' | 'infinity' | 'nfid';

interface ICPWallet {
  name: string;
  type: WalletType;
  icon: string;
  description: string;
  isAvailable: () => boolean;
  connect: () => Promise<string>;
}

// Mock implementation of wallet connection handlers
const walletImplementations: Record<WalletType, ICPWallet> = {
  plug: {
    name: "Plug Wallet",
    type: "plug",
    icon: "plug",
    description: "ICP's most popular browser wallet",
    isAvailable: () => typeof window !== 'undefined' && !!(window as any).ic?.plug,
    connect: async () => {
      try {
        // Check if plug is installed
        if (!(window as any).ic?.plug) {
          window.open('https://plugwallet.ooo/', '_blank');
          throw new Error('Plug wallet not installed');
        }
        
        // Request connection
        const whitelist = [
          process.env.VITE_CANISTER_ID_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai'
        ];
        
        const host = 'https://mainnet.dfinity.network';
        
        await (window as any).ic.plug.requestConnect({
          whitelist,
          host
        });
        
        // Get principal ID if connected
        if ((window as any).ic.plug.isConnected()) {
          const principal = await (window as any).ic.plug.agent.getPrincipal();
          return principal.toString();
        }
        throw new Error('Failed to connect to Plug wallet');
      } catch (error) {
        console.error('Plug connection error:', error);
        throw error;
      }
    }
  },
  stoic: {
    name: "Stoic Wallet",
    type: "stoic",
    icon: "stoic",
    description: "Web-based ICP wallet",
    isAvailable: () => true, // Stoic is web-based, so always available
    connect: async () => {
      // This would use StoicIdentity.connect() in a real implementation
      // For now, we'll simulate a connection
      return "2vxsx-fae";
    }
  },
  bitfinity: {
    name: "Bitfinity Wallet",
    type: "bitfinity",
    icon: "bitfinity",
    description: "Multi-chain browser extension",
    isAvailable: () => typeof window !== 'undefined' && !!(window as any).ic?.bitfinity,
    connect: async () => {
      // Simulation for Bitfinity wallet
      if (!(window as any).ic?.bitfinity) {
        window.open('https://bitfinity.network/', '_blank');
        throw new Error('Bitfinity wallet not installed');
      }
      
      // Simulated connection
      return "un4fu-tqaaa-aaaab-qadjq-cai";
    }
  },
  infinity: {
    name: "Infinity Wallet",
    type: "infinity",
    icon: "infinity",
    description: "Swap, stake and earn on ICP",
    isAvailable: () => typeof window !== 'undefined' && !!(window as any).ic?.infinityWallet,
    connect: async () => {
      // Simulation for Infinity wallet
      if (!(window as any).ic?.infinityWallet) {
        window.open('https://wallet.infinityswap.one/', '_blank');
        throw new Error('Infinity wallet not installed');
      }
      
      // Simulated connection
      return "utozz-siaaa-aaaam-qaaxq-cai";
    }
  },
  nfid: {
    name: "NFID",
    type: "nfid",
    icon: "nfid",
    description: "Internet Identity provider",
    isAvailable: () => true, // Web-based, always available
    connect: async () => {
      // This would open the NFID authentication flow
      // Simulated connection
      return "rdmx6-jaaaa-aaaaa-aaadq-cai";
    }
  }
};

// Check which wallets are available in the browser
export const getAvailableWallets = (): ICPWallet[] => {
  return Object.values(walletImplementations).filter(wallet => {
    try {
      return wallet.isAvailable();
    } catch (e) {
      return false;
    }
  });
};

// Connect to a specific wallet
export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  const wallet = walletImplementations[walletType];
  
  if (!wallet) {
    toast({
      title: "Wallet not supported",
      description: "The selected wallet is not supported.",
      variant: "destructive"
    });
    return null;
  }
  
  try {
    const principalId = await wallet.connect();
    
    toast({
      title: "Wallet Connected",
      description: `Successfully connected to ${wallet.name}`
    });
    
    return principalId;
  } catch (error) {
    console.error(`Error connecting to ${wallet.name}:`, error);
    
    toast({
      title: "Connection Failed",
      description: (error as Error).message || `Failed to connect to ${wallet.name}`,
      variant: "destructive"
    });
    
    return null;
  }
};

// Utility to get wallet info by type
export const getWalletInfo = (walletType: WalletType): ICPWallet => {
  return walletImplementations[walletType];
};

// Utility to check if a specific wallet is installed
export const isWalletInstalled = (walletType: WalletType): boolean => {
  return walletImplementations[walletType].isAvailable();
};
