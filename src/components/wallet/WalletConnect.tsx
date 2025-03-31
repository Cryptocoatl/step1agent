
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ICPWalletConnect } from "@/components/wallet/ICPWalletConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { walletOptions } from "./WalletOptionsConfig";
import { WalletTabContent } from "./WalletTabContent";

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

  // Filter wallet options by tab
  const getWalletsByType = (type: string) => {
    return walletOptions.filter(wallet => wallet.id === type);
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
          <WalletTabContent
            title="Connect Ethereum Wallet"
            description="Link your Ethereum wallet to access EVM-compatible networks"
            wallets={getWalletsByType("ethereum")}
            connectedWallets={connectedWallets}
            connectingWallet={connectingWallet}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </TabsContent>
        
        <TabsContent value="solana">
          <WalletTabContent
            title="Connect Solana Wallet"
            description="Link your Solana wallet to access the Solana ecosystem"
            wallets={getWalletsByType("solana")}
            connectedWallets={connectedWallets}
            connectingWallet={connectingWallet}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </TabsContent>
        
        <TabsContent value="bitcoin">
          <WalletTabContent
            title="Connect Bitcoin Wallet"
            description="Link your Bitcoin wallet to access Bitcoin features"
            wallets={getWalletsByType("bitcoin")}
            connectedWallets={connectedWallets}
            connectingWallet={connectingWallet}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </TabsContent>
        
        <TabsContent value="others">
          <WalletTabContent
            title="Other Blockchain Wallets"
            description="Connect to additional blockchain ecosystems"
            wallets={getWalletsByType("holochain")}
            connectedWallets={connectedWallets}
            connectingWallet={connectingWallet}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { WalletConnect };
