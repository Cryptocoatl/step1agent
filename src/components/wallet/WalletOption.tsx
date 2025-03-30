
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { CheckCircle, ExternalLink, Info } from "lucide-react";
import { WalletType } from "@/services/icpWalletService";

interface WalletOptionProps {
  wallet: {
    id: WalletType;
    name: string;
    icon: string;
    description: string;
    color: string;
    url: string;
  };
  isConnected: boolean;
  isConnecting: boolean;
  principalId: string | null;
  isAvailable: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletOption = ({
  wallet,
  isConnected,
  isConnecting,
  principalId,
  isAvailable,
  onConnect,
  onDisconnect,
}: WalletOptionProps) => {
  return (
    <GlassPanel 
      className={cn(
        "p-4 transition-all duration-300",
        isConnected 
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
              {!isAvailable && (
                <span className="ml-2 text-muted-foreground flex items-center gap-1" aria-label="Not detected in browser">
                  <Info size={14} className="text-muted-foreground" />
                  <span className="text-xs">Not detected</span>
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">{wallet.description}</p>
          </div>
        </div>
        
        {isConnected ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDisconnect}
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
              onClick={onConnect}
              disabled={isConnecting || (!isAvailable && wallet.id !== 'stoic' && wallet.id !== 'nfid')}
              className="button-animated bg-accent hover:bg-accent/90"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </div>
        )}
      </div>
      
      {isConnected && principalId && (
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
  );
};
