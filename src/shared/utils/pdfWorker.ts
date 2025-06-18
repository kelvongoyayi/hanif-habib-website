import { pdfjs } from 'react-pdf';

export const configurePDFWorker = () => {
  // Use CDN directly to ensure immediate functionality
  // We'll use the specific version that matches react-pdf v9.2.1
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs`;
  
  console.log('PDF.js worker configuration:');
  console.log('API version:', pdfjs.version);
  console.log('Worker source (CDN):', pdfjs.GlobalWorkerOptions.workerSrc);
  
  // Note: Once deployment issues are resolved, you can switch back to local file:
  // pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}; 