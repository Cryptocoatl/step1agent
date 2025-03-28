
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  hoverEffect?: boolean;
}

export const AnimatedLogo = ({ 
  className = '', 
  size = 'md', 
  animate = true,
  hoverEffect = true 
}: AnimatedLogoProps) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Size mapping
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-20',
  };
  
  const logoAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: animate ? { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut" 
      }
    } : {},
    hover: hoverEffect && isHovering ? {
      scale: 1.05,
      filter: "drop-shadow(0 0 8px rgba(225, 225, 255, 0.5))",
      transition: { duration: 0.3 }
    } : {}
  };

  const glowEffect = {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  // Gentle floating effect
  const floatEffect = {
    initial: { y: 0 },
    animate: animate ? {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut"
      }
    } : {}
  };

  return (
    <div 
      ref={logoRef} 
      className={`inline-flex items-center justify-center relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute rounded-full bg-accent/20 blur-xl"
        style={{ 
          width: '100%', 
          height: '100%', 
          zIndex: -1 
        }}
        variants={glowEffect}
        animate="animate"
      />
      
      {/* Logo with floating effect */}
      <motion.div
        variants={floatEffect}
        initial="initial"
        animate="animate"
      >
        <motion.img
          src="/lovable-uploads/d1398e70-31f3-4b8c-8e47-0102d6b6a386.png"
          alt="STEP1 Logo"
          className={`${sizeClasses[size]} object-contain`}
          variants={logoAnimation}
          initial="initial"
          animate="animate"
          whileHover="hover"
          style={{ filter: "drop-shadow(0 0 4px rgba(225, 225, 255, 0.3))" }}
        />
      </motion.div>
    </div>
  );
};
