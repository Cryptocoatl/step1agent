
import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/SupabaseAuthProvider';
import { getTotalTokenBalance } from '@/services/rewardsService';
import Footer from '@/components/layout/Footer';
import { HeroMissionsSection } from '@/components/missions/HeroMissionsSection';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TokenSection } from '@/components/home/TokenSection';
import { BackgroundElements } from '@/components/home/BackgroundElements';

export default function HomePage() {
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    if (user) {
      const loadTokenBalance = async () => {
        const balance = await getTotalTokenBalance();
        setTokenBalance(balance);
      };
      loadTokenBalance();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90 relative overflow-hidden">
      {/* Background elements */}
      <BackgroundElements />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <HeroSection user={user} tokenBalance={tokenBalance} />

        {/* Features Section */}
        <FeaturesSection />

        {/* Token Section */}
        <TokenSection />

        {/* Missions & Projects Section */}
        <HeroMissionsSection />
      </div>
      
      <Footer />
    </div>
  );
}
