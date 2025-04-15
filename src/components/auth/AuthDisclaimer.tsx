
import React from "react";
import { AlertCircle } from "lucide-react";

export const AuthDisclaimer: React.FC = () => {
  return (
    <div className="p-4 mt-4 bg-secondary/30 rounded-lg">
      <div className="flex items-start">
        <AlertCircle className="mr-2 h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          By creating an account, we'll automatically create your ICP smart wallet and 
          STEP1 digital identity. You'll earn your first STEP1 tokens and begin your 
          journey into the decentralized world.
        </p>
      </div>
    </div>
  );
};
