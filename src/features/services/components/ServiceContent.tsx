import React from 'react';

interface ServiceContentProps {
  content: string;
  image?: string;
}

const ServiceContent: React.FC<ServiceContentProps> = ({ content, image }) => {
  return (
    <div className="bg-white shadow-md p-8">
      {image && (
        <div className="mb-8 overflow-hidden">
          <img
            src={image}
            alt="Service illustration"
            className="w-full h-auto object-cover"
            loading="lazy"
            width="800"
            height="400"
          />
        </div>
      )}
      
      <div 
        className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ServiceContent;