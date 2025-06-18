import React, { useState } from 'react';
import { Award, Shield, ExternalLink, CheckCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Achievement {
  title: string;
  organization: string;
  year?: string;
  description?: string;
}

const AchievementsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'certifications' | 'registrations'>('certifications');
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);

  const certifications: Achievement[] = [
    {
      title: "Master of Science in Professional Accountancy",
      organization: "University of London, UK",
      year: "2019",
      description: "Advanced studies in professional accountancy with focus on international standards"
    },
    {
      title: "BSc (Hons) in Applied Accounting",
      organization: "Oxford Brookes University, UK",
      year: "2011",
      description: "First Class Honours with Distinction in Applied Accounting"
    },
    {
      title: "Fellow Member and Chartered Certified Accountant (FCCA)",
      organization: "Association of Chartered Certified Accountants, UK",
      description: "Professional certification in chartered accountancy"
    },
    {
      title: "Certified Public Accountant (CPA)",
      organization: "National Board of Accountants and Auditors, Tanzania",
      description: "Licensed to practice public accounting in Tanzania"
    },
    {
      title: "Chartered Professional Accountant (CPA)",
      organization: "CPA Canada, British Columbia",
      description: "Professional accounting designation from CPA Canada"
    },
    {
      title: "Certified Internal Auditor (CIA)",
      organization: "Institute of Internal Auditors",
      description: "Globally recognized certification for internal audit professionals"
    },
    {
      title: "Certified Fraud Examiner",
      organization: "Association of Certified Fraud Examiners (ACFE), USA",
      description: "Specialized certification in fraud examination and prevention"
    },
    {
      title: "UAE Chartered Accountant",
      organization: "UAE Accountants and Auditors Association",
      description: "Professional accounting qualification recognized in the UAE"
    }
  ];

  const registrations: Achievement[] = [
    {
      title: "Registered Tax Consultant",
      organization: "Tanzania Revenue Authority (TRA)",
      description: "Authorized tax consultant registered with TRA"
    },
    {
      title: "Member",
      organization: "Tanzania Association of Tax Consultants (TATC)",
      description: "Active member of Tanzania's professional tax consultants association" 
    },
    {
      title: "General Tax Practitioner (GTP)",
      organization: "South African Institute of Tax Practitioners",
      description: "Registered tax practitioner in South Africa"
    },
    {
      title: "Commissioner for Oaths",
      organization: "Republic of South Africa",
      description: "Authorized to administer oaths and take affidavits"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  // Handle tab change without page jump
  const handleTabChange = (tab: 'certifications' | 'registrations') => {
    // Prevent default to avoid any browser-based scrolling
    setActiveCategory(tab);
    // Reset selected achievement when changing tabs
    setSelectedAchievement(null);
  };

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Professional Achievements
          </h2>
          <div className="w-20 h-1 bg-primary mb-10"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-heading font-bold mb-6 text-primary">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTabChange('certifications')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                    activeCategory === 'certifications' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-50'
                  }`}
                  aria-pressed={activeCategory === 'certifications'}
                >
                  <span className="font-medium">Certifications</span>
                  <Award className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleTabChange('registrations')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                    activeCategory === 'registrations' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-50'
                  }`}
                  aria-pressed={activeCategory === 'registrations'}
                >
                  <span className="font-medium">Registrations</span>
                  <Shield className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href="/downloads/cv-hanif-habib.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-300"
                  aria-label="Download full CV"
                >
                  <span>Download Full CV</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Achievement List */}
          <div className="lg:w-2/3">
            <div 
              id="achievements-list" 
              className="space-y-4"
            >
              {activeCategory === 'certifications' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {certifications.map((achievement, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden cursor-pointer ${
                        selectedAchievement === index ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedAchievement(selectedAchievement === index ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedAchievement(selectedAchievement === index ? null : index);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={selectedAchievement === index}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <h3 className="font-heading font-bold text-lg mb-1">{achievement.title}</h3>
                            <p className="text-gray-600">{achievement.organization}</p>
                            {achievement.year && (
                              <p className="text-primary text-sm font-medium mt-1">{achievement.year}</p>
                            )}
                          </div>
                          <ChevronRight
                            className={`h-5 w-5 text-gray-400 transition-transform duration-300 mt-1 ${
                              selectedAchievement === index ? 'rotate-90' : ''
                            }`}
                          />
                        </div>

                        {/* Expandable description */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            selectedAchievement === index ? 'max-h-24 mt-4' : 'max-h-0'
                          }`}
                        >
                          <p className="text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {activeCategory === 'registrations' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {registrations.map((achievement, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden cursor-pointer ${
                        selectedAchievement === index ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedAchievement(selectedAchievement === index ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedAchievement(selectedAchievement === index ? null : index);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={selectedAchievement === index}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <h3 className="font-heading font-bold text-lg mb-1">{achievement.title}</h3>
                            <p className="text-gray-600">{achievement.organization}</p>
                            {achievement.year && (
                              <p className="text-primary text-sm font-medium mt-1">{achievement.year}</p>
                            )}
                          </div>
                          <ChevronRight
                            className={`h-5 w-5 text-gray-400 transition-transform duration-300 mt-1 ${
                              selectedAchievement === index ? 'rotate-90' : ''
                            }`}
                          />
                        </div>

                        {/* Expandable description */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            selectedAchievement === index ? 'max-h-24 mt-4' : 'max-h-0'
                          }`}
                        >
                          <p className="text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;