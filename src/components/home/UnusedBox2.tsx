import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const UnusedBox2: FC<Props> = ({ className, ...props }) => {
  return (
    <Box className={twMerge("bg-purple-500", className)} {...props}>
      <Preview className="w-[calc(133vh/4*2-30px)]">Unused 2</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default UnusedBox2;
