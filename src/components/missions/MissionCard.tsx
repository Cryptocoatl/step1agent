
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Award, Clock, Flame, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  impact: "personal" | "community" | "global";
  actionUrl?: string;
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

const impactConfig = {
  personal: { label: "Personal Growth", bg: "from-blue-400/20 to-green-400/20" },
  community: { label: "Community Impact", bg: "from-yellow-400/20 to-orange-400/20" },
  global: { label: "Global Transformation", bg: "from-purple-400/20 to-pink-400/20" },
};

interface MissionCardProps {
  mission: Mission;
  className?: string;
  onMissionAction?: (mission: Mission) => void;
}

export const MissionCard = ({ mission, className, onMissionAction }: MissionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const difficulty = difficultyConfig[mission.difficulty];
  const category = categoryConfig[mission.category];
  const impact = impactConfig[mission.impact || "personal"];
  const DifficultyIcon = difficulty.icon;

  const statusStyles = {
    available: "border-l-4 border-l-blue-500",
    "in-progress": "border-l-4 border-l-yellow-500",
    completed: "border-l-4 border-l-green-500",
  };

  const statusButtons = {
    available: { text: "Start Mission", variant: "default" as const },
    "in-progress": { text: "Continue", variant: "default" as const },
    completed: { text: "Completed", variant: "outline" as const },
  };

  const handleAction = () => {
    if (onMissionAction && mission.status !== "completed") {
      onMissionAction(mission);
    }
  };

  const ActionButton = () => {
    if (mission.actionUrl && mission.status !== "completed") {
      return (
        <Link to={mission.actionUrl} className="w-full">
          <Button
            className="w-full button-animated"
            variant={statusButtons[mission.status].variant}
            onClick={handleAction}
          >
            {statusButtons[mission.status].text}
          </Button>
        </Link>
      );
    }
    
    return (
      <Button
        className="w-full button-animated"
        variant={statusButtons[mission.status].variant}
        disabled={mission.status === "completed"}
        onClick={handleAction}
      >
        {statusButtons[mission.status].text}
      </Button>
    );
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
          "transition-all duration-300",
          mission.impact === "global" && "border-t-2 border-t-purple-500"
        )}
        glow={isHovered}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header with hero mission styling */}
          <div className="mb-3 relative">
            {/* Background gradient based on impact */}
            <div className={cn(
              "absolute inset-0 rounded-lg -m-2 opacity-20 bg-gradient-to-r",
              impact.bg
            )}></div>
            
            <div className="flex justify-between items-start relative">
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

            <ActionButton />
            
            {/* Impact badge */}
            {mission.impact === "global" && (
              <div className="mt-3 flex justify-center">
                <div className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                  World-changing mission
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
};
