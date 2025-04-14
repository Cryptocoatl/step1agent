
import React from 'react';
import { Step1AgentButton } from '@/components/agent/Step1AgentButton';
import { StepOneAgent } from '@/components/agent/StepOneAgent';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Step1Agent = () => {
  const [showAgent, setShowAgent] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">Step1 Agent</h1>
        
        {/* Pass the showAgent state to the agent components */}
        {showAgent ? (
          <StepOneAgent onClose={() => setShowAgent(false)} />
        ) : (
          <div className="flex justify-center">
            <button 
              onClick={() => setShowAgent(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg 
                         shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            >
              Launch Step1 Agent
            </button>
          </div>
        )}
      </div>
      <Footer />
      {/* Floating button that's always visible */}
      {!showAgent && <Step1AgentButton onClick={() => setShowAgent(true)} />}
    </div>
  );
};

export default Step1Agent;
