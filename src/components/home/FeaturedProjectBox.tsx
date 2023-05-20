import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const FeaturedProjectBox: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-orange-500", className)} {...props}>
      <Preview className="w-[calc(133vh/4-30px)]">Featured project</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default FeaturedProjectBox;
