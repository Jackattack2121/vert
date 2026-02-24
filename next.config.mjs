import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  images: {
    domains: ['www.vertcapital.com.au'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/:locale/companies', destination: '/:locale/portfolio', permanent: true },
      { source: '/:locale/sponsorships', destination: '/:locale/portfolio', permanent: true },
      { source: '/:locale/services', destination: '/:locale/about', permanent: true },
      { source: '/:locale/projects/:path*', destination: '/:locale', permanent: true },
      { source: '/:locale/why-yugo-metals', destination: '/:locale', permanent: true },
      { source: '/:locale/prospectus', destination: '/:locale', permanent: true },
      { source: '/:locale/company/:path*', destination: '/:locale/about', permanent: true },
    ]
  },
};

export default withNextIntl(nextConfig);
