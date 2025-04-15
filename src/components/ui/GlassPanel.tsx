
import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'light' | 'gold';
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-card/50 backdrop-blur-md border border-white/10',
      dark: 'bg-black/30 backdrop-blur-md border border-white/10',
      light: 'bg-white/10 backdrop-blur-md border border-white/20',
      gold: 'bg-amber-950/30 backdrop-blur-md border border-amber-500/30'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl shadow-md relative overflow-hidden',
          variantClasses[variant],
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
