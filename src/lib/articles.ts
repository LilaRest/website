import fs from "fs";

export async function getArticle(slug: string): Promise<Article> {
  const lib = await import(`@/contents/${slug}.mdx`);
  return {
    ...lib.meta,
    component: lib.default,
    slug: slug,
  };
}

export async function getArticles(
  hot: boolean = false,
  latest: boolean = false,
  limit: number = 5
) {
  const articles: Article[] = [];
  const allArticles = fs
    .readdirSync("src/contents/")
    .map(async (p) => await getArticle(p.replace(".mdx", "")));
  allArticles.sort((article) => article.date);
}
