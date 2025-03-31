import { useState, useEffect } from 'react';
import { getAuthState, logout } from '../../services/icpService';
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Shield, Wallet } from "lucide-react";
import { cn } from '@/lib/utils';

interface AuthState {
  isAuthenticated: boolean;
  principal: string | null;
}

interface DigitalIDCardProps {
  className?: string;
  expanded?: boolean;
  displayName?: string;
  tokenBalance?: number;
}

export const DigitalIDCard = ({ 
  className,
  expanded = false,
  displayName,
  tokenBalance = 0
}: DigitalIDCardProps) => {
  const [authState, setAuthState] = useState<AuthState>({ 
    isAuthenticated: false, 
    principal: null 
  });
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    const fetchAuthState = async () => {
      const state = await getAuthState();
      setAuthState({
        isAuthenticated: state.isAuthenticated,
        principal: state.isAuthenticated ? state.identity?.getPrincipal().toText() : null
      });
    };
    fetchAuthState();
  }, []);

  const handleLogout = async () => {
    await logout();
    const state = await getAuthState();
    setAuthState({
      isAuthenticated: state.isAuthenticated,
      principal: null
    });
  };

  // Choose display name with fallbacks
  const name = displayName || (authState.principal ? `${authState.principal.slice(0, 6)}...${authState.principal.slice(-4)}` : "STEP1 User");

  return (
    <div className={className}>
      <AnimatedCard animation="fade">
      <GlassPanel className="overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-medium flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Digital Identity Pass
              </h3>
              <p className="text-muted-foreground text-sm">Your unified blockchain identity</p>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-accent/20 text-accent rounded-full p-1 hover:bg-accent/30 transition-colors"
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {authState.isAuthenticated ? (
            <>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white text-xl font-bold">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{name}</h3>
                    <p className="text-muted-foreground text-sm">STEP1 Digital Identity</p>
                  </div>
                </div>
                {tokenBalance > 0 && (
                    <div className="flex gap-2 items-center bg-secondary/50 py-2 px-4 rounded-full">
                    <Wallet className="h-4 w-4 text-accent" />
                    <span className="font-medium">{tokenBalance}</span>
                    <span className="text-xs">STEP1 Tokens</span>
                  </div>
                )}
              </div>
              
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-border space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="bg-secondary/30 text-xs rounded-full px-3 py-1">
                      Digital ID Pass
                    </div>
                    <div className="bg-secondary/30 text-xs rounded-full px-3 py-1 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Principal</p>
                      <p className="text-xs font-mono break-all">
                        {authState.principal}
                      </p>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Authentication</p>
                      <p className="text-sm font-medium">Internet Identity</p>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Access Level</p>
                      <p className="text-sm font-medium">Level 1</p>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <Button 
                        onClick={handleLogout} 
                        variant="outline" 
                        size="sm"
                        className="w-full bg-red-500/20 border-red-400/50 hover:bg-red-500/40 text-red-100"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground italic">Not authenticated</p>
            </div>
          )}
        </div>
      </GlassPanel>
      </AnimatedCard>
    </div>
  );
};
