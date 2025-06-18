import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import ContentSection from '../../../shared/components/ui/ContentSection';
import { Calculator as CalculatorIcon, Clock, CreditCard, BarChart4 } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

const Calculator = () => {

  const navigate = useNavigate();
  const [activeCalculator, setActiveCalculator] = useState('overtime');

  // Handle calculator selection
  const handleCalculatorSelect = (calculatorId: string) => {
    setActiveCalculator(calculatorId);
    navigate(`/calculator/${calculatorId}`);
  };

  // Calculator options
  const calculators = [
    {
      id: 'overtime',
      title: 'Overtime Calculator',
      description: 'Calculate overtime pay and labor costs for employees based on Tanzanian labor laws.',
      icon: <Clock className="h-8 w-8 text-primary" />,
      path: '/calculator/overtime',
    },
    {
      id: 'tax-planning',
      title: 'Tax Planning Tools',
      description: 'Estimate income tax, VAT, and other tax liabilities to optimize your tax position.',
      icon: <CreditCard className="h-8 w-8 text-accent-orange" />,
      path: '/calculator/tax-planning',
    },
    {
      id: 'budget-impact',
      title: 'Budget Impact Simulator',
      description: 'Analyze how changes in revenue and expenses impact your business budget and profitability.',
      icon: <BarChart4 className="h-8 w-8 text-accent-red" />,
      path: '/calculator/budget-impact',
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Financial Calculators"
        subtitle="Interactive tools to help you make informed financial decisions"
        backgroundImage="https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <ContentSection bgColor="bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white shadow-md p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-heading font-bold mb-6 text-primary">Calculator Tools</h2>
              <div className="space-y-3">
                {calculators.map((calc) => (
                  <button
                    key={calc.id}
                    className={`w-full text-left px-4 py-3 flex items-center transition-all duration-300 ${
                      activeCalculator === calc.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleCalculatorSelect(calc.id)}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {React.cloneElement(calc.icon, {
                        className: `h-5 w-5 ${activeCalculator === calc.id ? 'text-white' : ''}`,
                      })}
                    </div>
                    <span>{calc.title}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Need help with financial calculations? Our experts are here to assist you.
                </p>
                <Button to="/contact" variant="primary" size="sm" fullWidth>
                  Contact Us
                </Button>
              </div>
            </div>
          </div>

          {/* Main content area - dynamically loaded based on route */}
          <div className="lg:w-3/4">
            <div className="bg-white shadow-md p-8">
              <div className="mb-8 flex items-center">
                <div className="p-3 bg-primary/10 rounded-lg mr-4">
                  <CalculatorIcon className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-heading font-bold">Financial Calculators</h1>
              </div>

              <p className="text-gray-700 mb-8">
                Our interactive financial calculators are designed to help businesses and individuals in Tanzania make informed decisions. These tools provide estimates based on current Tanzanian regulations and best practices in financial planning.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {calculators.map((calc) => (
                  <div
                    key={calc.id}
                    className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleCalculatorSelect(calc.id)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                        {calc.icon}
                      </div>
                      <h3 className="text-lg font-heading font-bold mb-2">{calc.title}</h3>
                      <p className="text-sm text-gray-600">{calc.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border-l-4 border-primary p-6">
                <h3 className="font-heading font-bold mb-2">Important Note</h3>
                <p className="text-gray-700 text-sm">
                  These calculators are designed to provide general estimates and should not be considered as professional financial advice. For accurate calculations tailored to your specific circumstances, please consult with our financial experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Calculator;