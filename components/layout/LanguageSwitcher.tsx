'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { HiGlobeAlt, HiChevronDown } from 'react-icons/hi';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

interface LanguageSwitcherProps {
  isSolid?: boolean;
}

export default function LanguageSwitcher({ isSolid = true }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md font-sans text-[13px] font-medium tracking-[0.05em] transition-colors duration-300',
          isSolid
            ? 'text-primary-500 hover:text-accent-gold'
            : 'text-cream-100 hover:text-accent-gold',
          isOpen && 'text-accent-gold'
        )}
        aria-label="Language selector"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <HiGlobeAlt className="w-4 h-4" />
        <span className="hidden md:inline">{currentLanguage.name}</span>
        <span className="md:hidden">{currentLanguage.code.toUpperCase()}</span>
        <HiChevronDown
          className={cn('w-3.5 h-3.5 transition-transform duration-300', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-md shadow-elegant-lg ring-1 ring-primary-500/5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2.5 font-sans text-sm text-left transition-colors duration-200',
                  locale === language.code
                    ? 'bg-cream-200 text-accent-gold font-medium'
                    : 'text-primary-500 hover:bg-cream-100 hover:text-accent-gold'
                )}
                role="menuitem"
                aria-current={locale === language.code ? 'true' : undefined}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1">{language.name}</span>
                {locale === language.code && (
                  <svg
                    className="w-4 h-4 text-accent-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
