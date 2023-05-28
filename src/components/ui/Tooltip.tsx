"use client";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export const TooltipProvider = TooltipPrimitive.Provider;

export const TooltipRoot = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipArrow = TooltipPrimitive.Arrow;

interface Props extends TooltipPrimitive.TooltipContentProps {}

export const TooltipContent: FC<Props> = ({ className, children, ...props }) => (
  <TooltipPrimitive.Content
    className={twMerge("bg-accent-fg/80 text-sm text-bg px-2 py-1 z-50 rounded-lg", className)}
    sideOffset={12}
    collisionPadding={16}
    {...props}
  >
    <TooltipPrimitive.Arrow className="fill-accent-fg/80 "></TooltipPrimitive.Arrow>
    {children}
  </TooltipPrimitive.Content>
);
