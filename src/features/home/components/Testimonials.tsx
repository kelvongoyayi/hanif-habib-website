import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../../shared/components/layout/SectionTitle';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Hanif Habib & Cco. transformed our financial management system. Their expertise in both taxation and strategic planning has been invaluable to our business growth.",
      author: "Sarah Johnson",
      position: "CEO, Horizon Technologies",
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      quote: "Working with their audit team gave us complete confidence in our financial reporting. Their attention to detail and professional approach is outstanding.",
      author: "Michael Chen",
      position: "CFO, Global Logistics Ltd",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      quote: "Their virtual CFO service provided exactly the strategic guidance we needed during our expansion phase, without the overhead of a full-time executive.",
      author: "Amina Kimathi",
      position: "Director, Safaris Connect",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => {
      if (!autoplayPaused) {
        nextTestimonial();
      }
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [autoplayPaused]);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section 
      className="py-16 md:py-20 bg-primary text-white relative overflow-hidden"
      aria-label="Client Testimonials"
    >
      {/* Background decoration - simplified */}
      <div className="absolute top-0 right-0 w-1/3 h-16 bg-accent-orange/10 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-16 bg-blue-400/10 rounded-tr-full"></div>

      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          title={<span className="tracking-tight font-heading">What Our Clients Say</span>}
          subtitle="Discover how we've helped businesses achieve their financial goals"
          centered={true}
          light={true}
        />
        
        <div 
          className="relative max-w-4xl mx-auto mt-8"
          onMouseEnter={() => setAutoplayPaused(true)}
          onMouseLeave={() => setAutoplayPaused(false)}
        >
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div 
              className="transition-all duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              aria-live="polite"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="min-w-full"
                  aria-hidden={currentIndex !== index}
                >
                  <div className="max-w-3xl mx-auto px-4">
                    {/* Card layout with quote on left, photo/name on right */}
                    <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-6 md:p-8">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Quote on left */}
                        <div className="md:w-2/3 flex flex-col">
                          {/* Star rating */}
                          <div className="flex gap-1 mb-3 md:mb-4 justify-center md:justify-start">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-accent-orange fill-current" aria-hidden="true" />
                            ))}
                          </div>
                          
                          {/* Quote */}
                          <blockquote className="text-base md:text-lg italic leading-relaxed mb-4 text-center md:text-left">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>
                        
                        {/* Photo and author on right */}
                        <div className="md:w-1/3 flex flex-col items-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-white/20 mb-3">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.author}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              loading="lazy"
                              width="96"
                              height="96"
                            />
                          </div>
                          
                          {/* Author info */}
                          <div className="text-center">
                           <p className="font-heading font-bold text-lg">{testimonial.author}</p>
                            <p className="text-accent-orange text-sm">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center items-center mt-6 space-x-6">
            <button 
              onClick={prevTestimonial}
              className="bg-blue-900/30 p-2 rounded-full text-white/70 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex space-x-2 items-center" role="tablist">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-accent-orange' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                  disabled={isTransitioning}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="bg-blue-900/30 p-2 rounded-full text-white/70 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
              disabled={isTransitioning}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;