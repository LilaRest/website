import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MediaContext } from "./Board";
import { Button } from "@/components/ui";
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

  // Create a bunch of refs and states
  const media = useContext(MediaContext);
  const box = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const getBackButton = useRef<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // This function is called to update the size, position and render of the content container and its children
  const handleContainer = () => {
    if (box.current && container.current) {
      // Retrieve the parent board element.
      const board = box.current.parentElement!;

      // Retrieve position and size data about the box and the board
      const boxRect = box.current.getBoundingClientRect()!;
      const boardRect = board.getBoundingClientRect()!;

      // Expand the content container on focus
      if (isFocused) {
        // If the screenSize is tiny or small, make the container take the whole window space
        if (["tiny", "small"].includes(media.name)) {
          // Remove the transition and put the fixed container in front of its box to avoid a shift effect
          // while transiting from absolute to fixed position
          container.current.style.transition = "none";
          container.current.style.top = boxRect.top + "px";
          container.current.style.left = boxRect.left + "px";

          // Wait for the next frame to apply the transition and the fixed position
          requestAnimationFrame(() => {
            if (container.current) {
              // Re-enable the transition
              container.current.style.transition = "";

              // Make the content container take the whole window space except header
              container.current.style.top = board.offsetTop! + "px";
              container.current.style.left = "0";
              container.current.style.height = `calc(100vh - ${board.offsetTop!}px)`;
              container.current.style.width = "100vw";
            }
          });
        }

        // Else, make the container take the whole board space
        else {
          container.current.style.top = boardRect.top + window.scrollY + media.gap + "px";
          container.current.style.left = boardRect.left + window.scrollX + media.gap + "px";
          container.current.style.height = board.offsetHeight! - media.gap * 2 + "px";
          container.current.style.width = board.offsetWidth! - media.gap * 2 + "px";
        }
      }
      // Else make the container take the box space
      else {
        if (["tiny", "small"].includes(media.name)) {
          // Remove the transition and put the absolute container to take the whole screen to avoid a shift effect
          // while transiting from fixed to absolute position
          container.current.style.transition = "none";
          container.current.style.top = board.offsetTop + window.scrollY + "px";
          container.current.style.left = window.scrollX + boardRect.left + "px";
          container.current.style.height = window.innerHeight - board.offsetTop + "px";
          container.current.style.width = window.innerWidth + "px";

          // Wait for the next frame to apply the transition and the absolute position
          requestAnimationFrame(() => {
            if (container.current) {
              // Re-enable the transition
              container.current.style.transition = "";

              // Make the content container take its whole box space
              container.current.style.top = boxRect.top + window.scrollY + "px";
              container.current.style.left = boxRect.left + window.scrollX + "px";
              container.current.style.width = box.current!.offsetWidth + "px";
              container.current.style.height = box.current!.offsetHeight + "px";
            }
          });
        } else {
          container.current.style.top = boxRect.top + window.scrollY + "px";
          container.current.style.left = boxRect.left + window.scrollX + "px";
          container.current.style.width = box.current!.offsetWidth + "px";
          container.current.style.height = box.current!.offsetHeight + "px";
        }
      }
      // Ensure the preview content has strictly the same size as the box
      const previewContentEl = container.current!.firstElementChild! as HTMLDivElement;
      previewContentEl.style.width = box.current.offsetWidth + "px";
      previewContentEl.style.height = box.current.offsetHeight + "px";

      // If the screenSize is tiny or small, ensure the main content has the same width as the window and same height as the board
      const mainContentEl = previewContentEl.nextElementSibling as HTMLDivElement;
      if (["tiny", "small"].includes(media.name)) {
        mainContentEl.style.width = window.innerWidth + "px";
        mainContentEl.style.height = `calc(100vh - ${board.offsetTop!}px)`;
      }
      // Else ensure the main content has the same size as the board
      else {
        mainContentEl.style.width = board.offsetWidth! - media.gap * 2 + "px";
        mainContentEl.style.height = board.offsetHeight! - media.gap * 2 + "px";
      }
    }
  };

  // This function is called each time the focus is put on the box container
  const handleFocus = () => {
    // Prevent recalling the function if the box is already focused
    if (!isFocused) {
      // Set the new focused state
      setIsFocused(true);

      // Ensure all other boxes containers are at the background
      // (zIndex are decremented 1 by 1 to ensure the each box have more priority that all boxes focused before it and not refocused then)
      Array.from(box.current!.parentElement!.children).forEach((box) => {
        const container = box.firstElementChild! as HTMLDivElement;
        if (container.style.zIndex !== "0") container.style.zIndex = parseInt(container.style.zIndex) - 1 + "";
      });

      // Put the current focused container at the foreground
      container.current!.style.zIndex = "10";
    }
  };

  // This function is called each time the focus is removed from the box container
  const handleBlur = () => {
    // Prevent calling the functino if its the whole page that has lost focus and not
    // only the box container(e.g., user changed tab or window)
    if (document.hasFocus()) {
      // Ensure the get back button is blurred once clicked (else the below condition will consider the box still being focused)
      getBackButton.current!.blur();

      // Give browser time to remove focus from the box container
      requestAnimationFrame(() => {
        // If the new focused element is not still in the current container
        if (!document.activeElement || !container.current!.contains(document.activeElement)) {
          // Set the new focused state
          setIsFocused(false);
        }
      });
    }
  };

  // Re-render container each time the focused state changes
  useEffect(handleContainer, [isFocused, media]);

  // Re-render container each time the window size changes
  useEffect(() => {
    handleContainer();
    window.addEventListener("resize", handleContainer);
    return () => {
      window.removeEventListener("resize", handleContainer);
    };
  });

  return (
    <article ref={box} className={position}>
      <div
        ref={container}
        className={twMerge(
          "rounded-3xl duration-500 overflow-hidden ease-in-out absolute transition-[top,left,height,width,border-radius] bg-fg/5 backdrop-blur-2xl",
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
        <div className="absolute bottom-4 left-0 right-0 flex justify-center transition-opacity">
          <Button
            variant="outline"
            size={["small", "tiny"].includes(media.name) ? "large" : "default"}
            ref={getBackButton}
            onClick={handleBlur}
          >
            Get back
          </Button>
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
