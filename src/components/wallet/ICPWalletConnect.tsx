
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { Wallet, ExternalLink, AlertCircle, Info, CheckCircle } from "lucide-react";
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
  
  // Wallet options with ICP-specific details
  const walletOptions = [
    {
      id: "plug" as WalletType,
      name: "Plug Wallet",
      icon: "🔌",
      description: "The most popular ICP browser wallet extension",
      color: "from-purple-500 to-indigo-600",
      url: "https://plugwallet.ooo/"
    },
    {
      id: "stoic" as WalletType,
      name: "Stoic Wallet",
      icon: "🧠",
      description: "Web-based ICP wallet, no extension needed",
      color: "from-blue-500 to-sky-600",
      url: "https://www.stoicwallet.com/"
    },
    {
      id: "bitfinity" as WalletType,
      name: "Bitfinity Wallet",
      icon: "∞",
      description: "Multi-chain ICP compatible wallet",
      color: "from-pink-500 to-rose-600",
      url: "https://bitfinity.network/"
    },
    {
      id: "infinity" as WalletType,
      name: "Infinity Wallet",
      icon: "♾️",
      description: "DeFi focused ICP wallet",
      color: "from-green-500 to-emerald-600",
      url: "https://wallet.infinityswap.one/"
    },
    {
      id: "nfid" as WalletType,
      name: "NFID",
      icon: "🔑",
      description: "Internet Identity based authentication",
      color: "from-amber-500 to-yellow-600",
      url: "https://nfid.one/"
    }
  ];
  
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
            <GlassPanel 
              key={wallet.id}
              className={cn(
                "p-4 transition-all duration-300",
                connectedWallet === wallet.id 
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
                    <h3 className="font-medium flex items-center">
                      {wallet.name}
                      {!isWalletAvailable(wallet.id) && (
                        <Info size={14} className="ml-2 text-muted-foreground" title="Not detected in browser" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                </div>
                
                {connectedWallet === wallet.id ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDisconnect}
                    className="button-animated"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <a 
                      href={wallet.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-accent flex items-center"
                    >
                      <ExternalLink size={12} className="mr-1" />
                      Get
                    </a>
                    <Button 
                      size="sm"
                      onClick={() => handleConnect(wallet.id)}
                      disabled={isConnecting === wallet.id || (!isWalletAvailable(wallet.id) && wallet.id !== 'stoic' && wallet.id !== 'nfid')}
                      className="button-animated bg-accent hover:bg-accent/90"
                    >
                      {isConnecting === wallet.id ? "Connecting..." : "Connect"}
                    </Button>
                  </div>
                )}
              </div>
              
              {connectedWallet === wallet.id && principalId && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      Connected
                    </p>
                    <p className="text-xs bg-secondary/80 px-2 py-1 rounded font-mono">
                      {principalId.length > 15 ? `${principalId.substring(0, 6)}...${principalId.substring(principalId.length - 6)}` : principalId}
                    </p>
                  </div>
                </div>
              )}
            </GlassPanel>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-8 bg-secondary/50 p-4 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <AlertCircle size={16} className="mr-2" />
            <span className="font-medium">Compatible Wallets</span>
          </div>
          <p>
            Connect ICP wallets to access decentralized services on the Internet Computer. 
            Some wallets may require installation as browser extensions.
          </p>
        </div>
      </div>
    </div>
  );
};

export { ICPWalletConnect };
