import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Phone, Briefcase } from 'lucide-react';
import { Button } from '../../../shared/components';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  image: string;
  bio: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  specialties: string[];
  experience: number;
  isLeadership: boolean;
}

interface TeamCardProps {
  member: TeamMember;
  onViewProfile?: (member: TeamMember) => void;
  index?: number;
  compact?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ 
  member, 
  onViewProfile, 
  index = 0, 
  compact = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        compact ? 'max-w-sm' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden ${compact ? 'aspect-square' : 'aspect-[4/5]'}`}>
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
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            {onViewProfile && (
              <Button
                onClick={() => onViewProfile(member)}
                variant="white"
                size="sm"
                className="w-full"
              >
                View Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={`p-${compact ? '4' : '6'}`}>
        <h3 className={`font-heading font-bold mb-1 ${compact ? 'text-lg' : 'text-xl'}`}>
          {member.name}
        </h3>
        <p className="text-accent-orange font-medium mb-2">{member.position}</p>
        {!compact && <p className="text-gray-600 text-sm mb-4">{member.department}</p>}
        
        {/* Experience */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Briefcase className="h-4 w-4 mr-2" />
          {member.experience} years experience
        </div>

        {/* Specialties */}
        {!compact && (
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
        )}

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
  );
};

export default TeamCard; 