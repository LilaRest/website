import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends BoxProps {}

export const UnusedBox1: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("", className)} {...props}>
      <Preview>Unused 1</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default UnusedBox1;
