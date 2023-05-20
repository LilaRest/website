import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  previewWidth?: string;
}

export const UnusedBox2: FC<Props> = ({
  className,
  previewWidth,
  ...props
}) => {
  return (
    <Box className={twMerge("bg-purple-500", className)} {...props}>
      <Preview className={previewWidth}>Unused 2</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default UnusedBox2;
