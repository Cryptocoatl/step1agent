
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Lock, BarChart3, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { toast } from "@/hooks/use-toast";

type AssetType = {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  chain: 'icp' | 'solana' | 'bitcoin' | 'ethereum' | 'holochain';
};

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
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Wallet Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your multi-chain assets and connections</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleSync}
                  className="button-animated"
                >
                  Sync Wallets
                </Button>
                <Button 
                  onClick={() => setShowAgent(true)}
                  variant="outline"
                  className="button-animated"
                >
                  Get Help
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <AnimatedCard animation="fade" className="lg:col-span-2">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Portfolio Overview</h2>
                  <Button variant="outline" size="sm" className="h-8">
                    <BarChart3 size={16} className="mr-2" />
                    Analytics
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <GlassPanel className="p-4">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <h3 className="text-2xl font-bold">$2,575.00</h3>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      +3.8% <span className="text-muted-foreground ml-1">last 24h</span>
                    </p>
                  </GlassPanel>
                  
                  <GlassPanel className="p-4">
                    <p className="text-sm text-muted-foreground">Connected Wallets</p>
                    <h3 className="text-2xl font-bold">{connectedWallets.length}</h3>
                    <p className="text-xs text-muted-foreground mt-1">of 5 possible chains</p>
                  </GlassPanel>
                  
                  <GlassPanel className="p-4">
                    <p className="text-sm text-muted-foreground">Benefits Access</p>
                    <h3 className="text-2xl font-bold">Basic</h3>
                    <p className="text-xs text-blue-500 mt-1 flex items-center">
                      Connect more wallets to unlock
                    </p>
                  </GlassPanel>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Assets</h3>
                  <div className="space-y-3">
                    {assets.map((asset) => (
                      <div key={asset.id} className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                              {asset.symbol.substring(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium">${asset.value.toLocaleString()}</p>
                            <p className="text-xs">
                              {asset.amount} {asset.symbol}
                              {asset.change !== 0 && (
                                <span className={asset.change > 0 ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
                                  {asset.change > 0 ? "+" : ""}{asset.change}%
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedCard>
            
            <div className="space-y-6">
              <GlassPanel className="p-6">
                <div className="flex items-center mb-4">
                  <Lock className="text-accent mr-3" size={20} />
                  <h3 className="font-medium">Security Status</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">2-Factor Auth</span>
                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Social Recovery</span>
                    <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">Not Setup</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Multi-sig</span>
                    <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full">Disabled</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Settings size={16} className="mr-2" />
                  Security Settings
                </Button>
              </GlassPanel>
              
              <GlassPanel className="p-6">
                <div className="flex items-center mb-4">
                  <Info className="text-accent mr-3" size={20} />
                  <h3 className="font-medium">Connected Apps</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/30 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">CACAO DAO</p>
                      <p className="text-xs text-muted-foreground">Governance access</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <ArrowUpRight size={14} />
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-secondary/30 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">ReFi Tulum</p>
                      <p className="text-xs text-muted-foreground">Event passes</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <ArrowUpRight size={14} />
                    </Button>
                  </div>
                </div>
              </GlassPanel>
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
              <div className="text-center p-8">
                <h3 className="font-medium mb-2">Wallet Benefits</h3>
                <p className="text-muted-foreground mb-4">Connect more wallets to unlock additional benefits</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <GlassPanel className="p-4 text-center">
                    <p className="font-medium mb-2">1 Wallet</p>
                    <p className="text-sm text-muted-foreground">Basic membership</p>
                  </GlassPanel>
                  <GlassPanel className="p-4 text-center">
                    <p className="font-medium mb-2">3 Wallets</p>
                    <p className="text-sm text-muted-foreground">Premium benefits</p>
                  </GlassPanel>
                  <GlassPanel className="p-4 text-center">
                    <p className="font-medium mb-2">5 Wallets</p>
                    <p className="text-sm text-muted-foreground">Ultimate access</p>
                  </GlassPanel>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="p-4 bg-background/50 rounded-lg">
              <div className="text-center p-8">
                <h3 className="font-medium mb-2">Transaction History</h3>
                <p className="text-muted-foreground">Connect your wallets to view transaction history</p>
              </div>
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
