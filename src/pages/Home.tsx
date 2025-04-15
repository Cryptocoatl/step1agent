
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import RootLayout from '@/components/layout/RootLayout';
import { HeroMissionsSection } from '@/components/missions/HeroMissionsSection';
import { useAuth } from '@/providers/SupabaseAuthProvider';
import { getTotalTokenBalance } from '@/services/rewardsService';
import { useState, useEffect } from 'react';
import { Leaf, Users, Wallet, Globe, Award, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    if (user) {
      const loadTokenBalance = async () => {
        const balance = await getTotalTokenBalance();
        setTokenBalance(balance);
      };
      loadTokenBalance();
    }
  }, [user]);

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Digital Identity Ecosystem
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Connect your identity across blockchains. Participate in regenerative DAOs.
              Earn rewards for positive impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Link to="/digital-id">Create Digital ID</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <AnimatedCard animation="fade">
              <GlassPanel className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-bl-full z-0"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Award className="mr-2 h-5 w-5 text-accent" />
                    {user ? `Welcome Back, ${user.email?.split('@')[0]}` : 'Join Step1 Today'}
                  </h2>
                  {user ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Your STEP1 token balance:</p>
                      <div className="text-3xl font-bold">{tokenBalance} <span className="text-sm text-muted-foreground">STEP1</span></div>
                      <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link to="/wallet-dashboard">View Wallet <ArrowRight className="h-4 w-4 ml-2" /></Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Create your cross-chain digital identity and join regenerative communities worldwide.</p>
                      <Button asChild size="sm" className="mt-2">
                        <Link to="/login">Sign Up Now <ArrowRight className="h-4 w-4 ml-2" /></Link>
                      </Button>
                    </div>
                  )}
                </div>
              </GlassPanel>
            </AnimatedCard>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AnimatedCard animation="fade" className="h-full">
            <GlassPanel className="p-6 h-full">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-green-400 to-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Digital Identity</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Create and manage your cross-chain digital identity for Web3 participation.</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/digital-id">Explore Identity</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
          
          <AnimatedCard animation="fade" className="h-full">
            <GlassPanel className="p-6 h-full">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Multichain Wallet</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Connect wallets from multiple blockchains to your unified digital identity.</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/wallet-dashboard">Manage Wallets</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
          
          <AnimatedCard animation="fade" className="h-full">
            <GlassPanel className="p-6 h-full">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">DAO Governance</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Participate in decentralized governance for regenerative projects.</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/dao">Join DAOs</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
          
          <AnimatedCard animation="fade" className="h-full">
            <GlassPanel className="p-6 h-full">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">Step1 Agent</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Get assistance with our AI-powered agent for all your regenerative needs.</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/step1-agent">Chat with Agent</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
        </div>

        {/* Missions & Projects Section */}
        <HeroMissionsSection />
      </div>
    </RootLayout>
  );
}
