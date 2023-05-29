import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  pattern: string;
}

export const HiddenMask: FC<Props> = ({ children, pattern, ...props }) => (
  <div
    style={{
      mask: `url('/assets/patterns/${pattern}.png')`,
      WebkitMask: `url('/assets/patterns/${pattern}.png')`,
    }}
    className="bg-bg -z-1 absolute inset-0"
    {...props}
  >
    {children}
  </div>
);
export default HiddenMask;
