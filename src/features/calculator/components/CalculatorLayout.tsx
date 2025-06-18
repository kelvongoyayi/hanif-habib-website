import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import ContentSection from '../../../shared/components/ui/ContentSection';
import { Calculator as CalculatorIcon, Clock, CreditCard, BarChart4, ArrowLeft } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { CardContainer } from '../../../shared/components/ui/CardContainer';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: typeof LucideIcon;
  activeCalculator: string;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  title,
  description,
  icon: Icon,
  activeCalculator
}) => {
  const navigate = useNavigate();

  // Calculator options
  const calculators = [
    {
      id: 'overtime',
      title: 'Overtime Calculator',
      description: 'Calculate overtime pay and labor costs for employees.',
      icon: Clock,
      path: '/calculator/overtime'
    },
    {
      id: 'tax-planning',
      title: 'Tax Planning Tools',
      description: 'Estimate tax liabilities and plan for tax optimization.',
      icon: CreditCard,
      path: '/calculator/tax-planning'
    },
    {
      id: 'budget-impact',
      title: 'Budget Impact Simulator',
      description: 'Analyze how changes impact your business budget.',
      icon: BarChart4,
      path: '/calculator/budget-impact'
    },
  ];

  // Navigate to calculator
  const navigateToCalculator = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
      <PageHeader
        title={title}
        subtitle={description}
        backgroundImage="https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <ContentSection bgColor="bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <CardContainer 
              className="lg:sticky lg:top-24"
              shadow="md" 
              padding="md"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <CalculatorIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-heading font-bold text-primary">Calculator Tools</h2>
              </div>
              
              <div className="space-y-3">
                {calculators.map((calc) => (
                  <button
                    key={calc.id}
                    className={`w-full text-left px-4 py-3 flex items-center transition-all duration-300 ${
                      activeCalculator === calc.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => navigateToCalculator(calc.path)}
                  >
                    <div className="flex-shrink-0 mr-3">
                      <calc.icon className={`h-5 w-5 ${activeCalculator === calc.id ? 'text-white' : ''}`} />
                    </div>
                    <span>{calc.title}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                <button
                  className="flex items-center text-primary hover:text-primary-dark hover:underline text-sm font-medium"
                  onClick={() => navigate('/calculator')}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Calculator Hub
                </button>
                
                <p className="text-sm text-gray-600">
                  Need help with financial calculations? Our experts are here to assist you.
                </p>
                
                <a 
                  href="/contact" 
                  className="block w-full py-2 px-3 bg-primary text-white text-center rounded hover:bg-primary-dark transition-colors duration-300"
                >
                  Contact Us
                </a>
              </div>
            </CardContainer>
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            {children}
          </div>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default CalculatorLayout;