interface ArticleMeta {
  title: string;
  description: string;
  date: Date;
  heroImage: string;
  hot: boolean;
}

interface Article extends ArticleMeta {
  slug: string;
  component: React.FC;
}
