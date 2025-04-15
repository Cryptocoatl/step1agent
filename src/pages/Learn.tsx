
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { BookOpen, BookText, Coins, Globe, LucideIcon, Brain, Zap } from 'lucide-react';
import { useAuth } from '@/providers/SupabaseAuthProvider';
import { getTotalTokenBalance } from '@/services/rewardsService';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface LessonCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  tokenReward: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
}

const Learn = () => {
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState(0);
  
  useEffect(() => {
    if (user) {
      getTotalTokenBalance().then(balance => {
        setTokenBalance(balance);
      });
    }
  }, [user]);
  
  const lessonCards: LessonCard[] = [
    {
      id: 'blockchain-basics',
      title: 'Blockchain Basics',
      description: 'Learn the fundamentals of blockchain technology and how it powers decentralized applications.',
      icon: Brain,
      route: '/learn/blockchain-basics',
      tokenReward: 10,
      difficulty: 'Beginner',
      estimatedTime: '15 min'
    },
    {
      id: 'tokenomics-101',
      title: 'Tokenomics 101',
      description: 'Understand token economics, utility, distribution models, and how they create value in Web3.',
      icon: Coins,
      route: '/learn/tokenomics',
      tokenReward: 15,
      difficulty: 'Intermediate',
      estimatedTime: '20 min'
    },
    {
      id: 'web3-identity',
      title: 'Digital Identity in Web3',
      description: 'Explore how digital identity works in the decentralized web and why it matters.',
      icon: Globe,
      route: '/learn/web3-identity',
      tokenReward: 20,
      difficulty: 'Intermediate',
      estimatedTime: '25 min'
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      description: 'Discover how smart contracts enable trustless interactions and create new possibilities.',
      icon: BookText,
      route: '/learn/smart-contracts',
      tokenReward: 25,
      difficulty: 'Advanced',
      estimatedTime: '30 min'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatedCard animation="fade" className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Learn & Earn</h1>
              <p className="text-muted-foreground">
                Expand your knowledge and earn STEP1 tokens by completing educational content
              </p>
            </div>
            
            {user && (
              <div className="mt-4 md:mt-0 bg-primary/10 rounded-lg px-4 py-2 border border-primary/30">
                <div className="text-sm text-muted-foreground">Your Token Balance</div>
                <div className="text-xl font-bold text-primary">{tokenBalance} STEP1</div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {lessonCards.map((card) => (
              <Card key={card.id} className="overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <card.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                      {card.difficulty}
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-4">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-amber-500" />
                    <span>Earn {card.tokenReward} STEP1 tokens</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <BookOpen className="h-4 w-4 mr-1 text-sky-500" />
                    <span>{card.estimatedTime} read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={card.route}>Start Learning</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AnimatedCard>
      </main>
      <Footer />
    </div>
  );
};

export default Learn;
