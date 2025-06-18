import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import FounderProfile from '../components/FounderProfile';
import AchievementsSection from '../components/AchievementsSection';
import ValuesSection from '../components/ValuesSection';
import TimelineSection from '../components/TimelineSection';
import TeamPreview from '../components/TeamPreview';
import ScrollToTopButton from '../components/ScrollToTopButton';

const About = () => {
  return (
    <Layout>
      <PageHeader
        title="About Hanif Habib & Cco"
        subtitle="A leading accounting and advisory firm focused on delivering exceptional services to businesses throughout Tanzania and East Africa"
        backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Modular Components */}
        <FounderProfile />
        
        <AchievementsSection />
        
        <ValuesSection />
        
        <TimelineSection />
        
        <TeamPreview />
        
        {/* Call to Action */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Contact us today to learn how our experienced team can help your business succeed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/contact" 
                  className="inline-flex items-center bg-white text-primary hover:bg-white/90 px-8 py-3 font-heading font-medium transition-colors"
                >
                  Contact Us
                </a>
                <a 
                  href="/services" 
                  className="inline-flex items-center border-2 border-white text-white hover:bg-white/10 px-8 py-3 font-heading font-medium transition-colors"
                >
                  Explore Our Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Scroll to top button */}
        <ScrollToTopButton />
      </motion.div>
    </Layout>
  );
};

export default About;