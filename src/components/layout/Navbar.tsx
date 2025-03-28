
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Menu, X, User, Wallet, Vote, Shield, Bell } from "lucide-react";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.3
      }
    })
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <AnimatedLogo size="sm" className="mr-2" />
              <span className="font-medium group-hover:text-accent transition-colors duration-300">STEP1</span>
            </Link>

            <nav className="hidden md:flex items-center ml-6 space-x-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link 
                  to="/" 
                  className="text-sm font-medium px-3 py-2 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                >
                  Home
                </Link>
              </motion.div>
              
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link 
                  to="/digital-id" 
                  className="text-sm font-medium px-3 py-2 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                >
                  Digital ID
                </Link>
              </motion.div>
              
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link 
                  to="/wallets" 
                  className="text-sm font-medium px-3 py-2 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                >
                  Wallets
                </Link>
              </motion.div>
              
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link 
                  to="/governance" 
                  className="text-sm font-medium px-3 py-2 rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                >
                  Governance
                </Link>
              </motion.div>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button size="icon" variant="ghost" className="hidden md:flex hover:bg-white/5">
                <Bell size={18} />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="hidden md:flex border-white/10 bg-white/5 hover:bg-white/10"
              >
                <Link to="/digital-id">
                  <User size={16} className="mr-2" />
                  My ID
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                asChild 
                className="hidden md:flex bg-accent hover:bg-accent/90" 
                size="sm"
              >
                <Link to="/wallets">
                  <Wallet size={16} className="mr-2" />
                  Connect
                </Link>
              </Button>
            </motion.div>

            <Button 
              size="icon" 
              variant="ghost" 
              className="md:hidden hover:bg-white/5" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <GlassPanel className="absolute top-16 left-0 right-0 z-50 border-t md:hidden bg-background/80">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center p-2 hover:bg-white/5 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/digital-id" 
                className="flex items-center p-2 hover:bg-white/5 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} className="mr-2 text-accent" />
                Digital ID
              </Link>
              <Link 
                to="/wallets" 
                className="flex items-center p-2 hover:bg-white/5 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Wallet size={16} className="mr-2 text-accent" />
                Wallets
              </Link>
              <Link 
                to="/governance" 
                className="flex items-center p-2 hover:bg-white/5 rounded-md"
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
