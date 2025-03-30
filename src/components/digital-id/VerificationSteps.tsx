
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, User, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getBackendActor } from "@/services/icpService";

export interface VerificationStepProps {
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
  onClick: () => void;
}

export const VerificationStep = ({ 
  title, 
  description, 
  completed, 
  active, 
  onClick 
}: VerificationStepProps) => (
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

export interface Step {
  title: string;
  description: string;
}

interface VerificationStepsProps {
  steps: Step[];
  activeStep: number;
  completedSteps: number[];
  setActiveStep: (step: number) => void;
  completeStep: (step: number) => void;
  isLoading: boolean;
  displayName: string;
  setDisplayName: (name: string) => void;
}

export const VerificationSteps = ({
  steps,
  activeStep,
  completedSteps,
  setActiveStep,
  completeStep,
  isLoading,
  displayName,
  setDisplayName
}: VerificationStepsProps) => {
  return (
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
    </div>
  );
};
