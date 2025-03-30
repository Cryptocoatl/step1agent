
import { useState } from "react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { toast } from "@/hooks/use-toast";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { PortfolioOverview, AssetType } from "@/components/wallet/PortfolioOverview";
import { SecurityPanel } from "@/components/wallet/SecurityPanel";
import { ConnectedAppsPanel } from "@/components/wallet/ConnectedAppsPanel";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { WalletBenefitsTab } from "@/components/wallet/WalletBenefitsTab";
import { TransactionHistoryTab } from "@/components/wallet/TransactionHistoryTab";

const WalletDashboard = () => {
  const [showAgent, setShowAgent] = useState(false);
  const [connectedWallets, setConnectedWallets] = useState(['icp']);
  
  const assets: AssetType[] = [
    {
      id: 'icp-token',
      name: 'Internet Computer',
      symbol: 'ICP',
      amount: 42.5,
      value: 1275,
      change: 5.2,
      chain: 'icp'
    },
    {
      id: 'cycles',
      name: 'Cycles',
      symbol: 'Cycles',
      amount: 10000,
      value: 50,
      change: 0,
      chain: 'icp'
    },
    {
      id: 'ckbtc',
      name: 'Chain Key Bitcoin',
      symbol: 'ckBTC',
      amount: 0.025,
      value: 1250,
      change: 2.1,
      chain: 'bitcoin'
    }
  ];
  
  const connectedApps = [
    {
      name: "CACAO DAO",
      description: "Governance access"
    },
    {
      name: "ReFi Tulum",
      description: "Event passes"
    }
  ];
  
  const handleSync = () => {
    toast({
      title: "Wallets synchronized",
      description: "Your wallet data has been updated.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <WalletHeader
            onSyncWallets={handleSync}
            onGetHelp={() => setShowAgent(true)}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <AnimatedCard animation="fade" className="lg:col-span-2">
              <PortfolioOverview
                totalValue={2575}
                connectedWallets={connectedWallets}
                assets={assets}
              />
            </AnimatedCard>
            
            <div className="space-y-6">
              <SecurityPanel />
              <ConnectedAppsPanel apps={connectedApps} />
            </div>
          </div>
          
          <Tabs defaultValue="connect" className="mb-12">
            <TabsList className="mb-4">
              <TabsTrigger value="connect">Connect Wallets</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect" className="p-4 bg-background/50 rounded-lg">
              <WalletConnect />
            </TabsContent>
            
            <TabsContent value="benefits" className="p-4 bg-background/50 rounded-lg">
              <WalletBenefitsTab />
            </TabsContent>
            
            <TabsContent value="history" className="p-4 bg-background/50 rounded-lg">
              <TransactionHistoryTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
      
      {showAgent && <StepOneAgent />}
    </div>
  );
};

export default WalletDashboard;
