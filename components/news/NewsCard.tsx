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
      <article className="bg-white rounded-md overflow-hidden shadow-elegant hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
        {/* Featured Image */}
        {post.featured_image ? (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-primary-500 flex items-center justify-center">
            <span className="font-serif text-cream-100 text-4xl font-light opacity-20">VC</span>
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block font-sans text-xs tracking-[0.1em] uppercase text-accent-gold font-medium">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-normal text-primary-500 mb-2 group-hover:text-accent-gold transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="font-sans text-secondary-500 text-sm mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center font-sans text-xs text-secondary-400">
            {post.author && (
              <>
                <span>{post.author}</span>
                <span className="mx-2">·</span>
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
