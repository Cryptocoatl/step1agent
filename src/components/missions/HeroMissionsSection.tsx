import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Mission {
  id: string;
  title: string;
  description: string;
  status: "available" | "in-progress" | "completed";
  progress: number;
  reward: {
    amount: number;
    token: string;
  };
  difficulty: "easy" | "medium" | "hard" | "legendary";
  timeRequired: string;
  category: "defi" | "dao" | "social" | "learn" | "security";
  impact: "personal" | "community" | "global";
  actionUrl?: string;
}

const HeroMissionsSection = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  
  useEffect(() => {
    // Example of loading missions
    const loadedMissions: Mission[] = [
      {
        id: "wallet-security",
        title: "Enhanced Wallet Security",
        description: "Set up 2FA and learn about best practices for securing your crypto assets",
        status: "available",
        progress: 0,
        reward: {
          amount: 15,
          token: "STEP1"
        },
        difficulty: "easy",
        timeRequired: "10 minutes",
        category: "security",
        impact: "personal",
        actionUrl: "/learn/security"
      },
      {
        id: "defi-tutorial",
        title: "DeFi 101 Tutorial",
        description: "Complete our DeFi tutorial to understand decentralized finance principles",
        status: "available",
        progress: 0,
        reward: {
          amount: 20,
          token: "STEP1"
        },
        difficulty: "medium",
        timeRequired: "30 minutes",
        category: "defi",
        impact: "personal",
        actionUrl: "/learn/defi"
      },
      {
        id: "dao-participation",
        title: "Participate in DAO Governance",
        description: "Vote on a proposal in a partner DAO to influence project direction",
        status: "available",
        progress: 0,
        reward: {
          amount: 25,
          token: "STEP1"
        },
        difficulty: "medium",
        timeRequired: "60 minutes",
        category: "dao",
        impact: "community",
        actionUrl: "/governance"
      },
      {
        id: "social-engagement",
        title: "Engage on Social Media",
        description: "Share your STEP1 journey on social media to spread awareness",
        status: "available",
        progress: 0,
        reward: {
          amount: 10,
          token: "STEP1"
        },
        difficulty: "easy",
        timeRequired: "5 minutes",
        category: "social",
        impact: "community"
      },
      {
        id: "learn-blockchain",
        title: "Blockchain Basics Course",
        description: "Complete our introductory blockchain course to earn rewards",
        status: "available",
        progress: 0,
        reward: {
          amount: 30,
          token: "STEP1"
        },
        difficulty: "medium",
        timeRequired: "45 minutes",
        category: "learn",
        impact: "personal",
        actionUrl: "/learn/blockchain"
      }
    ];
    
    setMissions(loadedMissions);
  }, []);
  
  const startMission = (missionId: string) => {
    setMissions(prevMissions => {
      return prevMissions.map(mission => {
        if (mission.id === missionId) {
          return {
            ...mission,
            status: "in-progress",
            progress: 25
          };
        }
        return mission;
      });
    });
  };
  
  const completeMission = (missionId: string) => {
    setMissions(prevMissions => {
      return prevMissions.map(mission => {
        if (mission.id === missionId) {
          return {
            ...mission,
            status: "completed" as const,
            progress: 100
          };
        }
        return mission;
      });
    });
    
    toast({
      title: "Mission Completed!",
      description: "You've earned rewards for completing this mission.",
    });
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-2">Featured Missions</h2>
          <p className="text-muted-foreground">Complete missions to earn STEP1 tokens and level up your skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map(mission => (
            <Card key={mission.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {mission.title}
                  <Badge variant="secondary">{mission.difficulty}</Badge>
                </CardTitle>
                <CardDescription>{mission.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <Progress value={mission.progress} />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span>Time: {mission.timeRequired}</span>
                  <span>Impact: {mission.impact}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <Sparkles className="mr-2 h-4 w-4 inline-block" />
                  <span className="font-medium">{mission.reward.amount} {mission.reward.token}</span>
                </div>
                
                {mission.status === "available" && (
                  <Button onClick={() => startMission(mission.id)} className="button-animated">
                    Start Mission
                  </Button>
                )}
                
                {mission.status === "in-progress" && (
                  <Link to={mission.actionUrl || "#"}>
                    <Button className="button-animated">Continue</Button>
                  </Link>
                )}
                
                {mission.status === "completed" && (
                  <Button variant="secondary" disabled>
                    Completed
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HeroMissionsSection };
