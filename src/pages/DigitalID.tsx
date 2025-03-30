
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { BackgroundElements } from "@/components/digital-id/BackgroundElements";
import { useDigitalId } from "@/hooks/use-digital-id";
import { AuthRequiredMessage } from "@/components/digital-id/AuthRequiredMessage";
import { DigitalIDHeader } from "@/components/digital-id/DigitalIDHeader";
import { DigitalIDContent } from "@/components/digital-id/DigitalIDContent";

const DigitalID = () => {
  const [showAgent, setShowAgent] = useState(false);
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
    completeStep
  } = useDigitalId();

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
            onShowAgent={() => setShowAgent(true)} 
          />
          
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
          />
        </div>
      </div>
      
      <Footer />
      
      {showAgent && <StepOneAgent />}
    </div>
  );
};

export default DigitalID;
