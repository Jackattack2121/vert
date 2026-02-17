import { Metadata } from 'next';
import { getNewsPosts, getNewsCategories } from '@/lib/directus-news';
import NewsGrid from '@/components/news/NewsGrid';
import NewsCategoryFilter from '@/components/news/NewsCategoryFilter';

export const metadata: Metadata = {
  title: 'News & Updates | Vert Capital',
  description: 'Latest news, updates, and insights from Vert Capital',
};

interface NewsPageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const category = searchParams.category;
  const page = parseInt(searchParams.page || '1', 10);
  const postsPerPage = 12;
  const offset = (page - 1) * postsPerPage;

  const { posts, total } = await getNewsPosts({
    limit: postsPerPage,
    offset,
    category,
  });

  const categories = await getNewsCategories();
  const totalPages = Math.ceil(total / postsPerPage);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Montfort-style deep teal */}
      <section className="bg-primary-500 py-40 md:py-48">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          <h1 className="font-serif font-light text-hero text-cream-100 mb-4">
            News & Updates
          </h1>
          <p className="font-sans text-xl text-cream-200 opacity-90 max-w-2xl leading-relaxed">
            Stay informed with the latest company news, project updates, and industry insights
          </p>
        </div>
      </section>

      {/* Content area */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          {/* Category Filter */}
          <NewsCategoryFilter
            categories={categories}
            currentCategory={category}
          />

          {/* News Grid */}
          <NewsGrid
            posts={posts}
            currentPage={page}
            totalPages={totalPages}
            category={category}
          />

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-secondary-400">No news articles found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Revalidate every hour
export const revalidate = 3600;
