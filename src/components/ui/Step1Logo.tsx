
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Step1LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const Step1Logo = ({ className, size = 'md', animated = true }: Step1LogoProps) => {
  const [hovered, setHovered] = useState(false);
  
  // Map size to dimensions
  const sizeMap = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto'
  };
  
  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: hovered ? 1.05 : 1,
      transition: { duration: 0.3 }
    }
  };
  
  // Glow effect
  const glowVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0.3, 0.6, 0.3],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    },
    hover: {
      opacity: hovered ? 0.8 : 0.3,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div 
      className={cn("relative inline-flex items-center justify-center", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-300/20 blur-xl"
          initial="initial"
          animate="animate"
          variants={glowVariants}
        />
      )}
      
      <motion.img
        src="/lovable-uploads/9884fc9c-0b1f-4128-96c2-3db1453ecd6b.png"
        alt="STEP1 Logo"
        className={cn(sizeMap[size], "relative z-10")}
        initial={animated ? "initial" : false}
        animate={animated ? "animate" : false}
        variants={logoVariants}
        whileHover="hover"
      />
    </div>
  );
};

export default Step1Logo;
