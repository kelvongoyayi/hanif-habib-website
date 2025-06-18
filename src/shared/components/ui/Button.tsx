import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  to?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  to,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-heading font-medium transition-all duration-300 group';
  
  // Size variations
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-accent-orange text-white hover:bg-accent-orange/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    white: 'bg-white text-primary hover:bg-gray-50 border-2 border-white',
  };
  
  // Disabled styles
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combined styles
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${widthStyle} ${className}`;
  
  // Icon element
  const IconElement = Icon ? (
    <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'} ${iconPosition === 'right' ? 'group-hover:translate-x-1 transition-transform duration-300' : ''}`}>
      {Icon && <Icon className="h-5 w-5" />}
    </span>
  ) : null;
  
  // Render as link if href is provided
  if (href) {
    return (
      <a 
        href={href} 
        className={combinedStyles}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {iconPosition === 'left' && IconElement}
        {children}
        {iconPosition === 'right' && IconElement}
      </a>
    );
  }
  
  // Render as router Link if to is provided
  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {iconPosition === 'left' && IconElement}
        {children}
        {iconPosition === 'right' && IconElement}
      </Link>
    );
  }
  
  // Default render as button
  return (
    <button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {iconPosition === 'left' && IconElement}
      {children}
      {iconPosition === 'right' && IconElement}
    </button>
  );
};

export default Button;