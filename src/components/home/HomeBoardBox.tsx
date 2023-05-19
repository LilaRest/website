import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const HomeBoardBox: FC<Props> = ({ children, className, ...props }) => {
  let previewContent = null;
  let mainContent = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Preview) previewContent = child;
      else if (child.type === Content) mainContent = child;
    }
  });

  return (
    <article
      className={twMerge(
        "rounded-3xl duration-500 overflow-hidden",
        "absolute",
        "focus:inset-0",
        "[&_>:first-child]:opacity-100 [&_>:last-child]:opacity-0 [&_>:last-child]:pointer-events-none [&:focus_>:first-child]:opacity-0 [&:focus_>:first-child]:pointer-events-none [&:focus_>:last-child]:opacity-100",
        className
      )}
      tabIndex={0}
      {...props}
    >
      <div className="absolute top-0 right-0 left-0 transition-opacity duration-500">
        {previewContent}
      </div>
      <div className="absolute top-0 right-0 left-0 transition-opacity duration-500 w-[100vh]">
        {mainContent}
      </div>
    </article>
  );
};

export const Preview = ({ children }: any) => children;

export const Content = ({ children }: any) => children;
