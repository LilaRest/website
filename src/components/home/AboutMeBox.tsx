import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends BoxProps {}

export const AboutMeBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-red-500", className)} {...props}>
      <Preview>About me</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default AboutMeBox;
