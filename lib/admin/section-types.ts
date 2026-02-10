/**
 * Section Types for Mining Project Content Builder
 * 
 * These types define the structure of content sections that can be added
 * to mining project pages in the CoreConnect admin panel.
 */

// Base section interface
export interface BaseSection {
  id: string;
  type: string;
  order: number;
}

// Hero Section (auto-generated from project fields)
export interface HeroSection extends BaseSection {
  type: 'hero';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  commodityType: 'ree' | 'lithium' | 'base_precious';
}

// Text + Image Section (or Text + Highlight Box)
export interface TextImageSection extends BaseSection {
  type: 'text_image';
  heading: string;
  content: string; // HTML content
  imagePosition: 'left' | 'right';
  image?: string; // Optional image on one side
  highlightBox?: {
    title: string;
    items: string[];
    bgColor?: string;
  };
  backgroundColor?: 'white' | 'gray' | 'primary';
}

// Full-Width Text Section
export interface FullTextSection extends BaseSection {
  type: 'full_text';
  heading: string;
  subheading?: string;
  content: string; // HTML content
  centered?: boolean;
  backgroundColor?: 'white' | 'gray' | 'primary';
  maxWidth?: 'narrow' | 'medium' | 'wide';
}

// Data Cards Section (for drilling results, statistics, etc.)
export interface DataCardsSection extends BaseSection {
  type: 'data_cards';
  heading: string;
  subheading?: string;
  cards: {
    title: string;
    mainResult: string;
    includingResult?: string;
    badge?: string;
    badgeColor?: 'yellow' | 'primary' | 'secondary';
  }[];
  backgroundColor?: 'white' | 'gray' | 'primary';
}

// Advantages/Features Grid Section
export interface AdvantagesGridSection extends BaseSection {
  type: 'advantages_grid';
  heading: string;
  columns: 2 | 3;
  items: {
    icon: string; // Icon name or emoji
    title: string;
    description: string;
    iconBgColor?: 'yellow' | 'primary' | 'secondary';
  }[];
  backgroundColor?: 'white' | 'gray' | 'primary';
}

// Call-to-Action Section
export interface CTASection extends BaseSection {
  type: 'cta_section';
  heading: string;
  description: string;
  buttons: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }[];
  backgroundColor?: 'gradient' | 'primary' | 'secondary';
  showReferences?: boolean;
  references?: string[];
}

// Company-specific section types
export interface TextContentSection extends BaseSection {
  type: 'text_content';
  heading: string;
  content: string; // HTML content
  centered?: boolean;
}

export interface TwoColumnSection extends BaseSection {
  type: 'two_column';
  heading?: string;
  leftContent: string; // HTML content
  rightContent: string; // HTML content
}

export interface CardGridSection extends BaseSection {
  type: 'card_grid';
  heading?: string;
  cards: {
    title: string;
    content: string;
    icon?: string;
    link?: string;
  }[];
  columns: 2 | 3 | 4;
}

export interface FileListSection extends BaseSection {
  type: 'file_list';
  heading: string;
  files: {
    title: string;
    description?: string;
    fileId: string;
    date?: string;
  }[];
}

export interface ContactInfoSection extends BaseSection {
  type: 'contact_info';
  heading?: string;
  items: {
    label: string;
    value: string;
    icon?: string;
    link?: string;
  }[];
}

// Union type of all sections
export type ContentSection =
  | TextImageSection
  | FullTextSection
  | DataCardsSection
  | AdvantagesGridSection
  | CTASection;

// Company page sections
export type CompanyContentSection =
  | TextContentSection
  | TwoColumnSection
  | CardGridSection
  | FileListSection
  | ContactInfoSection;

// Content Sections Container
export interface ProjectContentSections {
  sections: ContentSection[];
}

// Section type metadata for UI
export interface SectionTypeMetadata {
  type: string;
  label: string;
  description: string;
  icon: string;
}

