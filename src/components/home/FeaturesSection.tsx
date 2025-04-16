
import { Link } from 'react-router-dom';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/button';
import { Leaf, Users, Wallet, Globe } from 'lucide-react';

export const FeaturesSection = () => {
  return (
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
  );
};
