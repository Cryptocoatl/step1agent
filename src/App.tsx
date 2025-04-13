import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Wallet from '@/pages/Wallet';
import WalletDashboard from '@/pages/WalletDashboard';
import DigitalID from '@/pages/DigitalID';
import DAO from '@/pages/DAO';
import DAOGovernance from '@/pages/DAOGovernance';
import Learn from '@/pages/Learn';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { useAuth } from '@/providers/SupabaseAuthProvider';
import { Step1AgentButton } from "@/components/agent/Step1AgentButton";
import Step1AgentPage from "@/pages/Step1Agent";

function App() {
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      console.log('App is loading...');
    } else if (session) {
      console.log('User session:', session);
    } else {
      console.log('No user session.');
    }
  }, [session, isLoading]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet-dashboard" element={<WalletDashboard />} />
            <Route path="/digital-id" element={<DigitalID />} />
            <Route path="/dao" element={<DAO />} />
            <Route path="/dao-governance" element={<DAOGovernance />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/step1-agent" element={<Step1AgentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
      <Step1AgentButton />
    </>
  );
}

export default App;
