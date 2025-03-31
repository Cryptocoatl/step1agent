
import { AssetType } from "@/components/wallet/PortfolioOverview";

interface AssetCardProps {
  asset: AssetType;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  return (
    <div className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
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
  );
};
