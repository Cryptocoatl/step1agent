
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Step1CharacterProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export const Step1Character = ({ className, size = 'md', animate = true }: Step1CharacterProps) => {
  const sizeMap = {
    sm: 'h-16 w-auto',
    md: 'h-24 w-auto',
    lg: 'h-32 w-auto',
    xl: 'h-48 w-auto'
  };
  
  const characterAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: animate ? {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    } : {},
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };
  
  const floatAnimation = animate ? {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  } : {};
  
  return (
    <motion.div
      className={cn("relative", className)}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={characterAnimation}
    >
      <motion.div variants={floatAnimation} animate="animate">
        <img 
          src="/lovable-uploads/b8a33f2b-5a38-42a6-b39c-610d7b0a4e4c.png" 
          alt="STEP1 Character" 
          className={cn(sizeMap[size], "drop-shadow-lg")}
        />
      </motion.div>
      
      {animate && (
        <motion.div 
          className="absolute inset-0 bg-accent/10 rounded-full blur-3xl -z-10 translate-y-1/2"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default Step1Character;
