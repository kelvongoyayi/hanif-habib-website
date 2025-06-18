import React from 'react';
import PublicationCard from './PublicationCard';
import { Button } from '../../../shared/components';
import { Resource } from '../data/resourcesData';

interface FormsGridProps {
  forms: Resource[];
  title?: string;
  formType?: 'brela' | 'ubo' | 'all';
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  isAnimated?: boolean;
  isVisible?: boolean;
}

const FormsGrid: React.FC<FormsGridProps> = ({
  forms,
  title = "Business Forms",
  formType = 'all',
  showViewAllButton = false,
  onViewAllClick,
  isAnimated = true,
  isVisible = true
}) => {
  // Filter forms by type if specified
  const filteredForms = formType === 'all' 
    ? forms 
    : forms.filter(form => {
        if (formType === 'brela') {
          return form.downloadUrl?.includes('/brela/');
        } else if (formType === 'ubo') {
          return form.downloadUrl?.includes('/ubo/');
        }
        return true;
      });

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-bold mb-6 border-l-4 border-primary-dark pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredForms.length > 0 ? (
          filteredForms.map((form, index) => (
            <div 
              key={form.id}
              className={`
                ${isAnimated ? 
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  : 'opacity-100'
                }
              `}
              style={isAnimated ? { transitionDelay: `${index * 50}ms` } : {}}
            >
              <PublicationCard
                id={form.id}
                title={form.title}
                description={form.description}
                date={form.date}
                category={form.category}
                pdfUrl={form.downloadUrl}
                link={form.link}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No forms available in this category.</p>
          </div>
        )}
      </div>
      {showViewAllButton && filteredForms.length > 8 && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={onViewAllClick}
          >
            View All {formType === 'brela' ? 'BRELA' : formType === 'ubo' ? 'UBO' : ''} Forms
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormsGrid;