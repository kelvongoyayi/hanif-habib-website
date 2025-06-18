import React, { useState, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Download, Eye, Calendar, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContainer } from '../../../shared/components/ui/CardContainer';
import { isPdfFile } from '../../../shared/utils/fileUtils';
import { formatBritishDate } from '../../../shared/utils/dateUtils';

const PDFViewer = lazy(() => import('../../../shared/components/ui/PDFViewer'));

interface Resource {
  id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  source?: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  fileSize?: string;
  featured?: boolean;
}

interface MediaPublicationFeatureProps {
  publications: Resource[];
}

const MediaPublicationFeature: React.FC<MediaPublicationFeatureProps> = ({ publications }) => {
  const [activePublication, setActivePublication] = useState<Resource | null>(null);
  const [downloadStarted, setDownloadStarted] = useState<{id: string, status: boolean}>({ id: '', status: false });

  // Default brand-aligned placeholder image
  const defaultPlaceholder = "/Hanif_Habib_Cco_Logo.svg";

  // Get the featured publications (showing up to 4)
  const featuredPublications = publications
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  // Handle download with feedback
  const handleDownload = (e: React.MouseEvent, publicationId: string) => {
    e.stopPropagation();
    setDownloadStarted({ id: publicationId, status: true });
    
    setTimeout(() => {
      setDownloadStarted({ id: '', status: false });
    }, 2000);
  };

  // Handle errors
  const handleError = (publicationId: string) => {
    console.error(`Failed to load publication: ${publicationId}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {featuredPublications.map((publication, index) => (
          <motion.div 
            key={publication.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg"
            tabIndex={0}
          >
            <CardContainer 
              className="h-full"
              hover={true}
              shadow="md"
              padding="none"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={publication.thumbnailUrl || 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width="600" 
                  height="340"
                  onError={(e) => {
                    // Brand-aligned fallback image
                    const target = e.target as HTMLImageElement;
                    target.src = defaultPlaceholder;
                    target.className = "w-full h-full object-contain p-6 bg-gray-100";
                    handleError(publication.id);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center text-white/80 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                    {formatBritishDate(publication.date)}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2 transition-all duration-300 group-hover:translate-y-[-4px]">
                    {publication.title}
                  </h3>
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex space-x-3 mt-4">
                    {isPdfFile(publication.downloadUrl) && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setActivePublication(publication);
                        }}
                        className="bg-white text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        aria-label={`Preview ${publication.title}`}
                      >
                        <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                        Preview
                      </button>
                    )}
                    <a 
                      href={publication.downloadUrl}
                      download
                      onClick={(e) => handleDownload(e, publication.id)}
                      className="bg-primary text-white hover:bg-primary-dark py-2 px-4 rounded-md transition-all duration-300 flex items-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      aria-label={`Download ${publication.title}`}
                    >
                      <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                      Download
                    </a>

                    {/* Download feedback */}
                    <AnimatePresence>
                      {downloadStarted.id === publication.id && downloadStarted.status && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-2 right-2 bg-green-500 text-white py-1 px-2 rounded text-xs shadow-md flex items-center"
                        >
                          <Download className="h-3 w-3 mr-1" aria-hidden="true" />
                          Downloading...
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{publication.description}</p>
                <button 
                  onClick={() => {
                    if (isPdfFile(publication.downloadUrl)) {
                      setActivePublication(publication);
                    } else if (publication.downloadUrl) {
                      window.location.href = publication.downloadUrl;
                    }
                  }}
                  className="text-primary hover:text-primary-dark font-medium flex items-center text-sm group/button focus:outline-none focus:underline"
                  aria-label={isPdfFile(publication.downloadUrl) ? 
                    `Read full publication of ${publication.title}` : 
                    `Download ${publication.title}`}
                >
                  {isPdfFile(publication.downloadUrl) ? 'Read full publication' : 'Download file'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </CardContainer>
          </motion.div>
        ))}
      </div>

      {/* PDF Modal with unified PDFViewer - Only show for PDF files */}
      {activePublication && activePublication.downloadUrl && isPdfFile(activePublication.downloadUrl) && createPortal(
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="text-white text-lg flex items-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-4"></div>
            Loading Viewer...
          </div>
        </div>}>
          <PDFViewer 
            pdfUrl={activePublication.downloadUrl} 
            title={activePublication.title} 
            publicationDate={activePublication.date}
            publicationSource={activePublication.source}
            onClose={() => setActivePublication(null)} 
            isModal={true}
          />
        </Suspense>,
        document.body
      )}

      {/* No publications message */}
      {featuredPublications.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4\" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Featured Publications</h3>
          <p className="text-gray-600">There are currently no featured publications to display.</p>
        </div>
      )}
    </div>
  );
};

export default MediaPublicationFeature;