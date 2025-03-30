
import { Info, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface ConnectedApp {
  name: string;
  description: string;
}

interface ConnectedAppsPanelProps {
  apps: ConnectedApp[];
}

export const ConnectedAppsPanel = ({ apps }: ConnectedAppsPanelProps) => {
  return (
    <GlassPanel className="p-6">
      <div className="flex items-center mb-4">
        <Info className="text-accent mr-3" size={20} />
        <h3 className="font-medium">Connected Apps</h3>
      </div>
      
      <div className="space-y-3">
        {apps.map((app, index) => (
          <div key={index} className="p-3 bg-secondary/30 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{app.name}</p>
              <p className="text-xs text-muted-foreground">{app.description}</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <ArrowUpRight size={14} />
            </Button>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};
