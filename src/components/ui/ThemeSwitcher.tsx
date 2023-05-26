"use client";
import { FC, useEffect, useState } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui";
import { twMerge } from "tailwind-merge";
import { sunIcon, moonIcon, resetIcon } from "@/lib/icons";
import clsx from "clsx";
import {
  applyTheme,
  findTheme,
  getExplicitPreference,
  setExplicitPreference,
  resetExplicitPreference,
} from "@/lib/theme-switcher";

interface Props extends SwitchPrimitive.SwitchProps {}

/*
unchecked = dark
checked = light
*/
export const ThemeSwitcher: FC<Props> = ({ className, ...props }) => {
  const [isExplicit, setIsExplicit] = useState(false);
  const [checked, setChecked] = useState(false); // Default to dark (unchecked)

  const handleReset = () => {
    resetExplicitPreference();
    handleTheme();
  };

  const handleToggle = (checked: boolean) => {
    setExplicitPreference(checked ? "light" : "dark");
    handleTheme();
  };

  const handleTheme = () => {
    setIsExplicit(getExplicitPreference() ? true : false);
    const theme = findTheme();
    setChecked(theme === "light" ? true : false);
    applyTheme(theme);
  };

  useEffect(() => {
    handleTheme();
    /* Trigger a theme update each time the OS theme changes */
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleTheme);
  });

  return (
    <div className="flex justify-center items-center">
      <SwitchPrimitive.Root
        className={twMerge(
          "fill-fg hover:fill-fg/80 bg-bg border-input border-2 border-solid w-9 h-9 rounded-xl flex justify-center items-center z-10 relative",
          className
        )}
        checked={checked}
        onCheckedChange={handleToggle}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={clsx(
            "inline-block relative h-5 w-5",
            !checked && "[&_>_:first-child]:opacity-100 [&_>_:last-child]:opacity-0",
            checked && "[&_>_:first-child]:opacity-0 [&_>_:last-child]:opacity-100"
          )}
        >
          <div className="absolute inset-0 transition">{moonIcon}</div>
          <div className="absolute inset-0 transition">{sunIcon}</div>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      <TooltipRoot>
        <TooltipTrigger
          className={twMerge("focus:animate-spin transition-all", !isExplicit && "-ml-5", isExplicit && "ml-[0.35rem]")}
          onClick={handleReset}
        >
          <div className="h-[20px] w-[20px] fill-slate-400">{resetIcon}</div>
        </TooltipTrigger>
        <TooltipContent>Reset to system default</TooltipContent>
      </TooltipRoot>
    </div>
  );
};

export default ThemeSwitcher;
