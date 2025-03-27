
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DigitalIDCard } from "@/components/digital-id/DigitalIDCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { CheckCircle, Shield, User, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

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

const DigitalID = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showAgent, setShowAgent] = useState(false);
  
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
  
  const completeStep = (index: number) => {
    if (!completedSteps.includes(index)) {
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
    }
  };
  
  const progress = completedSteps.length > 0 
    ? Math.round((completedSteps.length / steps.length) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Digital Identity</h1>
                <p className="text-muted-foreground mt-1">Manage and verify your identity on the Internet Computer</p>
              </div>
              
              <Button 
                onClick={() => setShowAgent(true)}
                variant="outline"
                className="button-animated"
              >
                Get Help
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <AnimatedCard animation="fade" className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Verification Progress</h2>
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
                  <Button 
                    onClick={() => completeStep(activeStep)}
                    className="w-full button-animated bg-accent hover:bg-accent/90"
                    disabled={completedSteps.includes(activeStep)}
                  >
                    {completedSteps.includes(activeStep) ? "Completed" : "Complete Current Step"}
                  </Button>
                </div>
              </AnimatedCard>
              
              <GlassPanel className="p-5">
                <div className="flex items-center mb-4">
                  <Shield className="text-accent mr-3" size={24} />
                  <h3 className="font-medium">Identity Security</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Your digital identity is secured by the Internet Computer Protocol and follows the highest security standards.
                </p>
                
                <div className="bg-secondary/50 p-3 rounded-lg text-xs">
                  <p className="flex items-center text-muted-foreground">
                    <CheckCircle size={14} className="mr-2 text-green-500" />
                    End-to-end encryption
                  </p>
                  <p className="flex items-center text-muted-foreground mt-2">
                    <CheckCircle size={14} className="mr-2 text-green-500" />
                    Self-sovereign identity principles
                  </p>
                  <p className="flex items-center text-muted-foreground mt-2">
                    <CheckCircle size={14} className="mr-2 text-green-500" />
                    No central point of failure
                  </p>
                </div>
              </GlassPanel>
            </div>
            
            <div>
              <DigitalIDCard expanded={true} />
              
              <div className="mt-6 space-y-4">
                <GlassPanel className="p-5">
                  <h3 className="font-medium mb-3">Identity Credentials</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Verification Level</span>
                      <span className="text-sm font-medium">Basic</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Connected Wallets</span>
                      <span className="text-sm font-medium">{completedSteps.includes(1) ? '1' : '0'}</span>
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
