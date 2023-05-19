import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  pattern: string;
}

export const HiddenMask: FC<Props> = ({ children, pattern, ...props }) => (
  <div className="reveal bg-reveal">
    <div
      style={{
        backgroundImage: `url('/assets/patterns/${pattern}.png')`,
      }}
      {...props}
    >
      {children}
    </div>
  </div>
);
export default HiddenMask;
