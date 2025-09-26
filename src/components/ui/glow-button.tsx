import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "neon-teal" | "secondary";
  children: React.ReactNode;
}

const colorVariants = {
  primary: {
    bg: "bg-primary/20",
    border: "border-primary/30",
    text: "text-primary",
    hoverBg: "hover:bg-primary/30",
    shadow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]" // primary color shadow
  },
  "neon-teal": {
    bg: "bg-neon-teal/20",
    border: "border-neon-teal/30", 
    text: "text-neon-teal",
    hoverBg: "hover:bg-neon-teal/30",
    shadow: "hover:shadow-[0_0_30px_rgba(64,224,208,0.5)]" // neon-teal color shadow
  },
  secondary: {
    bg: "bg-secondary/20",
    border: "border-secondary/30",
    text: "text-secondary", 
    hoverBg: "hover:bg-secondary/30",
    shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]" // secondary color shadow
  }
};

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, color = "primary", children, ...props }, ref) => {
    const variant = colorVariants[color];
    
    return (
      <button
        className={cn(
          "inline-flex items-center gap-3",
          variant.bg,
          "border",
          variant.border,
          variant.text,
          "px-6 py-3 rounded-lg font-medium transition-stellar",
          variant.hoverBg,
          variant.shadow,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };