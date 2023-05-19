"use client";
import { FC, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { HomeBoardBox, Preview, Content } from "./HomeBoardBox";

export const HomeBoard: FC = () => {
  const board = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // This forces all other "being blured" boxes to be blured
  // This prevent boxes overlapping when quickly moving focus with Tab key
  const timeouts = useRef<Array<[HTMLDivElement, NodeJS.Timeout]>>([]);
  const clearPendingHandleBoxBlur = () => {
    while (timeouts.current.length) {
      const [box, timeout] = timeouts.current.pop()!;
      clearTimeout(timeout);
      box.style.zIndex = "0";
    }
  };

  const handleBoxFocus = (box: HTMLDivElement) => {
    setIsFocused(true);
    clearPendingHandleBoxBlur();
    box.style.zIndex = "10";
  };

  const handleBoxBlur = (box: HTMLDivElement) => {
    setIsFocused(false);
    clearPendingHandleBoxBlur();

    // Reset the box z-index after the animation has ended (500ms)
    timeouts.current.push([
      box,
      setTimeout(() => {
        box.style.zIndex = "0";
      }, 500),
    ]);
  };

  // Register boxes events
  useEffect(() => {
    if (board.current) {
      const boxes =
        board.current.querySelectorAll<HTMLDivElement>(":scope > article");
      boxes.forEach((box) => {
        box.addEventListener("focus", handleBoxFocus.bind(this, box));
        box.addEventListener("blur", handleBoxBlur.bind(this, box));
      });
      return () => {
        boxes.forEach((box) => {
          box.removeEventListener("focus", handleBoxFocus.bind(this, box));
          box.removeEventListener("blur", handleBoxBlur.bind(this, box));
        });
      };
    }
  });
  return (
    <section
      ref={board}
      className="relative w-[100vh] h-[85vh] flex justify-center items-end"
    >
      <button
        className={clsx(
          "py-3 px-6 rounded-lg bg-slate-200 border-slate-300 hover:bg-slate-300 transition border-solid border-2 z-20 relative -bottom-6 font-semibold",
          isFocused || "hidden"
        )}
      >
        Get back
      </button>
      <HomeBoardBox
        className={clsx(
          "bg-red-500",
          "left-0 top-0 right-0 bottom-[calc(85vh-85vh/3+15px)]"
        )}
      >
        <Preview>PREVIEW</Preview>
        <Content>CONTENT</Content>
      </HomeBoardBox>

      <HomeBoardBox
        className={clsx(
          "bg-green-500",
          "left-0 top-[calc(85vh/3+15px)] right-[calc(100vh-100vh/3+15px)] bottom-0"
        )}
      >
        <Preview>PREVIEW</Preview>
        <Content>CONTENT</Content>
      </HomeBoardBox>

      <HomeBoardBox
        className={clsx(
          "bg-orange-500",
          "left-[calc(100vh/3+15px)] top-[calc(85vh/3+15px)] right-[calc(100vh/3+15px)] bottom-[calc(85vh/3+15px)]"
        )}
      >
        <Preview>PREVIEW</Preview>
        <Content>CONTENT</Content>
      </HomeBoardBox>

      <HomeBoardBox
        className={clsx(
          "bg-blue-500",
          "left-[calc(100vh/3*2+15px)] top-[calc(85vh/3+15px)] right-0 bottom-[calc(85vh/3+15px)]"
        )}
      >
        <Preview>PREVIEW</Preview>
        <Content>CONTENT</Content>
      </HomeBoardBox>

      <HomeBoardBox
        className={clsx(
          "bg-purple-500",
          "left-[calc(100vh/3+15px)] top-[calc(85vh/3*2+15px)] right-0 bottom-0"
        )}
      >
        <Preview>PREVIEW</Preview>
        <Content>CONTENT</Content>
      </HomeBoardBox>
    </section>
  );
};
export default HomeBoard;
