
import { cn } from "@/lib/utils";
import * as React from "react";
import { useState } from "react";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  animation?: "fade" | "slide" | "scale" | "blur";
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard = ({
  className,
  delay = 0,
  animation = "fade",
  hover = true,
  children,
  ...props
}: AnimatedCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animationClasses = {
    fade: "opacity-0 animate-fade-in",
    slide: "opacity-0 translate-y-4 animate-slide-up",
    scale: "opacity-0 scale-95 animate-scale-in",
    blur: "opacity-0 blur-sm animate-blur-in",
  };

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-500",
        isLoaded ? "opacity-100 transform-none filter-none" : animationClasses[animation],
        hover && "card-hover",
        "bg-card text-card-foreground",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export { AnimatedCard };
