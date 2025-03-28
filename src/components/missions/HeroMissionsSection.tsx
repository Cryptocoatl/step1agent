
import { useState } from "react";
import { Mission, MissionCard } from "./MissionCard";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Crown, Flame, Heart, ListFilter, Rocket, Shield, Star, Zap } from "lucide-react";

const dummyMissions: Mission[] = [
  {
    id: "mission-1",
    title: "Stake in Genesis Pool",
    description: "Stake tokens in the Genesis Staking Pool to secure the network.",
    reward: {
      amount: 150,
      token: "STEP"
    },
    difficulty: "easy",
    timeRequired: "10 min",
    progress: 0,
    status: "available",
    category: "defi"
  },
  {
    id: "mission-2",
    title: "Vote on Proposal #37",
    description: "Cast your vote on the ecosystem expansion proposal.",
    reward: {
      amount: 75,
      token: "STEP"
    },
    difficulty: "easy",
    timeRequired: "5 min",
    progress: 0,
    status: "available",
    category: "dao"
  },
  {
    id: "mission-3",
    title: "Multi-Chain Integration",
    description: "Connect wallets from at least 3 different blockchains to your profile.",
    reward: {
      amount: 300,
      token: "STEP"
    },
    difficulty: "medium",
    timeRequired: "15 min",
    progress: 65,
    status: "in-progress",
    category: "defi"
  },
  {
    id: "mission-4",
    title: "AI Steward Training",
    description: "Complete the training to become an AI governance steward.",
    reward: {
      amount: 500,
      token: "STEP"
    },
    difficulty: "hard",
    timeRequired: "3 days",
    progress: 0,
    status: "available",
    category: "learn"
  },
  {
    id: "mission-5",
    title: "Community Champion",
    description: "Invite 5 friends to join the STEP1 ecosystem.",
    reward: {
      amount: 250,
      token: "STEP"
    },
    difficulty: "medium",
    timeRequired: "1 day",
    progress: 100,
    status: "completed",
    category: "social"
  },
  {
    id: "mission-6",
    title: "Cosmic Guardian",
    description: "Participate in network security by running a validator node.",
    reward: {
      amount: 1000,
      token: "STEP"
    },
    difficulty: "legendary",
    timeRequired: "7 days",
    progress: 0,
    status: "available",
    category: "defi"
  }
];

const HeroMissionsSection = () => {
  const [filter, setFilter] = useState<"all" | "defi" | "dao" | "social" | "learn">("all");
  
  const filteredMissions = filter === "all" 
    ? dummyMissions 
    : dummyMissions.filter(mission => mission.category === filter);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <AnimatedCard 
            animation="fade" 
            className="inline-block bg-secondary/30 text-accent font-medium text-sm px-4 py-1 rounded-full mb-4 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-accent" />
              Hero Missions
            </div>
          </AnimatedCard>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Become a Digital Hero</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Complete missions across the universe to earn rewards, level up your profile, and help build the future of Web3.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
              className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
            >
              <Rocket size={14} className="mr-1" />
              All Missions
            </Button>
            <Button 
              variant={filter === "defi" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("defi")}
              className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
            >
              <Zap size={14} className="mr-1" />
              DeFi
            </Button>
            <Button 
              variant={filter === "dao" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("dao")}
              className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
            >
              <Crown size={14} className="mr-1" />
              DAO
            </Button>
            <Button 
              variant={filter === "social" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("social")}
              className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
            >
              <Heart size={14} className="mr-1" />
              Social
            </Button>
            <Button 
              variant={filter === "learn" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("learn")}
              className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
            >
              <Star size={14} className="mr-1" />
              Learn
            </Button>
          </div>
          
          <div className="flex justify-center mb-10">
            <Tabs defaultValue="available" className="w-full max-w-md">
              <TabsList className="grid grid-cols-3 bg-white/5 backdrop-blur-sm border border-white/10">
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
          >
            Load More Missions
            <Flame size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroMissionsSection;
