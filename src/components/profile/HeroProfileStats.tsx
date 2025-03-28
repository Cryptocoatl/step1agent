
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Award, CheckCircle, Flame, Shield, Star, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroProfileStats = () => {
  // Hero stats data
  const stats = {
    level: 7,
    exp: 3450,
    nextLevel: 5000,
    rank: "Space Guardian",
    completedMissions: 12,
    totalMissions: 24,
    tokens: [
      { symbol: "STEP", amount: 2750, change: "+350" },
      { symbol: "ICP", amount: 5.25, change: "+0.75" },
      { symbol: "ETH", amount: 0.15, change: "+0.01" }
    ],
    achievements: [
      { name: "First Steps", icon: CheckCircle, completed: true },
      { name: "Chain Explorer", icon: Zap, completed: true },
      { name: "Community Builder", icon: Trophy, completed: true },
      { name: "Governance Expert", icon: Shield, completed: false },
      { name: "Cosmic Guardian", icon: Star, completed: false }
    ]
  };
  
  const progressPercent = (stats.exp / stats.nextLevel) * 100;
  
  return (
    <GlassPanel className="p-6 relative overflow-hidden" intensity="medium">
      {/* Decorative cosmic elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-accent/5 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-accent/5 translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              Hero Profile
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="ml-2"
              >
                <Shield className="text-accent h-5 w-5" />
              </motion.div>
            </h3>
            <p className="text-muted-foreground text-sm">Level up your digital identity</p>
          </div>
          
          <div className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm font-medium flex items-center mt-2 sm:mt-0">
            <Trophy size={14} className="mr-1" />
            {stats.rank}
          </div>
        </div>
        
        {/* Hero Level Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <Flame size={16} className="text-orange-400 mr-1" />
              <span className="font-medium">Level {stats.level}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {stats.exp}/{stats.nextLevel} XP
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        
        {/* Mission Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-sm text-muted-foreground mb-1">Completed Missions</div>
            <div className="text-xl font-bold">{stats.completedMissions}/{stats.totalMissions}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-sm text-muted-foreground mb-1">Completion Rate</div>
            <div className="text-xl font-bold">{Math.round((stats.completedMissions / stats.totalMissions) * 100)}%</div>
          </div>
        </div>
        
        {/* Token Rewards */}
        <div className="mb-6">
          <h4 className="text-sm font-medium flex items-center mb-3">
            <Award size={14} className="text-yellow-400 mr-1" />
            Token Rewards
          </h4>
          <div className="space-y-2">
            {stats.tokens.map((token, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-2">
                    {token.symbol.charAt(0)}
                  </div>
                  <span>{token.symbol}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{token.amount}</div>
                  <div className="text-xs text-green-400">{token.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Achievements */}
        <div>
          <h4 className="text-sm font-medium flex items-center mb-3">
            <Star size={14} className="text-yellow-400 mr-1" />
            Achievements
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {stats.achievements.map((achievement, index) => {
              const AchievementIcon = achievement.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center p-2 rounded-lg ${
                    achievement.completed 
                      ? "bg-accent/10 text-accent" 
                      : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  <AchievementIcon 
                    size={16} 
                    className="mx-auto mb-1" 
                  />
                  <div className="text-xs font-medium">{achievement.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default HeroProfileStats;
