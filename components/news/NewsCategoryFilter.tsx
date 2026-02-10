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
    <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
      <Link
        href={`/${locale}/news`}
        className={`px-6 py-2 rounded-full font-medium transition-colors ${
          !currentCategory
            ? 'bg-primary-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        All News
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category}
          href={`/${locale}/news?category=${encodeURIComponent(category)}`}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            currentCategory === category
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
