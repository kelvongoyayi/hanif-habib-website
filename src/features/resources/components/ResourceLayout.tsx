import React from 'react';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import ResourceSidebar from './ResourceSidebar';

interface ResourceLayoutProps {
  children: React.ReactNode;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resourceCategories: Array<{ id: string; label: string }>;
}

const ResourceLayout: React.FC<ResourceLayoutProps> = ({
  children,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  resourceCategories
}) => {
  return (
    <Layout>
      <PageHeader
        title="Resources"
        subtitle="Access our comprehensive collection of guides, forms, and expert articles to support your business"
        backgroundImage="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <ResourceSidebar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                resourceCategories={resourceCategories}
              />
            </div>
            
            {/* Main content */}
            <div className="lg:w-3/4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceLayout;