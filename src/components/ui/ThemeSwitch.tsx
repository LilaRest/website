"use client";
import { FC, useEffect, useRef, useState } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { twMerge } from "tailwind-merge";
import { sunIcon, moonIcon, resetIcon } from "@/lib/icons";
import clsx from "clsx";
import {
  applyTheme,
  findTheme,
  getExplicitPreference,
  resetExplicitPreference,
  setExplicitPreference,
} from "@/lib/theme-switcher";

interface Props extends SwitchPrimitive.SwitchProps {}

export const ThemeSwitch: FC<Props> = ({ className, ...props }) => {
  const [hasExplicitPreference, setHasExplicitPreference] = useState(false);
  const thumb = useRef<HTMLSpanElement | null>(null);

  const handleReset = () => {
    resetExplicitPreference();
    handleTheme();
  };

  const handleToggle = (checked: boolean) => {
    setExplicitPreference(checked ? "dark" : "light");
    handleTheme();
  };

  const handleTheme = () => {
    setHasExplicitPreference(getExplicitPreference() ? true : false);
    const theme = findTheme();
    thumb.current!.setAttribute("data-state", theme === "dark" ? "checked" : "unchecked");
    applyTheme(theme);
  };

  useEffect(() => {
    handleTheme();
    /* Trigger a theme update each time the OS theme changes */
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleTheme);
  });

  return (
    <div className="flex justify-center items-center gap-2">
      {hasExplicitPreference}

      <SwitchPrimitive.Root
        className={twMerge(
          className,
          "fill-fg hover:fill-fg/80  border-input border-2 border-solid w-9 h-9 rounded-xl flex justify-center items-center"
        )}
        defaultChecked={false}
        onCheckedChange={handleToggle}
        {...props}
      >
        <SwitchPrimitive.Thumb
          ref={thumb}
          className={clsx(
            "inline-block relative h-5 w-5",
            "[&[data-state=unchecked]_>_:first-child]:opacity-100 [&[data-state=unchecked]_>_:last-child]:opacity-0",
            "[&[data-state=checked]_>_:first-child]:opacity-0 [&[data-state=checked]_>_:last-child]:opacity-100"
          )}
        >
          <div className="absolute inset-0 transition">{sunIcon}</div>
          <div className="absolute inset-0 transition">{moonIcon}</div>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      <button
        className={twMerge(
          "[&:focus_>_div]:animate-spin",
          !hasExplicitPreference && "hidden",
          hasExplicitPreference && "visible"
        )}
        onClick={handleReset}
      >
        <div className="h-[20px] w-[20px] fill-fg/70">{resetIcon}</div>
      </button>
    </div>
  );
};

export default ThemeSwitch;
