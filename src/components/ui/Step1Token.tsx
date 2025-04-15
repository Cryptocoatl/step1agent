
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Step1TokenProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  spinning?: boolean;
}

export const Step1Token = ({ 
  className, 
  size = 'md', 
  animated = true,
  spinning = false
}: Step1TokenProps) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };
  
  const tokenAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: animated ? { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    } : {},
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  const spinAnimation = spinning ? {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity
      }
    }
  } : {};
  
  return (
    <motion.div
      className={cn("relative inline-block", className)}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={tokenAnimation}
    >
      <motion.img 
        src="/lovable-uploads/be356566-cac6-4c00-a7a0-034048b502b1.png"
        alt="STEP1 Token"
        className={cn(sizeMap[size], "drop-shadow-lg")}
        variants={spinAnimation}
        animate="animate"
      />
      {animated && (
        <motion.div 
          className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl -z-10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default Step1Token;
