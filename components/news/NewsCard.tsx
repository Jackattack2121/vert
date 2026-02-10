import Link from 'next/link';
import Image from 'next/image';
import { NewsPost } from '@/lib/directus-news';

interface NewsCardProps {
  post: NewsPost;
  locale: string;
}

export default function NewsCard({ post, locale }: NewsCardProps) {
  return (
    <Link href={`/${locale}/news/${post.slug}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Featured Image */}
        {post.featured_image ? (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-20">VC</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center text-sm text-gray-500">
            {post.author && (
              <>
                <span>{post.author}</span>
                <span className="mx-2">•</span>
              </>
            )}
            <span>{new Date(post.publish_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
