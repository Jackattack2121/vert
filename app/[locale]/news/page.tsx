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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            News & Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest company news, project updates, and industry insights
          </p>
        </div>

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
          <div className="text-center py-12">
            <p className="text-gray-600">No news articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Revalidate every hour
export const revalidate = 3600;
