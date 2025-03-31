import { BenefitsDisplay } from "@/components/benefits/BenefitsDisplay";
import { DigitalIDCard } from "@/components/digital-id/DigitalIDCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgentButton } from "@/components/agent/StepOneAgentButton";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { HeroMissionsSection } from "@/components/missions/HeroMissionsSection";
import HeroProfileStats from "@/components/profile/HeroProfileStats";
import { ArrowRight, ChevronDown, Shield, Wallet, Globe, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedBenefitFilter, setSelectedBenefitFilter] = useState<"all" | "defi" | "events" | "ai">("all");

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SpaceBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(89,130,206,0.15),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <AnimatedCard 
                animation="fade" 
                className="inline-block bg-secondary/30 text-accent font-medium text-sm px-4 py-1 rounded-full mb-4 backdrop-blur-sm"
              >
                Digital Identity Platform
              </AnimatedCard>
              
              <div className="flex justify-center lg:justify-start mb-6">
                <AnimatedLogo size="lg" className="animate-slide-up" />
              </div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Digital Identity,
                <span className="text-accent"> Unified</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Connect your wallets across multiple blockchains and unlock premium benefits in DeFi, events, and AI services.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button className="px-6 button-animated bg-accent hover:bg-accent/90 group">
                  Get Started
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button variant="outline" className="px-6 button-animated border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10">
                  Learn More
                </Button>
              </motion.div>
            </div>
            
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-10"
              >
                <DigitalIDCard className="z-10 relative" />
                
                {/* Cosmic glow effect behind the card */}
                <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl z-0"></div>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <motion.a 
              href="#intro" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ y: 5 }}
            >
              Explore STEP1
              <ChevronDown size={16} className="ml-1 animate-pulse-soft" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <motion.section 
        id="intro" 
        className="py-20 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <AnimatedCard 
              animation="fade" 
              className="inline-block bg-secondary/30 text-accent font-medium text-sm px-4 py-1 rounded-full mb-4 backdrop-blur-sm"
            >
              Welcome to STEP1
            </AnimatedCard>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Empowering Your Digital Journey</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              STEP1 is your gateway to a unified digital identity across multiple blockchains. 
              We believe in a future where your digital presence is secure, portable, and entirely under your control.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <AnimatedCard animation="scale" delay={100} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 mx-auto">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Identity</h3>
              <p className="text-muted-foreground">
                Built on the Internet Computer Protocol, your digital identity is cryptographically secure and entirely owned by you.
              </p>
            </AnimatedCard>
            
            <AnimatedCard animation="scale" delay={200} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 mx-auto">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Chain Ecosystem</h3>
              <p className="text-muted-foreground">
                Seamlessly connect and manage your assets across ICP, Ethereum, Solana, Bitcoin, and more from a single interface.
              </p>
            </AnimatedCard>
            
            <AnimatedCard animation="scale" delay={300} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 mx-auto">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unlock Benefits</h3>
              <p className="text-muted-foreground">
                Your STEP1 ID opens doors to exclusive events, premium DeFi opportunities, and next-generation AI services.
              </p>
            </AnimatedCard>
          </div>
          
          <div className="mt-16 text-center">
            <GlassPanel className="p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg mb-6">
                We're building a future where digital identity transcends platforms and blockchains. 
                STEP1 is more than a product—it's a movement toward true digital sovereignty.
              </p>
              <Button className="px-6 button-animated bg-accent hover:bg-accent/90 group">
                Join Our Mission
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </GlassPanel>
          </div>
        </div>
      </motion.section>

      {/* Hero Profile Stats Section */}
      <motion.section 
        className="py-10 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <HeroProfileStats />
        </div>
      </motion.section>

      {/* Hero Missions Section */}
      <HeroMissionsSection />

      {/* Features Section */}
      <motion.section 
        id="features" 
        className="py-20 bg-secondary/20 backdrop-blur-sm"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <AnimatedCard 
              animation="fade" 
              className="inline-block bg-secondary/30 text-accent font-medium text-sm px-4 py-1 rounded-full mb-4 backdrop-blur-sm"
            >
              Core Features
            </AnimatedCard>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform seamlessly connects your digital identity across multiple blockchains, unlocking a world of exclusive benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard animation="scale" delay={100} className="p-6 bg-white/5 backdrop-blur-md border border-white/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Digital Identity</h3>
              <p className="text-muted-foreground mb-4">
                Create and manage your secure digital identity on the Internet Computer Protocol.
              </p>
              <Button variant="link" className="p-0 text-accent">
                Learn More <ArrowRight size={14} className="ml-1" />
              </Button>
            </AnimatedCard>
            
            <AnimatedCard animation="scale" delay={200} className="p-6 bg-white/5 backdrop-blur-md border border-white/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                <Wallet size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Multi-chain Integration</h3>
              <p className="text-muted-foreground mb-4">
                Connect wallets from ICP, Solana, Bitcoin, EVM chains, and Holochain in one place.
              </p>
              <Button variant="link" className="p-0 text-accent">
                Learn More <ArrowRight size={14} className="ml-1" />
              </Button>
            </AnimatedCard>
            
            <AnimatedCard animation="scale" delay={300} className="p-6 bg-white/5 backdrop-blur-md border border-white/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Token-Gated Benefits</h3>
              <p className="text-muted-foreground mb-4">
                Unlock exclusive DeFi opportunities, events, and AI services with your connected wallets.
              </p>
              <Button variant="link" className="p-0 text-accent">
                Learn More <ArrowRight size={14} className="ml-1" />
              </Button>
            </AnimatedCard>
          </div>
        </div>
      </motion.section>

      {/* Wallet Connection Section */}
      <motion.section 
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <AnimatedCard 
              animation="fade" 
              className="inline-block bg-secondary/30 text-accent font-medium text-sm px-4 py-1 rounded-full mb-4 backdrop-blur-sm"
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
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        className="py-20 bg-secondary/20 backdrop-blur-sm"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <AnimatedCard 
              animation="fade" 
              className="inline-block bg-secondary/30 text-accent font-medium text-sm px-4 py-1 rounded-full mb-4 backdrop-blur-sm"
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
                className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
              >
                All Benefits
              </Button>
              <Button 
                variant={selectedBenefitFilter === "defi" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedBenefitFilter("defi")}
                className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
              >
                DeFi
              </Button>
              <Button 
                variant={selectedBenefitFilter === "events" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedBenefitFilter("events")}
                className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
              >
                Events
              </Button>
              <Button 
                variant={selectedBenefitFilter === "ai" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedBenefitFilter("ai")}
                className="button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10"
              >
                AI Services
              </Button>
            </div>
          </div>
          
          <BenefitsDisplay filter={selectedBenefitFilter} />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <GlassPanel className="p-10 max-w-4xl mx-auto relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10">
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
                <Button variant="outline" className="px-6 py-6 text-lg button-animated bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/10">
                  Request Demo
                </Button>
              </div>
            </div>
          </GlassPanel>
        </div>
      </motion.section>

      <Footer />

      {/* Step One Agent Button (fixed position) */}
      <StepOneAgentButton />
    </div>
  );
};

export default Index;
