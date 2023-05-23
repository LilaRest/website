import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MediaContext } from "./Board";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: string;
}

export const Box: FC<BoxProps> = ({ children, className, position, ...props }) => {
  // Retrieve Preview and Main child components contents
  let previewContent: React.ReactElement = <div></div>;
  let mainContent: React.ReactElement = <div></div>;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Preview) previewContent = child;
      else if (child.type === Main) mainContent = child;
    }
  });

  // Handle content container size and position
  const media = useContext(MediaContext);
  const box = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const getBackButton = useRef<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleContentContainer = () => {
    if (box.current) {
      const board = box.current.parentElement!;

      // Expand the conainer on focus
      if (isFocused) {
        // If the screenSize is tiny or small, make the container take the whole window space
        if (["tiny", "small"].includes(media.name)) {
          container.current!.style.top = board.offsetTop! + "px";
          container.current!.style.left = "0";
          container.current!.style.height = `calc(100vh - ${board.offsetTop! + "px"})`;
          container.current!.style.width = "100vw";
        }

        // Make the container take the whole board space if the box is focused
        else {
          container.current!.style.top = media.gap + "px";
          container.current!.style.left = media.gap + "px";
          container.current!.style.height = board.offsetHeight! - media.gap * 2 + "px";
          container.current!.style.width = board.offsetWidth! - media.gap * 2 + "px";
        }
      }
      // Else make the container take the box space
      else {
        const parentRect = box.current.parentElement?.getBoundingClientRect()!;
        const boxRect = box.current.getBoundingClientRect()!;
        container.current!.style.top = boxRect.top - parentRect.top + "px";
        container.current!.style.left = boxRect.left - parentRect.left + "px";
        container.current!.style.width = box.current.offsetWidth + "px";
        container.current!.style.height = box.current.offsetHeight + "px";
      }
      // Ensure the preview content has strictly the same size as the box
      const previewContentEl = container.current!.firstElementChild! as HTMLDivElement;
      previewContentEl.style.width = box.current.offsetWidth + "px";
      previewContentEl.style.height = box.current.offsetHeight + "px";

      // If the screenSize is tiny or small, ensure the main content has the same width as the window and same height as the board
      const mainContentEl = previewContentEl.nextElementSibling as HTMLDivElement;
      if (["tiny", "small"].includes(media.name)) {
        mainContentEl.style.width = window.innerWidth + "px";
        mainContentEl.style.height = board.offsetHeight + "px";
      }
      // Else ensure the main content has the same size as the board
      else {
        mainContentEl.style.width = board.offsetWidth! - media.gap * 2 + "px";
        mainContentEl.style.height = board.offsetHeight! - media.gap * 2 + "px";
      }
    }
  };
  const handleFocus = () => {
    // If the box is not already focused
    if (!isFocused) {
      // Set the new focused state
      setIsFocused(true);

      // Ensure all other boxes containers are at the background
      // (zIndex are decremented 1 by 1 to ensure the each box have more priority that all boxes focused before it and not refocused then)
      Array.from(box.current!.parentElement!.children).forEach((box) => {
        const container = box.firstElementChild! as HTMLDivElement;
        if (container.style.zIndex !== "0") container.style.zIndex = parseInt(container.style.zIndex) - 1 + "";
      });

      // Pur the current focused container at the foreground
      container.current!.style.zIndex = "10";

      // Update container size and position
      handleContentContainer();
    }
  };
  const handleBlur = () => {
    // Ensure the get back button is blurred once clicked (else the below condition will consider the box still being focused)
    getBackButton.current!.blur();

    // If the whole page has not lost focus (e.g. user changed tab or window)
    if (document.hasFocus()) {
      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        // If the new focused element is not still in the current container
        if (!document.activeElement || !container.current!.contains(document.activeElement)) {
          // Set the new focused state
          setIsFocused(false);

          // Update container size and position
          handleContentContainer();
        }
      });
    }
  };
  useEffect(() => {
    handleContentContainer();
    window.addEventListener("resize", handleContentContainer);
    return () => {
      window.removeEventListener("resize", handleContentContainer);
    };
  });

  return (
    <article ref={box} className={position}>
      <div
        ref={container}
        className={twMerge(
          "rounded-3xl duration-500 overflow-hidden ease-in-out absolute transition-[top,left,height,width,border-radius]",
          "[&_>:nth-child(1)]:opacity-100 [&_>:nth-child(2)]:opacity-0 [&_>:nth-child(2)]:pointer-events-none [&_>:nth-child(3)]:opacity-0 [&_>:nth-child(3)]:pointer-events-none",
          isFocused &&
            "[&_>:nth-child(1)]:opacity-0 [&_>:nth-child(1)]:pointer-events-none [&_>:nth-child(2)]:opacity-100 [&_>:nth-child(2)]:pointer-events-auto [&_>:nth-child(3)]:opacity-100  [&_>:nth-child(3)]:pointer-events-auto",
          isFocused && ["tiny", "small"].includes(media.name) && "fixed rounded-none",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        {...props}
      >
        {/* Insert preview and main box contents */}
        {previewContent}
        {mainContent}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center transition-opacity duration-500">
          <button
            ref={getBackButton}
            onClick={handleBlur}
            className="bg-slate-200 hover:bg-slate-300 transition duration-500 border-slate-400 border-2 border-solid rounded-xl py-2 px-4"
          >
            Get back
          </button>
        </div>
      </div>
    </article>
  );
};

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const Content: FC<ContentProps> = ({ children, className, ...props }) => (
  <div
    className={twMerge("w-full h-full duration-500 p-8 absolute top-0 left-0 transition-opacity", className)}
    {...props}
  >
    {children}
  </div>
);
export const Preview = Content.bind({});
export const Main = Content.bind({});
