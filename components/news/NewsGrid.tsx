'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import NewsCard from './NewsCard';
import { NewsPost } from '@/lib/directus-news';

interface NewsGridProps {
  posts: NewsPost[];
  currentPage: number;
  totalPages: number;
  category?: string;
}

export default function NewsGrid({ posts, currentPage, totalPages, category }: NewsGridProps) {
  const params = useParams();
  const locale = params.locale as string;

  const buildPageUrl = (page: number) => {
    const baseUrl = `/${locale}/news`;
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} locale={locale} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          {currentPage > 1 && (
            <Link
              href={buildPageUrl(currentPage - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={buildPageUrl(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link
              href={buildPageUrl(currentPage + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}
