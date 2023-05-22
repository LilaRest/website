import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends BoxProps {}

export const BookMeBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-green-500", className)} {...props}>
      <Preview>Book me</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default BookMeBox;
