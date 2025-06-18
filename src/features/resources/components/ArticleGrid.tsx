import React from 'react';
import PublicationCard from './PublicationCard';
import { Button } from '../../../shared/components';
import { Resource } from '../data/resourcesData';

interface ArticleGridProps {
  articles: Resource[];
  title?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  isAnimated?: boolean;
  isVisible?: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  title = "Expert Articles",
  showViewAllButton = false,
  onViewAllClick,
  isAnimated = true,
  isVisible = true
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-bold mb-6 border-l-4 border-accent-red pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div 
              key={article.id}
              className={`
                ${isAnimated ? 
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  : 'opacity-100'
                }
              `}
              style={isAnimated ? { transitionDelay: `${index * 100}ms` } : {}}
            >
              <PublicationCard
                id={article.id}
                title={article.title}
                description={article.description}
                date={article.date}
                category={article.category}
                pdfUrl={article.downloadUrl}
                link={article.link}
                author={article.author}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No articles available in this category.</p>
          </div>
        )}
      </div>
      {showViewAllButton && articles.length > 6 && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={onViewAllClick}
          >
            View All Expert Articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;