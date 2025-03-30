
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { EducationalContent } from "@/components/learn/EducationalContent";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { getTotalTokenBalance } from "@/services/rewardsService";
import { useEffect, useState } from "react";

const Learn = () => {
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState(0);
  
  useEffect(() => {
    if (user) {
      const fetchTokenBalance = async () => {
        const balance = await getTotalTokenBalance();
        setTokenBalance(balance);
      };
      
      fetchTokenBalance();
    }
  }, [user]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 relative">
        <SpaceBackground />
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient">Learning Center</h1>
                <p className="text-muted-foreground mt-1">
                  Watch videos and earn STEP1 tokens while learning about blockchain
                </p>
              </div>
              
              {user && tokenBalance > 0 && (
                <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">{tokenBalance} STEP1</span> Tokens
                </div>
              )}
            </div>
          </div>
          
          <EducationalContent />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
