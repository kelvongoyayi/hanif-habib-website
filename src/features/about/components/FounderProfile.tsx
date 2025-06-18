import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

interface FounderProfileProps {
  id?: string;
}

const FounderProfile: React.FC<FounderProfileProps> = ({ id = "founder" }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section 
      ref={ref}
      id={id} 
      className="py-20 bg-white overflow-hidden"
      aria-labelledby="founder-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Column */}
          <div className="lg:w-2/5">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Background decorations */}
                <div 
                  className={`absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 z-0 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: '200ms' }}
                  aria-hidden="true"
                ></div>
                
                <div 
                  className={`absolute -bottom-3 sm:-bottom-5 -right-3 sm:-right-5 w-32 sm:w-40 h-32 sm:h-40 bg-accent-orange/10 z-0 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: '300ms' }}
                  aria-hidden="true"
                ></div>
                
                {/* Main image */}
                <img 
                  src={import.meta.env.BASE_URL + 'images/Hanif_Habib.webp'}
                  alt="Hanif Habib, Founder" 
                  className={`shadow-xl relative z-10 w-full max-w-md mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="800"
                  height="1000"
                  style={{ transitionDelay: '300ms' }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Content Column */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 
              id="founder-title"
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
            >
              About Hanif Habib
            </h2>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                With a career spanning over 18 years in Accounting, Audit, and Finance, Hanif Habib has established
                himself as a leading expert in the field, now managing his own audit firm and consulting company.
              </p>
              
              <p className="leading-relaxed">
                His professional expertise encompasses fraud investigations, procurement audits, 
                performance audits, project financial monitoring, internal and external audits, 
                investigative audits, reviews of control systems, value-for-money reviews, and financial
                management for projects funded by international donors.
              </p>
              
              <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600">
                "My working attitude can best be described as having a direct approach, strong attention to people,
                a clear vision, analytical insight, clear communication, extensive knowledge, creativity,
                result-focused mindset, and above all, enthusiasm."
              </blockquote>
              
              <p className="leading-relaxed">
                Throughout his career, Hanif has demonstrated the ability to excel in rapidly changing environments,
                bringing a comprehensive approach to financial management and advisory services that helps businesses
                thrive in complex economic landscapes.
              </p>
            </div>
            
            {/* Experience highlights */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {[
                  { value: "18+", label: "Years Experience" },
                  { value: "250+", label: "Clients Served" },
                  { value: "7+", label: "Certifications" },
                  { value: "30+", label: "Team Members" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + (index * 0.1) 
                    }}
                  >
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderProfile;