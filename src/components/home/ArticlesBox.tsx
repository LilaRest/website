import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends BoxProps {}

export const ArticlesBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-yellow-500", className)} {...props}>
      <Preview>Articles</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default ArticlesBox;