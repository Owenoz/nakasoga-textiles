import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base — shared across all variants
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // ── Primary gradient ──
        default:
          "bg-gradient-to-br from-forest-600 to-forest-700 text-white shadow-[0_4px_14px_rgba(22,163,74,0.4)] hover:shadow-[0_6px_24px_rgba(22,163,74,0.55)] hover:-translate-y-0.5 active:translate-y-0 border border-forest-500/20",

        // ── Destructive ──
        destructive:
          "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-[0_4px_14px_rgba(239,68,68,0.35)] hover:shadow-[0_6px_24px_rgba(239,68,68,0.5)] hover:-translate-y-0.5",

        // ── Outline glass ──
        outline:
          "border border-[rgba(180,140,70,0.35)] bg-[rgba(255,252,248,0.55)] backdrop-blur-md text-earth-700 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[rgba(255,252,248,0.82)] hover:border-[rgba(22,163,74,0.4)] hover:text-forest-700 hover:-translate-y-0.5",

        // ── Secondary ──
        secondary:
          "bg-earth-100 text-earth-800 border border-earth-200 hover:bg-earth-200 hover:-translate-y-0.5",

        // ── Ghost ──
        ghost:
          "text-earth-700 hover:bg-earth-100/70 hover:text-forest-700 rounded-xl",

        // ── Amber gradient (CTA) ──
        amber:
          "bg-gradient-to-br from-gold-500 via-terracotta-500 to-terracotta-600 text-white shadow-[0_4px_14px_rgba(229,106,74,0.4)] hover:shadow-[0_6px_24px_rgba(229,106,74,0.55)] hover:-translate-y-0.5 active:translate-y-0 border border-terracotta-400/20",

        // ── Pure glass ──
        glass:
          "bg-[rgba(255,252,248,0.55)] backdrop-blur-md border border-[rgba(200,160,80,0.3)] text-earth-700 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[rgba(255,252,248,0.78)] hover:shadow-[0_6px_20px_rgba(139,90,40,0.2)] hover:-translate-y-0.5",

        // ── Link ──
        link:
          "text-forest-600 underline-offset-4 hover:underline hover:text-forest-700 p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-8 px-3 py-1.5 text-xs rounded-lg",
        lg:      "h-12 px-8 py-3 text-base",
        xl:      "h-14 px-10 py-4 text-base",
        icon:    "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
