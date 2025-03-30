
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { getBackendActor } from "@/services/icpService";
import { toast } from "@/hooks/use-toast";

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
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  const handleConnect = async (wallet: WalletOption) => {
    setConnectingWallet(wallet.id);
    
    try {
      // This is a simplified mock of wallet connection
      // In a real implementation, this would use wallet-specific SDKs
      
      // Generate a mock wallet address based on wallet type
      const mockAddresses: {[key: string]: string} = {
        icp: "aaaaa-bbbbb-ccccc-ddddd-eee",
        ethereum: "0x1234567890abcdef1234567890abcdef12345678",
        solana: "ABCDEFGhijklmnopqrstuvwxyz1234567890abcdefghijk",
        bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        holochain: "uhCAkS1ChFDPqGi_iOQJ-xwXQbYEwXVwMbK8SpJrjNd7vK2B7h-Ou",
      };
      
      const walletAddress = mockAddresses[wallet.id] || "unknown";
      
      // In a real implementation, this would verify the wallet connection
      // For now, we'll simulate a connection to the ICP backend
      const actor = getBackendActor();
      await actor.linkWallet(walletAddress, wallet.chainType);
      
      // Update local state
      setConnectedWallets((prev) => 
        prev.includes(wallet.id) ? prev : [...prev, wallet.id]
      );
      
      // Trigger callback if provided
      if (onWalletConnected) {
        onWalletConnected(wallet.name, walletAddress);
      }
      
      toast({
        title: "Wallet Connected",
        description: `Your ${wallet.name} wallet has been successfully linked`,
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to the selected wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingWallet(null);
    }
  };

  const handleDisconnect = async (walletId: string) => {
    // In a real implementation, this would disconnect the wallet using its SDK
    // and update the backend
    
    // For now, just update local state
    setConnectedWallets((prev) => prev.filter((id) => id !== walletId));
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected from your Digital ID",
    });
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-3">
        {walletOptions.map((wallet) => (
          <GlassPanel 
            key={wallet.id}
            className={cn(
              "p-4 transition-all duration-300",
              connectedWallets.includes(wallet.id) 
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
              
              {connectedWallets.includes(wallet.id) ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDisconnect(wallet.id)}
                  className="button-animated"
                >
                  Disconnect
                </Button>
              ) : (
                <Button 
                  size="sm"
                  onClick={() => handleConnect(wallet)}
                  disabled={connectingWallet === wallet.id}
                  className="button-animated bg-accent hover:bg-accent/90"
                >
                  {connectingWallet === wallet.id ? "Connecting..." : "Connect"}
                </Button>
              )}
            </div>
            
            {connectedWallets.includes(wallet.id) && (
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
