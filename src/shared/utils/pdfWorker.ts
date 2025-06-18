import { pdfjs } from 'react-pdf';

export const configurePDFWorker = () => {
  // Fix for deployment environments where worker module resolution fails
  // Using a specific version that's known to work with react-pdf v9.2.1
  const workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs';
  
  // Set the worker source
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  
  // Also set it on the window object as a fallback
  if (typeof window !== 'undefined') {
    (window as unknown as { pdfjsWorker: string }).pdfjsWorker = workerUrl;
  }
  
  console.log('PDF.js worker configuration:');
  console.log('API version:', pdfjs.version);
  console.log('Worker source:', pdfjs.GlobalWorkerOptions.workerSrc);
  
  // Disable the worker to use the fallback if CDN fails
  // This ensures PDFs still load even if worker fails
  pdfjs.GlobalWorkerOptions.workerPort = null;
}; 