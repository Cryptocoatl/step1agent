
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { connectWallet, getConnectedWallets, disconnectWallet } from "@/services/walletService";
import { useAuth } from "@/providers/SupabaseAuthProvider";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  chainType: string;
}

const walletOptions: WalletOption[] = [
  {
    id: "icp",
    name: "Internet Computer",
    icon: "ICP",
    description: "Connect your ICP wallet to access your digital identity",
    color: "from-blue-500 to-purple-600",
    chainType: "icp"
  },
  {
    id: "ethereum",
    name: "Ethereum (EVM)",
    icon: "ETH",
    description: "Connect to EVM compatible networks",
    color: "from-blue-400 to-indigo-500",
    chainType: "evm"
  },
  {
    id: "solana",
    name: "Solana",
    icon: "SOL",
    description: "Connect to Solana DeFi ecosystem",
    color: "from-green-400 to-teal-500",
    chainType: "solana"
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "BTC",
    description: "Connect your Bitcoin Ordinals wallet",
    color: "from-orange-400 to-amber-500",
    chainType: "bitcoin"
  },
  {
    id: "holochain",
    name: "Holochain",
    icon: "HOT",
    description: "Connect your Holochain identity",
    color: "from-green-500 to-emerald-600",
    chainType: "holochain"
  },
];

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

  const handleConnect = async (wallet: WalletOption) => {
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
          <GlassPanel 
            key={wallet.id}
            className={cn(
              "p-4 transition-all duration-300",
              connectedWallets[wallet.chainType] 
                ? "border-accent/40 shadow-md" 
                : "hover:border-accent/20"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br",
                  wallet.color
                )}>
                  {wallet.icon}
                </div>
                <div>
                  <h3 className="font-medium">{wallet.name}</h3>
                  <p className="text-xs text-muted-foreground">{wallet.description}</p>
                </div>
              </div>
              
              {connectedWallets[wallet.chainType] ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDisconnect(wallet.id, wallet.chainType)}
                  className="button-animated"
                >
                  Disconnect
                </Button>
              ) : (
                <Button 
                  size="sm"
                  onClick={() => handleConnect(wallet)}
                  disabled={connectingWallet === wallet.id || !user}
                  className="button-animated bg-accent hover:bg-accent/90"
                >
                  {connectingWallet === wallet.id ? "Connecting..." : "Connect"}
                </Button>
              )}
            </div>
            
            {connectedWallets[wallet.chainType] && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Connected
                </p>
              </div>
            )}
          </GlassPanel>
        ))}
      </div>
    </div>
  );
};
