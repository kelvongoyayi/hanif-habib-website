import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Mail, Linkedin, ArrowRight, X } from 'lucide-react';
import { Button } from '../../../shared/components';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  expertise?: string[];
}

const TeamPreview = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const teamMembers: TeamMember[] = [
    {
      name: "Hanif Habib",
      position: "Founder & Managing Partner",
      image: "/src/assets/images/Hanif_Habib.webp",
      bio: "With over 18 years of experience in public accounting, taxation, and business advisory, Hanif Habib has established himself as a trusted financial advisor. His expertise in international accounting standards and deep understanding of local business practices has helped shape our firm into a trusted partner for businesses of all sizes.",
      email: "hhabib@habibadvisory.co.tz",
      linkedin: "https://www.linkedin.com/in/hanifhabib",
      expertise: ["Audit & Assurance", "Tax Advisory", "Business Consulting"]
    },
    {
      name: "Sarah Kimario",
      position: "Partner, Audit Services",
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Sarah leads our Audit Services practice with over 12 years of experience in external audit and assurance services. She specializes in financial services and manufacturing sectors, bringing deep technical knowledge and client-focused approach to every engagement.",
      email: "skimario@habibadvisory.co.tz",
      linkedin: "https://www.linkedin.com/",
      expertise: ["External Audit", "Risk Assessment", "Compliance"]
    },
    {
      name: "Michael Masanja",
      position: "Partner, Tax Advisory",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Michael heads our Tax Advisory practice with extensive experience in corporate and personal taxation. His expertise includes tax planning, compliance, and representing clients in tax disputes with revenue authorities.",
      email: "mmasanja@habibadvisory.co.tz",
      linkedin: "https://www.linkedin.com/",
      expertise: ["Tax Planning", "Corporate Tax", "Tax Disputes"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="team">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            id="team-section-title"
            className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center"
          >
            Leadership Team
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
            Our team of experienced professionals is led by experts who bring decades of
            combined experience in accounting, audit, tax, and advisory services.
          </p>
        </motion.div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 hide-scrollbar max-w-6xl mx-auto" role="list">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden group relative flex-none w-[300px] md:w-[350px] snap-center"
              role="listitem"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div 
                className="relative overflow-hidden aspect-[4/5]"
                style={{ perspective: '1000px' }}
              >
                <img 
                  src={member.image} 
                  alt=""
                  className={`w-full h-full object-cover object-center transition-all duration-500 ${
                    isHovered === index ? 'scale-[1.03] brightness-[0.8]' : ''
                  }`}
                  loading="lazy"
                  width="400"
                  height="500"
                />
                
                {/* View Profile Button */}
                <Button
                  onClick={() => setSelectedMember(member)}
                  variant="white"
                  className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
                    isHovered === index ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
                  }`}
                  icon={ArrowRight}
                  iconPosition="right"
                  aria-label={`View ${member.name}'s profile`}
                >
                  View Profile
                </Button>
              </div>
              
              <div className="p-6 bg-white relative z-10">
                <h3 className="text-xl font-heading font-bold">{member.name}</h3>
                <p className="text-accent-orange">{member.position}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-center gap-2 mb-6">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isHovered === idx ? 'w-6 bg-primary' : 'bg-gray-300'
                  }`}
                  onClick={() => setIsHovered(idx)}
                  aria-label={`View ${teamMembers[idx].name}'s card`}
                />
              ))}
            </div>
            <Button
              to="/team"
              variant="outline"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              View Our Full Team
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-gray-800 hover:bg-gray-200 transition-all duration-300 z-10 hover:scale-110"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5">
                    <img 
                      src={selectedMember.image} 
                      alt=""
                      className="w-full h-64 md:h-full object-cover object-center"
                      loading="eager"
                    />
                  </div>
                  
                  <div className="md:w-3/5 p-6">
                    <h3 id="modal-title" className="text-2xl font-heading font-bold">{selectedMember.name}</h3>
                    <p className="text-accent-orange mb-4">{selectedMember.position}</p>
                    
                    <div id="modal-description" className="space-y-4">
                      <p className="text-gray-700">{selectedMember.bio}</p>
                      
                      {/* Expertise */}
                      {selectedMember.expertise && (
                        <div className="pt-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Areas of Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedMember.expertise.map((skill, idx) => (
                              <span
                                key={idx}
                                className="bg-primary/5 text-primary text-sm px-3 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          {selectedMember.email && (
                            <a 
                              href={`mailto:${selectedMember.email}`}
                              className="flex items-center text-primary hover:text-primary-dark transition-colors group"
                            >
                              <Mail className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                              {selectedMember.email}
                            </a>
                          )}
                          {selectedMember.linkedin && (
                            <a 
                              href={selectedMember.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-primary hover:text-primary-dark transition-colors group"
                            >
                              <Linkedin className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                              LinkedIn Profile
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamPreview;