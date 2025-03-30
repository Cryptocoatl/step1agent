
import { GlassPanel } from "@/components/ui/GlassPanel";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleClass?: string;
}

export const StatsCard = ({ title, value, subtitle, subtitleClass }: StatsCardProps) => {
  return (
    <GlassPanel className="p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className={`text-xs ${subtitleClass || "text-muted-foreground"} mt-1 flex items-center`}>
        {subtitle}
      </p>
    </GlassPanel>
  );
};
