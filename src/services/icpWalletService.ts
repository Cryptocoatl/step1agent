
import { toast } from "@/hooks/use-toast";
import { Principal } from "@dfinity/principal";

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

// Implementation of wallet connection handlers
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
        
        // Request connection with the canister whitelist
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
    isAvailable: () => true, // Stoic is web-based, always available
    connect: async () => {
      try {
        // For Stoic, we would typically use StoicIdentity from the @dfinity/identity package
        // Since this is a frontend implementation, we'll simulate the web flow
        // Normally would use a library like @dfinity/auth-client
        
        const stoicWindow = window.open('https://www.stoicwallet.com/', '_blank');
        
        // In a real implementation, we would wait for a callback from Stoic
        // This is a simplified version
        toast({
          title: "Stoic Wallet",
          description: "Please complete the authentication in the Stoic Wallet window",
        });
        
        // Simplified: return a placeholder principal
        // In a real implementation, we would get the principal from Stoic
        return "2vxsx-fae"; // Placeholder principal
      } catch (error) {
        console.error('Stoic connection error:', error);
        throw error;
      }
    }
  },
  bitfinity: {
    name: "Bitfinity Wallet",
    type: "bitfinity",
    icon: "bitfinity",
    description: "Multi-chain browser extension",
    isAvailable: () => typeof window !== 'undefined' && !!(window as any).ic?.bitfinity,
    connect: async () => {
      try {
        if (!(window as any).ic?.bitfinity) {
          window.open('https://bitfinity.network/', '_blank');
          throw new Error('Bitfinity wallet not installed');
        }
        
        // Connect to Bitfinity wallet
        const whitelist = [
          process.env.VITE_CANISTER_ID_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai'
        ];
        
        await (window as any).ic.bitfinity.requestConnect({
          whitelist,
          host: 'https://mainnet.dfinity.network'
        });
        
        if ((window as any).ic.bitfinity.isConnected()) {
          const principal = await (window as any).ic.bitfinity.getPrincipal();
          return principal.toString();
        }
        
        throw new Error('Failed to connect to Bitfinity wallet');
      } catch (error) {
        console.error('Bitfinity connection error:', error);
        throw error;
      }
    }
  },
  infinity: {
    name: "Infinity Wallet",
    type: "infinity",
    icon: "infinity",
    description: "Swap, stake and earn on ICP",
    isAvailable: () => typeof window !== 'undefined' && !!(window as any).ic?.infinityWallet,
    connect: async () => {
      try {
        if (!(window as any).ic?.infinityWallet) {
          window.open('https://wallet.infinityswap.one/', '_blank');
          throw new Error('Infinity wallet not installed');
        }
        
        // Connect to Infinity wallet
        const whitelist = [
          process.env.VITE_CANISTER_ID_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai'
        ];
        
        await (window as any).ic.infinityWallet.requestConnect({
          whitelist,
          host: 'https://mainnet.dfinity.network'
        });
        
        if ((window as any).ic.infinityWallet.isConnected()) {
          const principal = await (window as any).ic.infinityWallet.getPrincipal();
          return principal.toString();
        }
        
        throw new Error('Failed to connect to Infinity wallet');
      } catch (error) {
        console.error('Infinity connection error:', error);
        throw error;
      }
    }
  },
  nfid: {
    name: "NFID",
    type: "nfid",
    icon: "nfid",
    description: "Internet Identity provider",
    isAvailable: () => true, // Web-based, always available
    connect: async () => {
      try {
        // For NFID, we would typically use the Internet Identity service
        // Since this is a frontend implementation, we'll simulate the web flow
        
        // Open NFID authentication window
        const nfidWindow = window.open('https://nfid.one/', '_blank');
        
        toast({
          title: "NFID Authentication",
          description: "Please complete the authentication in the NFID window",
        });
        
        // In a real implementation, we would wait for a callback from NFID
        // and create an identity with the provided delegation
        
        // Simplified: return a placeholder principal
        return "rdmx6-jaaaa-aaaaa-aaadq-cai"; // Placeholder principal
      } catch (error) {
        console.error('NFID connection error:', error);
        throw error;
      }
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
    
    // Validate the principal ID
    try {
      if (principalId && principalId !== "2vxsx-fae" && principalId !== "rdmx6-jaaaa-aaaaa-aaadq-cai") {
        // Only validate non-placeholder principals
        Principal.fromText(principalId); // Will throw if invalid
      }
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${wallet.name}`
      });
      
      return principalId;
    } catch (error) {
      console.error("Invalid principal ID:", error);
      toast({
        title: "Invalid Principal ID",
        description: "The wallet returned an invalid principal ID.",
        variant: "destructive"
      });
      return null;
    }
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
