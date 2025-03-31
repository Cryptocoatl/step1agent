
import { GlassPanel } from "@/components/ui/GlassPanel";

export const WalletBenefitsTab = () => {
  return (
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
  );
};
