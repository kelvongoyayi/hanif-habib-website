import React from 'react';
import PublicationCard from './PublicationCard';
import { Button } from '../../../shared/components';
import { Resource } from '../data/resourcesData';

interface CalculatorResourceGridProps {
  calculators: Resource[];
  title?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  isAnimated?: boolean;
  isVisible?: boolean;
}

const CalculatorResourceGrid: React.FC<CalculatorResourceGridProps> = ({
  calculators,
  title = "Financial Calculators",
  showViewAllButton = false,
  onViewAllClick,
  isAnimated = true,
  isVisible = true
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-bold mb-6 border-l-4 border-accent-orange pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {calculators.length > 0 ? (
          calculators.map((calculator, index) => (
            <div 
              key={calculator.id}
              className={`
                ${isAnimated ? 
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  : 'opacity-100'
                }
              `}
              style={isAnimated ? { transitionDelay: `${index * 100}ms` } : {}}
            >
              <PublicationCard
                id={calculator.id}
                title={calculator.title}
                description={calculator.description}
                date={calculator.date}
                category={calculator.category}
                link={calculator.link}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No calculators available in this category.</p>
          </div>
        )}
      </div>
      {showViewAllButton && calculators.length > 0 && (
        <div className="mt-8 text-center">
          <Button
            to="/calculator"
            variant="primary"
          >
            Go to Calculator Hub
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalculatorResourceGrid;