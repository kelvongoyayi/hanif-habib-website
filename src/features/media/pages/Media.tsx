import React, { useState } from 'react';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import ContentSection from '../../../shared/components/ui/ContentSection';
import { Filter } from 'lucide-react';
import { resources } from '../../resources/data/resourcesData';
import { mediaPublications, getPublicationCategories } from '../data/mediaData';
import Button from '../../../shared/components/ui/Button';
import MediaResourceGrid from '../../resources/components/MediaResourceGrid';
import VideoResourceGrid from '../../resources/components/VideoResourceGrid';
import MediaPublicationFeature from '../components/MediaPublicationFeature';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver';

const Media = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { isIntersecting: isInView, ref: sectionRef } = useIntersectionObserver();

  // Get publication categories
  const categories = ['all', ...getPublicationCategories()];
  const categoryLabels: Record<string, string> = {
    'all': 'All Publications',
    'interview': 'Interviews',
    'analysis': 'Analysis',
    'news': 'News',
    'guide': 'Guides',
    'article': 'Articles',
    'research': 'Research'
  };

  // Get featured publications (most recent)
  const featuredPublications = [...mediaPublications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  // Filtered publications based on active tab
  const filteredPublications = activeTab === 'all'
    ? mediaPublications
    : mediaPublications.filter(pub => pub.category === activeTab);

  // Get video resources from resources data
  const videoResources = resources.filter(resource => resource.category === 'videos');

  return (
    <Layout>
      <PageHeader
        title="Media Coverage"
        subtitle="Explore our press coverage, expert analysis, and featured articles in leading publications"
        backgroundImage="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <ContentSection 
        bgColor="bg-gray-50"
        id="featured-section"
      >
        <div ref={sectionRef as React.RefObject<HTMLDivElement>} className={`mb-16 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Publications</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore our latest feature articles, interviews, and expert analysis in leading publications.
            </p>
          </motion.div>

          {/* Featured Publications - Using dedicated component */}
          <MediaPublicationFeature publications={featuredPublications} />
        </div>

        {/* Video Section - Using VideoResourceGrid */}
        {videoResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <VideoResourceGrid
              videos={videoResources}
              isVisible={isInView}
              isAnimated={true}
            />
          </motion.div>
        )}

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-2">
            <div className="flex items-center text-gray-700 mr-2">
              <Filter className="h-4 w-4 mr-1" aria-hidden="true" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-300 ${
                  activeTab === category 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                aria-pressed={activeTab === category}
              >
                {categoryLabels[category] || category}
              </button>
            ))}
          </div>
        </motion.div>
      
        {/* Publication Grid - Using MediaResourceGrid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MediaResourceGrid 
            publications={filteredPublications}
            title={categoryLabels[activeTab] || 'All Publications'}
            isVisible={isInView}
            isAnimated={true}
          />
        </motion.div>
      </ContentSection>

      {/* Newsletter Section */}
      <ContentSection bgColor="bg-primary" className="text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Subscribe to our newsletter to receive the latest news and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              aria-label="Your email address"
            />
            <Button variant="white" className="whitespace-nowrap" aria-label="Subscribe to newsletter">
              Subscribe Now
            </Button>
          </div>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Media;