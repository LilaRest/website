import { FC } from "react";
import { Box, Preview, Main, BoxProps } from "./Box";
import { twMerge } from "tailwind-merge";
import { ArticleCard } from "../ui/ArticleCard";

interface Props extends BoxProps {}

export const ArticlesBox: FC<Props> = ({ className, ...props }) => {
  const latestHotArticle = {};
  const latestArticle = {}; // Is null if equal to latestHotArticle
  const previousHotArticle = {};
  const latestArticles = []; // Max 3

  return (
    <Box className={twMerge("", className)} {...props}>
      <Preview>
        <h2 className="font-heading text-center">Trending Articles</h2>
        <ul>
          <li>
            <ArticleCard article={latestHotArticle} />
          </li>
          {latestArticle && (
            <li>
              <ArticleCard article={latestArticle} />
            </li>
          )}
          <li>
            <ArticleCard article={previousHotArticle} />
          </li>
          {latestArticles.map((article, i) => (
            <li key={i}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Preview>
      <Main>Lorem ipsum dolor sit amet</Main>
    </Box>
  );
};

export default ArticlesBox;
