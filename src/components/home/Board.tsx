"use client";
import { FC, useEffect, useRef } from "react";
import { clsx } from "clsx";
import AboutMeBox from "./AboutMeBox";
import BookMeBox from "./BookMeBox";
import FeaturedProjectBox from "./FeaturedProjectBox";
import UnusedBox1 from "./UnusedBox1";
import UnusedBox2 from "./UnusedBox2";
import ArticlesBox from "./ArticlesBox";
import UnusedBox3 from "./UnusedBox3";

export const Board: FC = () => {
  const board = useRef<HTMLDivElement | null>(null);
  const backButton = useRef<HTMLButtonElement | null>(null);

  const displayBackButton = () => {
    backButton.current!.style.pointerEvents = "auto";
    backButton.current!.style.opacity = "1";
  };
  const hideBackButton = () => {
    backButton.current!.style.pointerEvents = "none";
    backButton.current!.style.opacity = "0";
  };

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
    displayBackButton();
    clearPendingHandleBoxBlur();
    box.style.zIndex = "10";
  };

  const handleBoxBlur = (box: HTMLDivElement) => {
    hideBackButton();

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
      className="relative w-[133vh] max-w-[calc(100vw-60px)] h-[calc(100%-60px)] flex justify-center items-end"
    >
      <AboutMeBox
        className="left-0 top-0 right-[calc(100%/4+15px)] bottom-[calc(100%-100%/3+15px)]"
        previewWidth="w-[calc(133vh/4*3-15px]"
      />

      <BookMeBox
        className="left-0 top-[calc(100%/3+15px)] right-[calc(100%-100%/4+15px)] bottom-0"
        previewWidth="w-[calc(133vh/4-15px)] max-w-[calc((100vw-120px)/4)]"
      />

      <FeaturedProjectBox
        className="left-[calc(100%/4+15px)] top-[calc(100%/3+15px)] right-[calc(100%/4*2+15px)] bottom-[calc(100%/3+15px)]"
        previewWidth="w-[calc(133vh/4-30px]"
      />

      <UnusedBox1
        className="left-[calc(100%/4*2+15px)] top-[calc(100%/3+15px)] right-[calc(100%/4+15px)] bottom-[calc(100%/3+15px)]"
        previewWidth="w-[calc(133vh/4-30px]"
      />

      <UnusedBox2
        className="left-[calc(100%/4+15px)] top-[calc(100%/3*2+15px)] right-[calc(100%/4+15px)] bottom-0"
        previewWidth="w-[calc(133vh/4*2-30px)] max-w-[calc((100vw-120px)/2)]"
      />

      <ArticlesBox
        className="left-[calc(100%/4*3+15px)] top-0 right-0 bottom-[calc(100%/3+15px)]"
        previewWidth="w-[calc(133vh/4-15px]"
      />

      <UnusedBox3
        className="left-[calc(100%/4*3+15px)] top-[calc(100%/3*2+15px)] right-0 bottom-0"
        previewWidth="w-[calc(133vh/4-15px]"
      />

      <div className="absolute left-0 -bottom-6 right-0 pointer-events-none z-20 flex justify-center">
        <button
          ref={backButton}
          className={clsx(
            "opacity-0 py-3 px-6 rounded-lg bg-slate-200 border-slate-300 hover:bg-slate-300 transition border-solid border-2 font-semibold duration-350"
          )}
        >
          Get back
        </button>
      </div>
    </section>
  );
};
export default Board;
