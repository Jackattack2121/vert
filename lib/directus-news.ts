import { createDirectus, rest, readItems, readItem } from '@/directus/sdk';

const client = createDirectus(process.env.DIRECTUS_URL || 'http://localhost:8055').with(rest());

export interface NewsPost {
  id: string;
  status: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  publish_date: string;
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  og_image?: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all published news posts
 */
export async function getNewsPosts(options?: {
  limit?: number;
  offset?: number;
  category?: string;
  featured?: boolean;
}): Promise<{ posts: NewsPost[]; total: number }> {
  try {
    const filter: any = { status: { _eq: 'published' } };
    
    if (options?.category) {
      filter.category = { _eq: options.category };
    }
    
    if (options?.featured !== undefined) {
      filter.featured = { _eq: options.featured };
    }

    const posts = await client.request(
      readItems('news_posts', {
        filter,
        limit: options?.limit || 10,
        offset: options?.offset || 0,
        sort: ['-publish_date'],
      })
    );

    // Get total count for pagination
    const total = posts.length; // TODO: Implement proper count query

    return {
      posts: posts as NewsPost[],
      total,
    };
  } catch (error) {
    console.error('Failed to fetch news posts:', error);
    return { posts: [], total: 0 };
  }
}

/**
 * Fetch a single news post by slug
 */
export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const posts = await client.request(
      readItems('news_posts', {
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        limit: 1,
      })
    );

    if (posts.length === 0) {
      return null;
    }

    // Increment view count
    // TODO: Implement view count increment in separate API call to avoid SSR issues

    return posts[0] as NewsPost;
  } catch (error) {
    console.error('Failed to fetch news post:', error);
    return null;
  }
}

/**
 * Fetch featured news posts
 */
export async function getFeaturedNewsPosts(limit: number = 3): Promise<NewsPost[]> {
  const { posts } = await getNewsPosts({ limit, featured: true });
  return posts;
}

/**
 * Get all news categories
 */
export async function getNewsCategories(): Promise<string[]> {
  // Default categories from schema
  return [
    'Company News',
    'Project Updates',
    'Industry Insights',
    'Media Coverage',
  ];
}

/**
 * Search news posts
 */
export async function searchNewsPosts(query: string): Promise<NewsPost[]> {
  try {
    const posts = await client.request(
      readItems('news_posts', {
        filter: {
          _and: [
            { status: { _eq: 'published' } },
            {
              _or: [
                { title: { _contains: query } },
                { excerpt: { _contains: query } },
                { content: { _contains: query } },
              ],
            },
          ],
        },
        sort: ['-publish_date'],
        limit: 50,
      })
    );

    return posts as NewsPost[];
  } catch (error) {
    console.error('Failed to search news posts:', error);
    return [];
  }
}
