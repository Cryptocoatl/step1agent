
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DigitalIDCard } from "@/components/digital-id/DigitalIDCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { Shield, ArrowLeft, LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { VerificationSteps, Step } from "@/components/digital-id/VerificationSteps";
import { ProgressTracker } from "@/components/digital-id/ProgressTracker";
import { MultiChainSupportPanel } from "@/components/digital-id/MultiChainSupportPanel";
import { WalletConnectorPanel } from "@/components/digital-id/WalletConnectorPanel";
import { IdentityCredentialsPanel } from "@/components/digital-id/IdentityCredentialsPanel";
import { BackgroundElements } from "@/components/digital-id/BackgroundElements";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { awardTokens, getTotalTokenBalance, getUserRewards } from "@/services/rewardsService";
import { getConnectedWallets } from "@/services/walletService";

const DigitalID = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showAgent, setShowAgent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  
  const steps: Step[] = [
    {
      title: "Basic Identity Verification",
      description: "Set up your basic digital identity"
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
  
  // Fetch user data
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          // Get profile data
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          if (profileData) {
            setProfile(profileData);
            setDisplayName(profileData.display_name || '');
            
            // Mark appropriate steps as completed
            const newCompleted: number[] = [0]; // Basic ID is created if user exists
            
            // Check wallets
            const wallets = await getConnectedWallets();
            if (wallets.length > 0) {
              newCompleted.push(1); // Wallet connected
            }
            
            // Check profile completion
            if (profileData.display_name && 
                profileData.bio && 
                (profileData.social_links && Object.keys(profileData.social_links).length > 0)) {
              newCompleted.push(2); // Profile completed
            }
            
            // Get token balance
            const balance = await getTotalTokenBalance();
            setTokenBalance(balance);
            
            setCompletedSteps(newCompleted);
            
            // Set next incomplete step as active
            for (let i = 0; i < steps.length; i++) {
              if (!newCompleted.includes(i)) {
                setActiveStep(i);
                break;
              }
            }
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  const completeStep = async (index: number) => {
    if (!user || completedSteps.includes(index)) return;
    
    setIsLoading(true);
    
    try {
      // Handle different step completion logic
      switch (index) {
        case 0: // Basic Identity
          // First step is already completed if the user exists
          if (!completedSteps.includes(0)) {
            // Award tokens for completing this step
            await awardTokens(
              'profile_completion', 
              10, 
              'Reward for creating your basic digital identity'
            );
            
            // Mark step as completed
            setCompletedSteps(prev => [...prev, 0]);
          }
          break;
          
        case 1: // Connect Wallet
          // This is handled by the wallet connector component
          // We'll skip this here as the wallet connector will call onWalletConnected
          break;
          
        case 2: // Complete Profile
          if (!displayName) {
            toast({
              title: "Display Name Required",
              description: "Please enter a display name to complete this step",
              variant: "destructive"
            });
            setIsLoading(false);
            return;
          }
          
          // Update profile
          const { error } = await supabase
            .from('profiles')
            .update({ 
              display_name: displayName 
            })
            .eq('id', user.id);
          
          if (error) throw error;
          
          // Award tokens for completing profile
          await awardTokens(
            'profile_completion', 
            10, 
            'Reward for updating your profile information'
          );
          
          // Mark step as completed
          setCompletedSteps(prev => [...prev, 2]);
          break;
          
        case 3: // DAO Registration
          // Simulate DAO registration
          await awardTokens(
            'profile_completion', 
            15, 
            'Reward for registering with the DAO'
          );
          
          // Mark step as completed
          setCompletedSteps(prev => [...prev, 3]);
          break;
      }
      
      // Update token balance
      const balance = await getTotalTokenBalance();
      setTokenBalance(balance);
      
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
  };
  
  const progress = completedSteps.length > 0 
    ? Math.round((completedSteps.length / steps.length) * 100) 
    : 0;

  // If user is not logged in, redirect to auth
  if (!user && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              You need to sign in to access your Digital ID
            </p>
            <Link to="/auth">
              <Button className="button-animated">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
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
              
              <div className="flex items-center space-x-4">
                {tokenBalance > 0 && (
                  <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">{tokenBalance} STEP1</span> Tokens
                  </div>
                )}
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
              <DigitalIDCard 
                expanded={true} 
                displayName={displayName || (user?.email?.split('@')[0] || "STEP1 User")}
                tokenBalance={tokenBalance}
              />
              
              {activeStep === 1 && (
                <div className="mt-6">
                  <WalletConnectorPanel 
                    onWalletConnected={() => {
                      if (!completedSteps.includes(1)) {
                        setCompletedSteps(prev => [...prev, 1]);
                        if (activeStep === 1) {
                          setActiveStep(2);
                        }
                      }
                    }} 
                  />
                </div>
              )}
              
              <div className="mt-6 space-y-4">
                <IdentityCredentialsPanel 
                  progress={progress}
                  digitalID={profile}
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
