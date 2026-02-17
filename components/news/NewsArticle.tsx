import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi';
import { NewsPost } from '@/lib/directus-news';

interface NewsArticleProps {
  post: NewsPost;
}

export default function NewsArticle({ post }: NewsArticleProps) {
  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
      {/* Back Link */}
      <Link
        href="/news"
        className="inline-flex items-center font-sans text-sm text-accent-gold hover:text-accent-goldDark mb-8 group transition-colors duration-300"
      >
        <FiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to News
      </Link>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block font-sans text-xs tracking-[0.1em] uppercase text-accent-gold font-medium">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-serif font-light text-4xl md:text-5xl text-primary-500 mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center font-sans text-secondary-400 mb-8 space-x-6 text-sm">
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
        <div className="relative w-full h-96 rounded-md overflow-hidden mb-10">
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
        <div className="font-serif text-xl text-primary-500 mb-8 pb-8 border-b border-primary-500/10 font-light leading-relaxed">
          {post.excerpt}
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-headings:text-primary-500 prose-p:font-sans prose-p:text-secondary-500 prose-a:text-accent-gold"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share */}
      <div className="mt-12 pt-8 border-t border-primary-500/10">
        <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">Share this article</h3>
        <div className="flex space-x-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary-500 text-cream-100 rounded-md font-sans text-sm font-medium hover:bg-primary-600 transition-colors duration-300"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary-500 text-cream-100 rounded-md font-sans text-sm font-medium hover:bg-primary-600 transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}
