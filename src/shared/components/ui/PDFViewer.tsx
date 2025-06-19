import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, X, Maximize2, Minimize2, ZoomIn, ZoomOut, Calendar, Newspaper } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure worker here before any PDF operations
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose?: () => void;
  isModal?: boolean;
  publicationDate?: string;
  publicationSource?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  pdfUrl, 
  title, 
  onClose, 
  isModal = false,
  publicationDate,
  publicationSource
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    console.error('PDF URL:', pdfUrl);
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return numPages ? Math.min(Math.max(1, newPageNumber), numPages) : 1;
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale(prevScale => Math.min(prevScale + 0.2, 2.5));
  const zoomOut = () => setScale(prevScale => Math.max(prevScale - 0.2, 0.5));

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);



  // Memoize options to prevent unnecessary reloads
  const documentOptions = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@2.16.105/cmaps/',
    cMapPacked: true,
  }), []);

  // Format date if provided
  const formattedDate = publicationDate 
    ? new Date(publicationDate).toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <div ref={viewerRef} className="fixed inset-0 z-[9999] bg-[#1b1b1b] flex flex-col" style={{ zIndex: 9999 }}>
      {/* Header with controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a237e] text-white flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm md:text-base font-medium truncate max-w-[200px] md:max-w-md">{title}</span>
          
          {/* Publication metadata */}
          {(publicationDate || publicationSource) && (
            <div className="hidden md:flex items-center space-x-4 text-white/70">
              {publicationDate && (
                <div className="flex items-center text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formattedDate}</span>
                </div>
              )}
              {publicationSource && (
                <div className="flex items-center text-xs">
                  <Newspaper className="h-3 w-3 mr-1" />
                  <span>{publicationSource}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm hidden sm:inline-block">{Math.round(scale * 100)}%</span>
          
          <button
            onClick={zoomOut}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          
          <button
            onClick={zoomIn}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          
          <a
            href={pdfUrl}
            download
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
            aria-label="Download PDF"
          >
            <Download className="h-5 w-5" />
          </a>
          
          <button
            onClick={toggleFullscreen}
            className="hidden md:block p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          
          {isModal && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile publication metadata */}
      {(publicationDate || publicationSource) && (
        <div className="md:hidden flex items-center justify-between px-4 py-2 bg-[#1a237e]/80 text-white/80">
          {publicationDate && (
            <div className="flex items-center text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formattedDate}</span>
            </div>
          )}
          {publicationSource && (
            <div className="flex items-center text-xs">
              <Newspaper className="h-3 w-3 mr-1" />
              <span>{publicationSource}</span>
            </div>
          )}
        </div>
      )}
      
      {/* PDF Document */}
      <div className="flex-1 overflow-hidden bg-[#1b1b1b] flex items-center justify-center relative">
        <div className="absolute inset-0 overflow-auto flex items-center justify-center p-4">
          {loading && (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-white/70">Loading PDF...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-10 px-4">
              <div className="p-6 bg-red-500/10 rounded-lg max-w-lg mx-auto">
                <p className="text-red-400 mb-4 text-sm">{error}</p>
                <div className="space-y-3">
                  <a 
                    href={pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-blue-400 hover:text-blue-300 underline text-sm"
                  >
                    Try opening PDF in new tab
                  </a>
                  <br />
                  <button
                    onClick={() => {
                      setError(null);
                      setLoading(true);
                    }}
                    className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors text-sm"
                  >
                    Retry Loading
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <div className="flex items-center justify-center min-w-full min-h-full">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="flex items-center justify-center"
                options={documentOptions}
              >
                <div className="flex items-center justify-center" style={{ margin: 'auto' }}>
                  <Page 
                    pageNumber={pageNumber} 
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="shadow-xl"
                  />
                </div>
              </Document>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer with pagination */}
      {!error && numPages && (
        <div className="bg-[#1a237e] px-4 py-3 flex items-center justify-between text-white">
          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className={`p-1.5 rounded-md ${pageNumber <= 1 ? 'text-white/30 cursor-not-allowed' : 'hover:bg-white/10 text-white'} transition-colors`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <p className="text-sm">
            Page <span className="font-medium">{pageNumber}</span> of{' '}
            <span className="font-medium">{numPages || '-'}</span>
          </p>
          
          <button
            onClick={nextPage}
            disabled={numPages !== null && pageNumber >= numPages}
            className={`p-1.5 rounded-md ${numPages !== null && pageNumber >= numPages ? 'text-white/30 cursor-not-allowed' : 'hover:bg-white/10 text-white'} transition-colors`}
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;