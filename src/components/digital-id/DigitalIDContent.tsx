
import { useState } from "react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ProgressTracker } from "@/components/digital-id/ProgressTracker";
import { VerificationSteps, Step } from "@/components/digital-id/VerificationSteps";
import { MultiChainSupportPanel } from "@/components/digital-id/MultiChainSupportPanel";
import { DigitalIDCard } from "@/components/digital-id/DigitalIDCard";
import { WalletConnectorPanel } from "@/components/digital-id/WalletConnectorPanel";
import { IdentityCredentialsPanel } from "@/components/digital-id/IdentityCredentialsPanel";

interface DigitalIDContentProps {
  user: any;
  steps: Step[];
  activeStep: number;
  completedSteps: number[];
  setActiveStep: (step: number) => void;
  completeStep: (step: number) => Promise<void>;
  isLoading: boolean;
  displayName: string;
  setDisplayName: (name: string) => void;
  tokenBalance: number;
  progress: number;
  profile: any;
  setCompletedSteps: (steps: React.SetStateAction<number[]>) => void;
}

export const DigitalIDContent = ({
  user,
  steps,
  activeStep,
  completedSteps,
  setActiveStep,
  completeStep,
  isLoading,
  displayName,
  setDisplayName,
  tokenBalance,
  progress,
  profile,
  setCompletedSteps
}: DigitalIDContentProps) => {
  return (
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
  );
};
