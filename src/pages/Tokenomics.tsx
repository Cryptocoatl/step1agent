
import React, { useEffect, useState } from 'react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { useAuth } from '@/providers/SupabaseAuthProvider';
import { awardTokens, isContentCompleted, markContentCompleted } from '@/services/rewardsService';
import { Progress } from '@/components/ui/progress';
import { Loader2, BookOpen, Coins, PieChart, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Tokenomics() {
  const { user, isLoading } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkingCompletion, setCheckingCompletion] = useState(true);
  const contentId = 'tokenomics-101';

  useEffect(() => {
    if (!user) return;

    const checkCompletion = async () => {
      setCheckingCompletion(true);
      const completed = await isContentCompleted(contentId);
      setIsCompleted(completed);
      setCheckingCompletion(false);
    };

    checkCompletion();
  }, [user]);

  const handleProgressUpdate = () => {
    // Simulate reading progress
    if (progress < 100) {
      const nextProgress = Math.min(progress + 10, 100);
      setProgress(nextProgress);
    }
  };

  const handleCompleteLesson = async () => {
    if (isCompleted || !user) return;

    try {
      await markContentCompleted(contentId, 'learn');
      setIsCompleted(true);
      
      // Award tokens for completing the tokenomics lesson
      await awardTokens(
        'learn_completion',
        15,
        'Completed the Tokenomics 101 lesson'
      );
      
      toast({
        title: "Lesson Completed",
        description: "You've earned 15 STEP1 tokens for completing this lesson"
      });
    } catch (error) {
      console.error("Error marking content as completed:", error);
      toast({
        title: "Error",
        description: "Failed to mark lesson as completed",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedCard animation="fade" className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Coins className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Tokenomics 101</h1>
                <p className="text-muted-foreground">Understanding the fundamentals of token economics</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <GlassPanel className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">What is Tokenomics?</h2>
              <p className="mb-4">
                Tokenomics is the study of the economic systems and policies that govern digital tokens or cryptocurrencies. 
                It encompasses factors like token supply, distribution mechanisms, utility, and governance structures.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card onMouseEnter={handleProgressUpdate}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5 text-primary" />
                      Token Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The allocation of tokens among various stakeholders, including founders, investors, community, and treasury.</p>
                  </CardContent>
                </Card>
                
                <Card onMouseEnter={handleProgressUpdate}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                      Token Supply
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The mechanisms governing how many tokens exist, whether they're inflationary, deflationary, or fixed in supply.</p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Token Utility in STEP1</h3>
              <p className="mb-4" onMouseEnter={handleProgressUpdate}>
                STEP1 tokens serve multiple purposes within our ecosystem:
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p onMouseEnter={handleProgressUpdate}>
                    <strong>Governance:</strong> Token holders can participate in platform governance decisions
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p onMouseEnter={handleProgressUpdate}>
                    <strong>Rewards:</strong> Users earn tokens for contributing to the ecosystem and completing tasks
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p onMouseEnter={handleProgressUpdate}>
                    <strong>Access:</strong> Premium features and services can be unlocked using tokens
                  </p>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p onMouseEnter={handleProgressUpdate}>
                    <strong>Staking:</strong> Tokens can be staked to earn additional rewards and benefits
                  </p>
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Token Economic Model</h3>
              <p className="mb-6" onMouseEnter={handleProgressUpdate}>
                The STEP1 token follows a deflationary model with a total supply of 100 million tokens.
                As the platform grows and more users complete tasks, tokens are rewarded from the ecosystem rewards pool,
                which makes up 40% of the total supply.
              </p>
              
              <div className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/30" onMouseEnter={handleProgressUpdate}>
                <h4 className="font-medium mb-2">Token Distribution Breakdown:</h4>
                <ul className="space-y-1">
                  <li>• Ecosystem Rewards: 40%</li>
                  <li>• Team & Advisors: 20% (vested over 3 years)</li>
                  <li>• Treasury: 20%</li>
                  <li>• Community Growth: 15%</li>
                  <li>• Initial Contributors: 5%</li>
                </ul>
              </div>
              
              {!isLoading && user && (
                <div className="flex justify-end mt-8">
                  <Button 
                    onClick={handleCompleteLesson} 
                    disabled={isCompleted || checkingCompletion}
                    className="button-animated"
                  >
                    {checkingCompletion ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...</>
                    ) : isCompleted ? (
                      <><BookOpen className="mr-2 h-4 w-4" /> Lesson Completed</>
                    ) : (
                      <><BookOpen className="mr-2 h-4 w-4" /> Mark as Completed</>
                    )}
                  </Button>
                </div>
              )}
            </GlassPanel>
          </AnimatedCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
