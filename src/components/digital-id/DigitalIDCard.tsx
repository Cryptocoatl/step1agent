
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { CheckCircle, ChevronDown, ChevronUp, Shield, User, Globe, Star, Zap } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface DigitalIDCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag"> {
  expanded?: boolean;
}

const DigitalIDCard = ({ className, expanded = false, ...props }: DigitalIDCardProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <motion.div 
      className={cn("w-full max-w-md mx-auto", className)} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <GlassPanel
        className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "h-[450px]" : "h-[230px]"
        )}
        intensity="medium"
        glow
      >
        {/* Card Header with Design Elements */}
        <div className="relative h-36 bg-gradient-to-r from-blue-500 to-purple-600 p-6 overflow-hidden">
          {/* Cosmic background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-10 w-16 h-16 rounded-full bg-white/10 translate-y-1/3"></div>
          <div className="absolute -left-4 -top-4 w-16 h-16 rounded-full bg-blue-300/20 blur-xl"></div>
          
          {/* Star-like dots */}
          <div className="absolute top-5 left-20 w-[2px] h-[2px] bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-12 w-[2px] h-[2px] bg-white rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-8 left-16 w-[2px] h-[2px] bg-white rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
          
          <div className="relative z-10 flex justify-between">
            <div>
              <h3 className="text-white font-medium text-lg flex items-center">
                <Globe size={16} className="mr-1.5" />
                STEP1 Digital ID
              </h3>
              <p className="text-white/80 text-sm">Interoperable Identity Protocol</p>
            </div>
            <div className="flex space-x-2">
              {verified ? (
                <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </div>
              ) : (
                <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs flex items-center">
                  Unverified
                </div>
              )}
            </div>
          </div>
          
          {/* User Info */}
          <div className="mt-3 flex items-center text-white">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User size={18} />
            </div>
            <div className="ml-3">
              <p className="font-medium">STEP1 Guardian</p>
              <p className="text-xs text-white/70">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-6 relative">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium flex items-center">
              <Star size={16} className="mr-1.5 text-accent" />
              Identity Details
            </h4>
            <div className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-1">
              SoulBound NFT
            </div>
          </div>
          
          <div className="space-y-4 transition-all duration-300">
            {/* Basic Details (Always Visible) */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">STEP1 ID</span>
              <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                STEP1-6ae7f9c2
              </span>
            </div>
            
            {/* Extended Details (Visible only when expanded) */}
            {isExpanded && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Connected Chains</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                    1 / 5
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Verification Status</span>
                  <span className="text-xs">
                    {verified ? (
                      <span className="text-green-500 flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        Complete
                      </span>
                    ) : (
                      <span className="text-amber-500">Incomplete</span>
                    )}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Mission Access</span>
                  <span className="text-xs">2 / 10 Unlocked</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Security Level</span>
                  <span className="text-xs flex items-center">
                    <Shield size={12} className="mr-1 text-blue-500" />
                    Basic
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">DAO Memberships</span>
                  <span className="text-xs flex items-center">
                    <Zap size={12} className="mr-1 text-yellow-500" />
                    None
                  </span>
                </div>
                
                <div className="pt-4">
                  {!verified ? (
                    <Button 
                      onClick={handleVerify} 
                      className="w-full button-animated bg-accent hover:bg-accent/90"
                    >
                      Complete Verification
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full button-animated"
                    >
                      View My Missions
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export { DigitalIDCard };
