import React from 'react';
import PublicationCard from './PublicationCard';
import { Button } from '../../../shared/components';
import { Resource } from '../data/resourcesData';

interface VideoResourceGridProps {
  videos: Resource[];
  title?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  isAnimated?: boolean;
  isVisible?: boolean;
}

const VideoResourceGrid: React.FC<VideoResourceGridProps> = ({
  videos,
  title = "Video Resources",
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
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div 
              key={video.id}
              className={`
                ${isAnimated ? 
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  : 'opacity-100'
                }
              `}
              style={isAnimated ? { transitionDelay: `${index * 100}ms` } : {}}
            >
              <PublicationCard
                id={video.id}
                title={video.title}
                description={video.description}
                date={video.date}
                category={video.category}
                link={video.link}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No videos available in this category.</p>
          </div>
        )}
      </div>
      {showViewAllButton && videos.length > 3 && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={onViewAllClick}
          >
            View All Videos
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoResourceGrid;