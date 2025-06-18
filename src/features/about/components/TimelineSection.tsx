import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Award, GraduationCap, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  year: string;
  title: string;
  description: string;
  type: 'work' | 'award' | 'education';
}

const TimelineSection = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline: Event[] = [
    {
      year: "2010",
      title: "Founded Hanif Habib & Cco.",
      description: "Established the company with a vision to provide exceptional financial services to businesses throughout Tanzania and East Africa.",
      type: "work"
    },
    {
      year: "2011",
      title: "First Class Honours with Distinction",
      description: "Completed BSc (Hons) in Applied Accounting from Oxford Brookes University, UK with First Class Honours with Distinction.",
      type: "education"
    },
    {
      year: "2012",
      title: "FCCA Qualification",
      description: "Awarded Fellowship status with the Association of Chartered Certified Accountants (ACCA), UK.",
      type: "award"
    },
    {
      year: "2015",
      title: "Certified Internal Auditor",
      description: "Achieved CIA certification from the Institute of Internal Auditors, enhancing the firm's audit capabilities.",
      type: "award"
    },
    {
      year: "2017",
      title: "Expanded to Arusha Office",
      description: "Opened second office location in Arusha to better serve clients throughout Tanzania.",
      type: "work"
    },
    {
      year: "2019",
      title: "MSc in Professional Accountancy",
      description: "Completed Masters of Science Degree in Professional Accountancy from University of London, UK.",
      type: "education"
    },
    {
      year: "2022",
      title: "Best Tax Advisory Firm",
      description: "Recognized as the Best Tax Advisory Firm by the East African Business Excellence Awards.",
      type: "award"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />;
      case 'award':
        return <Award className="h-5 w-5 text-white" aria-hidden="true" />;
      case 'education':
        return <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />;
      default:
        return <Calendar className="h-5 w-5 text-white" aria-hidden="true" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-primary shadow-primary/20';
      case 'award':
        return 'bg-accent-orange shadow-accent-orange/20';
      case 'education':
        return 'bg-accent-red shadow-accent-red/20';
      default:
        return 'bg-gray-500';
    }
  };

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (!timelineRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    timelineRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleItemClick = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
      setActiveIndex(index);
      
      // Ensure the expanded item is visible
      if (timelineRef.current) {
        const timelineWidth = timelineRef.current.offsetWidth;
        const itemWidth = 300; // Approximate width of an item
        const scrollPosition = index * itemWidth - (timelineWidth / 2) + (itemWidth / 2);
        
        timelineRef.current.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }
    }
  };

  // Check if user can scroll left or right
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  
  const checkScrollable = () => {
    if (!timelineRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
    setCanScroll({
      left: scrollLeft > 0,
      right: scrollLeft < scrollWidth - clientWidth - 10 // 10px buffer
    });
  };

  useEffect(() => {
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('scroll', checkScrollable);
      // Set initial scroll state
      checkScrollable();
    }
    
    return () => {
      if (timeline) {
        timeline.removeEventListener('scroll', checkScrollable);
      }
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(index);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newIndex = Math.min(timeline.length - 1, activeIndex + 1);
      setActiveIndex(newIndex);
      
      // Scroll to the new active item
      if (timelineRef.current) {
        const itemElement = timelineRef.current.children[newIndex] as HTMLElement;
        if (itemElement) {
          itemElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newIndex = Math.max(0, activeIndex - 1);
      setActiveIndex(newIndex);
      
      // Scroll to the new active item
      if (timelineRef.current) {
        const itemElement = timelineRef.current.children[newIndex] as HTMLElement;
        if (itemElement) {
          itemElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    }
  };

  return (
    <section 
      id="timeline" 
      className="py-20 bg-gray-50"
      ref={ref}
      aria-labelledby="timeline-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            id="timeline-title"
            className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center"
          >
            Our Journey
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
            The story of Hanif Habib & Cco. is one of continuous growth, achievement, and commitment to excellence in professional services.
          </p>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Navigation buttons */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <button 
              onClick={() => scrollTimeline('left')} 
              disabled={!canScroll.left}
              className={`flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${!canScroll.left ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              aria-label="Scroll timeline left"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
          </div>

          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <button 
              onClick={() => scrollTimeline('right')} 
              disabled={!canScroll.right}
              className={`flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${!canScroll.right ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              aria-label="Scroll timeline right"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </div>

          {/* Horizontal timeline */}
          <div 
            className="relative mt-10 overflow-hidden"
            aria-label="Company timeline"
          >
            {/* Timeline bar */}
            <div className="absolute h-2 bg-gray-200 left-0 right-0 top-16 z-0" aria-hidden="true"></div>

            {/* Timeline items */}
            <div 
              ref={timelineRef}
              className="flex overflow-x-auto hide-scrollbar pb-12 pt-4 gap-6 relative z-10"
              tabIndex={0}
              role="region"
              aria-label="Timeline events"
            >
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  id={`event-card-${index}`}
                  className="flex-shrink-0 w-[300px] snap-center transition-all duration-500 transform hover:scale-105"
                  tabIndex={0}
                  aria-label={`${event.title} event`}
                >
                  <div 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleItemClick(index)}
                  >
                    {/* Year */}
                    <div 
                      className={`z-10 mb-4 ${
                        index === activeIndex ? 'text-primary font-bold' : 'text-gray-600'
                      }`}
                    >
                      {event.year}
                    </div>

                    {/* Circle node on timeline */}
                    <div 
                      className={`${getColor(event.type)} h-10 w-10 rounded-full flex items-center justify-center z-10 mb-4 shadow-md transition-transform duration-300 ${
                        index === activeIndex ? 'scale-125' : ''
                      }`}
                    >
                      {getIcon(event.type)}
                    </div>
                    
                    {/* Event card */}
                    <div 
                      className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col min-h-[160px] ${
                        expandedItem === index ? 'ring-2 ring-primary' : 'cursor-pointer'
                      } h-full`}
                      role="button" 
                      aria-expanded={expandedItem === index}
                    >
                      <div className="flex flex-col h-full">
                        <h3 className="text-xl font-heading font-bold mb-3">{event.title}</h3>
                        
                        {expandedItem === index && (
                          <>
                            {/* Event type badge */}
                            <span className={`inline-block px-3 py-1.5 text-xs font-medium rounded-lg self-start mb-3 ${
                              event.type === 'work' ? 'bg-primary/10 text-primary' :
                              event.type === 'award' ? 'bg-accent-orange/10 text-accent-orange' :
                              'bg-accent-red/10 text-accent-red'
                            }`}>
                              {event.type === 'work' ? 'Professional' :
                               event.type === 'award' ? 'Achievement' :
                               'Education'}
                            </span>
                            
                            <div className="text-gray-600 text-sm flex-grow">
                              <p className="leading-relaxed mb-0">{event.description}</p>
                            </div>
                          </>
                        )}
                        
                        <div className="mt-auto pt-4 flex justify-end">
                          <button
                            className={`text-gray-400 hover:text-primary focus:outline-none transition-transform duration-300 ${
                              expandedItem === index ? 'rotate-180' : ''
                            }`}
                            aria-label={expandedItem === index ? "Show less" : "Show more"}
                          >
                            <ChevronDown className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="flex justify-center mt-6 md:hidden">
            <button 
              onClick={() => scrollTimeline('left')} 
              disabled={!canScroll.left}
              className={`mr-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${!canScroll.left ? 'opacity-40 cursor-not-allowed' : ''}`}
              aria-label="Scroll timeline left"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
            
            <div className="flex space-x-1">
              {timeline.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-6 bg-primary' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setActiveIndex(idx);
                    
                    if (timelineRef.current) {
                      const itemElement = timelineRef.current.children[idx] as HTMLElement;
                      if (itemElement) {
                        itemElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                      }
                    }
                  }}
                  aria-label={`Go to event ${idx + 1}`}
                  aria-current={activeIndex === idx}
                />
              ))}
            </div>
            
            <button 
              onClick={() => scrollTimeline('right')} 
              disabled={!canScroll.right}
              className={`ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${!canScroll.right ? 'opacity-40 cursor-not-allowed' : ''}`}
              aria-label="Scroll timeline right"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;