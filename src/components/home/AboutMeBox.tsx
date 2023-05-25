import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends BoxProps {}

export const AboutMeBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-red-500", className)} {...props}>
      <Preview>
        {" "}
        <div className="bg-gray-500 w-full h-full">About me</div>
      </Preview>
      <Main>
        {" "}
        <div className="bg-gray-300 w-full h-full">Lorem ipsum dolor sit amet</div>
      </Main>
    </Box>
  );
};

export default AboutMeBox;
