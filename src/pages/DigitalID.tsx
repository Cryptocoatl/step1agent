
import { useEffect, useState } from "react";
import { useDigitalId } from "@/hooks/use-digital-id";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";
import { DigitalIDContent } from "@/components/digital-id/DigitalIDContent";
import { ICPWalletConnect } from "@/components/wallet/ICPWalletConnect";
import { DigitalIDHeader } from "@/components/digital-id/DigitalIDHeader";
import { BackgroundElements } from "@/components/digital-id/BackgroundElements";
import { AuthRequiredMessage } from "@/components/digital-id/AuthRequiredMessage";
import { login, getBackendActor } from "@/services/icpService";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useWallet } from "@/providers/WalletProvider";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function DigitalIDPage() {
  const digitalId = useDigitalId();
  const { isConnected, principal, createWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [digitalIDRegistered, setDigitalIDRegistered] = useState<boolean | null>(null);
  const [isFetchingStatus, setIsFetchingStatus] = useState(true);
  
  // Check if the user has a digital ID registered in the ICP backend
  useEffect(() => {
    const checkDigitalID = async () => {
      setIsFetchingStatus(true);
      try {
        const actor = await getBackendActor();
        const result = await actor.getDigitalID();
        setDigitalIDRegistered(result.length > 0);
      } catch (error) {
        console.error("Error checking Digital ID:", error);
        setDigitalIDRegistered(false);
      } finally {
        setIsFetchingStatus(false);
      }
    };
    
    if (digitalId.user && !digitalId.isLoading) {
      checkDigitalID();
    } else {
      setIsFetchingStatus(false);
    }
  }, [digitalId.user, digitalId.isLoading]);

  const handleRegisterDigitalID = async () => {
    setIsLoading(true);
    try {
      // First login to ICP (if not already connected)
      if (!isConnected) {
        await login();
      }
      
      // Then register Digital ID
      const actor = await getBackendActor();
      const displayName = digitalId.displayName || "STEP1 User";
      await actor.registerDigitalID(displayName);
      
      toast({
        title: "Digital ID Registered",
        description: "Your Digital ID has been successfully registered on the Internet Computer",
      });
      
      setDigitalIDRegistered(true);
    } catch (error) {
      console.error("Error registering Digital ID:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error registering your Digital ID",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWallet = async () => {
    setIsLoading(true);
    try {
      await createWallet();
      
      // Update digital ID steps
      if (!digitalId.completedSteps.includes(1)) {
        digitalId.setCompletedSteps(prev => [...prev, 1]);
        if (digitalId.activeStep === 1) {
          digitalId.setActiveStep(2);
        }
      }
      
      toast({
        title: "Wallet Created",
        description: "Your STEP1 wallet has been successfully created",
      });
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast({
        title: "Wallet Creation Failed",
        description: "There was an error creating your wallet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundElements />
      <DigitalIDHeader tokenBalance={digitalId.tokenBalance || 0} />
      
      {digitalId.isLoading || isFetchingStatus ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
        </div>
      ) : !digitalId.user ? (
        <AuthRequiredMessage />
      ) : (
        <>
          {digitalIDRegistered === false && (
            <AnimatedCard animation="fade" className="mb-8 p-6">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-4">Register Your Digital ID on ICP</h3>
                <p className="text-muted-foreground mb-6">
                  Create your decentralized identity on the Internet Computer to access exclusive benefits
                </p>
                <Button 
                  onClick={handleRegisterDigitalID}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Register Digital ID
                </Button>
              </div>
            </AnimatedCard>
          )}
          
          <DigitalIDContent {...digitalId} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Create Your Smart Wallet</h3>
              <GlassPanel className="p-6">
                <div className="text-center mb-6">
                  <div className="bg-indigo-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {isConnected ? 
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" /> : 
                      <Lock className="h-8 w-8 text-indigo-400" />
                    }
                  </div>
                  <h4 className="text-xl font-medium">STEP1 Smart Wallet</h4>
                  <p className="text-muted-foreground mt-2">
                    Create your personal STEP1 Smart Wallet to store tokens and access ecosystem benefits
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
                  onClick={handleCreateWallet}
                  disabled={isLoading || isConnected}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isConnected ? "Wallet Created" : "Create Smart Wallet"}
                </Button>
                
                {isConnected && principal && (
                  <div className="mt-4 bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Your wallet ID</p>
                    <p className="font-mono text-xs mt-1 break-all">{principal}</p>
                  </div>
                )}
              </GlassPanel>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect ICP Wallet</h3>
              <ICPWalletConnect 
                onWalletConnected={(principalId) => {
                  toast({
                    title: "Wallet Connected",
                    description: `Successfully linked your ICP wallet with principal ID ${principalId.slice(0, 8)}...`,
                  });
                  if (!digitalId.completedSteps.includes(1)) {
                    digitalId.setCompletedSteps(prev => [...prev, 1]);
                    if (digitalId.activeStep === 1) {
                      digitalId.setActiveStep(2);
                    }
                  }
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
