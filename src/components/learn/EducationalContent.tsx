
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { awardTokens, markContentCompleted, isContentCompleted } from "@/services/rewardsService";
import { Play, CheckCircle, Lock } from "lucide-react";
import { useEffect } from "react";

// Educational content definition
const educationalContent = [
  {
    id: "what-is-wallet",
    title: "What is a Crypto Wallet?",
    description: "Learn the basics of cryptocurrency wallets and how they work",
    videoUrl: "https://www.youtube.com/embed/d8IBpfs9bf4",
    category: "basics",
    reward: 10,
    duration: "5 min"
  },
  {
    id: "custodial-vs-non-custodial",
    title: "Custodial vs Non-Custodial Wallets",
    description: "Understand the difference between wallet types and their security implications",
    videoUrl: "https://www.youtube.com/embed/dKdMx4G_Z4c",
    category: "basics",
    reward: 10,
    duration: "8 min"
  },
  {
    id: "secure-your-keys",
    title: "How to Secure Your Private Keys",
    description: "Best practices for protecting your wallet's private keys",
    videoUrl: "https://www.youtube.com/embed/nkdHmBB1aIU",
    category: "security",
    reward: 15,
    duration: "10 min"
  },
  {
    id: "what-are-exchanges",
    title: "Crypto Exchanges Explained",
    description: "Learn how cryptocurrency exchanges work and their role in the ecosystem",
    videoUrl: "https://www.youtube.com/embed/S7WjmE0fktQ",
    category: "trading",
    reward: 10,
    duration: "7 min"
  },
  {
    id: "cold-wallets",
    title: "Cold Wallets: Ultimate Security",
    description: "Discover hardware wallets and cold storage solutions for maximum security",
    videoUrl: "https://www.youtube.com/embed/t7VKD5cPFHE",
    category: "security",
    reward: 15,
    duration: "12 min"
  },
];

const VideoPlayer = ({ 
  content, 
  onComplete,
  isCompleted 
}: { 
  content: typeof educationalContent[0], 
  onComplete: () => void,
  isCompleted: boolean 
}) => {
  const [watched, setWatched] = useState(false);
  
  // Simulate video completion after a shorter time (would normally use video events)
  const simulateWatching = () => {
    // In a real app, we'd check if the user watched a significant portion of the video
    setTimeout(() => {
      setWatched(true);
    }, 3000); // 3 seconds for demo
  };
  
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black/40 rounded-lg overflow-hidden relative">
        <iframe 
          src={content.videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onPlay={simulateWatching}
        ></iframe>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Duration: {content.duration}
          </p>
          <p className="text-sm text-accent font-medium">
            Reward: {content.reward} STEP1 Tokens
          </p>
        </div>
        
        <Button 
          onClick={onComplete}
          disabled={isCompleted || !watched}
          className="button-animated"
        >
          {isCompleted ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>
    </div>
  );
};

const ContentCard = ({ 
  content, 
  isSelected, 
  onClick, 
  isCompleted 
}: { 
  content: typeof educationalContent[0], 
  isSelected: boolean, 
  onClick: () => void, 
  isCompleted: boolean 
}) => (
  <div 
    className={cn(
      "p-4 rounded-lg cursor-pointer transition-all",
      isSelected 
        ? "bg-accent/20 border border-accent" 
        : "bg-secondary/30 border border-border hover:bg-secondary/50"
    )}
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium">{content.title}</h3>
      {isCompleted && <CheckCircle size={16} className="text-green-500" />}
    </div>
    <p className="text-sm text-muted-foreground mb-2">{content.description}</p>
    <div className="flex justify-between items-center text-xs">
      <span className="text-muted-foreground">{content.duration}</span>
      <span className="text-accent font-medium">{content.reward} STEP1</span>
    </div>
  </div>
);

export const EducationalContent = () => {
  const { user } = useAuth();
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedContent, setCompletedContent] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  
  // Check which content has been completed
  useEffect(() => {
    if (!user) return;
    
    const checkCompletedContent = async () => {
      setLoading(true);
      const completed = new Set<string>();
      
      for (const content of educationalContent) {
        const isComplete = await isContentCompleted(content.id);
        if (isComplete) {
          completed.add(content.id);
        }
      }
      
      setCompletedContent(completed);
      setLoading(false);
    };
    
    checkCompletedContent();
  }, [user]);
  
  const handleCompleteContent = async (contentId: string) => {
    if (!user || completedContent.has(contentId)) return;
    
    setLoading(true);
    try {
      // Find the content
      const content = educationalContent.find(c => c.id === contentId);
      if (!content) return;
      
      // Mark as completed in the database
      const success = await markContentCompleted(contentId, 'video');
      
      if (success) {
        // Award tokens
        await awardTokens(
          'video_watch',
          content.reward,
          `Reward for watching "${content.title}"`
        );
        
        // Update local state
        setCompletedContent(prev => new Set(prev).add(contentId));
      }
    } catch (error) {
      console.error("Error completing content:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return (
      <GlassPanel className="p-6 text-center">
        <Lock className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">Authentication Required</h3>
        <p className="text-muted-foreground">
          Please sign in to access educational content and earn STEP1 tokens
        </p>
      </GlassPanel>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Learn & Earn</h2>
        <p className="text-muted-foreground">
          Watch educational videos to earn STEP1 tokens and enhance your crypto knowledge
        </p>
      </div>
      
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <TabsContent value="basics" className="m-0 space-y-3">
              {educationalContent
                .filter(content => content.category === "basics")
                .map(content => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    isSelected={selectedContent === content.id}
                    onClick={() => setSelectedContent(content.id)}
                    isCompleted={completedContent.has(content.id)}
                  />
                ))
              }
            </TabsContent>
            
            <TabsContent value="security" className="m-0 space-y-3">
              {educationalContent
                .filter(content => content.category === "security")
                .map(content => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    isSelected={selectedContent === content.id}
                    onClick={() => setSelectedContent(content.id)}
                    isCompleted={completedContent.has(content.id)}
                  />
                ))
              }
            </TabsContent>
            
            <TabsContent value="trading" className="m-0 space-y-3">
              {educationalContent
                .filter(content => content.category === "trading")
                .map(content => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    isSelected={selectedContent === content.id}
                    onClick={() => setSelectedContent(content.id)}
                    isCompleted={completedContent.has(content.id)}
                  />
                ))
              }
            </TabsContent>
          </div>
          
          <div className="lg:col-span-2">
            <GlassPanel className="p-6 h-full">
              {selectedContent ? (
                <>
                  <h3 className="text-xl font-medium mb-4">
                    {educationalContent.find(c => c.id === selectedContent)?.title}
                  </h3>
                  
                  <VideoPlayer 
                    content={educationalContent.find(c => c.id === selectedContent)!}
                    onComplete={() => handleCompleteContent(selectedContent)}
                    isCompleted={completedContent.has(selectedContent)}
                  />
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <Play className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Video</h3>
                  <p className="text-muted-foreground">
                    Choose an educational video from the list to start learning about crypto and earn STEP1 tokens
                  </p>
                </div>
              )}
            </GlassPanel>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
