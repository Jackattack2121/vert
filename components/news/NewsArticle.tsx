import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi';
import { NewsPost } from '@/lib/directus-news';

interface NewsArticleProps {
  post: NewsPost;
}

export default function NewsArticle({ post }: NewsArticleProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/news"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
      >
        <FiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to News
      </Link>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center text-gray-600 mb-8 space-x-6">
        {post.author && (
          <div className="flex items-center">
            <FiUser className="w-4 h-4 mr-2" />
            <span>{post.author}</span>
          </div>
        )}
        <div className="flex items-center">
          <FiCalendar className="w-4 h-4 mr-2" />
          <span>{new Date(post.publish_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <div className="text-xl text-gray-700 mb-8 pb-8 border-b italic">
          {post.excerpt}
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
        <div className="flex space-x-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}
