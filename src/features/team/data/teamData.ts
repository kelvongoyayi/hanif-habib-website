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
    name: 'Sarah Kimario',
    position: 'Partner, Audit Services',
    department: 'Audit & Assurance',
    image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Sarah leads our Audit Services practice with over 12 years of experience in external audit and assurance services. She specializes in financial services and manufacturing sectors, bringing deep technical knowledge and client-focused approach to every engagement.',
    email: 'skimario@hanifhabibcco.co.tz',
    phone: '+255 123 456 790',
    linkedin: 'https://www.linkedin.com/in/sarahkimario',
    specialties: ['External Audit', 'Risk Assessment', 'Compliance', 'Financial Services'],
    experience: 12,
    education: ['CPA - Certified Public Accountant', 'Bachelor of Commerce - Accounting'],
    achievements: ['Risk Management Specialist', 'Audit Quality Leader'],
    isLeadership: true
  },
  {
    id: '3',
    name: 'Michael Masanja',
    position: 'Partner, Tax Advisory',
    department: 'Tax Services',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Michael heads our Tax Advisory practice with extensive experience in corporate and personal taxation. His expertise includes tax planning, compliance, and representing clients in tax disputes with revenue authorities.',
    email: 'mmasanja@hanifhabibcco.co.tz',
    phone: '+255 123 456 791',
    linkedin: 'https://www.linkedin.com/in/michaelmasanja',
    specialties: ['Tax Planning', 'Corporate Tax', 'Tax Disputes', 'International Tax'],
    experience: 14,
    education: ['ACCA - Association of Chartered Certified Accountants', 'LLB - Bachelor of Laws'],
    achievements: ['Tax Litigation Expert', 'International Tax Specialist'],
    isLeadership: true
  },
  {
    id: '4',
    name: 'Grace Mwalimu',
    position: 'Senior Manager, Business Advisory',
    department: 'Advisory Services',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Grace specializes in business advisory services, helping clients with strategic planning, financial modeling, and business process optimization. Her analytical skills and strategic thinking have helped numerous businesses achieve their growth objectives.',
    email: 'gmwalimu@hanifhabibcco.co.tz',
    phone: '+255 123 456 792',
    linkedin: 'https://www.linkedin.com/in/gracemwalimu',
    specialties: ['Business Strategy', 'Financial Modeling', 'Process Optimization', 'Growth Planning'],
    experience: 8,
    education: ['MBA - Master of Business Administration', 'Bachelor of Commerce - Finance'],
    achievements: ['Strategic Planning Expert', 'Business Process Consultant'],
    isLeadership: false
  },
  {
    id: '5',
    name: 'James Kileo',
    position: 'Senior Audit Manager',
    department: 'Audit & Assurance',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'James brings strong technical skills and attention to detail to our audit practice. He has extensive experience in audit planning, execution, and reporting across various industries including manufacturing, retail, and services.',
    email: 'jkileo@hanifhabibcco.co.tz',
    phone: '+255 123 456 793',
    linkedin: 'https://www.linkedin.com/in/jameskileo',
    specialties: ['Internal Audit', 'Audit Planning', 'Risk Assessment', 'Manufacturing Audit'],
    experience: 10,
    education: ['CPA - Certified Public Accountant', 'Bachelor of Commerce - Accounting'],
    achievements: ['Internal Audit Specialist', 'Quality Assurance Leader'],
    isLeadership: false
  },
  {
    id: '6',
    name: 'Amina Hassan',
    position: 'Tax Manager',
    department: 'Tax Services',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Amina manages our tax compliance and advisory services for small and medium enterprises. Her expertise in VAT, corporate tax, and individual tax planning has helped many clients optimize their tax positions while ensuring full compliance.',
    email: 'ahassan@hanifhabibcco.co.tz',
    phone: '+255 123 456 794',
    linkedin: 'https://www.linkedin.com/in/aminahassan',
    specialties: ['VAT Compliance', 'Corporate Tax', 'Individual Tax', 'SME Advisory'],
    experience: 7,
    education: ['ACCA - Association of Chartered Certified Accountants', 'Bachelor of Commerce - Taxation'],
    achievements: ['VAT Specialist', 'SME Tax Advisor'],
    isLeadership: false
  },
  {
    id: '7',
    name: 'David Mwanga',
    position: 'Senior Accountant',
    department: 'Business Services',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'David oversees our bookkeeping and accounting services, ensuring accurate financial records and timely reporting for our clients. His expertise in accounting software and financial systems helps businesses maintain organized and compliant financial records.',
    email: 'dmwanga@hanifhabibcco.co.tz',
    phone: '+255 123 456 795',
    linkedin: 'https://www.linkedin.com/in/davidmwanga',
    specialties: ['Bookkeeping', 'Financial Reporting', 'Accounting Systems', 'Payroll Management'],
    experience: 6,
    education: ['CPA - Certified Public Accountant', 'Diploma in Accounting'],
    achievements: ['Accounting Systems Expert', 'Financial Reporting Specialist'],
    isLeadership: false
  },
  {
    id: '8',
    name: 'Fatuma Ally',
    position: 'HR & Operations Manager',
    department: 'Operations',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Fatuma manages our human resources and operations, ensuring our team has the support and resources needed to deliver exceptional service to our clients. Her focus on professional development and operational efficiency drives our firm\'s continued growth.',
    email: 'fally@hanifhabibcco.co.tz',
    phone: '+255 123 456 796',
    linkedin: 'https://www.linkedin.com/in/fatumaally',
    specialties: ['Human Resources', 'Operations Management', 'Team Development', 'Process Improvement'],
    experience: 9,
    education: ['MBA - Human Resource Management', 'Bachelor of Arts - Psychology'],
    achievements: ['HR Management Expert', 'Operations Optimization Specialist'],
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