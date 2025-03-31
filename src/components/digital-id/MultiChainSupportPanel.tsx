
import { Globe, CheckCircle } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

export const MultiChainSupportPanel = () => {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center mb-4">
        <Globe className="text-accent mr-3" size={24} />
        <h3 className="font-medium">Multi-Chain Support</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Your STEP1 Digital ID connects across multiple blockchains including ICP, Ethereum, Solana, Bitcoin, and Holochain.
      </p>
      
      <div className="bg-secondary/50 p-3 rounded-lg text-xs">
        <p className="flex items-center text-muted-foreground">
          <CheckCircle size={14} className="mr-2 text-green-500" />
          Unified identity across chains
        </p>
        <p className="flex items-center text-muted-foreground mt-2">
          <CheckCircle size={14} className="mr-2 text-green-500" />
          Soulbound NFT verification
        </p>
        <p className="flex items-center text-muted-foreground mt-2">
          <CheckCircle size={14} className="mr-2 text-green-500" />
          Reputation protocol integration
        </p>
      </div>
    </GlassPanel>
  );
};
