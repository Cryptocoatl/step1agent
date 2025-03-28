
import { BenefitsDisplay } from "@/components/benefits/BenefitsDisplay";
import { DigitalIDCard } from "@/components/digital-id/DigitalIDCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { ArrowRight, ChevronDown, Shield, Wallet } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [showAgent, setShowAgent] = useState(true);
  const [selectedBenefitFilter, setSelectedBenefitFilter] = useState<"all" | "defi" | "events" | "ai">("all");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(89,130,206,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <AnimatedCard 
                animation="fade" 
                className="inline-block bg-secondary/50 text-accent font-medium text-sm px-4 py-1 rounded-full mb-4"
              >
                Digital Identity Platform
              </AnimatedCard>
              
              <div className="flex justify-center lg:justify-start mb-6">
                <AnimatedLogo size="lg" className="animate-slide-up" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
                Your Digital Identity,
                <span className="text-accent"> Unified</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
                Connect your wallets across multiple blockchains and unlock premium benefits in DeFi, events, and AI services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "200ms" }}>
                <Button className="px-6 button-animated bg-accent hover:bg-accent/90 group">
                  Get Started
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button variant="outline" className="px-6 button-animated">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative animate-blur-in">
              <DigitalIDCard className="z-10 relative" />
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <a 
              href="#features" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore Features
              <ChevronDown size={16} className="ml-1 animate-pulse-soft" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <AnimatedCard 
              animation="fade" 
              className="inline-block bg-secondary text-accent font-medium text-sm px-4 py-1 rounded-full mb-4"
            >
              Core Features
            </AnimatedCard>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform seamlessly connects your digital identity across multiple blockchains, unlocking a world of exclusive benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard animation="scale" delay={100} className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Digital Identity</h3>
              <p className="text-muted-foreground mb-4">
                Create and manage your secure digital identity on the Internet Computer Protocol.
              </p>
              <Button variant="link" className="p-0">
                Learn More <ArrowRight size={14} className="ml-1" />
              </Button>
            </AnimatedCard>
            
            <AnimatedCard animation="scale" delay={200} className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                <Wallet size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Multi-chain Integration</h3>
              <p className="text-muted-foreground mb-4">
                Connect wallets from ICP, Solana, Bitcoin, EVM chains, and Holochain in one place.
              </p>
              <Button variant="link" className="p-0">
                Learn More <ArrowRight size={14} className="ml-1" />
              </Button>
            </AnimatedCard>
            
            <AnimatedCard animation="scale" delay={300} className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Token-Gated Benefits</h3>
              <p className="text-muted-foreground mb-4">
                Unlock exclusive DeFi opportunities, events, and AI services with your connected wallets.
              </p>
              <Button variant="link" className="p-0">
                Learn More <ArrowRight size={14} className="ml-1" />
              </Button>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Wallet Connection Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <AnimatedCard 
              animation="fade" 
              className="inline-block bg-secondary text-accent font-medium text-sm px-4 py-1 rounded-full mb-4"
            >
              Connect Your Wallets
            </AnimatedCard>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Seamless Wallet Integration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Link your wallets from multiple blockchains to access all membership benefits.
            </p>
          </div>
          
          <WalletConnect />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <AnimatedCard 
              animation="fade" 
              className="inline-block bg-secondary text-accent font-medium text-sm px-4 py-1 rounded-full mb-4"
            >
              Exclusive Benefits
            </AnimatedCard>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Unlock Premium Experiences</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect your wallets to access a world of exclusive benefits across DeFi, events, and AI services.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button 
                variant={selectedBenefitFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedBenefitFilter("all")}
                className="button-animated"
              >
                All Benefits
              </Button>
              <Button 
                variant={selectedBenefitFilter === "defi" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedBenefitFilter("defi")}
                className="button-animated"
              >
                DeFi
              </Button>
              <Button 
                variant={selectedBenefitFilter === "events" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedBenefitFilter("events")}
                className="button-animated"
              >
                Events
              </Button>
              <Button 
                variant={selectedBenefitFilter === "ai" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedBenefitFilter("ai")}
                className="button-animated"
              >
                AI Services
              </Button>
            </div>
          </div>
          
          <BenefitsDisplay filter={selectedBenefitFilter} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <GlassPanel className="p-10 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <AnimatedLogo size="md" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Join?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Create your digital identity today and unlock a world of exclusive benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="px-6 py-6 text-lg button-animated bg-accent hover:bg-accent/90 group">
                  Get Started Now
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button variant="outline" className="px-6 py-6 text-lg button-animated">
                  Request Demo
                </Button>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      <Footer />

      {/* Step One Agent (fixed position) */}
      {showAgent && <StepOneAgent />}
    </div>
  );
};

export default Index;
