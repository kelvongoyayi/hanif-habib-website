import { BookOpen, FileText } from 'lucide-react';
import { Resource } from './resourcesData';

export const guides: Resource[] = [
  {
    id: 'tax-guide-2024-2025',
    title: 'Tanzania Tax Guide 2024/2025',
    description: 'Comprehensive guide to Tanzania taxation for 2024/2025 including recent changes and compliance requirements.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/tanzania-tax-guide-2024-2025.pdf',
    date: '2024-01-15',
    fileSize: '3.8 MB',
    author: 'Hanif Habib & Cco.'
  },
  {
    id: 'tax-guide-2023-2024',
    title: 'Tanzania Tax Guide 2023/2024',
    description: 'Comprehensive guide to Tanzania taxation including all regulations and compliance requirements for 2023/2024 fiscal year.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/tanzania-tax-guide-2023-2024.pdf',
    date: '2023-07-10',
    fileSize: '3.5 MB',
    author: 'Hanif Habib & Cco.'
  },
  {
    id: 'taxation-nonprofit',
    title: 'Taxation for Non-Profit Organisations in Tanzania',
    description: 'Specialized guide for taxation requirements and exemptions for non-profit organizations operating in Tanzania.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/taxation-for-non-profit-organisations-in-tz.pdf',
    date: '2023-09-15',
    fileSize: '2.2 MB',
    author: 'Hanif Habib & Cco.'
  },
  {
    id: 'forex-regulations-2022',
    title: 'Foreign Exchange Regulations 2022',
    description: 'Guide to Tanzania\'s foreign exchange regulations and compliance requirements under the Foreign Exchange Act.',
    category: 'guides',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/resources/guides/the-foreign-exchange-act.pdf',
    date: '2022-03-15',
    fileSize: '1.9 MB',
    author: 'Hanif Habib & Cco.'
  }
];

// Helper functions removed - not used in current implementation