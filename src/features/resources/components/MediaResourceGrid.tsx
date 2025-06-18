import React from 'react';
import MediaPublicationCard from '../../media/components/MediaPublicationCard';
import { Button } from '../../../shared/components';
import { MediaPublication } from '../../media/data/mediaData';

interface MediaResourceGridProps {
  publications: MediaPublication[];
  title?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  isAnimated?: boolean;
  isVisible?: boolean;
}

const MediaResourceGrid: React.FC<MediaResourceGridProps> = ({
  publications,
  title = "Media Publications",
  showViewAllButton = false,
  onViewAllClick,
  isAnimated = true,
  isVisible = true
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-bold mb-6 border-l-4 border-primary pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publications.length > 0 ? (
          publications.map((publication, index) => (
            <div 
              key={publication.id}
              className={`
                ${isAnimated ? 
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  : 'opacity-100'
                }
              `}
              style={isAnimated ? { transitionDelay: `${index * 100}ms` } : {}}
            >
              <MediaPublicationCard
                id={publication.id}
                title={publication.title}
                description={publication.description}
                date={publication.date}
                pdfUrl={publication.downloadUrl || ''}
                thumbnailUrl={publication.thumbnailUrl}
                source={publication.source}
                fileSize={publication.fileSize || '2.5 MB'}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No media publications available in this category.</p>
          </div>
        )}
      </div>
      {showViewAllButton && publications.length > 3 && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={onViewAllClick}
          >
            View All Media Coverage
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaResourceGrid;