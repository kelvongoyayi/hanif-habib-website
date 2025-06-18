import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Reusable card container component with consistent styling
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  padding = 'md',
  rounded = 'lg',
  shadow = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md', 
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const baseClasses = 'bg-white';
  const interactiveClasses = onClick || hover ? 'cursor-pointer transition-all duration-200' : '';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';

  const combinedClasses = [
    baseClasses,
    shadowClasses[shadow],
    roundedClasses[rounded],
    paddingClasses[padding],
    interactiveClasses,
    hoverClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={combinedClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
}; 