
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { WalletOption } from "@/components/wallet/WalletOption";
import { WalletInfoPanel } from "@/components/wallet/WalletInfoPanel";
import { connectWallet, WalletType, getAvailableWallets } from "@/services/icp/icpWalletService";
import { toast } from "@/hooks/use-toast";
import { getBackendActor } from "@/services/icpService";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ICPWalletConnectProps extends React.HTMLAttributes<HTMLDivElement> {
  onWalletConnected?: (principalId: string) => void;
}

const ICPWalletConnect = ({ className, onWalletConnected, ...props }: ICPWalletConnectProps) => {
  const [connectedWallet, setConnectedWallet] = useState<WalletType | null>(null);
  const [principalId, setPrincipalId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<WalletType | null>(null);
  const [availableWallets, setAvailableWallets] = useState<ReturnType<typeof getAvailableWallets>>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Check which wallets are available in the browser
  useEffect(() => {
    setAvailableWallets(getAvailableWallets());
  }, []);
  
  const handleConnect = async (walletId: WalletType) => {
    setIsConnecting(walletId);
    
    try {
      const principal = await connectWallet(walletId);
      
      if (principal) {
        setConnectedWallet(walletId);
        setPrincipalId(principal);
        
        // Call the callback if provided
        if (onWalletConnected) {
          onWalletConnected(principal);
        }
      }
    } catch (error) {
      console.error(`Error connecting to ${walletId}:`, error);
      toast({
        title: "Connection Failed",
        description: (error as Error).message || `Failed to connect to ${walletId}`,
        variant: "destructive"
      });
    } finally {
      setIsConnecting(null);
    }
  };

  const handleLinkWallet = async () => {
    if (connectedWallet && principalId) {
      setIsRegistering(true);
      try {
        // Register the wallet with the backend
        const actor = await getBackendActor();
        await actor.linkWallet(principalId, "icp");
        
        toast({
          title: "Wallet Linked",
          description: "Wallet successfully linked with your Digital ID",
        });
      } catch (error) {
        console.error("Failed to register wallet with backend:", error);
        toast({
          title: "Backend Registration Failed",
          description: "Wallet connected but failed to register with backend",
          variant: "destructive",
        });
      } finally {
        setIsRegistering(false);
      }
    }
  };

  const handleDisconnect = async () => {
    if (connectedWallet && principalId) {
      // Disconnect based on the wallet type
      try {
        switch (connectedWallet) {
          case 'plug':
            if ((window as any).ic?.plug?.isConnected()) {
              // Plug doesn't have a direct disconnect method in its API
              // We'll just clear our local state
            }
            break;
          case 'bitfinity':
            if ((window as any).ic?.bitfinity?.isConnected()) {
              // Similar to Plug, Bitfinity doesn't have a direct disconnect method
            }
            break;
          // Add other wallet type handling as needed
        }
        
        // Clear local state
        setConnectedWallet(null);
        setPrincipalId(null);
        
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected",
        });
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
        toast({
          title: "Disconnect Error",
          description: "Failed to disconnect wallet",
          variant: "destructive"
        });
      }
    }
  };

  const isWalletAvailable = (walletId: WalletType): boolean => {
    return availableWallets.some(wallet => wallet.type === walletId);
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)} {...props}>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-2">Connect Your ICP Wallet</h2>
          <p className="text-muted-foreground">
            Link your Internet Computer wallet to access ICP ecosystem benefits
          </p>
        </div>

        <div className="grid gap-4">
          {availableWallets.map((wallet) => (
            <WalletOption
              key={wallet.type}
              wallet={{
                id: wallet.type,
                name: wallet.name,
                icon: wallet.icon,
                description: wallet.description,
                color: "from-purple-400 to-indigo-500",
                url: wallet.url
              }}
              isConnected={connectedWallet === wallet.type}
              isConnecting={isConnecting === wallet.type}
              principalId={connectedWallet === wallet.type ? principalId : null}
              isAvailable={isWalletAvailable(wallet.type)}
              onConnect={() => handleConnect(wallet.type)}
              onDisconnect={handleDisconnect}
            />
          ))}
        </div>
        
        {connectedWallet && principalId && (
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={handleLinkWallet} 
              disabled={isRegistering}
              className="bg-gradient-to-r from-accent to-purple-600 hover:from-accent/80 hover:to-purple-700"
            >
              {isRegistering ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Link Wallet to Digital ID
            </Button>
          </div>
        )}
        
        <WalletInfoPanel />
      </div>
    </div>
  );
};

export { ICPWalletConnect };
