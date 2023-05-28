import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends BoxProps {}

export const UnusedBox2: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("", className)} {...props}>
      <Preview>Unused 2</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default UnusedBox2;
