import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  previewWidth?: string;
}

export const AboutMeBox: FC<Props> = ({
  className,
  previewWidth,
  ...props
}) => {
  return (
    <Box className={twMerge("bg-red-500", className)} {...props}>
      <Preview className={previewWidth}>About me</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default AboutMeBox;
