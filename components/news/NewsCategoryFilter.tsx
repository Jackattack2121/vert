'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface NewsCategoryFilterProps {
  categories: string[];
  currentCategory?: string;
}

export default function NewsCategoryFilter({ categories, currentCategory }: NewsCategoryFilterProps) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
      <Link
        href={`/${locale}/news`}
        className={`px-6 py-2.5 rounded-md font-sans text-sm font-medium tracking-wide transition-all duration-300 ${
          !currentCategory
            ? 'bg-primary-500 text-cream-100'
            : 'bg-white text-primary-500 border border-primary-500/20 hover:bg-primary-500 hover:text-cream-100'
        }`}
      >
        All News
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          href={`/${locale}/news?category=${encodeURIComponent(category)}`}
          className={`px-6 py-2.5 rounded-md font-sans text-sm font-medium tracking-wide transition-all duration-300 ${
            currentCategory === category
              ? 'bg-primary-500 text-cream-100'
              : 'bg-white text-primary-500 border border-primary-500/20 hover:bg-primary-500 hover:text-cream-100'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
