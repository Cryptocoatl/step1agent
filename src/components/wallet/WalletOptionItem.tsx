
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { WalletOption } from "./WalletOptionsConfig";

interface WalletOptionItemProps {
  wallet: WalletOption;
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletOptionItem = ({
  wallet,
  isConnected,
  isConnecting,
  onConnect,
  onDisconnect,
}: WalletOptionItemProps) => {
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
            <h3 className="font-medium">{wallet.name}</h3>
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
          <Button 
            size="sm"
            onClick={onConnect}
            disabled={isConnecting}
            className="button-animated bg-accent hover:bg-accent/90"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
        )}
      </div>
      
      {isConnected && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Connected
          </p>
        </div>
      )}
    </GlassPanel>
  );
};
