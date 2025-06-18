import { Video } from 'lucide-react';
import { Resource } from '../../resources/data/resourcesData';

export const videos: Resource[] = [
  {
    id: 'tax-updates-2024',
    title: 'Tax Updates Webinar Recording',
    description: 'Recent webinar covering key tax updates and changes for 2024.',
    category: 'videos',
    type: 'video',
    icon: Video,
    link: 'https://youtu.be/vLFVZRypUfY',
    date: '2024-03-10'
  },
  {
    id: 'vat-implementation-guide',
    title: 'VAT Implementation Guide',
    description: 'Video tutorial explaining VAT implementation processes for businesses in Tanzania.',
    category: 'videos',
    type: 'video',
    icon: Video,
    link: 'https://youtu.be/p4JKTgXnzOo',
    date: '2023-11-15'
  },
  {
    id: 'annual-tax-filing-webinar',
    title: 'Annual Tax Filing Webinar',
    description: 'Recorded webinar explaining the annual tax filing process and compliance requirements.',
    category: 'videos',
    type: 'video',
    icon: Video,
    link: 'https://youtu.be/fq8E-mUUQEA',
    date: '2023-06-12'
  },
  {
    id: 'intro-accounting-standards',
    title: 'Introduction to Accounting Standards',
    description: 'Educational video covering the basics of accounting standards relevant for businesses in Tanzania.',
    category: 'videos',
    type: 'video',
    icon: Video,
    link: 'https://youtu.be/dH9GjZ7Zs0I',
    date: '2023-04-03'
  }
];

// Helper functions removed - not used in current implementation