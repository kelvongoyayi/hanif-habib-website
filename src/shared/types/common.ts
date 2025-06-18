// Common shared interfaces used across the application

// Resource-related types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'guide' | 'form' | 'video' | 'calculator' | 'media';
  category?: string;
  tags?: string[];
  author?: string;
  publishedDate?: string;
  lastModified?: string;
  downloadUrl?: string;
  fileSize?: number;
  format?: string;
  image?: string;
  duration?: number; // for videos
  isActive?: boolean;
  featured?: boolean;
}

// Service-related types
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  icon?: React.ReactNode;
  image?: string;
  link?: string;
  isActive: boolean;
}

// Team member interface
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  specialties?: string[];
  experience?: number;
  education?: string[];
  isActive: boolean;
}

// Achievement/Award interface
export interface Achievement {
  id: string;
  title: string;
  description: string;
  organization?: string;
  date?: string;
  image?: string;
  category?: string;
  isPublic: boolean;
}

// Timeline event interface
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'achievement' | 'expansion' | 'service';
  icon?: React.ReactNode;
  isPublic: boolean;
}

// Form-related types
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date';
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  options?: { value: string; label: string }[];
}

export interface FormData {
  [key: string]: string | number | boolean | string[];
}

export interface FormErrors {
  [key: string]: string;
}

// Calculator-related types
export interface CalculatorInput {
  id: string;
  name: string;
  label: string;
  type: 'number' | 'select' | 'checkbox' | 'radio';
  value: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string | number; label: string }[];
  required?: boolean;
  helpText?: string;
}

export interface CalculatorResult {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  description?: string;
  category?: string;
}

// Navigation and UI types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  isActive?: boolean;
  isExternal?: boolean;
}

export interface Breadcrumb {
  label: string;
  href: string;
  isActive?: boolean;
}

// SEO and Meta types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

// Animation and UI state types
export interface AnimationState {
  isVisible: boolean;
  isAnimating: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface FilterState {
  category?: string;
  type?: string;
  tags?: string[];
  searchQuery?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// File upload types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

// Contact and communication types
export interface ContactInfo {
  type: 'email' | 'phone' | 'address' | 'website' | 'social';
  label: string;
  value: string;
  icon?: React.ReactNode;
  isPublic: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt?: string;
} 