import { NextPage } from "next";
import fs from "fs";
import { notFound } from "next/navigation";

// SSR available articles and their metadata
export const generateStaticParams = async () => {
  return fs.readdirSync("src/contents/").map((name) => ({
    slug: name.replace(".mdx", ""),
  }));
};
export const generateMetadata = async ({ params }: PageProps) => {
  try {
    return (await import(`@/contents/${params.slug}.mdx`)).metadata;
  } catch (e) {
    return {};
  }
};

interface PageProps {
  params: {
    slug: string;
  };
}

/* @ts-expect-error Async Server Component */
const Page: NextPage<PageProps> = async ({ params }) => {
  let Article;
  try {
    Article = (await import(`@/contents/${params.slug}.mdx`)).default;
  } catch (e) {
    notFound();
  }
  return (
    <div className="prose">
      <Article />
    </div>
  );
};
export default Page;
