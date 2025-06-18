import React from 'react';
import SectionTitle from '../layout/SectionTitle';

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  bgColor?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  centered = false,
  light = false,
  bgColor = 'bg-white',
  children,
  className = '',
  id,
}) => {
  return (
    <section 
      id={id}
      className={`py-12 ${bgColor} relative overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {title && (
          <SectionTitle
            title={title}
            subtitle={subtitle}
            centered={centered}
            light={light}
          />
        )}
        {children}
      </div>
    </section>
  );
};

export default ContentSection;