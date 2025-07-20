import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const loaderVariants = cva("animate-spin", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
      success: "text-green-600",
    },
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const dotVariants = cva("inline-block rounded-full animate-pulse", {
  variants: {
    variant: {
      default: "bg-muted-foreground",
      primary: "bg-primary",
      secondary: "bg-secondary-foreground",
      destructive: "bg-destructive",
      success: "bg-green-600",
    },
    size: {
      sm: "h-1 w-1",
      default: "h-2 w-2",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const barVariants = cva("inline-block rounded-sm animate-pulse", {
  variants: {
    variant: {
      default: "bg-muted-foreground",
      primary: "bg-primary",
      secondary: "bg-secondary-foreground",
      destructive: "bg-destructive",
      success: "bg-green-600",
    },
    size: {
      sm: "h-3 w-0.5",
      default: "h-4 w-1",
      lg: "h-6 w-1.5",
      xl: "h-8 w-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  type?: "spinner" | "dots" | "pulse" | "bars" | "ring";
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, variant, size, type = "spinner", ...props }, ref) => {
    if (type === "spinner") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center", className)}
          {...props}
        >
          <Loader2 className={cn(loaderVariants({ variant, size }))} />
        </div>
      );
    }

    if (type === "dots") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center space-x-1",
            className
          )}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(dotVariants({ variant, size }))}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      );
    }

    if (type === "pulse") {
      const sizeClasses = {
        sm: "h-8 w-8",
        default: "h-12 w-12",
        lg: "h-16 w-16",
        xl: "h-20 w-20",
      };

      const colorClasses = {
        default: "bg-muted-foreground/20",
        primary: "bg-primary/20",
        secondary: "bg-secondary/20",
        destructive: "bg-destructive/20",
        success: "bg-green-600/20",
      };

      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center", className)}
          {...props}
        >
          <div
            className={cn(
              "rounded-full animate-ping",
              sizeClasses[size || "default"],
              colorClasses[variant || "default"]
            )}
          />
        </div>
      );
    }

    if (type === "bars") {
      return (
        <div
          ref={ref}
          className={cn("flex items-end justify-center space-x-1", className)}
          {...props}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(barVariants({ variant, size }))}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.2s",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
              }}
            />
          ))}
        </div>
      );
    }

    if (type === "ring") {
      const sizeClasses = {
        sm: "h-4 w-4 border-2",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[3px]",
        xl: "h-12 w-12 border-4",
      };

      const colorClasses = {
        default: "border-muted-foreground/20 border-t-muted-foreground",
        primary: "border-primary/20 border-t-primary",
        secondary: "border-secondary/20 border-t-secondary-foreground",
        destructive: "border-destructive/20 border-t-destructive",
        success: "border-green-600/20 border-t-green-600",
      };

      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center", className)}
          {...props}
        >
          <div
            className={cn(
              "rounded-full animate-spin",
              sizeClasses[size || "default"],
              colorClasses[variant || "default"]
            )}
          />
        </div>
      );
    }

    return null;
  }
);
Loader.displayName = "Loader";

export { Loader, loaderVariants };
