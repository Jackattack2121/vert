import { NewsPost } from '@/lib/directus-news';
import NewsCard from './NewsCard';

interface RelatedArticlesProps {
  posts: NewsPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="font-serif font-light text-3xl text-primary-500 mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} locale="en" />
        ))}
      </div>
    </div>
  );
}