export const SECTION_TYPES: SectionTypeMetadata[] = [
  {
    type: 'text_image',
    label: 'Text + Image',
    description: 'Text content on one side with image or highlight box on the other',
    icon: '📝🖼️',
  },
  {
    type: 'full_text',
    label: 'Full Text',
    description: 'Full-width text content, optionally centered',
    icon: '📄',
  },
  {
    type: 'data_cards',
    label: 'Data Cards',
    description: 'Grid of data cards (drilling results, statistics, etc.)',
    icon: '📊',
  },
  {
    type: 'advantages_grid',
    label: 'Advantages Grid',
    description: 'Grid of features/advantages with icons',
    icon: '⭐',
  },
  {
    type: 'cta_section',
    label: 'Call to Action',
    description: 'CTA section with buttons and optional references',
    icon: '🎯',
  },
];

export const COMPANY_SECTION_TYPES: SectionTypeMetadata[] = [
  {
    type: 'text_content',
    label: 'Text Content',
    description: 'Simple text content with optional heading',
    icon: '📝',
  },
  {
    type: 'two_column',
    label: 'Two Column Layout',
    description: 'Content split into two columns',
    icon: '📊',
  },
  {
    type: 'card_grid',
    label: 'Card Grid',
    description: 'Grid of cards with titles and content',
    icon: '🃏',
  },
  {
    type: 'file_list',
    label: 'File List',
    description: 'List of downloadable files',
    icon: '📄',
  },
  {
    type: 'contact_info',
    label: 'Contact Information',
    description: 'Contact details with icons',
    icon: '📞',
  },
];

// Commodity type metadata
export const COMMODITY_TYPES = [
  { value: 'ree', label: 'Rare Earth Elements', badge: 'Rare Earth Elements' },
  { value: 'lithium', label: 'Lithium', badge: 'Lithium' },
  { value: 'base_precious', label: 'Base & Precious Metals', badge: 'Base & Precious Metals' },
] as const;

// Helper function to generate unique section ID
export function generateSectionId(): string {
  return `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to create a default section of a given type
export function createDefaultSection(type: string, order: number): ContentSection | null {
  const id = generateSectionId();
  
  switch (type) {
    case 'text_image':
      return {
        id,
        type: 'text_image',
        order,
        heading: '',
        content: '',
        imagePosition: 'right',
        backgroundColor: 'white',
      };
    
    case 'full_text':
      return {
        id,
        type: 'full_text',
        order,
        heading: '',
        content: '',
        centered: true,
        backgroundColor: 'white',
        maxWidth: 'medium',
      };
    
    case 'data_cards':
      return {
        id,
        type: 'data_cards',
        order,
        heading: '',
        cards: [],
        backgroundColor: 'white',
      };
    
    case 'advantages_grid':
      return {
        id,
        type: 'advantages_grid',
        order,
        heading: '',
        columns: 3,
        items: [],
        backgroundColor: 'white',
      };
    
    case 'cta_section':
      return {
        id,
        type: 'cta_section',
        order,
        heading: '',
        description: '',
        buttons: [],
        backgroundColor: 'gradient',
      };
    
    default:
      return null;
  }
}

// Helper function to create a default company section of a given type
export function createDefaultCompanySection(type: string, order: number): CompanyContentSection | null {
  const id = generateSectionId();
  
  switch (type) {
    case 'text_content':
      return {
        id,
        type: 'text_content',
        order,
        heading: '',
        content: '',
        centered: false,
      };
    
    case 'two_column':
      return {
        id,
        type: 'two_column',
        order,
        leftContent: '',
        rightContent: '',
      };
    
    case 'card_grid':
      return {
        id,
        type: 'card_grid',
        order,
        cards: [],
        columns: 3,
      };
    
    case 'file_list':
      return {
        id,
        type: 'file_list',
        order,
        heading: '',
        files: [],
      };
    
    case 'contact_info':
      return {
        id,
        type: 'contact_info',
        order,
        items: [],
      };
    
    default:
      return null;
  }
}

