
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { walletOptions } from "@/components/wallet/WalletOptionsConfig";
import { WalletOption } from "@/components/wallet/WalletOption";
import { WalletInfoPanel } from "@/components/wallet/WalletInfoPanel";
import { connectWallet, WalletType, getAvailableWallets } from "@/services/icpWalletService";
import { toast } from "@/hooks/use-toast";
import { getBackendActor } from "@/services/icpService";

interface ICPWalletConnectProps extends React.HTMLAttributes<HTMLDivElement> {
  onWalletConnected?: (principalId: string) => void;
}

const ICPWalletConnect = ({ className, onWalletConnected, ...props }: ICPWalletConnectProps) => {
  const [connectedWallet, setConnectedWallet] = useState<WalletType | null>(null);
  const [principalId, setPrincipalId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<WalletType | null>(null);
  const [availableWallets, setAvailableWallets] = useState<ReturnType<typeof getAvailableWallets>>([]);
  
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
        
        // Register the wallet with the backend
        try {
          const actor = getBackendActor();
          await actor.linkWallet(principal, "icp");
          
          // Call the callback if provided
          if (onWalletConnected) {
            onWalletConnected(principal);
          }
        } catch (error) {
          console.error("Failed to register wallet with backend:", error);
          toast({
            title: "Backend Registration Failed",
            description: "Wallet connected but failed to register with backend",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error(`Error connecting to ${walletId}:`, error);
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = async () => {
    // In a real implementation, you would disconnect from the wallet
    // For now, just clear the state
    setConnectedWallet(null);
    setPrincipalId(null);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
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
          {walletOptions.map((wallet) => (
            <WalletOption
              key={wallet.id}
              wallet={wallet}
              isConnected={connectedWallet === wallet.id}
              isConnecting={isConnecting === wallet.id}
              principalId={connectedWallet === wallet.id ? principalId : null}
              isAvailable={isWalletAvailable(wallet.id)}
              onConnect={() => handleConnect(wallet.id)}
              onDisconnect={handleDisconnect}
            />
          ))}
        </div>
        
        <WalletInfoPanel />
      </div>
    </div>
  );
};

export { ICPWalletConnect };
