
import { useState } from "react";
import { WalletOption } from "./WalletOptionsConfig";
import { WalletOptionItem } from "./WalletOptionItem";

interface WalletTabContentProps {
  title: string;
  description: string;
  wallets: WalletOption[];
  connectedWallets: string[];
  connectingWallet: string | null;
  onConnect: (walletId: string) => void;
  onDisconnect: (walletId: string) => void;
}

export const WalletTabContent = ({
  title,
  description,
  wallets,
  connectedWallets,
  connectingWallet,
  onConnect,
  onDisconnect,
}: WalletTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-2">{title}</h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      
      <div className="grid gap-4">
        {wallets.map((wallet) => (
          <WalletOptionItem 
            key={wallet.id}
            wallet={wallet}
            isConnected={connectedWallets.includes(wallet.id)}
            isConnecting={connectingWallet === wallet.id}
            onConnect={() => onConnect(wallet.id)}
            onDisconnect={() => onDisconnect(wallet.id)}
          />
        ))}
      </div>
    </div>
  );
};
