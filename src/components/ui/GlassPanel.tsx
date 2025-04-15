
import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'light' | 'gold';
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  glow?: boolean;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'default', children, intensity = 'medium', glow = false, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-card/50 backdrop-blur-md border border-white/10',
      dark: 'bg-black/30 backdrop-blur-md border border-white/10',
      light: 'bg-white/10 backdrop-blur-md border border-white/20',
      gold: 'bg-amber-950/30 backdrop-blur-md border border-amber-500/30'
    };

    const intensityClasses = {
      low: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      high: 'backdrop-blur-lg'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl shadow-md relative overflow-hidden',
          variantClasses[variant],
          intensityClasses[intensity],
          glow && 'before:absolute before:inset-0 before:rounded-xl before:bg-accent/20 before:animate-pulse before:-z-10 before:blur-xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
