
import { GlassPanel } from "@/components/ui/GlassPanel";

interface IdentityCredentialsPanelProps {
  progress: number;
  digitalID?: {
    wallets?: string[];
  };
  completedSteps: number[];
}

export const IdentityCredentialsPanel = ({ 
  progress, 
  digitalID, 
  completedSteps 
}: IdentityCredentialsPanelProps) => {
  return (
    <GlassPanel className="p-5">
      <h3 className="font-medium mb-3">Identity Credentials</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
          <span className="text-sm">Verification Level</span>
          <span className="text-sm font-medium">{progress < 25 ? "Basic" : progress < 75 ? "Intermediate" : "Advanced"}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
          <span className="text-sm">Connected Wallets</span>
          <span className="text-sm font-medium">{digitalID?.wallets?.length || (completedSteps.includes(1) ? '1' : '0')}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
          <span className="text-sm">DAO Status</span>
          <span className="text-sm font-medium">{completedSteps.includes(3) ? 'Member' : 'Not Registered'}</span>
        </div>
      </div>
    </GlassPanel>
  );
};
