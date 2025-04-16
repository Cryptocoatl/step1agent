
import { motion } from 'framer-motion';

export const BackgroundElements = () => {
  return (
    <>
      <motion.div 
        className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-background z-0 opacity-70"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="star-field absolute inset-0 z-0 opacity-25" />
    </>
  );
};
