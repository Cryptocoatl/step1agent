
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Award } from "lucide-react";
import { MultiChainWalletConnector } from "@/components/digital-id/MultiChainWalletConnector";
import { toast } from "@/hooks/use-toast";

interface WalletConnectorPanelProps {
  onWalletConnected: () => void;
}

export const WalletConnectorPanel = ({ onWalletConnected }: WalletConnectorPanelProps) => {
  return (
    <GlassPanel className="p-5">
      <h3 className="font-medium mb-3 flex items-center">
        <Award className="mr-2 h-5 w-5 text-accent" />
        Connect Multi-Chain Wallets
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Link your wallets from different blockchains to complete your Digital ID
      </p>
      <MultiChainWalletConnector onWalletConnected={(chain, address) => {
        toast({
          title: "Wallet Connected",
          description: `Your ${chain} wallet has been linked to your Digital ID`,
        });
        onWalletConnected();
      }} />
    </GlassPanel>
  );
};
