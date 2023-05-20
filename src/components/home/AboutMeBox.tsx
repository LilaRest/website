import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const AboutMeBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-red-500", className)} {...props}>
      <Preview className="w-[133vh]">About me</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default AboutMeBox;
