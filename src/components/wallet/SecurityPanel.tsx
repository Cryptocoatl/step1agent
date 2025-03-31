
import { Lock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";

export const SecurityPanel = () => {
  return (
    <GlassPanel className="p-6">
      <div className="flex items-center mb-4">
        <Lock className="text-accent mr-3" size={20} />
        <h3 className="font-medium">Security Status</h3>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">2-Factor Auth</span>
          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Enabled</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Social Recovery</span>
          <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">Not Setup</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Multi-sig</span>
          <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full">Disabled</span>
        </div>
      </div>
      
      <Button variant="outline" className="w-full">
        <Settings size={16} className="mr-2" />
        Security Settings
      </Button>
    </GlassPanel>
  );
};
