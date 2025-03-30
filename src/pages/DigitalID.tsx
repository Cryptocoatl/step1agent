
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DigitalIDCard } from "@/components/digital-id/DigitalIDCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { Shield, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getBackendActor } from "@/services/icpService";
import { VerificationSteps, Step } from "@/components/digital-id/VerificationSteps";
import { ProgressTracker } from "@/components/digital-id/ProgressTracker";
import { MultiChainSupportPanel } from "@/components/digital-id/MultiChainSupportPanel";
import { WalletConnectorPanel } from "@/components/digital-id/WalletConnectorPanel";
import { IdentityCredentialsPanel } from "@/components/digital-id/IdentityCredentialsPanel";
import { BackgroundElements } from "@/components/digital-id/BackgroundElements";

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
  
  const steps: Step[] = [
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
        <BackgroundElements />
        
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
                <ProgressTracker progress={progress} />
                
                <VerificationSteps 
                  steps={steps}
                  activeStep={activeStep}
                  completedSteps={completedSteps}
                  setActiveStep={setActiveStep}
                  completeStep={completeStep}
                  isLoading={isLoading}
                  displayName={displayName}
                  setDisplayName={setDisplayName}
                />
              </AnimatedCard>
              
              <MultiChainSupportPanel />
            </div>
            
            <div>
              <DigitalIDCard expanded={true} />
              
              {activeStep === 1 && (
                <div className="mt-6">
                  <WalletConnectorPanel 
                    onWalletConnected={() => {
                      if (!completedSteps.includes(1)) {
                        completeStep(1);
                      }
                    }} 
                  />
                </div>
              )}
              
              <div className="mt-6 space-y-4">
                <IdentityCredentialsPanel 
                  progress={progress}
                  digitalID={digitalID}
                  completedSteps={completedSteps}
                />
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
