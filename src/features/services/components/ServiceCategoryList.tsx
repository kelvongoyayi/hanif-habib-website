import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getServicesByCategory } from '../data/servicesData';

interface ServiceCategoryListProps {
  categoryId: string;
  categoryLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCategoryList: React.FC<ServiceCategoryListProps> = ({
  categoryId,
  categoryLabel,
  isExpanded,
  onToggle
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const categoryServices = getServicesByCategory(categoryId);
  const hasActiveService = categoryServices.some(service => service.slug === currentPath);

  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-3 px-3 text-left transition-colors duration-200 ${
          hasActiveService ? 'bg-primary/5 text-primary' : 'hover:bg-gray-50'
        }`}
      >
        <span className="text-sm uppercase tracking-wider font-semibold">
          {categoryLabel}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`h-4 w-4 transition-transform duration-300 ${
            isExpanded ? 'rotate-0' : '-rotate-90'
          }`}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
    
      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <ul className="space-y-1 pt-2">
          {categoryServices.map((service) => (
            <li key={service.id}>
              <Link
                to={service.slug}
                className={`block py-2 px-4 text-sm font-medium transition-all duration-150 rounded-sm flex items-center justify-between ${
                  currentPath === service.slug
                    ? 'bg-primary/5 border-l-4 border-primary text-primary'
                    : 'hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-200 text-gray-700 hover:text-primary'
                }`}
              >
                <span>{service.title}</span>
                {currentPath === service.slug && (
                  <ChevronRight className="h-4 w-4 text-primary" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCategoryList;