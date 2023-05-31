"use client";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef } from "react";

export const HiddenMasksHelper: FC = () => {
  let reveals = useRef<NodeListOf<HTMLDivElement> | null>();
  const path = usePathname();

  function handleMouseMove(e: MouseEvent) {
    if (reveals.current) {
      reveals.current.forEach((reveal) => {
        const rect = reveal.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        reveal.style.setProperty("--mouse-x", `${x}px`);
        reveal.style.setProperty("--mouse-y", `${y}px`);
      });
    }
  }

  useEffect(() => {
    reveals.current = document.querySelectorAll<HTMLDivElement>(".reveal");
    document.body.addEventListener("mousemove", handleMouseMove);
    return () =>
      document.body.removeEventListener("mousemove", handleMouseMove);
  }, [path]);
  return null;
};
export default HiddenMasksHelper;
