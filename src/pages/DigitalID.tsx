
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DigitalIDCard } from "@/components/digital-id/DigitalIDCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { MultiChainWalletConnector } from "@/components/digital-id/MultiChainWalletConnector";
import { CheckCircle, Shield, User, ArrowLeft, CheckCircle2, Globe, Key, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { getBackendActor } from "@/services/icpService";

const VerificationStep = ({ title, description, completed, active, onClick }: {
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
  onClick: () => void;
}) => (
  <div 
    className={`p-4 border rounded-lg transition-all ${completed ? 'bg-accent/10 border-accent' : active ? 'bg-secondary/50 border-accent/50' : 'bg-secondary/30 border-border'}`}
    onClick={onClick}
  >
    <div className="flex items-start">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${completed ? 'bg-accent text-white' : 'bg-secondary'}`}>
        {completed ? <CheckCircle size={18} /> : <User size={18} />}
      </div>
      <div className="flex-1">
        <h3 className="font-medium flex items-center">
          {title}
          {completed && <CheckCircle2 size={16} className="ml-2 text-green-500" />}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </div>
);

interface DigitalID {
  displayName: string;
  wallets: string[];
  daoMemberships: string[];
  createdAt: number;
}

const DigitalID = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showAgent, setShowAgent] = useState(false);
  const [digitalID, setDigitalID] = useState<DigitalID | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  
  const steps = [
    {
      title: "Basic Identity Verification",
      description: "Set up your basic digital identity on ICP"
    },
    {
      title: "Connect Primary Wallet",
      description: "Connect your primary blockchain wallet"
    },
    {
      title: "Complete Profile",
      description: "Add profile details and preferences"
    },
    {
      title: "DAO Registration",
      description: "Register for DAO participation"
    }
  ];
  
  // Fetch digital ID from backend canister
  useEffect(() => {
    const fetchDigitalID = async () => {
      setIsLoading(true);
      try {
        const actor = getBackendActor();
        const result = await actor.getDigitalID();
        
        if (result.length > 0) {
          setDigitalID(result[0]);
          
          // Mark appropriate steps as completed
          const newCompleted: number[] = [];
          newCompleted.push(0); // Basic ID is created
          
          if (result[0].wallets.length > 0) {
            newCompleted.push(1); // Wallet connected
          }
          
          if (result[0].displayName) {
            newCompleted.push(2); // Profile completed
          }
          
          if (result[0].daoMemberships.length > 0) {
            newCompleted.push(3); // DAO registered
          }
          
          setCompletedSteps(newCompleted);
          
          // Set next incomplete step as active
          for (let i = 0; i < 4; i++) {
            if (!newCompleted.includes(i)) {
              setActiveStep(i);
              break;
            }
          }
        }
      } catch (err) {
        console.error("Error fetching digital ID:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDigitalID();
  }, []);
  
  const completeStep = async (index: number) => {
    if (!completedSteps.includes(index)) {
      setIsLoading(true);
      
      try {
        const actor = getBackendActor();
        
        // Handle different step completion logic
        switch (index) {
          case 0: // Basic Identity
            if (!digitalID) {
              await actor.registerDigitalID(displayName || "STEP1 User");
              toast({
                title: "Digital ID Created",
                description: "Your basic digital identity has been established on ICP",
              });
            }
            break;
            
          case 1: // Connect Wallet
            // Wallet connection is handled by the MultiChainWalletConnector component
            // This just confirms the step
            break;
            
          case 2: // Complete Profile
            // Would normally update profile details
            break;
            
          case 3: // DAO Registration
            // Would normally register for DAO membership
            break;
        }
        
        // Mark step as completed
        const newCompleted = [...completedSteps, index];
        setCompletedSteps(newCompleted);
        
        // Set next step active
        if (index < steps.length - 1) {
          setActiveStep(index + 1);
        }
        
        toast({
          title: "Step completed",
          description: `You've completed: ${steps[index].title}`,
        });
      } catch (err) {
        console.error("Error completing step:", err);
        toast({
          title: "Error",
          description: "Failed to complete this step. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const progress = completedSteps.length > 0 
    ? Math.round((completedSteps.length / steps.length) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        {/* Space background connectivity elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-48 h-48 bg-accent/20 rounded-full blur-3xl top-10 left-20 animate-pulse-soft"></div>
          <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse-soft" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient">STEP1 Digital Identity</h1>
                <p className="text-muted-foreground mt-1">Validate your identity across multiple blockchains</p>
              </div>
              
              <Button 
                onClick={() => setShowAgent(true)}
                variant="outline"
                className="button-animated"
              >
                <Shield className="mr-2 h-4 w-4" />
                AI Guardian
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <AnimatedCard animation="fade" className="mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Key className="mr-2 h-5 w-5 text-accent" />
                  Verification Progress
                </h2>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{progress}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <VerificationStep 
                      key={index}
                      title={step.title}
                      description={step.description}
                      completed={completedSteps.includes(index)}
                      active={activeStep === index}
                      onClick={() => setActiveStep(index)}
                    />
                  ))}
                </div>
                
                <div className="mt-6">
                  {activeStep === 0 && !completedSteps.includes(0) && (
                    <>
                      <div className="mb-4">
                        <label className="text-sm text-muted-foreground block mb-2">Choose your display name</label>
                        <input
                          type="text"
                          className="bg-secondary/50 w-full p-2 rounded-md border border-border"
                          placeholder="Enter display name"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  
                  <Button 
                    onClick={() => completeStep(activeStep)}
                    className="w-full button-animated bg-accent hover:bg-accent/90"
                    disabled={completedSteps.includes(activeStep) || isLoading}
                  >
                    {isLoading ? "Processing..." : completedSteps.includes(activeStep) ? "Completed" : "Complete Current Step"}
                  </Button>
                </div>
              </AnimatedCard>
              
              <GlassPanel className="p-5">
                <div className="flex items-center mb-4">
                  <Globe className="text-accent mr-3" size={24} />
                  <h3 className="font-medium">Multi-Chain Support</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Your STEP1 Digital ID connects across multiple blockchains including ICP, Ethereum, Solana, Bitcoin, and Holochain.
                </p>
                
                <div className="bg-secondary/50 p-3 rounded-lg text-xs">
                  <p className="flex items-center text-muted-foreground">
                    <CheckCircle size={14} className="mr-2 text-green-500" />
                    Unified identity across chains
                  </p>
                  <p className="flex items-center text-muted-foreground mt-2">
                    <CheckCircle size={14} className="mr-2 text-green-500" />
                    Soulbound NFT verification
                  </p>
                  <p className="flex items-center text-muted-foreground mt-2">
                    <CheckCircle size={14} className="mr-2 text-green-500" />
                    Reputation protocol integration
                  </p>
                </div>
              </GlassPanel>
            </div>
            
            <div>
              <DigitalIDCard expanded={true} />
              
              {activeStep === 1 && (
                <div className="mt-6">
                  <GlassPanel className="p-5">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-accent" />
                      Connect Multi-Chain Wallets
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Link your wallets from different blockchains to complete your Digital ID
                    </p>
                    <MultiChainWalletConnector onWalletConnected={(chain, address) => {
                      toast({
                        title: "Wallet Connected",
                        description: `Your ${chain} wallet has been linked to your Digital ID`,
                      });
                      if (!completedSteps.includes(1)) {
                        completeStep(1);
                      }
                    }} />
                  </GlassPanel>
                </div>
              )}
              
              <div className="mt-6 space-y-4">
                <GlassPanel className="p-5">
                  <h3 className="font-medium mb-3">Identity Credentials</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Verification Level</span>
                      <span className="text-sm font-medium">{progress < 25 ? "Basic" : progress < 75 ? "Intermediate" : "Advanced"}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Connected Wallets</span>
                      <span className="text-sm font-medium">{digitalID?.wallets?.length || (completedSteps.includes(1) ? '1' : '0')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">DAO Status</span>
                      <span className="text-sm font-medium">{completedSteps.includes(3) ? 'Member' : 'Not Registered'}</span>
                    </div>
                  </div>
                </GlassPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {showAgent && <StepOneAgent />}
    </div>
  );
};

export default DigitalID;
