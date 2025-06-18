/**
 * File utility functions for handling file operations and validations
 */

/**
 * Checks if a URL points to a PDF file
 * @param url - File URL to check
 * @returns True if the URL is a PDF file
 */
export const isPdfFile = (url?: string): boolean => {
  if (!url) return false;
  return url.toLowerCase().endsWith('.pdf');
};

// Additional utility functions can be added here as needed 