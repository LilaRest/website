import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Box: FC<Props> = ({ children, className, ...props }) => {
  let previewContent = null;
  let mainContent = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Preview) previewContent = child;
      else if (child.type === Main) mainContent = child;
    }
  });

  return (
    <article
      className={twMerge(
        "rounded-3xl duration-500 overflow-hidden ease-in-out",
        "absolute",
        "focus:inset-0",
        "[&_>:first-child]:opacity-100 [&_>:last-child]:opacity-0 [&_>:last-child]:pointer-events-none [&:focus_>:first-child]:opacity-0 [&:focus_>:first-child]:pointer-events-none [&:focus_>:last-child]:opacity-100",
        className
      )}
      tabIndex={0}
      {...props}
    >
      {previewContent}
      {mainContent}
    </article>
  );
};

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Preview: FC<ContentProps> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={twMerge(
      "absolute top-0 right-0 left-0 transition-opacity duration-500  p-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
export const Main: FC<ContentProps> = ({ children, className, ...props }) => (
  <div
    className={twMerge(
      "absolute top-0 right-0 left-0 transition-opacity duration-500 w-[100vh] p-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
