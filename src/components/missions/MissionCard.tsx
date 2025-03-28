
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Award, Clock, Flame, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: {
    amount: number;
    token: string;
  };
  difficulty: "easy" | "medium" | "hard" | "legendary";
  timeRequired: string;
  progress: number;
  status: "available" | "in-progress" | "completed";
  category: "defi" | "dao" | "social" | "learn";
}

const difficultyConfig = {
  easy: { icon: Zap, color: "text-green-400", bg: "bg-green-400/20" },
  medium: { icon: Flame, color: "text-yellow-400", bg: "bg-yellow-400/20" },
  hard: { icon: Shield, color: "text-orange-400", bg: "bg-orange-400/20" },
  legendary: { icon: Star, color: "text-purple-400", bg: "bg-purple-400/20" },
};

const categoryConfig = {
  defi: { label: "DeFi", color: "bg-blue-400/20 text-blue-400" },
  dao: { label: "DAO", color: "bg-purple-400/20 text-purple-400" },
  social: { label: "Social", color: "bg-pink-400/20 text-pink-400" },
  learn: { label: "Learn", color: "bg-green-400/20 text-green-400" },
};

interface MissionCardProps {
  mission: Mission;
  className?: string;
}

export const MissionCard = ({ mission, className }: MissionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const difficulty = difficultyConfig[mission.difficulty];
  const category = categoryConfig[mission.category];
  const DifficultyIcon = difficulty.icon;

  const statusStyles = {
    available: "border-l-4 border-l-blue-500",
    "in-progress": "border-l-4 border-l-yellow-500",
    completed: "border-l-4 border-l-green-500",
  };

  const statusButtons = {
    available: { text: "Start Mission", variant: "default" as const },
    "in-progress": { text: "Continue", variant: "default" as const },
    completed: { text: "Claimed", variant: "outline" as const },
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn("transform transition-all duration-300", className)}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassPanel
        className={cn(
          "overflow-hidden h-full",
          statusStyles[mission.status],
          "transition-all duration-300"
        )}
        glow={isHovered}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className={cn("text-xs px-2 py-1 rounded-full", category.color)}>
              {category.label}
            </div>
            <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full", difficulty.bg)}>
              <DifficultyIcon className={difficulty.color} size={12} />
              <span className={cn("text-xs font-medium", difficulty.color)}>
                {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
              </span>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-lg font-semibold mb-2">{mission.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{mission.description}</p>

          {/* Progress */}
          {mission.status === "in-progress" && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{mission.progress}%</span>
              </div>
              <Progress value={mission.progress} className="h-2" />
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{mission.timeRequired}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award size={14} className="text-yellow-400" />
                <span className="text-xs font-medium">
                  {mission.reward.amount} {mission.reward.token}
                </span>
              </div>
            </div>

            <Button
              className="w-full button-animated"
              variant={statusButtons[mission.status].variant}
              disabled={mission.status === "completed"}
            >
              {statusButtons[mission.status].text}
            </Button>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
};
