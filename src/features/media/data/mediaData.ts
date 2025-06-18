import { Newspaper, FileText } from 'lucide-react';

export interface MediaPublication {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  thumbnailUrl: string;
  downloadUrl: string;
  fileSize: string;
  featured?: boolean;
  category: string;
}

// Default brand-aligned placeholder
const defaultPlaceholder = "/src/assets/logos/Hanif_Habib_Cco_Main_Logo.svg";

export const mediaPublications: MediaPublication[] = [
  {
    id: 'resurgence-article',
    title: 'Award Winner Unveils Secret Behind Success',
    description: 'Featured article discussing Hanif Habib & Cco\'s journey to success and industry recognition in the East African financial advisory sector.',
    date: '2024-02-15',
    source: 'The Citizen',
    thumbnailUrl: '/images/publications/award-winner-unveils-secret-behind-success-784x1024.jpg',
    downloadUrl: '/resources/media/award-winner-unveils-secret-behind-success.pdf',
    fileSize: '282 KB',
    featured: true,
    category: 'interview'
  },
  {
    id: 'tax-withholding',
    title: 'Government Advised on Withholding Tax',
    description: 'Expert analysis and recommendations on tax withholding procedures and compliance for Tanzania\'s financial regulations framework.',
    date: '2024-01-20',
    source: 'Daily News',
    thumbnailUrl: '/images/publications/govt-advised-on-withholding-tax-784x1024.jpg',
    downloadUrl: '/resources/media/govt-advised-on-withholding-tax.pdf',
    fileSize: '445 KB',
    featured: true,
    category: 'analysis'
  },
  {
    id: 'online-jobs',
    title: 'Government Advised to Rethink Tax Administration Procedures',
    description: 'Expert recommendations on modernizing tax administration procedures to improve efficiency and compliance in Tanzania.',
    date: '2024-01-10',
    source: 'Business Times',
    thumbnailUrl: '/images/publications/govt-advised-to-rethink-tax-administration-procedures-784x1024.jpg',
    downloadUrl: '/resources/media/govt-advised-to-rethink-tax-administration-procedures.pdf',
    fileSize: '302 KB',
    category: 'news'
  },
  {
    id: 'taxation-tanzania',
    title: 'Taxation in Tanzania: A Comprehensive Guide',
    description: 'In-depth analysis of Tanzania\'s tax system and implications for businesses operating within the country\'s regulatory framework.',
    date: '2023-12-15',
    source: 'East African Financial Review',
    thumbnailUrl: '/images/publications/taxation-in-tanzania-784x1024.jpg',
    downloadUrl: '/resources/media/taxation-in-tanzania.pdf',
    fileSize: '279 KB',
    category: 'guide'
  }
];

// Helper functions removed - not used in current implementation

// Get unique categories
export const getPublicationCategories = (): string[] => {
  const categories = new Set(mediaPublications.map(pub => pub.category));
  return Array.from(categories);
};