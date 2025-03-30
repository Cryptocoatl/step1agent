
import { useEffect, useState } from "react";
import { MissionCard } from "@/components/missions/MissionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { awardTokens, isContentCompleted } from "@/services/rewardsService"; 
import { getConnectedWallets } from "@/services/walletService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

export const HeroMissionsSection = () => {
  const { user } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize missions
  useEffect(() => {
    const initMissions = async () => {
      setLoading(true);
      
      // Base mission data
      const baseMissions: Mission[] = [
        {
          id: "connect-wallet",
          title: "Connect Your First Wallet",
          description: "Link your first blockchain wallet to your Digital ID",
          reward: { amount: 5, token: "STEP1" },
          difficulty: "easy",
          timeRequired: "5 minutes",
          progress: 0,
          status: "available",
          category: "defi",
          impact: "personal",
          actionUrl: "/digital-id"
        },
        {
          id: "join-dao",
          title: "Join the STEP1 DAO",
          description: "Become a member of the STEP1 governance DAO",
          reward: { amount: 10, token: "STEP1" },
          difficulty: "easy",
          timeRequired: "10 minutes",
          progress: 0,
          status: "available",
          category: "dao",
          impact: "community",
          actionUrl: "/governance"
        },
        {
          id: "watch-wallet-video",
          title: "Learn About Crypto Wallets",
          description: "Watch the educational video about cryptocurrency wallets",
          reward: { amount: 10, token: "STEP1" },
          difficulty: "easy",
          timeRequired: "5 minutes",
          progress: 0,
          status: "available",
          category: "learn",
          impact: "personal",
          actionUrl: "/learn"
        },
        {
          id: "complete-profile",
          title: "Complete Your Profile",
          description: "Add details to your STEP1 profile to earn tokens",
          reward: { amount: 10, token: "STEP1" },
          difficulty: "easy",
          timeRequired: "5 minutes",
          progress: 0,
          status: "available",
          category: "social",
          impact: "personal",
          actionUrl: "/digital-id"
        },
        {
          id: "learn-exchanges",
          title: "Exchanges Explained",
          description: "Learn how cryptocurrency exchanges work",
          reward: { amount: 10, token: "STEP1" },
          difficulty: "medium",
          timeRequired: "7 minutes",
          progress: 0,
          status: "available",
          category: "learn",
          impact: "personal",
          actionUrl: "/learn"
        },
        {
          id: "secure-wallet",
          title: "Secure Your Wallet",
          description: "Learn best practices for wallet security",
          reward: { amount: 15, token: "STEP1" },
          difficulty: "medium",
          timeRequired: "10 minutes",
          progress: 0,
          status: "available",
          category: "security",
          impact: "personal",
          actionUrl: "/learn"
        },
      ];
      
      // If user is logged in, update mission statuses
      if (user) {
        try {
          // Check wallet connections
          const wallets = await getConnectedWallets();
          
          // Check completed educational content
          const walletVideoCompleted = await isContentCompleted("what-is-wallet");
          const exchangesVideoCompleted = await isContentCompleted("what-are-exchanges");
          const securityVideoCompleted = await isContentCompleted("secure-your-keys");
          
          // Check profile completion
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, bio')
            .eq('id', user.id)
            .single();
          
          // Update missions based on completion status
          const updatedMissions = baseMissions.map(mission => {
            // Wallet connection mission
            if (mission.id === "connect-wallet") {
              if (wallets.length > 0) {
                return { ...mission, status: "completed", progress: 100 };
              }
            }
            
            // Profile completion mission
            if (mission.id === "complete-profile") {
              if (profile?.display_name && profile?.bio) {
                return { ...mission, status: "completed", progress: 100 };
              } else if (profile?.display_name || profile?.bio) {
                return { ...mission, status: "in-progress", progress: 50 };
              }
            }
            
            // Educational videos
            if (mission.id === "watch-wallet-video" && walletVideoCompleted) {
              return { ...mission, status: "completed", progress: 100 };
            }
            
            if (mission.id === "learn-exchanges" && exchangesVideoCompleted) {
              return { ...mission, status: "completed", progress: 100 };
            }
            
            if (mission.id === "secure-wallet" && securityVideoCompleted) {
              return { ...mission, status: "completed", progress: 100 };
            }
            
            return mission;
          });
          
          setMissions(updatedMissions);
        } catch (error) {
          console.error("Error updating mission statuses:", error);
          setMissions(baseMissions);
        }
      } else {
        setMissions(baseMissions);
      }
      
      setLoading(false);
    };
    
    initMissions();
  }, [user]);

  const handleStartMission = async (mission: Mission) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to start missions",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would navigate to the mission screen
    // For now, we'll just simulate starting the mission
    if (mission.status === "available") {
      // Update local state
      setMissions(prev => 
        prev.map(m => 
          m.id === mission.id 
            ? { ...m, status: "in-progress", progress: 10 } 
            : m
        )
      );
      
      toast({
        title: "Mission Started",
        description: `You've started the "${mission.title}" mission`
      });
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Loading missions...</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Hero Missions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete missions to earn STEP1 tokens and increase your impact in the ecosystem
        </p>
      </div>
      
      <Tabs defaultValue="all" className="max-w-4xl mx-auto">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Missions</TabsTrigger>
          <TabsTrigger value="defi">DeFi</TabsTrigger>
          <TabsTrigger value="dao">DAO</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission} 
              onMissionAction={handleStartMission}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="defi" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'defi').map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission} 
              onMissionAction={handleStartMission}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="dao" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'dao').map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission} 
              onMissionAction={handleStartMission}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="learn" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'learn').map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission} 
              onMissionAction={handleStartMission}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="social" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'social').map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission} 
              onMissionAction={handleStartMission}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add a default export for backward compatibility
export default HeroMissionsSection;
