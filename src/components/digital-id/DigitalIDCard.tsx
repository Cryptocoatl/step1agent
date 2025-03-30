
import { useState } from "react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ChevronDown, ChevronUp, Shield, Wallet } from "lucide-react";

interface DigitalIDCardProps {
  expanded?: boolean;
  className?: string;
  user?: string;
  displayName?: string;
  tokenBalance?: number;
}

export const DigitalIDCard = ({ 
  expanded = false, 
  className,
  user,
  displayName,
  tokenBalance = 0
}: DigitalIDCardProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  // Choose display name with fallbacks
  const name = displayName || user || "STEP1 User";
  
  return (
    <AnimatedCard animation="fade" className={className}>
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
                  <p className="text-xs text-muted-foreground">ID Type</p>
                  <p className="text-sm font-medium">Multi-Chain Digital Identity</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Authentication</p>
                  <p className="text-sm font-medium">Email + Wallet</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Access Level</p>
                  <p className="text-sm font-medium">Level 1</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-medium">Active</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </GlassPanel>
    </AnimatedCard>
  );
};
