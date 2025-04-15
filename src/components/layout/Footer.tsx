
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Step1Logo } from '@/components/ui/Step1Logo';

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/20 py-8 mt-auto bg-background/90 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Step1Logo size="sm" animated={false} />
            <span className="font-bold text-lg ml-2 text-amber-100">STEP1</span>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-6 md:mb-0">
            <Link to="/digital-id" className="text-amber-200/70 hover:text-amber-100 transition-colors">
              Digital ID
            </Link>
            <Link to="/wallet-dashboard" className="text-amber-200/70 hover:text-amber-100 transition-colors">
              Wallet
            </Link>
            <Link to="/dao" className="text-amber-200/70 hover:text-amber-100 transition-colors">
              DAOs
            </Link>
            <Link to="/learn" className="text-amber-200/70 hover:text-amber-100 transition-colors">
              Learn
            </Link>
            <Link to="/whitepaper" className="text-amber-200/70 hover:text-amber-100 transition-colors">
              Whitepaper
            </Link>
            <Link to="/step1-agent" className="text-amber-200/70 hover:text-amber-100 transition-colors">
              Step1 Agent
            </Link>
          </div>
          
          <div className="text-sm text-amber-200/50">
            &copy; {new Date().getFullYear()} Step1 Ecosystem
          </div>
        </div>
      </div>
    </footer>
  );
}
