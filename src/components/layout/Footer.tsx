
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Leaf className="h-5 w-5 text-accent mr-2" />
            <span className="font-bold text-lg">STEP1</span>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link to="/digital-id" className="text-muted-foreground hover:text-foreground transition-colors">
              Digital ID
            </Link>
            <Link to="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">
              Wallet
            </Link>
            <Link to="/dao" className="text-muted-foreground hover:text-foreground transition-colors">
              DAOs
            </Link>
            <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link to="/step1-agent" className="text-muted-foreground hover:text-foreground transition-colors">
              Step1 Agent
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Step1 Ecosystem
          </div>
        </div>
      </div>
    </footer>
  );
}
