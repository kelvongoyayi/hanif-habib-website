import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Shield, Users, Award } from 'lucide-react';

interface ValueTabProps {
  id: string;
  label: string;
  content: string;
  icon: JSX.Element;
}

const ValuesSection = () => {
  const [activeTab, setActiveTab] = useState('vision');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tabs: ValueTabProps[] = [
    {
      id: 'vision',
      label: 'Our Vision',
      icon: <Target className="h-6 w-6 text-primary" aria-hidden="true" />,
      content: 'To be the most trusted financial advisory firm in East Africa, recognized for our expertise, integrity, and commitment to client success.'
    },
    {
      id: 'mission',
      label: 'Our Mission',
      icon: <Shield className="h-6 w-6 text-accent-orange" aria-hidden="true" />,
      content: 'To provide exceptional financial services that empower businesses to make informed decisions, achieve compliance, and realize their full potential.'
    },
    {
      id: 'values',
      label: 'Our Values',
      icon: <Award className="h-6 w-6 text-accent-red" aria-hidden="true" />,
      content: 'Excellence, Integrity, Client-centered approach, Continuous improvement, and Collaborative teamwork form the foundation of everything we do.'
    },
    {
      id: 'approach',
      label: 'Our Approach',
      icon: <Users className="h-6 w-6 text-primary" aria-hidden="true" />,
      content: 'We work closely with our clients to understand their unique challenges and objectives, enabling us to develop tailored strategies that align with their business goals.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="values" 
      ref={ref}
      className="py-20 bg-primary text-white relative overflow-hidden"
      aria-labelledby="values-section-title"
    >
      {/* Background patterns */}
      <div 
        className="absolute inset-0 bg-[url('/src/assets/images/pattern.svg')] opacity-5"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 
            id="values-section-title"
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
          >
            Our Values & Vision
          </h2>
          <div className="w-20 h-1 bg-accent-orange mx-auto mb-10"></div>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            The principles that guide our work and define our culture, shaping how we serve our clients
            and contribute to the financial industry.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="tablist"
          aria-label="Values and vision tabs"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              variants={itemVariants}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 flex items-center justify-center rounded-md transition-all duration-300 text-sm font-medium ${
                activeTab === tab.id 
                  ? 'bg-white text-primary shadow-lg' 
                  : 'bg-primary-dark/30 text-white/90 hover:bg-primary-dark/50'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`${tab.id}-panel`}
              role="tabpanel"
              aria-labelledby={`${tab.id}-tab`}
              className={`transition-all duration-500 ${
                activeTab === tab.id ? 'opacity-100 visible h-auto' : 'absolute opacity-0 invisible h-0 overflow-hidden'
              }`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    {tab.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-4">{tab.label}</h3>
                    
                    {tab.id === 'values' ? (
                      <ul className="space-y-2">
                        {[
                          "Excellence in all we do",
                          "Integrity and ethical practice",
                          "Client-centered approach",
                          "Continuous improvement",
                          "Respect and collaboration"
                        ].map((value, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="h-2 w-2 bg-accent-orange rounded-full mr-2 mt-2"></span>
                            <span className="text-lg">{value}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg leading-relaxed">
                        {tab.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;