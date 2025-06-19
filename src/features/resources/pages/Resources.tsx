import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resourceCategories } from '../data/resourcesData';
import { mediaPublications } from '../../media/data/mediaData';
import { guides } from '../data/guidesData';
import { articles } from '../data/articlesData';
import { forms, brelaForms, uboForms } from '../data/formsData';
import { videos } from '../../media/data/videosData';
import { calculators } from '../../calculator/data/calculatorsData';
import Button from '../../../shared/components/ui/Button';
import TaxGuideGrid from '../components/TaxGuideGrid';
import FormsGrid from '../components/FormsGrid';
import ArticleGrid from '../components/ArticleGrid';
import MediaResourceGrid from '../components/MediaResourceGrid';
import VideoResourceGrid from '../components/VideoResourceGrid';
import CalculatorResourceGrid from '../components/CalculatorResourceGrid';
import ResourceLayout from '../components/ResourceLayout';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver';

const Resources = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(() => {
    // Check if there's a category in the URL query params
    const params = new URLSearchParams(location.search);
    return params.get('category') || 'all';
  });
  
  // Update active category when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'all';
    setActiveCategory(category);
  }, [location.search]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isIntersecting: isInView, ref: sectionRef } = useIntersectionObserver();

  // Add a loading state that completes after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter resources based on search
  const filterBySearch = <T extends { title: string; description: string }>(items: T[]): T[] => {
    if (!searchQuery) return items;
    
    return items.filter((item) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filtered resources based on search
  const filteredGuides = filterBySearch(guides);
  const filteredForms = filterBySearch(forms);
  const filteredArticles = filterBySearch(articles);
  const filteredVideos = filterBySearch(videos);
  const filteredCalculators = filterBySearch(calculators);
  const filteredMediaPublications = filterBySearch(mediaPublications);

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (activeCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', activeCategory);
    }
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeCategory, location]);

  return (
    <ResourceLayout
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      resourceCategories={resourceCategories}
    >
      <div ref={sectionRef as React.RefObject<HTMLDivElement>} className={`transition-all duration-1000 ${
        (isInView || !isLoading) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Conditionally render based on search query */}
        {searchQuery ? (
          // Search results
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold mb-6">
              Search Results: {
                filteredGuides.length + 
                filteredForms.length + 
                filteredArticles.length + 
                filteredVideos.length + 
                filteredCalculators.length + 
                filteredMediaPublications.length
              } {
                (filteredGuides.length + 
                 filteredForms.length + 
                 filteredArticles.length + 
                 filteredVideos.length + 
                 filteredCalculators.length + 
                 filteredMediaPublications.length) === 1 ? 'result' : 'results'
              } found
            </h2>

            {/* Media Publications matching search */}
            {filteredMediaPublications.length > 0 && (
              <MediaResourceGrid 
                publications={filteredMediaPublications}
                title="Media Publications"
                isVisible={isInView || !isLoading}
                isAnimated={true}
              />
            )}

            {/* Tax Guides matching search */}
            {filteredGuides.length > 0 && (
              <TaxGuideGrid 
                guides={filteredGuides}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Forms matching search */}
            {filteredForms.length > 0 && (
              <FormsGrid 
                forms={filteredForms}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Articles matching search */}
            {filteredArticles.length > 0 && (
              <ArticleGrid 
                articles={filteredArticles}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Videos matching search */}
            {filteredVideos.length > 0 && (
              <VideoResourceGrid 
                videos={filteredVideos}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Calculators matching search */}
            {filteredCalculators.length > 0 && (
              <CalculatorResourceGrid 
                calculators={filteredCalculators}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* No results message */}
            {filteredGuides.length === 0 && 
             filteredForms.length === 0 && 
             filteredArticles.length === 0 && 
             filteredVideos.length === 0 && 
             filteredCalculators.length === 0 && 
             filteredMediaPublications.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-primary hover:text-primary-dark font-medium mt-2"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        ) : (
          // Category-based display
          <>
            {/* Publications Section - Only shown when "all" or "media" category is selected */}
            {(activeCategory === 'all' || activeCategory === 'media') && (
              <MediaResourceGrid 
                publications={activeCategory === 'all' ? mediaPublications.slice(0, 3) : mediaPublications}
                showViewAllButton={activeCategory === 'all'}
                onViewAllClick={() => setActiveCategory('media')}
                isVisible={isInView || !isLoading}
                isAnimated={true}
              />
            )}

            {/* Tax Guides Section - Only shown when "all" or "guides" category is selected */}
            {(activeCategory === 'all' || activeCategory === 'guides') && (
              <TaxGuideGrid 
                guides={activeCategory === 'all' ? guides.slice(0, 6) : guides}
                showViewAllButton={activeCategory === 'all'}
                onViewAllClick={() => setActiveCategory('guides')}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Brela Forms Section - Only shown when "all" or "forms" category is selected */}
            {(activeCategory === 'all' || activeCategory === 'forms') && (
              <FormsGrid 
                forms={activeCategory === 'all' ? brelaForms.slice(0, 8) : brelaForms}
                title="BRELA Forms"
                formType="brela"
                showViewAllButton={activeCategory === 'all'}
                onViewAllClick={() => setActiveCategory('forms')}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* UBO Forms Section - Only shown when "forms" category is selected */}
            {activeCategory === 'forms' && (
              <FormsGrid 
                forms={uboForms}
                title="UBO Forms"
                formType="ubo"
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Expert Articles Section - Only shown when "all" or "articles" category is selected */}
            {(activeCategory === 'all' || activeCategory === 'articles') && (
              <ArticleGrid 
                articles={activeCategory === 'all' ? articles.slice(0, 6) : articles}
                showViewAllButton={activeCategory === 'all'}
                onViewAllClick={() => setActiveCategory('articles')}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Videos Section - Only shown when "all" or "videos" category is selected */}
            {(activeCategory === 'all' || activeCategory === 'videos') && (
              <VideoResourceGrid 
                videos={videos}
                showViewAllButton={false}
                isVisible={isInView}
                isAnimated={true}
              />
            )}

            {/* Calculators Section - Only shown when "all" or "calculators" category is selected */}
            {(activeCategory === 'all' || activeCategory === 'calculators') && (
              <CalculatorResourceGrid 
                calculators={calculators}
                showViewAllButton={true}
                isVisible={isInView}
                isAnimated={true}
              />
            )}
          </>
        )}
      </div>

      {/* Newsletter Section */}
      <div className={`mt-16 bg-primary text-white p-8 rounded-lg transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`} style={{ transitionDelay: '200ms' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Subscribe to our newsletter to receive the latest resources and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:ring-2 focus:ring-white"
            />
            <Button variant="white" className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </ResourceLayout>
  );
};

export default Resources;