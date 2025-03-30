
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface WalletHeaderProps {
  onSyncWallets: () => void;
  onGetHelp: () => void;
}

export const WalletHeader = ({ onSyncWallets, onGetHelp }: WalletHeaderProps) => {
  return (
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
            onClick={onSyncWallets}
            className="button-animated"
          >
            Sync Wallets
          </Button>
          <Button 
            onClick={onGetHelp}
            variant="outline"
            className="button-animated"
          >
            Get Help
          </Button>
        </div>
      </div>
    </div>
  );
};
