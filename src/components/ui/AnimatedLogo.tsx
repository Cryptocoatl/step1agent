
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const AnimatedLogo = ({ className = '', size = 'md', animate = true }: AnimatedLogoProps) => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Size mapping
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-20',
  };
  
  const logoAnimation = {
    initial: { x: 0 },
    animate: animate ? { 
      x: [0, 5, 0],
      transition: { 
        repeat: Infinity, 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    } : {},
  };

  return (
    <div ref={logoRef} className={`inline-flex items-center ${className}`}>
      <motion.img
        src="/lovable-uploads/d1398e70-31f3-4b8c-8e47-0102d6b6a386.png"
        alt="STEP1 Logo"
        className={`${sizeClasses[size]} object-contain`}
        initial="initial"
        animate="animate"
        variants={logoAnimation}
      />
    </div>
  );
};
