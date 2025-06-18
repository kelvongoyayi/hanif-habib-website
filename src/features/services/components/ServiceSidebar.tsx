import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/servicesData';
import ServiceCategoryList from './ServiceCategoryList';

const ServiceSidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    // Initial state calculation remains in this component
    return null;
  });

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <aside className="w-full bg-white border border-gray-100 p-6 lg:sticky lg:top-32">
      <h3 className="text-xl font-heading font-bold mb-6 text-primary">Our Services</h3>
      
      {categories.filter(category => category.id !== 'all').map((category) => (
        <ServiceCategoryList
          key={category.id}
          categoryId={category.id}
          categoryLabel={category.label}
          isExpanded={activeCategory === category.id}
          onToggle={() => toggleCategory(category.id)}
        />
      ))}
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link 
          to="/contact" 
          className="block w-full text-center bg-primary text-white px-4 py-3 transition-all duration-300 hover:bg-primary-dark font-heading font-medium"
        >
          Request a Service
        </Link>
      </div>
    </aside>
  );
};

export default ServiceSidebar;