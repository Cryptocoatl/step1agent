
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { connectWallet, getConnectedWallets, disconnectWallet } from "@/services/wallet";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { cn } from "@/lib/utils";
import { WalletOptionItem } from "./WalletOptionItem";
import { walletOptions } from "./WalletOptionsConfig";

interface MultiChainWalletConnectorProps {
  className?: string;
  onWalletConnected?: (chain: string, address: string) => void;
}

export const MultiChainWalletConnector = ({ 
  className,
  onWalletConnected 
}: MultiChainWalletConnectorProps) => {
  const { user } = useAuth();
  const [connectedWallets, setConnectedWallets] = useState<Record<string, string>>({});
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load connected wallets from Supabase
  useEffect(() => {
    if (user) {
      const loadWallets = async () => {
        setIsLoading(true);
        const wallets = await getConnectedWallets();
        
        // Create a mapping of chainType to wallet ID
        const walletMap: Record<string, string> = {};
        wallets.forEach(wallet => {
          walletMap[wallet.chain_type] = wallet.id;
        });
        
        setConnectedWallets(walletMap);
        setIsLoading(false);
      };
      
      loadWallets();
    } else {
      setConnectedWallets({});
      setIsLoading(false);
    }
  }, [user]);

  const handleConnect = async (wallet: typeof walletOptions[0]) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to connect wallets",
        variant: "destructive"
      });
      return;
    }
    
    setConnectingWallet(wallet.id);
    
    try {
      // Generate a mock wallet address based on wallet type
      const mockAddresses: {[key: string]: string} = {
        icp: `${wallet.id}_${Math.random().toString(36).substring(2, 10)}`,
        ethereum: `0x${Math.random().toString(36).substring(2, 10)}`,
        solana: `${Math.random().toString(36).substring(2, 15)}`,
        bitcoin: `bc1${Math.random().toString(36).substring(2, 10)}`,
        holochain: `holo_${Math.random().toString(36).substring(2, 10)}`,
      };
      
      const walletAddress = mockAddresses[wallet.id] || "unknown";
      
      // Connect wallet using our service
      const success = await connectWallet(
        walletAddress,
        wallet.id,
        wallet.chainType
      );
      
      if (success) {
        // Refresh the wallets
        const wallets = await getConnectedWallets();
        const walletMap: Record<string, string> = {};
        wallets.forEach(w => {
          walletMap[w.chain_type] = w.id;
        });
        setConnectedWallets(walletMap);
        
        // Trigger callback if provided
        if (onWalletConnected) {
          onWalletConnected(wallet.name, walletAddress);
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setConnectingWallet(null);
    }
  };

  const handleDisconnect = async (walletId: string, chainType: string) => {
    if (!user) return;
    
    try {
      // Get the wallet ID from our connected wallets map
      const id = connectedWallets[chainType];
      if (!id) return;
      
      const success = await disconnectWallet(id);
      
      if (success) {
        // Update local state
        const updatedWallets = { ...connectedWallets };
        delete updatedWallets[chainType];
        setConnectedWallets(updatedWallets);
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-4 text-center">
        <p className="text-muted-foreground">Loading wallets...</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-3">
        {walletOptions.map((wallet) => (
          <WalletOptionItem 
            key={wallet.id}
            wallet={wallet}
            isConnected={!!connectedWallets[wallet.chainType]}
            isConnecting={connectingWallet === wallet.id}
            onConnect={() => handleConnect(wallet)}
            onDisconnect={() => handleDisconnect(wallet.id, wallet.chainType)}
          />
        ))}
      </div>
    </div>
  );
};
