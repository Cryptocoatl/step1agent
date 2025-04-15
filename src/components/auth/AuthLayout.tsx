
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title = "Welcome to STEP1", 
  subtitle = "Your journey into the future of digital identity begins here" 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        <SpaceBackground />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-md mx-auto">
            <AnimatedCard animation="fade" className="mb-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gradient">{title}</h1>
                {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
              </div>
              
              {children}
            </AnimatedCard>
            
            <div className="text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
