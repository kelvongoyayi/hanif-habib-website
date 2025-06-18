import React from 'react';
import PublicationCard from './PublicationCard';
import { Button } from '../../../shared/components';
import { Resource } from '../data/resourcesData';

interface TaxGuideGridProps {
  guides: Resource[];
  title?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  isAnimated?: boolean;
  isVisible?: boolean;
}

const TaxGuideGrid: React.FC<TaxGuideGridProps> = ({
  guides,
  title = "Tax Guides & Regulations",
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
        {guides.length > 0 ? (
          guides.map((guide, index) => (
            <div 
              key={guide.id}
              className={`
                ${isAnimated ? 
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  : 'opacity-100'
                }
              `}
              style={isAnimated ? { transitionDelay: `${index * 100}ms` } : {}}
            >
              <PublicationCard
                id={guide.id}
                title={guide.title}
                description={guide.description}
                date={guide.date}
                category={guide.category}
                pdfUrl={guide.downloadUrl}
                link={guide.link}
                author={guide.author}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No tax guides available in this category.</p>
          </div>
        )}
      </div>
      {showViewAllButton && guides.length > 6 && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={onViewAllClick}
          >
            View All Tax Guides
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaxGuideGrid;