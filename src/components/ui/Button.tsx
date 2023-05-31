import React from "react";
import { twMerge } from "tailwind-merge";

export const buttonVariants = ["default", "outline", "destructive"] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ["small", "default", "large"] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant = "default", size = "default", ...props },
    ref
  ) => (
    <button
      className={twMerge(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors hover:bg-opacity-80",

        // Variants
        {
          default: "bg-primary text-primary-fg",
          destructive: "bg-destructive text-destructive-fg",
          outline: "bg-bg border-2 border-fg/80",
        }[variant],

        // Sizes
        {
          small: "h-9 px-3 text-sm",
          default: "h-10 py-2 px-4 text-base",
          large: "h-12 px-8 text-lg",
        }[size],

        // Custom classes
        className
      )}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
export default Button;
