import { pdfjs } from 'react-pdf';

export const configurePDFWorker = () => {
  // Try different worker sources based on environment
  const workerSources = [
    // Primary: Try local .mjs worker file first (faster, no external dependency)
    `${import.meta.env.BASE_URL}pdf.worker.min.mjs`,
    // Fallback 1: Use CDN with the exact version from react-pdf
    `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`,
    // Fallback 2: Try legacy .js worker file (old format)
    `${import.meta.env.BASE_URL}pdf.worker.min.js`,
  ];

  // Set the primary worker source
  pdfjs.GlobalWorkerOptions.workerSrc = workerSources[0];
  
  console.log('PDF.js worker configuration:');
  console.log('API version:', pdfjs.version);
  console.log('Primary worker source:', pdfjs.GlobalWorkerOptions.workerSrc);
  console.log('Environment BASE_URL:', import.meta.env.BASE_URL);
}; 