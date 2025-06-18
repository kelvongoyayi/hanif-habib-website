import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [progress, setProgress] = useState<number>(0);
  const autoplayTimerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const slideInterval = 7000; // 7 seconds per slide
  
  // Slider content - updated for Hanif Habib & Cco. services
  const slides = [
    {
      title: "Premier Accounting & Advisory Services",
      description: "Professional financial solutions tailored for your business success",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&q=80",
      color: "from-primary to-blue-900",
      cta: {
        text: "Explore Our Services",
        link: "/services"
      },
      label: "Financial Excellence"
    },
    {
      title: "Comprehensive Audit & Assurance",
      description: "Internal and external audit with CIA-backed processes for maximum reliability",
      image: "https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&q=80",
      color: "from-blue-800 to-primary",
      cta: {
        text: "Audit Services",
        link: "/services/audit"
      },
      label: "Audit Services"
    },
    {
      title: "Strategic Tax Advisory",
      description: "Optimize your tax position while ensuring full compliance with regulations",
      image: "https://images.pexels.com/photos/6863250/pexels-photo-6863250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&q=80",
      color: "from-accent-orange/90 to-primary-dark",
      cta: {
        text: "Tax Services",
        link: "/services/taxation"
      },
      label: "Tax Solutions"
    },
    {
      title: "Virtual CFO & Business Advisory",
      description: "Strategic financial leadership and guidance for sustainable business growth",
      image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&q=80",
      color: "from-accent-red/80 to-blue-900",
      cta: {
        text: "Advisory Services",
        link: "/services/cfo"
      },
      label: "Business Advisory"
    }
  ];

  // Reset autoplay timer and progress
  const resetAutoplayTimer = useCallback(() => {
    setProgress(0);
    
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    // Start progress animation
    const progressInterval = 50; // Update progress every 50ms
    progressTimerRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (progressInterval / slideInterval) * 100;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, progressInterval);
    
    // Set timeout for next slide
    autoplayTimerRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);
  }, [slides.length]);

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    if (!isTransitioning) {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      setIsTransitioning(true);
      setActiveSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
      resetAutoplayTimer();
    }
  }, [isTransitioning, resetAutoplayTimer]);

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % slides.length);
  }, [activeSlide, goToSlide, slides.length]);

  const prevSlide = useCallback(() => {
    goToSlide((activeSlide - 1 + slides.length) % slides.length);
  }, [activeSlide, goToSlide, slides.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        // Swipe left
        nextSlide();
      } else {
        // Swipe right
        prevSlide();
      }
    }
  };

  // Set up autoplay and event listeners
  useEffect(() => {
    resetAutoplayTimer();
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [nextSlide, prevSlide, resetAutoplayTimer]);

  // Reset progress when slide changes
  useEffect(() => {
    resetAutoplayTimer();
  }, [activeSlide, resetAutoplayTimer]);

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider backgrounds */}
      {slides.map((slide, index) => (
        <div 
          key={`slide-bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== activeSlide}
        >
          {/* Background image with overlay */}
          <img 
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-[1.01]"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            onLoad={() => index === 0 && resetAutoplayTimer()}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-85`}></div>
        </div>
      ))}
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col justify-center min-h-screen pt-20 pb-36">
        <div className="max-w-3xl">
          {slides.map((slide, index) => (
            <div 
              key={`slide-content-${index}`}
              className={`transition-all duration-700 ${
                index === activeSlide 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8 absolute pointer-events-none'
              }`}
              style={{ display: index === activeSlide ? 'block' : 'none' }}
            >
              <div className="transform transition-all duration-700">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-3 text-white tracking-tight">
                  {slide.title}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-8 font-medium">
                  {slide.description}
                </p>
              </div>
              
              <div className="mt-8 transform transition-all duration-700 flex flex-wrap gap-4">
                {/* Primary CTA */}
                <Link
                  to={slide.cta.link} 
                  className="inline-flex items-center justify-center group border-2 border-white bg-white hover:bg-transparent text-primary hover:text-white px-8 py-3 transition-all duration-300 font-heading font-medium"
                  aria-label={slide.cta.text}
                >
                  <span className="relative z-10">{slide.cta.text}</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                
                {/* Secondary CTA - changed to Book a Consultation */}
                <Link
                  to="/contact" 
                  className="inline-flex items-center justify-center group border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-primary transition-all duration-300 font-heading font-medium"
                  aria-label="Book a Consultation"
                >
                  <span className="relative z-10">Book a Consultation</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation and progress bar at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4 md:px-8 py-5 flex items-center relative z-50">
          <div className="flex items-center space-x-4">
            {/* Previous arrow */}
            <button 
              onClick={() => !isTransitioning && prevSlide()}
              className="text-white hover:text-accent-orange focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full p-2 transition-all duration-300 relative z-50"
              aria-label="Previous slide"
              disabled={isTransitioning}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            {/* Slide counter */}
            <div className="text-white font-medium hidden sm:block">
              <span className="text-xl">{activeSlide + 1}</span>
              <span className="text-white/70 mx-1">/</span>
              <span className="text-white/70">{slides.length}</span>
            </div>
          </div>
          
          {/* Slide labels */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex space-x-6">
              {slides.map((slide, index) => (
                <button
                  key={`label-${index}`}
                  onClick={() => !isTransitioning && goToSlide(index)}
                  className={`px-3 py-1.5 text-sm transition-all duration-300 focus:outline-none relative z-50 ${
                    index === activeSlide 
                      ? 'text-white font-medium border-b-2 border-accent-orange' 
                      : 'text-white/60 hover:text-white border-b-2 border-transparent'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeSlide ? 'true' : 'false'}
                  disabled={isTransitioning}
                >
                  {slide.label}
                </button>
              ))}
            </div>
            
            {/* Mobile progress indicators */}
            <div className="flex md:hidden space-x-2">
              {slides.map((_, index) => (
                <button
                  key={`mobile-indicator-${index}`}
                  onClick={() => !isTransitioning && goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'bg-accent-orange w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeSlide ? 'true' : 'false'}
                  disabled={isTransitioning}
                ></button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Progress bar */}
            <div className="hidden sm:block w-32 h-1 bg-white/30 rounded relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-accent-orange transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              ></div>
            </div>
            
            {/* Next arrow */}
            <button 
              onClick={() => !isTransitioning && nextSlide()}
              className="text-white hover:text-accent-orange focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full p-2 transition-all duration-300 relative z-50"
              aria-label="Next slide"
              disabled={isTransitioning}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;