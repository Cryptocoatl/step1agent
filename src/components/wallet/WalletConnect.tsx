import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ICPWalletConnect } from "@/components/wallet/ICPWalletConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const walletOptions: WalletOption[] = [
  {
    id: "solana",
    name: "Solana",
    icon: "SOL",
    description: "Connect to Solana DeFi ecosystem",
    color: "from-green-400 to-teal-500",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "ETH",
    description: "Connect to EVM compatible networks",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    icon: "BTC",
    description: "Connect your Bitcoin wallet",
    color: "from-orange-400 to-amber-500",
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
  const [activeTab, setActiveTab] = useState<string>("icp");

  const handleConnect = (walletId: string) => {
    setConnectingWallet(walletId);
    
    // Simulate connection process for non-ICP wallets
    setTimeout(() => {
      setConnectedWallets((prev) => 
        prev.includes(walletId) ? prev : [...prev, walletId]
      );
      setConnectingWallet(null);
      
      toast({
        title: "Wallet Connected",
        description: `Your ${walletId.toUpperCase()} wallet has been connected successfully.`,
      });
    }, 1500);
  };

  const handleDisconnect = (walletId: string) => {
    setConnectedWallets((prev) => prev.filter((id) => id !== walletId));
    
    toast({
      title: "Wallet Disconnected",
      description: `Your ${walletId.toUpperCase()} wallet has been disconnected.`,
    });
  };
  
  const handleICPWalletConnected = (principalId: string) => {
    setConnectedWallets((prev) => 
      prev.includes("icp") ? prev : [...prev, "icp"]
    );
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)} {...props}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="icp" className="flex-1">Internet Computer</TabsTrigger>
          <TabsTrigger value="ethereum" className="flex-1">Ethereum</TabsTrigger>
          <TabsTrigger value="solana" className="flex-1">Solana</TabsTrigger>
          <TabsTrigger value="bitcoin" className="flex-1">Bitcoin</TabsTrigger>
          <TabsTrigger value="others" className="flex-1">Others</TabsTrigger>
        </TabsList>
        
        <TabsContent value="icp">
          <ICPWalletConnect onWalletConnected={handleICPWalletConnected} />
        </TabsContent>
        
        <TabsContent value="ethereum">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium mb-2">Connect Ethereum Wallet</h2>
              <p className="text-muted-foreground">
                Link your Ethereum wallet to access EVM-compatible networks
              </p>
            </div>
            
            <div className="grid gap-4">
              {walletOptions
                .filter(wallet => wallet.id === "ethereum")
                .map((wallet) => (
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
        </TabsContent>
        
        <TabsContent value="solana">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium mb-2">Connect Solana Wallet</h2>
              <p className="text-muted-foreground">
                Link your Solana wallet to access the Solana ecosystem
              </p>
            </div>
            
            <div className="grid gap-4">
              {walletOptions
                .filter(wallet => wallet.id === "solana")
                .map((wallet) => (
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
        </TabsContent>
        
        <TabsContent value="bitcoin">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium mb-2">Connect Bitcoin Wallet</h2>
              <p className="text-muted-foreground">
                Link your Bitcoin wallet to access Bitcoin features
              </p>
            </div>
            
            <div className="grid gap-4">
              {walletOptions
                .filter(wallet => wallet.id === "bitcoin")
                .map((wallet) => (
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
        </TabsContent>
        
        <TabsContent value="others">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium mb-2">Other Blockchain Wallets</h2>
              <p className="text-muted-foreground">
                Connect to additional blockchain ecosystems
              </p>
            </div>
            
            <div className="grid gap-4">
              {walletOptions
                .filter(wallet => wallet.id === "holochain")
                .map((wallet) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { WalletConnect };
