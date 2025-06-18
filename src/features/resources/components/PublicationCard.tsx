import React, { useState, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Download, Eye, BookOpen, FileCheck, BookMarkedIcon as BookMarkIcon, Newspaper, Video, Calculator } from 'lucide-react';
import { CardContainer } from '../../../shared/components/ui/CardContainer';
import { isPdfFile } from '../../../shared/utils/fileUtils';
import { formatPublicationDate } from '../../../shared/utils/dateUtils';

const PDFViewer = lazy(() => import('../../../shared/components/ui/PDFViewer'));

interface PublicationCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  pdfUrl?: string;
  link?: string;
  author?: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  id,
  title,
  description,
  date,
  category,
  pdfUrl,
  link,
  author
}) => {
  const [showPdf, setShowPdf] = useState(false);

  // Determine icon and colors based on category
  let Icon = Newspaper;
  let bgColor = 'bg-primary/5';
  let textColor = 'text-primary';
  
  switch (category) {
    case 'media':
      Icon = Newspaper;
      bgColor = 'bg-primary/5';
      textColor = 'text-primary';
      break;
    case 'guides':
      Icon = BookOpen;
      bgColor = 'bg-accent-orange/10';
      textColor = 'text-accent-orange';
      break;
    case 'forms':
      Icon = FileCheck;
      bgColor = 'bg-primary/5';
      textColor = 'text-primary';
      break;
    case 'articles':
      Icon = BookMarkIcon;
      bgColor = 'bg-accent-red/10';
      textColor = 'text-accent-red';
      break;
    case 'videos':
      Icon = Video;
      bgColor = 'bg-accent-orange/10';
      textColor = 'text-accent-orange';
      break;
    case 'calculators':
      Icon = Calculator;
      bgColor = 'bg-primary/5';
      textColor = 'text-primary';
      break;
    default:
      break;
  }

  // Format date using utility
  const formattedDate = formatPublicationDate(date);

  return (
    <>
      <CardContainer 
        className="group h-full"
        hover={true}
        shadow="md"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start mb-4">
            <div className={`p-3 rounded-lg ${bgColor}`}>
              <Icon className={`h-6 w-6 ${textColor}`} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-heading font-bold">{title}</h3>
              <p className="text-sm text-gray-500">
                {author && `By ${author} • `}
                {formattedDate}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 flex-grow">{description}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
            {pdfUrl && (
              <>
                {isPdfFile(pdfUrl) && (
                  <button 
                    onClick={() => setShowPdf(true)}
                    className={`flex items-center group/link ${textColor} hover:opacity-80 font-heading font-medium transition-colors duration-300`}
                  >
                    <span>View Document</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/link:${bgColor} ml-2`}>
                      <Eye className="h-4 w-4 transition-transform duration-300" />
                    </span>
                  </button>
                )}
                
                <a 
                  href={pdfUrl}
                  download
                  className="flex items-center group/link text-gray-600 hover:text-primary font-heading font-medium transition-colors duration-300"
                >
                  <span>Download</span>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/link:bg-primary/10 ml-2">
                    <Download className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-1" />
                  </span>
                </a>
              </>
            )}
            
            {link && !pdfUrl && (
              <a 
                href={link}
                className={`flex items-center group/link ${textColor} hover:opacity-80 font-heading font-medium transition-colors duration-300`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {category === 'articles' ? 'Read Article' : 
                   category === 'videos' ? 'Watch Video' : 
                   'View Resource'}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/link:${bgColor} ml-2`}>
                  <Eye className="h-4 w-4 transition-transform duration-300" />
                </span>
              </a>
            )}
          </div>
        </div>
      </CardContainer>

      {/* PDF Modal - Only show for PDF files */}
      {showPdf && pdfUrl && isPdfFile(pdfUrl) && createPortal(
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="text-white text-lg flex items-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-4"></div>
            Loading Viewer...
          </div>
        </div>}>
          <PDFViewer 
            pdfUrl={pdfUrl} 
            title={title} 
            onClose={() => setShowPdf(false)} 
            isModal={true}
            publicationDate={date}
            publicationSource={author ? `By ${author}` : undefined}
          />
        </Suspense>,
        document.body
      )}
    </>
  );
};

export default PublicationCard;