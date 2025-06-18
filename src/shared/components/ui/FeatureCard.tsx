import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CardContainer } from './CardContainer';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  iconColor?: string;
  link?: string;
  linkText?: string;
  image?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = 'text-primary',
  link,
  linkText = 'Learn more',
  image,
}) => {
  return (
    <CardContainer 
      className="h-full flex flex-col group overflow-hidden"
      hover={true}
      shadow="md"
      padding="none"
    >
      {/* Image Section */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={`${title} service visual`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            width="400"
            height="250"
            onError={(e) => {
              // Fallback image handling
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
              target.onerror = null; // Prevent infinite callback loop
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 left-4">
            <div className="p-3 bg-white/90 rounded-lg shadow-md">
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          </div>
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold mb-3">{title}</h3>
        <p className="text-gray-600 text-sm tracking-wide leading-relaxed flex-grow">
          {description}
        </p>
        
        {/* Link */}
        {link && (
          <Link 
            to={link}
            className="group/link mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-primary hover:text-primary-dark font-heading font-medium transition-colors duration-300"
            aria-label={`Learn more about ${title}`}
          >
            <span>{linkText}</span>
            <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/link:bg-primary/10">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </span>
          </Link>
        )}
      </div>
    </CardContainer>
  );
};

export default FeatureCard;