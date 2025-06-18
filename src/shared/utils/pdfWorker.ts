import { pdfjs } from 'react-pdf';

export const configurePDFWorker = () => {
  // Use the local worker file that matches the react-pdf version
  pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.js`;
  
  console.log('PDF.js worker configured with local worker file');
  console.log('API version:', pdfjs.version);
  console.log('Worker source:', pdfjs.GlobalWorkerOptions.workerSrc);
}; 