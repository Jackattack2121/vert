import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', 'bs', 'zh', 'ja', 'it'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix in the URL (e.g., /en/about, /de/about)
  localePrefix: 'always',

  // Enable automatic locale detection with cookie persistence
  // This will read from NEXT_LOCALE cookie and fall back to Accept-Language header
  localeDetection: true
});
