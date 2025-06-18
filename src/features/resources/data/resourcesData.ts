import { FileText, BookOpen, Video, Calculator, BookMarkedIcon as BookMarkIcon, FileCheck } from 'lucide-react';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'guide' | 'form' | 'video' | 'article' | 'calculator' | 'publication';
  icon: React.ComponentType;
  link?: string;
  downloadUrl?: string;
  date: string;
  author?: string;
  source?: string;
  thumbnailUrl?: string;
  fileSize?: string;
}

export const resourceCategories = [
  { id: 'all', label: 'All Resources' },
  { id: 'media', label: 'Media Coverage' },
  { id: 'articles', label: 'Articles & Updates' },
  { id: 'guides', label: 'Tax Guides' },
  { id: 'forms', label: 'Forms & Templates' },
  { id: 'videos', label: 'Video Resources' },
  { id: 'calculators', label: 'Financial Calculators' }
];

export const resources: Resource[] = [
  // Videos
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
  // Tax Guides
  {
    id: 'tax-guide-2024-2025',
    title: 'Tanzania Tax Guide 2024/2025',
    description: 'Comprehensive guide to Tanzania taxation for 2024/2025 including recent changes and compliance requirements.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/tanzania-tax-guide-2024-2025.pdf',
    date: '2024-01-15'
  },
  {
    id: 'tax-guide-2023-2024',
    title: 'Tanzania Tax Guide 2023/2024',
    description: 'Previous year guide to Tanzania taxation including all regulations and compliance requirements.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/tanzania-tax-guide-2023-2024.pdf',
    date: '2023-07-10'
  },
  {
    id: 'tax-guide-2021-2022',
    title: 'Tanzania Tax Guide 2021/2022',
    description: 'Archive guide to Tanzania taxation for fiscal year 2021/2022.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/tax-guide-2021-2022.pdf',
    date: '2021-07-15'
  },
  {
    id: 'tax-guide-2020-2021',
    title: 'Tanzania Tax Guide 2020/2021',
    description: 'Archive guide to Tanzania taxation for fiscal year 2020/2021.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/tax-guide-2020-2021.pdf',
    date: '2020-07-15'
  },
  {
    id: 'tax-guide-2019-2020',
    title: 'Tanzania Tax Guide 2019/2020',
    description: 'Archive guide to Tanzania taxation for fiscal year 2019/2020.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/tax-guide-2019-2020.pdf',
    date: '2019-07-15'
  },
  {
    id: 'payroll-automation-2024-2025',
    title: '2024/2025 Payroll Automation File',
    description: 'Excel file for automating payroll calculations for the 2024/2025 fiscal year.',
    category: 'guides',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/resources/guides/payroll-automation-2024-2025.xlsx',
    date: '2024-01-02'
  },
  {
    id: 'payroll-automation-2023-2024',
    title: '2023/2024 Payroll Automation File',
    description: 'Excel file for automating payroll calculations for the 2023/2024 fiscal year.',
    category: 'guides',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/resources/guides/payroll-automation-2023-2024.xlsx',
    date: '2023-01-02'
  },
  {
    id: 'payroll-automation-2021-2022',
    title: '2021/2022 Payroll Automation File',
    description: 'Excel file for automating payroll calculations for the 2021/2022 fiscal year.',
    category: 'guides',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/resources/guides/payroll-automation-2021-2022.xlsx',
    date: '2021-01-02'
  },
  {
    id: 'taxation-nonprofit',
    title: 'Taxation for Non-Profit Organisations in TZ',
    description: 'Specialized guide for taxation requirements and exemptions for non-profit organizations in Tanzania.',
    category: 'guides',
    type: 'guide',
    icon: BookOpen,
    downloadUrl: '/resources/guides/taxation-for-non-profit-organisations-in-tz.pdf',
    date: '2023-09-15'
  },
  {
    id: 'tax-data-card-2022-2023',
    title: '2022-2023 Tax Data Card',
    description: 'Quick reference card with key tax rates, thresholds, and important dates.',
    category: 'guides',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/resources/guides/tax-data-card-2022-2023.pdf',
    date: '2022-07-01'
  },
  {
    id: 'forex-regulations-2022',
    title: 'Foreign Exchange Regulations 2022',
    description: 'Guide to Tanzania\'s foreign exchange regulations and compliance requirements.',
    category: 'guides',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/resources/guides/the-foreign-exchange-act.pdf',
    date: '2022-03-15'
  },
  {
    id: 'tax-calendar-2022',
    title: '2022 Tax Calendar Day to Day Reminders',
    description: 'Calendar with important tax deadlines and reminders throughout the year.',
    category: 'guides',
    type: 'guide',
    icon: FileText,
    downloadUrl: '/resources/guides/tax-calendar-2022.pdf',
    date: '2022-01-10'
  },
  
  // Forms
  {
    id: 'form-10',
    title: 'Form 10',
    description: 'Brela Form 10 for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-10.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-14a',
    title: 'Form 14a',
    description: 'Brela Form 14a for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-14a.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-14b',
    title: 'Form 14b',
    description: 'Brela Form 14b for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-14-b.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-29',
    title: 'Form 29',
    description: 'Brela Form 29 for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-29.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-55a',
    title: 'Form 55a',
    description: 'Brela Form 55a for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-55a.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-55b',
    title: 'Form 55b',
    description: 'Brela Form 55b for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-55b.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-56',
    title: 'Form 56',
    description: 'Brela Form 56 for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-56.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-66',
    title: 'Form 66',
    description: 'Brela Form 66 for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-66.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-96',
    title: 'Form 96',
    description: 'Brela Form 96 for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-96.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-98a',
    title: 'Form 98a',
    description: 'Brela Form 98a for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-98a.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-101',
    title: 'Form 101',
    description: 'Brela Form 101 for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-101.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-104',
    title: 'Form 104',
    description: 'Brela Form 104 for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-104.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-106a',
    title: 'Form 106a',
    description: 'Brela Form 106a for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-106a.doc',
    date: '2023-01-01'
  },
  {
    id: 'form-106b',
    title: 'Form 106b',
    description: 'Brela Form 106b for business registration and compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/brela/Brela-Form-106b.doc',
    date: '2023-01-01'
  },
  
  // UBO Forms
  {
    id: 'ubo-form-14b',
    title: 'UBO Form 14b',
    description: 'Beneficial Ownership Form 14b for business compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/ubo/BO_Sample-Form-14b-1.doc',
    date: '2023-01-01'
  },
  {
    id: 'ubo-form-14c',
    title: 'UBO Form 14c',
    description: 'Beneficial Ownership Form 14c for business compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/ubo/BO_Sample-Form-14c.doc',
    date: '2023-01-01'
  },
  {
    id: 'ubo-form-14d',
    title: 'UBO Form 14d',
    description: 'Beneficial Ownership Form 14d for business compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/ubo/BO_Sample-Form-14d.doc',
    date: '2023-01-01'
  },
  {
    id: 'ubo-form-14e',
    title: 'UBO Form 14e',
    description: 'Beneficial Ownership Form 14e for business compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/ubo/BO_Sample-Form-14e.doc',
    date: '2023-01-01'
  },
  {
    id: 'ubo-form-14f',
    title: 'UBO Form 14f',
    description: 'Beneficial Ownership Form 14f for business compliance.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/ubo/BO_Sample-Form-14f-1.doc',
    date: '2023-01-01'
  },
  {
    id: 'ubo-guidelines',
    title: 'UBO Guidelines',
    description: 'Comprehensive guidelines for Beneficial Ownership compliance in Tanzania.',
    category: 'forms',
    type: 'form',
    icon: FileCheck,
    downloadUrl: '/resources/forms/ubo/beneficial-ownership-forms-guideline.pdf',
    date: '2023-01-01'
  },
  
  // Videos
  {
    id: 'tax-updates-2024',
    title: 'Tax Updates Webinar Recording',
    description: 'Recent webinar covering key tax updates and changes for 2024.',
    category: 'videos',
    type: 'video',
    icon: Video,
    link: 'https://www.youtube.com/watch?v=vLFVZRypUfY',
    date: '2024-03-10'
  },
  
  // Expert Articles
  {
    id: 'foreign-exchange-gains',
    title: 'Recommended tax treatment for unrealized foreign exchange gains and losses',
    description: 'Expert analysis on tax treatment for unrealized foreign exchange gains and losses by Hanif Fattehali Habib.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/recommended-tax-treatment-for-unrealized-foreign-exchange-gains-and-losses.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-11-15'
  },
  {
    id: 'business-guide-tanzania',
    title: 'An executive guide to doing business in Tanzania',
    description: 'Comprehensive guide for executives on establishing and operating businesses in Tanzania.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/an-executive-guide-to-doing-business-in-tanzania.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-10-05'
  },
  {
    id: 'ubo-compliance',
    title: 'UBO compliance requirements in Tanzania',
    description: 'Guide to Ultimate Beneficial Owner compliance requirements for businesses in Tanzania.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/ubo-compliance-requirements-in-tanzania.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-09-22'
  },
  {
    id: 'withholding-tax-rent',
    title: 'Withholding Tax on Rent and Service Charge',
    description: 'Expert analysis on withholding tax requirements for rental payments and service charges.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/withholding-tax-on-rent-and-service-charge.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-08-17'
  },
  {
    id: 'wht-cost',
    title: 'Did you know WHT is not a cost',
    description: 'Clarification on the accounting and tax treatment of Withholding Tax (WHT).',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/did-you-know-wht-is-not-a-cost.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-07-28'
  },
  {
    id: 'forex-regulations',
    title: 'The Foreign Exchange Regulations 2022',
    description: 'Detailed analysis of the 2022 Foreign Exchange Regulations and compliance requirements.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/the-foreign-exchange-regulations-2022.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-06-15'
  },
  {
    id: 'income-tax-returns',
    title: 'Final Income Tax Returns',
    description: 'Guide to preparing and filing final income tax returns in Tanzania.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/final-income-tax-returns.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-05-20'
  },
  {
    id: 'wht-directors',
    title: 'Withholding Tax on Non Executive Directors',
    description: 'Explanation of withholding tax requirements for payments to non-executive directors.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/withholding-tax-on-non-executive-directors.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-04-12'
  },
  {
    id: 'wht-payment-2023',
    title: 'When to pay WHT - 2023',
    description: 'Updated guidelines on the timing requirements for withholding tax payments in 2023.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/when-to-pay-wht-2023.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-03-05'
  },
  {
    id: 'forex-gain-loss',
    title: 'Foreign Exchange Gain and Losses Treatment',
    description: 'Tax treatment and accounting for foreign exchange gains and losses.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/forex-gain-and-losses-tax-treatment.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-02-18'
  },
  {
    id: 'tax-losses',
    title: 'Decoding the Utilization of Unrelieved Tax Losses Vide the Income Tax Act',
    description: 'Comprehensive guide to utilizing unrelieved tax losses under the Income Tax Act.',
    category: 'articles',
    type: 'article',
    icon: BookMarkIcon,
    downloadUrl: '/resources/articles/decoding-the-utilization-of-unrelieved-tax-losses-vide-the-income-tax-act.pdf',
    author: 'Hanif Fattehali Habib',
    date: '2023-01-25'
  },
  
  // Calculators
  {
    id: 'tax-calculator',
    title: 'Corporate Tax Calculator',
    description: 'Calculate your estimated corporate tax liability with our online tool.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/corporate-tax',
    date: '2024-02-20'
  }
];

// Helper functions removed - not used in current implementation