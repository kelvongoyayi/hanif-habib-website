import { Calculator } from 'lucide-react';
import { Resource } from '../../resources/data/resourcesData';

export const calculators: Resource[] = [
  {
    id: 'tax-calculator',
    title: 'Corporate Tax Calculator',
    description: 'Calculate your estimated corporate tax liability with our online tool.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/corporate-tax',
    date: '2024-02-20'
  },
  {
    id: 'vat-calculator',
    title: 'VAT Calculator',
    description: 'Calculate Value Added Tax (VAT) for your transactions.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/vat',
    date: '2024-02-15'
  },
  {
    id: 'withholding-tax-calculator',
    title: 'Withholding Tax Calculator',
    description: 'Calculate withholding tax amounts for various payment types.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/withholding',
    date: '2024-02-10'
  },
  {
    id: 'payroll-tax-calculator',
    title: 'Payroll Tax Calculator',
    description: 'Calculate employment taxes, PAYE, and other statutory deductions.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/payroll',
    date: '2024-02-05'
  },
  {
    id: 'overtime-calculator',
    title: 'Overtime Pay Calculator',
    description: 'Calculate overtime pay based on Tanzania labor regulations.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/overtime',
    date: '2024-01-15'
  },
  {
    id: 'tax-planning-calculator',
    title: 'Tax Planning Tools',
    description: 'Plan your tax strategy and optimize tax positions.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/tax-planning',
    date: '2024-01-10'
  },
  {
    id: 'budget-impact-simulator',
    title: 'Budget Impact Simulator',
    description: 'Analyze how changes in revenue and expenses impact your business budget.',
    category: 'calculators',
    type: 'calculator',
    icon: Calculator,
    link: '/calculator/budget-impact',
    date: '2024-01-05'
  }
];

// Helper function removed - not used in current implementation