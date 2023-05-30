import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends BoxProps {}

export const BookMeBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("", className)} {...props}>
      <Preview>
        <h2 className="font-heading">Book me</h2>
      </Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default BookMeBox;
