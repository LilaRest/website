import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  previewWidth?: string;
}

export const FeaturedProjectBox: FC<Props> = ({
  className,
  previewWidth,
  ...props
}) => {
  return (
    <Box className={twMerge("bg-orange-500", className)} {...props}>
      <Preview className={previewWidth}>Featured project</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default FeaturedProjectBox;
