import React, { useState, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Download, Eye, Newspaper, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContainer } from '../../../shared/components/ui/CardContainer';
import { isPdfFile } from '../../../shared/utils/fileUtils';
import { formatPublicationDate } from '../../../shared/utils/dateUtils';

const PDFViewer = lazy(() => import('../../../shared/components/ui/PDFViewer'));

interface MediaPublicationCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  pdfUrl: string;
  thumbnailUrl?: string;
  source?: string;
  fileSize?: string;
}

const MediaPublicationCard: React.FC<MediaPublicationCardProps> = ({
  id,
  title,
  description,
  date,
  pdfUrl,
  thumbnailUrl,
  source = 'Media Publication',
  fileSize = '2.4 MB'
}) => {
  const [showPdf, setShowPdf] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  // Default brand-aligned placeholder image
  const defaultPlaceholder = "/Hanif_Habib_Cco_Logo.svg";
  
  // Format date using utility
  const formattedDate = formatPublicationDate(date);

  // Handle download with feedback
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadStarted(true);
    
    setTimeout(() => {
      setDownloadStarted(false);
    }, 2000);
  };

  return (
    <>
      <motion.div 
        className="h-full group flex flex-col"
        whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <CardContainer 
          className="h-full group flex flex-col"
          hover={true}
          padding="none"
        >
        {/* Thumbnail with accessible hover state */}
        <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/3]">
          <img 
            src={thumbnailUrl || `/images/publications/${id}.jpg`}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width="400"
            height="300"
            onError={(e) => {
              // Brand-aligned fallback image
              const target = e.target as HTMLImageElement;
              target.src = defaultPlaceholder;
              target.alt = "Hanif Habib & Cco. publication";
              target.className = "w-full h-full object-contain p-6 bg-gray-100";
            }}
          />
          
          {/* Gradient overlay - accessible with keyboard focus */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex space-x-2 w-full justify-center"
            >
              {isPdfFile(pdfUrl) && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPdf(true);
                  }}
                  className="bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300 py-2 px-4 rounded-md flex items-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label={`Preview ${title}`}
                >
                  <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                  Preview
                </button>
              )}
              <a
                href={pdfUrl}
                download
                onClick={handleDownload}
                className="bg-primary text-white hover:bg-primary-dark transition-colors duration-300 py-2 px-4 rounded-md flex items-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label={`Download ${title}`}
              >
                <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                Download
              </a>
            </motion.div>
          </div>
          
          {/* Publication date badge - always visible for accessibility */}
          <div className="absolute top-0 left-0 m-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700 flex items-center">
            <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
            {formattedDate}
          </div>

          {/* Download feedback badge */}
          <AnimatePresence>
            {downloadStarted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium"
                aria-live="polite"
              >
                Download started
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-start mb-2">
            <div className="p-2 rounded-lg bg-primary/10 mr-3">
              <Newspaper className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading font-bold line-clamp-2 mb-1">{title}</h3>
              <p className="text-xs text-gray-500">{source} • PDF • {fileSize}</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{description}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
            {isPdfFile(pdfUrl) ? (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowPdf(true);
                }}
                className="text-primary hover:text-primary-dark transition-colors duration-300 text-sm font-medium flex items-center focus:outline-none focus:underline"
                aria-label={`Read ${title}`}
              >
                <span>Read Publication</span>
                <ExternalLink className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : (
              <a 
                href={pdfUrl}
                download
                className="text-primary hover:text-primary-dark transition-colors duration-300 text-sm font-medium flex items-center focus:outline-none focus:underline"
                aria-label={`Download ${title}`}
              >
                <span>Download File</span>
                <Download className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        </CardContainer>
      </motion.div>

      {/* PDF Modal with improved accessibility - now using the unified PDFViewer */}
      {showPdf && isPdfFile(pdfUrl) && createPortal(
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="text-white text-lg flex items-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-4"></div>
            Loading Viewer...
          </div>
        </div>}>
          <PDFViewer 
            pdfUrl={pdfUrl} 
            title={title}
            publicationDate={date}
            publicationSource={source}
            onClose={() => setShowPdf(false)} 
            isModal={true}
          />
        </Suspense>,
        document.body
      )}
    </>
  );
};

export default MediaPublicationCard;