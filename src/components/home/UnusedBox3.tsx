import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  previewWidth?: string;
}

export const UnusedBox3: FC<Props> = ({
  className,
  previewWidth,
  ...props
}) => {
  return (
    <Box className={twMerge("bg-pink-500", className)} {...props}>
      <Preview className={previewWidth}>Unused 3</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default UnusedBox3;
