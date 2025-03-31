
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DigitalIDHeaderProps {
  tokenBalance: number;
  onShowAgent?: () => void;  // Make this prop optional
}

export const DigitalIDHeader = ({ tokenBalance, onShowAgent }: DigitalIDHeaderProps) => {
  return (
    <div className="mb-8">
      <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">STEP1 Digital Identity</h1>
          <p className="text-muted-foreground mt-1">Validate your identity across multiple blockchains</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {tokenBalance > 0 && (
            <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
              <span className="font-medium">{tokenBalance} STEP1</span> Tokens
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
