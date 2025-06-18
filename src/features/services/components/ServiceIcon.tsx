import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceIconProps {
  icon: LucideIcon;
  iconColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ 
  icon: Icon, 
  iconColor = 'text-primary', 
  size = 'lg' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8 p-2',
    md: 'h-12 w-12 p-3',
    lg: 'h-16 w-16 p-4',
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-50 rounded-full inline-flex items-center justify-center`}>
      <Icon className={`${iconColor}`} />
    </div>
  );
};

export default ServiceIcon;