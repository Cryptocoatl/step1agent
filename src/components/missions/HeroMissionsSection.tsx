
import { MissionCard } from "@/components/missions/MissionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HeroMissionsSection = () => {
  const missions = [
    {
      id: "mission-1",
      title: "Connect Your First Wallet",
      description: "Link your first blockchain wallet to your Digital ID",
      reward: { amount: 50, token: "STEP1" },
      difficulty: "easy" as const,
      timeRequired: "5 minutes",
      progress: 0,
      status: "available" as const,
      category: "defi" as const,
      impact: "Low"
    },
    {
      id: "mission-2",
      title: "Join the STEP1 DAO",
      description: "Become a member of the STEP1 governance DAO",
      reward: { amount: 100, token: "STEP1" },
      difficulty: "easy" as const,
      timeRequired: "10 minutes",
      progress: 0,
      status: "available" as const,
      category: "dao" as const,
      impact: "Medium"
    },
    {
      id: "mission-3",
      title: "Stake STEP1 Tokens",
      description: "Stake your STEP1 tokens in the community pool",
      reward: { amount: 75, token: "STEP1" },
      difficulty: "medium" as const,
      timeRequired: "15 minutes",
      progress: 35,
      status: "in-progress" as const,
      category: "defi" as const,
      impact: "Medium"
    },
    {
      id: "mission-4",
      title: "Complete Web3 Tutorial",
      description: "Learn the basics of Web3 and blockchain technology",
      reward: { amount: 200, token: "STEP1" },
      difficulty: "hard" as const,
      timeRequired: "45 minutes",
      progress: 0,
      status: "available" as const,
      category: "learn" as const,
      impact: "High"
    },
    {
      id: "mission-5",
      title: "Invite 3 Friends",
      description: "Invite friends to join the STEP1 ecosystem",
      reward: { amount: 150, token: "STEP1" },
      difficulty: "medium" as const,
      timeRequired: "15 minutes",
      progress: 100,
      status: "completed" as const,
      category: "social" as const,
      impact: "High"
    },
    {
      id: "mission-6",
      title: "Bridge Assets Cross-Chain",
      description: "Move assets between different blockchains",
      reward: { amount: 300, token: "STEP1" },
      difficulty: "legendary" as const,
      timeRequired: "30 minutes",
      progress: 0,
      status: "available" as const,
      category: "defi" as const,
      impact: "Very High"
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Hero Missions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete missions to earn rewards and increase your impact in the ecosystem
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
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </TabsContent>
        
        <TabsContent value="defi" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'defi').map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </TabsContent>
        
        <TabsContent value="dao" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'dao').map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </TabsContent>
        
        <TabsContent value="learn" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'learn').map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </TabsContent>
        
        <TabsContent value="social" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.filter(m => m.category === 'social').map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
