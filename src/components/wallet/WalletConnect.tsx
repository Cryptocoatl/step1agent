import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { login, logout, initAuth, getAuthState } from "@/services/icpService";
import { connectCrossChainWallet } from "@/services/crossChainService"; // Import the new service
import type { ChainType } from '@/declarations/cross_chain_wallet_adapter/cross_chain_wallet_adapter.did.d'; // Import ChainType

// Define the specific type for cross-chain wallets handled here
type HandledCrossChainType = 'Solana' | 'Ethereum' | 'Bitcoin';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const walletOptions: WalletOption[] = [
  {
    id: "icp",
    name: "Internet Computer",
    icon: "ICP",
    description: "Connect your ICP wallet to access your digital identity",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "solana",
    name: "Solana",
    icon: "SOL",
    description: "Connect to Solana DeFi ecosystem",
    color: "from-green-400 to-teal-500",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "BTC",
    description: "Connect your Bitcoin wallet",
    color: "from-orange-400 to-amber-500",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "ETH",
    description: "Connect to EVM compatible networks",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "holochain",
    name: "Holochain",
    icon: "HOT",
    description: "Connect your Holochain identity",
    color: "from-green-500 to-emerald-600",
  },
];

interface WalletConnectProps extends React.HTMLAttributes<HTMLDivElement> {}

const WalletConnect = ({ className, ...props }: WalletConnectProps) => {
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  useEffect(() => {
    // Initialize authentication on component mount
    initAuth().then(() => {
      const { isAuthenticated } = getAuthState();
      if (isAuthenticated) {
        setConnectedWallets(prev => 
          prev.includes("icp") ? prev : [...prev, "icp"]
        );
      }
    });
  }, []);

  const handleConnect = async (walletId: string) => {
    setConnectingWallet(walletId);
    
    try {
      if (walletId === "icp") {
        const success = await login();
        if (success) {
          setConnectedWallets(prev => 
            prev.includes(walletId) ? prev : [...prev, walletId]
          );
        }
      } else if (walletId === "solana" || walletId === "ethereum" || walletId === "bitcoin") {
        let chain: HandledCrossChainType; // Use the explicitly defined type
        // Use switch for clearer type mapping
        switch (walletId) {
          case 'solana':
            chain = 'Solana';
            break;
          case 'ethereum':
            chain = 'Ethereum';
            break;
          case 'bitcoin':
            chain = 'Bitcoin';
            break;
          default:
            // This path should not be reachable due to the outer if condition
            console.error(`Unexpected walletId in cross-chain block: ${walletId}`);
            setConnectingWallet(null); // Ensure loading state is reset
            return; // Exit if unexpected id somehow gets here
        }

        // Now 'chain' is correctly typed as 'Solana' | 'Ethereum' | 'Bitcoin'
        const walletInfo = await connectCrossChainWallet(chain);
        if (walletInfo) {
          console.log(`${chain} wallet connected:`, walletInfo);
          setConnectedWallets(prev => 
            prev.includes(walletId) ? prev : [...prev, walletId]
          );
        } else {
          console.error(`Failed to connect ${chain} wallet via service.`);
          // Optionally show an error message to the user
        }
      } else if (walletId === "holochain") { // Correctly placed else if
          console.warn("Holochain connection not yet implemented in the backend canister.");
          // Optionally disable the button or show a message
      } else {
        console.warn(`Connection logic for ${walletId} not implemented.`);
      }
    } catch (error) {
      console.error(`Failed to connect ${walletId} wallet:`, error);
    } finally {
      setConnectingWallet(null);
    }
  }; // End of handleConnect

  const handleDisconnect = async (walletId: string) => {
    if (walletId === "icp") {
      try {
        await logout();
        // Update state immediately after logout call for ICP
        setConnectedWallets(prev => prev.filter(id => id !== walletId));
      } catch (error) {
        console.error("Failed to disconnect ICP wallet:", error);
      }
    } else {
      // For other wallets, just update the UI state as there's no backend disconnect call defined
      console.log(`Disconnecting ${walletId} (UI only)`);
      setConnectedWallets(prev => prev.filter(id => id !== walletId));
    }
  }; // End of handleDisconnect

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)} {...props}>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-2">Connect Your Wallets</h2>
          <p className="text-muted-foreground">
            Link your wallets to access the full range of membership benefits
          </p>
        </div>

        <div className="grid gap-4">
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
                    "w-12 h-12 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br",
                    wallet.color
                  )}>
                    {wallet.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{wallet.name}</h3>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
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
                    onClick={() => handleConnect(wallet.id)}
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
    </div>
  );
}; // End of WalletConnect component

export { WalletConnect };
