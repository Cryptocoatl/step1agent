
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Wallet from '@/pages/Wallet';
import WalletDashboard from '@/pages/WalletDashboard';
import DigitalID from '@/pages/DigitalID';
import DAO from '@/pages/DAO';
import DAOGovernance from '@/pages/DAOGovernance';
import Learn from '@/pages/Learn';
import Tokenomics from '@/pages/Tokenomics';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { useAuth } from '@/providers/SupabaseAuthProvider';
import { Step1AgentButton } from "@/components/agent/Step1AgentButton";
import Step1AgentPage from "@/pages/Step1Agent";
import Whitepaper from '@/pages/Whitepaper';

// Create a wrapper component that uses the router-dependent hooks
const AppRoutes = () => {
  const { session, isLoading, isEmailVerified } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      console.log('App is loading...');
    } else if (session) {
      console.log('User session:', session);
      console.log('Email verified:', isEmailVerified);
      // If email is verified, redirect to digital-id
      if (isEmailVerified && (window.location.pathname === '/login' || window.location.pathname === '/auth')) {
        navigate('/digital-id');
      }
    } else {
      console.log('No user session.');
    }
  }, [session, isLoading, isEmailVerified, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet-dashboard" element={<WalletDashboard />} />
        <Route path="/digital-id" element={<DigitalID />} />
        <Route path="/dao" element={<DAO />} />
        <Route path="/dao-governance" element={<DAOGovernance />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/tokenomics" element={<Tokenomics />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/step1-agent" element={<Step1AgentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Step1AgentButton />
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
