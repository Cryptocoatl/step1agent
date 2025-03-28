
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Menu, X, User, Wallet, Vote, Shield, Bell } from "lucide-react";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <AnimatedLogo size="sm" className="mr-2" />
              <span className="font-medium">STEP1</span>
            </Link>

            <nav className="hidden md:flex items-center ml-6 space-x-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link 
                to="/digital-id" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Digital ID
              </Link>
              <Link 
                to="/wallets" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Wallets
              </Link>
              <Link 
                to="/governance" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Governance
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="hidden md:flex">
              <Bell size={18} />
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden md:flex">
              <Link to="/digital-id">
                <User size={16} className="mr-2" />
                My ID
              </Link>
            </Button>
            <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90" size="sm">
              <Link to="/wallets">
                <Wallet size={16} className="mr-2" />
                Connect
              </Link>
            </Button>

            <Button 
              size="icon" 
              variant="ghost" 
              className="md:hidden" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <GlassPanel className="absolute top-16 left-0 right-0 z-50 border-t md:hidden">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center p-2 hover:bg-secondary/50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/digital-id" 
                className="flex items-center p-2 hover:bg-secondary/50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} className="mr-2 text-accent" />
                Digital ID
              </Link>
              <Link 
                to="/wallets" 
                className="flex items-center p-2 hover:bg-secondary/50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Wallet size={16} className="mr-2 text-accent" />
                Wallets
              </Link>
              <Link 
                to="/governance" 
                className="flex items-center p-2 hover:bg-secondary/50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Vote size={16} className="mr-2 text-accent" />
                Governance
              </Link>
            </nav>
          </div>
        </GlassPanel>
      )}
    </header>
  );
};
