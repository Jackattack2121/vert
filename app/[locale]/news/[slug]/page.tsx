import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNewsPostBySlug, getNewsPosts } from '@/lib/directus-news';
import NewsArticle from '@/components/news/NewsArticle';
import RelatedArticles from '@/components/news/RelatedArticles';

interface NewsArticlePageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const post = await getNewsPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : [],
      type: 'article',
      publishedTime: post.publish_date,
      authors: post.author ? [post.author] : [],
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const post = await getNewsPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Fetch related articles
  const { posts: relatedPosts } = await getNewsPosts({
    category: post.category,
    limit: 3,
  });

  // Filter out current post
  const related = relatedPosts.filter(p => p.slug !== post.slug);

  return (
    <div className="min-h-screen bg-white">
      <NewsArticle post={post} />
      
      {related.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RelatedArticles posts={related} />
          </div>
        </div>
      )}
    </div>
  );
}

// Generate static paths for all published posts
export async function generateStaticParams() {
  const { posts } = await getNewsPosts({ limit: 100 });
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Revalidate every hour
export const revalidate = 3600;
