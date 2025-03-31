
import { useEffect, useState } from "react";
import { useDigitalId } from "@/hooks/use-digital-id";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Loader2 } from "lucide-react";
import { DigitalIDContent } from "@/components/digital-id/DigitalIDContent";
import { ICPWalletConnect } from "@/components/wallet/ICPWalletConnect";
import { DigitalIDHeader } from "@/components/digital-id/DigitalIDHeader";
import { BackgroundElements } from "@/components/digital-id/BackgroundElements";
import { AuthRequiredMessage } from "@/components/digital-id/AuthRequiredMessage";
import { login, getBackendActor } from "@/services/icpService";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function DigitalIDPage() {
  const digitalId = useDigitalId();
  const [isLoading, setIsLoading] = useState(false);
  const [digitalIDRegistered, setDigitalIDRegistered] = useState<boolean | null>(null);
  
  // Check if the user has a digital ID registered in the ICP backend
  useEffect(() => {
    const checkDigitalID = async () => {
      try {
        const actor = await getBackendActor();
        const result = await actor.getDigitalID();
        setDigitalIDRegistered(result.length > 0);
      } catch (error) {
        console.error("Error checking Digital ID:", error);
        setDigitalIDRegistered(false);
      }
    };
    
    checkDigitalID();
  }, []);

  const handleRegisterDigitalID = async () => {
    setIsLoading(true);
    try {
      // First login to ICP
      await login();
      
      // Then register Digital ID
      const actor = await getBackendActor();
      const displayName = digitalId.displayName || "STEP1 User";
      await actor.registerDigitalID(displayName, null);
      
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

  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundElements />
      <DigitalIDHeader />
      
      {digitalId.isLoading ? (
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
          
          <div className="mt-12">
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
        </>
      )}
    </div>
  );
}
