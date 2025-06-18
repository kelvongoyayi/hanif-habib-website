import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Phone, Award, GraduationCap, Briefcase, Users, Search, Filter, X } from 'lucide-react';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import SectionTitle from '../../../shared/components/layout/SectionTitle';
import { Button } from '../../../shared/components';
import { teamMembers, TeamMember, getDepartments } from '../data/teamData';

const Team = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  
  const teamGridRef = useRef(null);
  const isInView = useInView(teamGridRef, { once: true, margin: "-50px" });

  // Department categories
  const departments = [
    { id: 'all', name: 'All Team Members', count: teamMembers.length },
    ...getDepartments()
  ];

  // Filter team members
  const filteredMembers = teamMembers.filter(member => {
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDepartment && matchesSearch;
  });

  // Sort members: leadership first, then by experience
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (a.isLeadership && !b.isLeadership) return -1;
    if (!a.isLeadership && b.isLeadership) return 1;
    return b.experience - a.experience;
  });

  return (
    <Layout>
      <PageHeader
        title="Our Team"
        subtitle="Meet the experienced professionals who drive our success and deliver exceptional service to our clients"
        backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260"
      />

      {/* Team Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '30+', label: 'Team Members', color: 'text-primary' },
              { icon: Award, value: '150+', label: 'Years Combined Experience', color: 'text-accent-orange' },
              { icon: GraduationCap, value: '25+', label: 'Professional Certifications', color: 'text-accent-red' },
              { icon: Briefcase, value: '500+', label: 'Clients Served', color: 'text-primary' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Directory Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Meet Our Team"
            subtitle="Our diverse team of professionals brings together expertise from various fields to provide comprehensive financial solutions"
            centered
          />

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, position, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 bg-white min-w-[200px]"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Team Grid */}
          <div ref={teamGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={member.image}
                    alt=""
                    className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Leadership Badge */}
                  {member.isLeadership && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                        Leadership
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ${
                    hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        onClick={() => setSelectedMember(member)}
                        variant="white"
                        size="sm"
                        className="w-full"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                  <p className="text-accent-orange font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.department}</p>
                  
                  {/* Experience */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {member.experience} years experience
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.specialties.slice(0, 2).map((specialty, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {specialty}
                      </span>
                    ))}
                    {member.specialties.length > 2 && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        +{member.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Contact Links */}
                  <div className="flex space-x-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-accent-orange hover:text-white transition-all duration-300"
                        aria-label={`Call ${member.name}`}
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
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

          {/* No Results Message */}
          {sortedMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-600 mb-2">No team members found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filter selection</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-gray-800 hover:bg-gray-200 transition-all duration-300 z-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5">
                  <img
                    src={selectedMember.image}
                    alt=""
                    className="w-full h-64 lg:h-full object-cover object-center"
                    loading="eager"
                  />
                </div>

                <div className="lg:w-3/5 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-heading font-bold mb-2">{selectedMember.name}</h3>
                      <p className="text-accent-orange font-medium text-lg mb-1">{selectedMember.position}</p>
                      <p className="text-gray-600">{selectedMember.department}</p>
                    </div>
                    {selectedMember.isLeadership && (
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Leadership Team
                      </span>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h4 className="text-lg font-heading font-bold mb-3">About</h4>
                      <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                    </div>

                    {/* Experience & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-heading font-bold mb-3 flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-primary" />
                          Experience
                        </h4>
                        <p className="text-gray-700">{selectedMember.experience} years in the field</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-heading font-bold mb-3 flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2 text-accent-orange" />
                          Education
                        </h4>
                        <ul className="space-y-1">
                          {selectedMember.education.map((edu, idx) => (
                            <li key={idx} className="text-gray-700 text-sm">{edu}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="text-lg font-heading font-bold mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.specialties.map((specialty, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {selectedMember.achievements && selectedMember.achievements.length > 0 && (
                      <div>
                        <h4 className="text-lg font-heading font-bold mb-3 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-accent-red" />
                          Achievements
                        </h4>
                        <ul className="space-y-1">
                          {selectedMember.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-700 text-sm flex items-start">
                              <span className="w-2 h-2 bg-accent-red rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Contact Information */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-heading font-bold mb-3">Contact Information</h4>
                      <div className="flex flex-wrap gap-4">
                        {selectedMember.email && (
                          <a
                            href={`mailto:${selectedMember.email}`}
                            className="flex items-center text-primary hover:text-primary-dark transition-colors group"
                          >
                            <Mail className="h-5 w-5 mr-2" />
                            {selectedMember.email}
                          </a>
                        )}
                        {selectedMember.phone && (
                          <a
                            href={`tel:${selectedMember.phone}`}
                            className="flex items-center text-primary hover:text-primary-dark transition-colors group"
                          >
                            <Phone className="h-5 w-5 mr-2" />
                            {selectedMember.phone}
                          </a>
                        )}
                        {selectedMember.linkedin && (
                          <a
                            href={selectedMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:text-primary-dark transition-colors group"
                          >
                            <Linkedin className="h-5 w-5 mr-2" />
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
        </div>
      )}
    </Layout>
  );
};

export default Team; 