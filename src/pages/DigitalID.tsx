import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgentButton } from "@/components/agent/StepOneAgentButton";
import { BackgroundElements } from "@/components/digital-id/BackgroundElements";
import { useDigitalId } from "@/hooks/use-digital-id";
import { AuthRequiredMessage } from "@/components/digital-id/AuthRequiredMessage";
import { DigitalIDHeader } from "@/components/digital-id/DigitalIDHeader";
import { DigitalIDContent } from "@/components/digital-id/DigitalIDContent";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Mail, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const DigitalID = () => {
  const [resendingEmail, setResendingEmail] = useState(false);
  const {
    user,
    steps,
    activeStep,
    setActiveStep,
    completedSteps,
    setCompletedSteps,
    isLoading,
    displayName,
    setDisplayName,
    profile,
    tokenBalance,
    progress,
    completeStep,
    isEmailVerified
  } = useDigitalId();

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    try {
      setResendingEmail(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?verified=true`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Verification email sent",
        description: `We've sent a new verification email to ${user.email}`
      });
    } catch (error: any) {
      toast({
        title: "Failed to send verification email",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setResendingEmail(false);
    }
  };

  // If user is not logged in, redirect to auth
  if (!user && !isLoading) {
    return <AuthRequiredMessage />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        {/* Space background connectivity elements */}
        <BackgroundElements />
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <DigitalIDHeader 
            tokenBalance={tokenBalance}
            onShowAgent={() => {}} /* Add empty handler to fix the build error */
          />
          
          {user && !isEmailVerified ? (
            <GlassPanel className="mb-8 p-6 border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/20 rounded-full p-2">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">Email Verification Required</h3>
                  <p className="text-muted-foreground mb-4">
                    Please verify your email address to unlock all STEP1 features and create your 
                    Digital ID. We've sent a verification link to <strong>{user.email}</strong>.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleResendVerification}
                      disabled={resendingEmail}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {resendingEmail ? "Sending..." : "Resend Verification Email"}
                    </Button>
                  </div>
                </div>
              </div>
            </GlassPanel>
          ) : (
            <DigitalIDContent
              user={user}
              steps={steps}
              activeStep={activeStep}
              completedSteps={completedSteps}
              setActiveStep={setActiveStep}
              completeStep={completeStep}
              isLoading={isLoading}
              displayName={displayName}
              setDisplayName={setDisplayName}
              tokenBalance={tokenBalance}
              progress={progress}
              profile={profile}
              setCompletedSteps={setCompletedSteps}
            />
          )}
        </div>
      </div>
      
      <Footer />
      
      {/* Step One Agent Button */}
      <StepOneAgentButton />
    </div>
  );
};

export default DigitalID;
