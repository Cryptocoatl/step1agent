
import { toast } from "@/hooks/use-toast";
import { Principal } from "@dfinity/principal";
import { ICPWallet, WalletType } from "./types";
import { walletImplementations } from "./walletAdapters";

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

// Re-export the WalletType for ease of use
export { WalletType } from "./types";
