
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntegrationBadgeProps {
  chain: 'ICP' | 'Ethereum' | 'Solana' | 'Polygon' | 'Bitcoin';
  status?: 'connected' | 'pending' | 'disconnected';
  className?: string;
  onClick?: () => void;
}

export const IntegrationBadge = ({
  chain,
  status = 'disconnected',
  className,
  onClick
}: IntegrationBadgeProps) => {
  // Chain-specific colors
  const chainColors = {
    ICP: 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
    Ethereum: 'bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800',
    Solana: 'bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800',
    Polygon: 'bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800',
    Bitcoin: 'bg-gradient-to-r from-amber-500 to-orange-700 hover:from-amber-600 hover:to-orange-800',
  };
  
  // Status indicators
  const statusIndicators = {
    connected: 'bg-green-500',
    pending: 'bg-amber-500',
    disconnected: 'bg-gray-500',
  };
  
  // Animation variants
  const badgeVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className={cn(
        "rounded-full px-4 py-2 text-white shadow-md cursor-pointer transition-colors",
        chainColors[chain],
        className
      )}
      onClick={onClick}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={badgeVariants}
    >
      <div className="flex items-center space-x-2">
        <div className={cn("w-2 h-2 rounded-full", statusIndicators[status])} />
        <span className="font-medium">{chain}</span>
      </div>
    </motion.div>
  );
};

export default IntegrationBadge;
