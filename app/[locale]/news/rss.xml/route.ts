import { NextResponse } from 'next/server';
import { getNewsPosts } from '@/lib/directus-news';

export async function GET() {
  const { posts } = await getNewsPosts({ limit: 50 });

  const baseUrl = process.env.NEXTAUTH_URL || 'https://vertcapital.com.au';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vert Capital News</title>
    <link>${baseUrl}/news</link>
    <description>Latest news and updates from Vert Capital</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/news/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/news/${post.slug}</link>
      <guid>${baseUrl}/news/${post.slug}</guid>
      <pubDate>${new Date(post.publish_date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt || '')}</description>
      <category>${escapeXml(post.category)}</category>
      ${post.author ? `<author>${escapeXml(post.author)}</author>` : ''}
      ${post.featured_image ? `<enclosure url="${post.featured_image}" type="image/jpeg"/>` : ''}
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
