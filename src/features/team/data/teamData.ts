export interface TeamMember {
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
  education: string[];
  achievements?: string[];
  isLeadership: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Hanif Habib',
    position: 'Founder & Managing Partner',
    department: 'Leadership',
    image: '/images/Hanif_Habib.webp',
    bio: 'With over 18 years of experience in public accounting, taxation, and business advisory, Hanif Habib has established himself as a trusted financial advisor. His expertise in international accounting standards and deep understanding of local business practices has helped shape our firm into a trusted partner for businesses of all sizes.',
    email: 'hhabib@hanifhabibcco.co.tz',
    phone: '+255 123 456 789',
    linkedin: 'https://www.linkedin.com/in/hanifhabib',
    specialties: ['Audit & Assurance', 'Tax Advisory', 'Business Consulting', 'Strategic Planning'],
    experience: 18,
    education: ['ACCA - Association of Chartered Certified Accountants', 'MBA - Business Administration'],
    achievements: ['Certified Public Accountant', 'Tax Advisory Specialist', 'Business Strategy Consultant'],
    isLeadership: true
  },
  {
    id: '2',
    name: 'Daniel Christopher Mchome',
    position: 'Manager – Accounting Services',
    department: 'Business Services',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Daniel Christopher Mchome leads our accounting services with expertise in financial management and accounting systems. He ensures our clients maintain accurate financial records and compliance with accounting standards.',
    email: 'dmchome@hanifhabibcco.co.tz',
    phone: '+255 123 456 790',
    linkedin: '',
    specialties: ['Financial Management', 'Accounting Systems', 'Financial Reporting', 'Compliance'],
    experience: 8,
    education: ['Bachelor of Commerce - Accounting', 'CPA - Certified Public Accountant'],
    achievements: ['Accounting Systems Expert', 'Financial Management Specialist'],
    isLeadership: false
  },
  {
    id: '3',
    name: 'Fabian Kitundu',
    position: 'Manager - Tax and Company Secretary Services',
    department: 'Tax Services',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Fabian Kitundu manages our tax advisory and company secretarial services, bringing comprehensive expertise in corporate compliance and tax planning to help businesses navigate regulatory requirements effectively.',
    email: 'fkitundu@hanifhabibcco.co.tz',
    phone: '+255 123 456 791',
    linkedin: '',
    specialties: ['Tax Advisory', 'Company Secretarial', 'Corporate Compliance', 'Tax Planning'],
    experience: 10,
    education: ['Bachelor of Commerce - Taxation', 'Certified Company Secretary'],
    achievements: ['Tax Compliance Expert', 'Corporate Secretary Specialist'],
    isLeadership: false
  },
  {
    id: '4',
    name: 'Peter Assey',
    position: 'Tax Manager',
    department: 'Tax Services',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Peter Assey specializes in tax planning and compliance, helping clients optimize their tax positions while ensuring full adherence to tax regulations. His expertise covers both corporate and individual taxation.',
    email: 'passey@hanifhabibcco.co.tz',
    phone: '+255 123 456 792',
    linkedin: '',
    specialties: ['Tax Planning', 'Tax Compliance', 'Corporate Tax', 'Individual Tax'],
    experience: 7,
    education: ['Bachelor of Commerce - Taxation', 'Professional Tax Certification'],
    achievements: ['Tax Planning Specialist', 'Compliance Expert'],
    isLeadership: false
  },
  {
    id: '5',
    name: 'Grace Humphrey Singogo',
    position: 'Audit Associate',
    department: 'Audit & Assurance',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Grace Humphrey Singogo brings strong analytical skills to our audit team, supporting audit engagements across various industries with attention to detail and commitment to quality.',
    email: 'gsingogo@hanifhabibcco.co.tz',
    phone: '+255 123 456 793',
    linkedin: '',
    specialties: ['Financial Audit', 'Risk Assessment', 'Audit Documentation', 'Compliance Testing'],
    experience: 3,
    education: ['Bachelor of Commerce - Accounting', 'ACCA Part Qualified'],
    achievements: ['Audit Excellence Award', 'Detail-Oriented Professional'],
    isLeadership: false
  },
  {
    id: '6',
    name: 'Reuben Mtaita',
    position: 'Audit Associate',
    department: 'Audit & Assurance',
    image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Reuben Mtaita contributes to our audit practice with dedication to accuracy and professional standards, assisting in comprehensive audit procedures and client service delivery.',
    email: 'rmtaita@hanifhabibcco.co.tz',
    phone: '+255 123 456 794',
    linkedin: '',
    specialties: ['Audit Procedures', 'Financial Analysis', 'Working Papers', 'Client Service'],
    experience: 3,
    education: ['Bachelor of Commerce - Accounting', 'CPA Part Qualified'],
    achievements: ['Team Player Award', 'Quality Assurance Recognition'],
    isLeadership: false
  },
  {
    id: '7',
    name: 'Pendo Mtumbuka',
    position: 'Audit Associate',
    department: 'Audit & Assurance',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Pendo Mtumbuka is a dedicated member of our audit team, contributing to audit engagements with thoroughness and commitment to delivering high-quality assurance services.',
    email: 'pmtumbuka@hanifhabibcco.co.tz',
    phone: '+255 123 456 795',
    linkedin: '',
    specialties: ['Audit Testing', 'Documentation', 'Compliance Review', 'Financial Verification'],
    experience: 2,
    education: ['Bachelor of Commerce - Accounting', 'Professional Development Courses'],
    achievements: ['Excellence in Service', 'Professional Development Award'],
    isLeadership: false
  },
  {
    id: '8',
    name: 'Diya Vaghela',
    position: 'Audit Associate',
    department: 'Audit & Assurance',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Diya Vaghela brings fresh perspectives and analytical skills to our audit team, supporting various audit engagements with enthusiasm and attention to detail.',
    email: 'dvaghela@hanifhabibcco.co.tz',
    phone: '+255 123 456 796',
    linkedin: '',
    specialties: ['Financial Auditing', 'Data Analysis', 'Audit Support', 'Report Preparation'],
    experience: 2,
    education: ['Bachelor of Commerce - Accounting', 'Audit Training Certification'],
    achievements: ['Rising Star Award', 'Client Service Excellence'],
    isLeadership: false
  },
  {
    id: '9',
    name: 'Akram Fadhil Habib',
    position: 'Audit Supervisor',
    department: 'Audit & Assurance',
    image: 'https://images.pexels.com/photos/936117/pexels-photo-936117.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Akram Fadhil Habib supervises audit engagements with expertise in audit planning, execution, and team management. He ensures quality control and timely delivery of audit services.',
    email: 'ahabib@hanifhabibcco.co.tz',
    phone: '+255 123 456 797',
    linkedin: '',
    specialties: ['Audit Supervision', 'Quality Control', 'Team Management', 'Client Relations'],
    experience: 5,
    education: ['Bachelor of Commerce - Accounting', 'CPA - Certified Public Accountant'],
    achievements: ['Audit Leadership Award', 'Quality Assurance Champion'],
    isLeadership: false
  }
];

// Helper functions
export const getLeadershipTeam = (): TeamMember[] => {
  return teamMembers.filter(member => member.isLeadership);
};

export const getTeamByDepartment = (department: string): TeamMember[] => {
  return teamMembers.filter(member => member.department === department);
};

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const getDepartments = () => {
  const departments = [...new Set(teamMembers.map(member => member.department))];
  return departments.map(dept => ({
    id: dept,
    name: dept,
    count: teamMembers.filter(m => m.department === dept).length
  }));
}; 