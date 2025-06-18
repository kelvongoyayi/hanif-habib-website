import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage,
  children,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-primary text-white pt-32 pb-20 overflow-hidden">
      {/* Background image with overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
                    <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      )}
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/src/assets/images/pattern.svg')] opacity-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{title}</h1>
          {subtitle && (
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="w-24 h-1 bg-accent-orange"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;