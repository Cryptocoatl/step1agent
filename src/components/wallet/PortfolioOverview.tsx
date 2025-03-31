
import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AssetCard } from "@/components/wallet/AssetCard";
import { StatsCard } from "@/components/wallet/StatsCard";

export interface AssetType {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  chain: 'icp' | 'solana' | 'bitcoin' | 'ethereum' | 'holochain';
}

interface PortfolioOverviewProps {
  totalValue: number;
  connectedWallets: string[];
  assets: AssetType[];
}

export const PortfolioOverview = ({ totalValue, connectedWallets, assets }: PortfolioOverviewProps) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Portfolio Overview</h2>
        <Button variant="outline" size="sm" className="h-8">
          <BarChart3 size={16} className="mr-2" />
          Analytics
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard 
          title="Total Value" 
          value={`$${totalValue.toLocaleString()}`} 
          subtitle="+3.8% last 24h" 
          subtitleClass="text-green-500"
        />
        
        <StatsCard 
          title="Connected Wallets" 
          value={connectedWallets.length.toString()} 
          subtitle="of 5 possible chains"
        />
        
        <StatsCard 
          title="Benefits Access" 
          value="Basic" 
          subtitle="Connect more wallets to unlock" 
          subtitleClass="text-blue-500"
        />
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Assets</h3>
        <div className="space-y-3">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
};
