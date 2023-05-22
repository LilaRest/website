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
  const [isFocused, setIsFocused] = useState(false);
  const handleContentContainer = () => {
    if (box.current) {
      const board = box.current.parentElement!;

      // Make the container take the whole board space if the box is focused
      if (isFocused) {
        container.current!.style.top = media.gap + "px";
        container.current!.style.left = media.gap + "px";
        container.current!.style.height = board.offsetHeight! - media.gap * 2 + "px";
        container.current!.style.width = board.offsetWidth! - media.gap * 2 + "px";
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
      const mainContentEl = container.current!.lastElementChild! as HTMLDivElement;
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
    // Set the new focused state
    setIsFocused(true);

    // Ensure all other boxes containers are at the background
    Array.from(box.current!.parentElement!.children).forEach((siblingBox) => {
      if (siblingBox === box.current) return;
      const container = siblingBox.firstElementChild! as HTMLDivElement;
      if (container.style.zIndex === "10") container.style.zIndex = "5";
      else if (container.style.zIndex === "5") container.style.zIndex = "0";
    });

    // Pur the current focused container at the foreground
    container.current!.style.zIndex = "10";

    // Update container size and position
    handleContentContainer();
  };
  const handleBlur = () => {
    // If the whole page has not lost focus (e.g. user changed tab or window)
    if (document.hasFocus()) {
      // Set the new focused state
      setIsFocused(false);

      // Update container size and position
      handleContentContainer();
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
          "rounded-3xl duration-500 overflow-hidden ease-in-out absolute transition-[top,left,height,width]",
          "[&_>:first-child]:opacity-100 [&_>:last-child]:opacity-0 [&_>:last-child]:pointer-events-none",
          isFocused && "[&_>:first-child]:opacity-0 [&_>:last-child]:opacity-100 [&_>:first-child]:pointer-events-none",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        {...props}
      >
        {previewContent}
        {mainContent}
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
