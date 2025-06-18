// Currency formatting utilities
export const formatCurrency = (
  amount: number, 
  currency: string = 'TZS',
  locale: string = 'en-TZ'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fallback formatting if Intl fails
    return `${currency} ${amount.toLocaleString()}`;
  }
};

// Number formatting utilities
export const formatNumber = (
  value: number,
  decimals: number = 0,
  locale: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch (error) {
    return value.toFixed(decimals);
  }
};

// Percentage formatting
export const formatPercentage = (
  value: number,
  decimals: number = 1,
  locale: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  } catch (error) {
    return `${value.toFixed(decimals)}%`;
  }
};

// Date formatting utilities
export const formatDate = (
  date: Date | string,
  format: 'short' | 'medium' | 'long' = 'medium',
  locale: string = 'en-US'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      medium: { year: 'numeric', month: 'long', day: 'numeric' },
      long: { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      }
    };

    return new Intl.DateTimeFormat(locale, formatOptions[format]).format(dateObj);
  } catch (error) {
    return typeof date === 'string' ? date : date.toDateString();
  }
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Tax rate formatting for Tanzania
export const formatTaxRate = (rate: number): string => {
  return `${rate}%`;
};

// Duration formatting (for calculators)
export const formatDuration = (months: number): string => {
  if (months < 12) {
    return months === 1 ? '1 month' : `${months} months`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return years === 1 ? '1 year' : `${years} years`;
  }
  
  return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
}; 