
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ArrowRight, Award, FileText } from 'lucide-react';
import { Step1Logo } from '@/components/ui/Step1Logo';
import { Step1Token } from '@/components/ui/Step1Token';
import { Step1Character } from '@/components/ui/Step1Character';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  user: any;
  tokenBalance: number;
}

export const HeroSection = ({ user, tokenBalance }: HeroSectionProps) => {
  return (
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
            <Link to="/whitepaper">
              <FileText className="h-4 w-4" /> Read our Whitepaper
            </Link>
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
  );
};
