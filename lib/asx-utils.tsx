/**
 * ASX Regulatory Content Utilities
 * 
 * Handles English-only regulatory content as required by ASX regulations.
 * All ASX announcements, regulatory filings, and official documents must
 * remain in English regardless of the user's selected language.
 */

import { ReactNode } from 'react';

/**
 * Wrapper component props for English-only content
 */
export interface EnglishOnlyContentProps {
  children: ReactNode;
  showNotice?: boolean;
  className?: string;
}

/**
 * Wrapper component to mark English-only regulatory content
 * Adds lang="en" attribute for screen reader accessibility (WCAG 2.1)
 */
export function EnglishOnlyWrapper({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <span lang="en" className={className}>
      {children}
    </span>
  );
}

/**
 * Check if content is regulatory/ASX content that must stay in English
 */
export function isRegulatoryContent(contentType: string): boolean {
  const regulatoryTypes = [
    'asx-announcement',
    'financial-report',
    'quarterly-report',
    'annual-report',
    'prospectus',
    'regulatory-filing',
    'asx-release',
    'market-sensitive',
  ];
  
  return regulatoryTypes.includes(contentType.toLowerCase());
}

/**
 * Get the regulatory notice text in the user's language
 */
export function getRegulatoryNoticeText(locale: string): string {
  const notices: Record<string, string> = {
    en: 'This content is provided in English as required by ASX regulations',
    de: 'Dieser Inhalt wird gemäß den ASX-Vorschriften auf Englisch bereitgestellt',
    bs: 'Ovaj sadržaj je dostupan na engleskom jeziku kako zahtijevaju ASX propisi',
    zh: '根据 ASX 法规要求，此内容以英文提供',
    ja: 'この内容は ASX 規制により英語で提供されています',
    fr: 'Ce contenu est fourni en anglais conformément à la réglementation ASX',
    it: 'Questo contenuto è fornito in inglese come richiesto dalle normative ASX',
  };
  
  return notices[locale] || notices['en'];
}

/**
 * Format ASX announcement date
 */
export function formatASXDate(date: string | Date, locale: string = 'en-AU'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Format share price with proper currency formatting
 */
export function formatSharePrice(value: number, locale: string = 'en-AU'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value);
}

/**
 * Format volume numbers with locale-specific separators
 */
export function formatVolume(value: number, locale: string = 'en-AU'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

/**
 * Format percentage change
 */
export function formatPercentage(value: number, locale: string = 'en-AU'): string {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always',
  }).format(value / 100);
  
  return formatted;
}

/**
 * Categories for ASX announcements (remain in English)
 */
export const ASX_CATEGORIES = {
  QUARTERLY: 'Quarterly Activities Report',
  FINANCIAL: 'Financial Report',
  EXPLORATION: 'Exploration Update',
  DRILLING: 'Drilling Results',
  ACQUISITION: 'Acquisition/Disposal',
  CAPITAL: 'Capital Raising',
  GENERAL: 'General Announcement',
  TRADING_HALT: 'Trading Halt',
  PRICE_SENSITIVE: 'Price Sensitive',
} as const;

/**
 * Get category badge color
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'quarterly': 'bg-blue-100 text-blue-800',
    'financial': 'bg-green-100 text-green-800',
    'exploration': 'bg-purple-100 text-purple-800',
    'drilling': 'bg-orange-100 text-orange-800',
    'acquisition': 'bg-yellow-100 text-yellow-800',
    'capital': 'bg-pink-100 text-pink-800',
    'general': 'bg-gray-100 text-gray-800',
    'trading halt': 'bg-red-100 text-red-800',
    'price sensitive': 'bg-red-100 text-red-800',
  };
  
  const key = category.toLowerCase().trim();
  return colors[key] || colors['general'];
}

/**
 * Determine if announcement is price sensitive
 */
export function isPriceSensitive(category: string, title: string): boolean {
  const sensitiveKeywords = [
    'price sensitive',
    'trading halt',
    'suspension',
    'drilling results',
    'resource estimate',
    'ore reserve',
    'acquisition',
    'takeover',
  ];
  
  const searchText = `${category} ${title}`.toLowerCase();
  return sensitiveKeywords.some(keyword => searchText.includes(keyword));
}

/**
 * Extract document type from filename
 */
export function getDocumentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const types: Record<string, string> = {
    pdf: 'PDF Document',
    doc: 'Word Document',
    docx: 'Word Document',
    xls: 'Excel Spreadsheet',
    xlsx: 'Excel Spreadsheet',
    ppt: 'Presentation',
    pptx: 'Presentation',
  };
  
  return ext ? (types[ext] || 'Document') : 'Document';
}
