import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const AboutMeBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-red-500", className)} {...props}>
      <Preview className="w-[calc(133vh/4*3-15px]">About me</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default AboutMeBox;
