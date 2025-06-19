import React, { useEffect, useState } from 'react';
import mainLogo from '../../../assets/logos/Hanif_Habib_Cco_Main_Logo.svg';
import whiteLogo from '../../../assets/logos/Hanif_Habib_Cco_White_Logo.svg';

interface LogoProps {
  variant?: 'default' | 'white' | 'colored';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const logoSrc = variant === 'colored' 
    ? mainLogo
    : variant === 'white' || (!isScrolled && variant === 'default')
    ? whiteLogo
    : mainLogo;
  
  return (
    <div className="flex items-center">
      <div className="flex items-center h-12">
        <img 
          src={logoSrc} 
          alt="Hanif Habib & Cco. Logo" 
          className="h-full" 
        />
      </div>
    </div>
  );
};

export default Logo;