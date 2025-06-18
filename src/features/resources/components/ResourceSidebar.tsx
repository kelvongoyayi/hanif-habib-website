import React from 'react';
import { Search, FileText, BookOpen, Video, FileCheck, Newspaper, Calculator, X } from 'lucide-react';

interface ResourceSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resourceCategories: Array<{ id: string; label: string }>;
}

const ResourceSidebar: React.FC<ResourceSidebarProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  resourceCategories
}) => {
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'all':
        return <FileText className="h-5 w-5" />;
      case 'guides':
        return <BookOpen className="h-5 w-5" />;
      case 'forms':
        return <FileCheck className="h-5 w-5" />;
      case 'videos':
        return <Video className="h-5 w-5" />;
      case 'articles':
        return <FileText className="h-5 w-5" />;
      case 'calculators':
        return <Calculator className="h-5 w-5" />;
      case 'media':
        return <Newspaper className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <aside className="w-full bg-white border border-gray-100 p-6 lg:sticky lg:top-32">
      <h3 className="text-xl font-heading font-bold mb-6 text-primary">Resources</h3>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            aria-label="Search resources"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      
      {/* Categories */}
      <div className="space-y-2">
        {resourceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
              activeCategory === category.id 
                ? 'bg-primary text-white' 
                : 'hover:bg-gray-50'
            }`}
            aria-pressed={activeCategory === category.id}
          >
            <div className="flex items-center">
              <span className={`mr-3 ${activeCategory === category.id ? 'text-white' : 'text-primary'}`}>
                {getCategoryIcon(category.id)}
              </span>
              <span className="font-medium">{category.label}</span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Additional Help */}
      <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
        <p className="text-sm text-gray-600">
          Need assistance with finding specific resources?
        </p>
        
        <a 
          href="/contact" 
          className="block w-full py-2 px-3 bg-primary text-white text-center rounded hover:bg-primary-dark transition-colors duration-300"
        >
          Contact Our Team
        </a>
      </div>
    </aside>
  );
};

export default ResourceSidebar;