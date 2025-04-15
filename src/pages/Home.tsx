
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { HeroMissionsSection } from '@/components/missions/HeroMissionsSection';
import { useAuth } from '@/providers/SupabaseAuthProvider';
import { getTotalTokenBalance } from '@/services/rewardsService';
import { useState, useEffect } from 'react';
import { Leaf, Users, Wallet, Globe, Award, ArrowRight, FileText } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { Step1Logo } from '@/components/ui/Step1Logo';
import { Step1Token } from '@/components/ui/Step1Token';
import { Step1Character } from '@/components/ui/Step1Character';
import { AnimatedLogo } from '@/components/ui/AnimatedLogo';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90 relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-background z-0 opacity-70"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="star-field absolute inset-0 z-0 opacity-25" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2 space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <Step1Logo size="lg" animated={true} />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Digital Identity Ecosystem
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full" />
              </div>
            </div>
            
            {/* Mission Statement */}
            <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl">
              <p className="text-xl text-amber-100 font-medium flex items-center mb-2">
                <span className="mr-2">🌱</span> Our Mission:
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                To create a regenerative digital ecosystem that empowers individuals with sovereign identity control while connecting communities across blockchains for positive global impact.
              </p>
              <Button 
                asChild
                variant="outline" 
                size="sm" 
                className="border-amber-500/30 text-amber-100 hover:bg-amber-500/10 flex items-center gap-2"
              >
                <a href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" /> Read our Whitepaper
                </a>
              </Button>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Connect your identity across blockchains. Participate in regenerative DAOs.
              Earn rewards for positive impact on the ecosystem.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-medium"
              >
                <Link to="/digital-id">Create Digital ID</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-amber-500/30 text-amber-100">
                <Link to="/learn">Learn More</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mt-8">
              <Step1Token size="sm" />
              <span className="text-amber-200 font-medium">STEP1 Token</span>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center relative">
            <Step1Character size="xl" className="absolute -top-10 right-0 lg:right-12" />
            
            <AnimatedCard animation="fade" className="w-full max-w-md">
              <GlassPanel className="p-6 relative overflow-hidden border border-amber-500/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-bl-full z-0"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center text-amber-100">
                    <Award className="mr-2 h-5 w-5 text-amber-400" />
                    {user ? `Welcome Back, ${user.email?.split('@')[0]}` : 'Join Step1 Today'}
                  </h2>
                  {user ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Your STEP1 token balance:</p>
                      <div className="flex items-center gap-3">
                        <Step1Token size="sm" spinning={true} />
                        <div className="text-3xl font-bold text-amber-300">{tokenBalance} <span className="text-sm text-muted-foreground">STEP1</span></div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="mt-4 border-amber-500/30 hover:bg-amber-500/10">
                        <Link to="/wallet-dashboard">View Wallet <ArrowRight className="h-4 w-4 ml-2" /></Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Create your cross-chain digital identity and join regenerative communities worldwide.</p>
                      <Button asChild size="sm" className="mt-2 bg-amber-500 hover:bg-amber-600 text-black">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <AnimatedCard animation="fade" delay={100} className="h-full">
            <GlassPanel className="p-6 h-full border border-amber-500/20">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-amber-100">Digital Identity</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Create and manage your cross-chain digital identity for Web3 participation.</p>
                <Button asChild variant="outline" size="sm" className="border-amber-500/30 hover:bg-amber-500/10">
                  <Link to="/digital-id">Explore Identity</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
          
          <AnimatedCard animation="fade" delay={200} className="h-full">
            <GlassPanel className="p-6 h-full border border-amber-500/20">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-amber-100">Multichain Wallet</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Connect wallets from multiple blockchains to your unified digital identity.</p>
                <Button asChild variant="outline" size="sm" className="border-amber-500/30 hover:bg-amber-500/10">
                  <Link to="/wallet-dashboard">Manage Wallets</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
          
          <AnimatedCard animation="fade" delay={300} className="h-full">
            <GlassPanel className="p-6 h-full border border-amber-500/20">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-amber-100">DAO Governance</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Participate in decentralized governance for regenerative projects.</p>
                <Button asChild variant="outline" size="sm" className="border-amber-500/30 hover:bg-amber-500/10">
                  <Link to="/dao">Join DAOs</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
          
          <AnimatedCard animation="fade" delay={400} className="h-full">
            <GlassPanel className="p-6 h-full border border-amber-500/20">
              <div className="flex flex-col h-full">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-amber-100">Step1 Agent</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Get assistance with our AI-powered agent for all your regenerative needs.</p>
                <Button asChild variant="outline" size="sm" className="border-amber-500/30 hover:bg-amber-500/10">
                  <Link to="/step1-agent">Chat with Agent</Link>
                </Button>
              </div>
            </GlassPanel>
          </AnimatedCard>
        </div>

        {/* Token Section */}
        <AnimatedCard animation="scale" className="mb-20">
          <GlassPanel className="p-8 border border-amber-500/20">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3 flex justify-center">
                <Step1Token size="lg" spinning={true} />
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold mb-4 text-amber-100">STEP1 Token Economy</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  The STEP1 token powers our ecosystem, enabling governance voting, rewards for regenerative actions, and access to premium features.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                    <h4 className="font-medium text-amber-200 mb-1">Governance</h4>
                    <p className="text-sm text-muted-foreground">Vote on proposals and shape the future of Step1</p>
                  </div>
                  <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                    <h4 className="font-medium text-amber-200 mb-1">Rewards</h4>
                    <p className="text-sm text-muted-foreground">Earn tokens for completing missions and contributing</p>
                  </div>
                  <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                    <h4 className="font-medium text-amber-200 mb-1">Utility</h4>
                    <p className="text-sm text-muted-foreground">Access premium features and services in the ecosystem</p>
                  </div>
                </div>
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Link to="/learn/tokenomics">Learn About Tokenomics</Link>
                </Button>
              </div>
            </div>
          </GlassPanel>
        </AnimatedCard>

        {/* Missions & Projects Section */}
        <HeroMissionsSection />
      </div>
      
      <Footer />
    </div>
  );
}
