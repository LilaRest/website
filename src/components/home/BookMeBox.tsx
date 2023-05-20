import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  previewWidth?: string;
}

export const BookMeBox: FC<Props> = ({ className, previewWidth, ...props }) => {
  return (
    <Box className={twMerge("bg-green-500", className)} {...props}>
      <Preview className={previewWidth}>Book me</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default BookMeBox;
