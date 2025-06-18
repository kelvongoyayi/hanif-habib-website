import React from 'react';

interface SectionTitleProps {
  title: string | React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  id?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = false,
  light = false,
  id
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 
        id={id}
        className={`text-3xl md:text-4xl font-heading font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${light ? 'text-gray-300' : 'text-gray-600'} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-20 h-1 ${light ? 'bg-accent-orange' : 'bg-primary'} mt-4 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;