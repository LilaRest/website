import clsx from "clsx";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MediaContext } from "./Board";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: string;
}

export const Box: FC<BoxProps> = ({ children, className, position, ...props }) => {
  // Retrieve Preview and Main child components contents
  let previewContent: React.ReactElement | null = null;
  let mainContent: React.ReactElement | null = null;
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
  const [containerTop, setContainerTop] = useState(0);
  const [containerLeft, setContainerLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [previewContentWidth, setPreviewContentWidth] = useState(0);
  const [previewContentHeight, setPreviewContentHeight] = useState(0);
  const [mainContentWidth, setMainContentWidth] = useState(0);
  const [mainContentHeight, setMainContentHeight] = useState(0);
  const handleContentContainer = () => {
    if (box.current) {
      const parentRect = box.current.parentElement?.getBoundingClientRect()!;
      const boxRect = box.current.getBoundingClientRect()!;
      if (box.current === document.activeElement) {
        setContainerTop(media.gap);
        setContainerLeft(media.gap);
        setContainerHeight(box.current.parentElement?.offsetHeight! - media.gap * 2);
        setContainerWidth(box.current.parentElement?.offsetWidth! - media.gap * 2);
      } else {
        setContainerTop(boxRect.top - parentRect.top);
        setContainerLeft(boxRect.left - parentRect.left);
        setContainerWidth(box.current.offsetWidth);
        setContainerHeight(box.current.offsetHeight);
      }
      setPreviewContentWidth(box.current.offsetWidth);
      setPreviewContentHeight(box.current.offsetHeight);
      if (["tiny", "small"].includes(media.name)) {
        setMainContentWidth(window.innerWidth);
        setMainContentHeight(window.innerHeight);
      } else {
        setMainContentWidth(box.current.parentElement?.offsetWidth! - media.gap * 2);
        setMainContentHeight(box.current.parentElement?.offsetHeight! - media.gap * 2);
      }
    }
  };
  const handleFocus = () => {
    // Ensure all other boxes containers are at the background
    Array.from(box.current!.parentElement!.children).forEach((box) => {
      const container = box.firstElementChild! as HTMLDivElement;
      container.style.zIndex = "0";
    });

    // Pur the current focused container at the foreground
    container.current!.style.zIndex = "10";

    // Update container size and position
    handleContentContainer();
  };

  useEffect(() => {
    handleContentContainer();
    window.addEventListener("resize", handleContentContainer);
    return () => window.removeEventListener("resize", handleContentContainer);
  });

  return (
    <article
      ref={box}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleContentContainer}
      className={clsx(
        "w-full h-full",
        "[&_>_div_>:first-child]:opacity-100 [&_>_div_>:last-child]:opacity-0 [&_>_div_>:last-child]:pointer-events-none [&:focus_>_div_>:first-child]:opacity-0 [&:focus_>_div_>:first-child]:pointer-events-none [&:focus_>_div_>:last-child]:opacity-100",
        position
      )}
    >
      <div
        ref={container}
        style={{
          top: containerTop + "px",
          left: containerLeft + "px",
          width: containerWidth + "px",
          height: containerHeight + "px",
        }}
        className={twMerge(
          "rounded-3xl duration-500 overflow-hidden ease-in-out absolute transition-[top,left,height,width]",
          className
        )}
        {...props}
      >
        {/* Insert main content if given, else an empty div */}
        {previewContent ? (
          React.cloneElement(previewContent, {
            style: {
              width: previewContentWidth + "px",
              height: previewContentHeight + "px",
            },
          })
        ) : (
          <div></div>
        )}

        {/* Insert main content if given, else an empty div */}
        {mainContent ? (
          React.cloneElement(mainContent, {
            style: {
              width: mainContentWidth + "px",
              height: mainContentHeight + "px",
            },
          })
        ) : (
          <div></div>
        )}
      </div>
    </article>
  );
};

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Preview: FC<ContentProps> = ({ children, className, ...props }) => (
  <div
    className={twMerge("w-full h-full duration-500 p-8 absolute top-0 left-0 transition-opacity", className)}
    {...props}
  >
    {children}
  </div>
);
export const Main: FC<ContentProps> = ({ children, className, ...props }) => (
  <div
    className={twMerge("w-full h-full duration-500 p-8 absolute top-0 left-0 transition-opacity opacity-0", className)}
    {...props}
  >
    {children}
  </div>
);
