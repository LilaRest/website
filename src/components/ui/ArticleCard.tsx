import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "./Badge";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  article: Article;
}

export const ArticleCard: FC<Props> = ({ className, article, ...props }) => {
  return (
    <Link href={`/blog/${article.slug}`} className={twMerge(className)} {...props}>
      <Image src={article.heroImage} alt={`Hero image of ${article.title}`} />
      <div>
        <div>
          <span>{article.date}</span>
          {article.latest && <Badge size="tiny">Latest</Badge>}
          {article.hot && <Badge size="tiny">Hot</Badge>}
        </div>
        <h3>{article.title}</h3>
      </div>
    </Link>
  );
};
