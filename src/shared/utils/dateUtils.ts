/**
 * Date utility functions for consistent formatting across the application
 */

/**
 * Formats a date string for publication display
 * @param date - ISO date string or date-like string
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export const formatPublicationDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

/**
 * Formats a date string in British format for media publications
 * @param date - ISO date string or date-like string  
 * @returns Formatted date string (e.g., "15 January 2024")
 */
export const formatBritishDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

// Additional utility functions can be added here as needed 