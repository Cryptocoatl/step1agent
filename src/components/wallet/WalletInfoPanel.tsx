
import { AlertCircle } from "lucide-react";

export const WalletInfoPanel = () => {
  return (
    <div className="text-center text-sm text-muted-foreground mt-8 bg-secondary/50 p-4 rounded-lg">
      <div className="flex items-center justify-center mb-2">
        <AlertCircle size={16} className="mr-2" />
        <span className="font-medium">Compatible Wallets</span>
      </div>
      <p>
        Connect ICP wallets to access decentralized services on the Internet Computer. 
        Some wallets may require installation as browser extensions.
      </p>
    </div>
  );
};
