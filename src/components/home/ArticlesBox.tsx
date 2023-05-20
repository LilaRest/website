import { FC } from "react";
import { Box, Preview, Main } from "./Box";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  previewWidth?: string;
}

export const ArticlesBox: FC<Props> = ({
  className,
  previewWidth,
  ...props
}) => {
  return (
    <Box className={twMerge("bg-yellow-500", className)} {...props}>
      <Preview className={previewWidth}>Articles</Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default ArticlesBox;
