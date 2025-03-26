
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Gift, Lock, Star, Unlock, Zap } from "lucide-react";
import React from "react";

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: "locked" | "unlocked";
  category: "defi" | "events" | "ai";
  requiredWallets: string[];
}

const benefits: Benefit[] = [
  {
    id: "staking",
    title: "Premium Staking Pools",
    description: "Access to exclusive high-yield staking opportunities",
    icon: Zap,
    status: "unlocked",
    category: "defi",
    requiredWallets: ["icp"]
  },
  {
    id: "swap",
    title: "Zero-fee Token Swaps",
    description: "Swap tokens across chains with zero transaction fees",
    icon: Zap,
    status: "locked",
    category: "defi",
    requiredWallets: ["icp", "ethereum"]
  },
  {
    id: "events",
    title: "VIP Event Access",
    description: "Exclusive access to ICP community events worldwide",
    icon: Calendar,
    status: "unlocked",
    category: "events",
    requiredWallets: ["icp"]
  },
  {
    id: "ai-tools",
    title: "Advanced AI Services",
    description: "Unlimited access to specialized AI tools and services",
    icon: Star,
    status: "locked",
    category: "ai",
    requiredWallets: ["icp", "holochain"]
  },
  {
    id: "vip-events",
    title: "Private Networking Events",
    description: "Small-group sessions with industry leaders",
    icon: Calendar,
    status: "locked",
    category: "events",
    requiredWallets: ["icp", "bitcoin"]
  },
  {
    id: "defi-analytics",
    title: "DeFi Analytics Dashboard",
    description: "Comprehensive analytics across all connected wallets",
    icon: Zap,
    status: "locked",
    category: "defi",
    requiredWallets: ["icp", "ethereum", "solana"]
  },
];

interface BenefitsDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  filter?: "all" | "defi" | "events" | "ai";
}

const BenefitsDisplay = ({ 
  className, 
  filter = "all",
  ...props 
}: BenefitsDisplayProps) => {
  const filteredBenefits = filter === "all" 
    ? benefits 
    : benefits.filter(benefit => benefit.category === filter);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBenefits.map((benefit, index) => (
          <AnimatedCard
            key={benefit.id}
            delay={index * 100}
            animation="scale"
            className="p-6 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "p-2 rounded-lg",
                benefit.status === "unlocked" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-secondary text-muted-foreground"
              )}>
                <benefit.icon size={20} />
              </div>
              <div>
                {benefit.status === "unlocked" ? (
                  <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <Unlock size={12} className="mr-1" />
                    Unlocked
                  </span>
                ) : (
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Lock size={12} className="mr-1" />
                    Locked
                  </span>
                )}
              </div>
            </div>
            
            <h3 className="font-medium mb-2">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{benefit.description}</p>
            
            <div>
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Required Wallets:</p>
                <div className="flex flex-wrap gap-1">
                  {benefit.requiredWallets.map(wallet => (
                    <span 
                      key={wallet} 
                      className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        "bg-secondary text-foreground"
                      )}
                    >
                      {wallet.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button 
                variant={benefit.status === "unlocked" ? "default" : "outline"}
                size="sm"
                className="w-full button-animated"
              >
                {benefit.status === "unlocked" ? "Access Now" : "Connect Wallets to Unlock"}
              </Button>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export { BenefitsDisplay };
