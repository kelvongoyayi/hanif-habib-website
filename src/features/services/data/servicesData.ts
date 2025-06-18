import { Shield, TrendingUp, Briefcase, Scale, Calculator, FileText, Building, Search, Users } from 'lucide-react';

export const services = [
  {
    id: 'audit',
    title: 'Audit Services',
    icon: Shield,
    slug: '/services/audit',
    category: 'audit',
    iconColor: 'text-primary',
    image: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Comprehensive audit services to ensure compliance and financial integrity.',
    features: ['Internal Audit', 'External Audit', 'Forensic Audit', 'Fraud Investigation'],
    content: `
      <h3>Complete Audit Solutions</h3>
      <p>Our audit services provide a thorough examination of your financial statements, internal controls, and compliance procedures. With our CIA-backed processes and certified auditors, we ensure maximum reliability and accountability.</p>
      
      <h3>External Audit</h3>
      <p>Our external audit services provide an independent assessment of your financial statements to ensure compliance with applicable accounting standards and regulatory requirements. In line with the Companies Act 2002, every limited liability company in Tanzania is mandated to have its financial statements audited and submitted with Business Registration and Licensing Agency (BRELA) along with annual returns.</p>
      
      <h3>Internal Audit</h3>
      <p>Our internal audit services help identify and address risks within your organization. We evaluate your internal control systems, assess operational efficiency, and provide recommendations for improvement. Our team includes Certified Internal Auditors (CIA®) who ensure the highest standards of professional practice.</p>
      
      <h3>Fraud Investigation & Forensic Audit</h3>
      <p>We provide specialized fraud investigation and forensic audit services with certified fraud examiners and investigators on our team. Our forensic services help detect, prevent, and address fraudulent activities within your organization.</p>
      
      <h3>Computer-Aided Audit Techniques</h3>
      <p>We employ advanced computer-aided auditing techniques (CAATs) using Private Company Auditing Software (PCAS) to enhance the efficiency and effectiveness of our audit processes.</p>
    `
  },
  {
    id: 'investigations',
    title: 'Special Reviews & Investigations',
    description: 'Specialized investigation services to identify risks, fraud, compliance issues, and perform health checks on accounting and tax systems.',
    icon: Search,
    slug: '/services/investigations',
    category: 'audit',
    iconColor: 'text-accent-red',
    image: 'https://images.pexels.com/photos/6863250/pexels-photo-6863250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Expert investigation services to identify and address potential fraud and compliance issues.',
    features: ['Fraud Investigation', 'Compliance Reviews', 'Tax Health Checks', 'Accounting Health Checks'],
    content: `
      <h3>Expert Investigations</h3>
      <p>Our special reviews and investigations team provides specialized services including tax health checks, accounting health checks, compliance reviews, agreed-upon procedures, and special audits. Each business is unique and may require some form of regular independent checks to ensure proper compliance with laws and regulations.</p>
      
      <h3>Fraud Investigations</h3>
      <p>When fraud is suspected, our certified fraud examiners conduct thorough investigations to determine the extent of the issue, identify responsible parties, and recommend remedial actions. We work discreetly to minimize disruption while ensuring a comprehensive review.</p>
      
      <h3>Compliance Reviews</h3>
      <p>We conduct comprehensive reviews of your compliance with relevant laws, regulations, and internal policies. Our team identifies potential compliance issues and provides actionable recommendations to address them and ensure you remain in good standing.</p>
      
      <h3>System Evaluation</h3>
      <p>We evaluate your financial reporting systems and internal controls to identify any loopholes or weaknesses that could lead to errors or fraud. Our detailed assessment helps strengthen your overall financial governance.</p>
    `
  },
  {
    id: 'accounting',
    title: 'Book Keeping & Accounting',
    description: 'Expert bookkeeping and accounting services with modern software systems integration including Sage Pastel, MYOB, Quickbooks, Tally ERP, and Tally Prime.',
    icon: Calculator,
    slug: '/services/accounting',
    category: 'business',
    iconColor: 'text-accent-orange',
    image: 'https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Professional bookkeeping and accounting services to maintain accurate financial records.',
    features: ['Bookkeeping', 'Financial Statements', 'Software Setup', 'IFRS Compliance'],
    content: `
      <h3>Comprehensive Accounting Services</h3>
      <p>Our bookkeeping and accounting services ensure your financial records are accurate, up-to-date, and compliant with relevant accounting standards including IFRS/IFRS for SMEs. We integrate modern software systems to streamline processes and improve efficiency.</p>
      
      <h3>Professional Bookkeeping</h3>
      <p>We handle day-to-day bookkeeping tasks including recording transactions, reconciling accounts, and maintaining ledgers. Our attention to detail ensures accuracy and completeness in your financial records. We can assist you with maintaining your books of accounts fully (total outsourcing), or partly by supervising in-house bookkeepers and accountants and reviewing their work on a regular basis.</p>
      
      <h3>Financial Statements</h3>
      <p>We prepare comprehensive financial reports which are IFRS/IFRS for SMEs compliant, including income statements, balance sheets, and cash flow statements. These reports provide valuable insights into your business's financial performance and position.</p>
      
      <h3>Accounting Software Expertise</h3>
      <p>We are conversant with diverse accounting software solutions including Sage Pastel, MYOB, Quickbooks, Tally ERP, and Tally Prime. We can help you select, implement, and optimize accounting software that meets your specific business needs, as well as provide bespoke advice on chart of accounts design and accounting system setup.</p>
    `
  },
  {
    id: 'secretarial',
    title: 'Company Secretarial',
    description: 'Professional company secretarial services including BRELA filings, registration of trade and service marks, and company formation for various business structures.',
    icon: FileText,
    slug: '/services/secretarial',
    category: 'business',
    iconColor: 'text-primary',
    image: 'https://images.pexels.com/photos/8297478/pexels-photo-8297478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Expert secretarial services to maintain corporate compliance and proper governance.',
    features: ['BRELA Filings', 'Trade Marks Registration', 'Company Formation', 'Corporate Governance'],
    content: `
      <h3>Corporate Compliance Solutions</h3>
      <p>Our company secretarial services ensure your business maintains proper corporate governance and compliance with all relevant regulations. Companies in Tanzania are required to make all necessary filings with the Business Registration and Licensing Agency (BRELA), including annual returns, appointments and terminations of directors and company secretaries, changes in share capital, and UBO declarations.</p>
      
      <h3>BRELA Filings</h3>
      <p>We assist with all required filings at BRELA, ensuring your business remains compliant with Tanzanian regulations. This includes filing of annual returns, appointments and termination of directors and company secretaries, increase or decrease in share capital, and UBO declarations.</p>
      
      <h3>Trade & Service Mark Registration</h3>
      <p>We provide assistance to register Trade & Service Marks that will provide a platform for your designated brand to achieve higher quality goods/services in the market. This protects your entity name, logo, and/or product name from being copied by others, preventing unfair competition and boosting customer confidence.</p>
      
      <h3>Company Formation</h3>
      <p>We provide company formation services to investors and startups. Our services are not limited to companies - we also provide similar services for sole proprietorships, partnerships, branches, trusts, societies, and NGOs.</p>
    `
  },
  {
    id: 'cfo',
    title: 'Virtual CFO',
    description: 'Strategic financial leadership, planning, and management without the cost of a full-time executive, providing 24/7 financial consultation and problem-solving.',
    icon: TrendingUp,
    slug: '/services/cfo',
    category: 'business',
    iconColor: 'text-primary',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Expert financial leadership and strategy without the cost of a full-time executive.',
    features: ['Financial Strategy', 'Financial Analysis', 'Tax Planning', 'Corporate Finance'],
    content: `
      <h3>Strategic Financial Leadership</h3>
      <p>Our Virtual CFO service provides your business with high-level financial expertise without the cost of hiring a full-time executive. We offer strategic financial leadership, planning, and management tailored to your business needs. Since most entrepreneurs have to wear multiple hats, we provide a strategic partner for managing and reviewing accounts, preparing annual budgets, tax planning, and much more.</p>
      
      <h3>Comprehensive CFO Services</h3>
      <p>Our Virtual CFO services include:</p>
      <ul>
        <li>High-level review of your financial reports, statements, and budgets</li>
        <li>Strategic idea formulation</li>
        <li>24/7 availability for financial discussion and problem-solving</li>
        <li>Representing the company in high-level meetings with potential investors, bankers, and lenders</li>
        <li>Advanced financial planning and analysis</li>
        <li>Selective internal audits</li>
        <li>Optimum tax advice</li>
        <li>Reviewing and re-designing systems of internal control to prevent fraud and errors</li>
        <li>Organization restructuring advice when necessary</li>
        <li>Corporate finance advice on debt vs. equity injection when financing needs arise</li>
        <li>Interaction with company external auditors and regulators</li>
      </ul>
      
      <h3>Flexible Engagement Model</h3>
      <p>Depending on your needs, we offer a flexible model for engagement as Virtual CFO. We are not full-time employees of your company, but will always be available for consultation and implementation, helping take your company to ever-greater heights.</p>
    `
  },
  {
    id: 'transactions',
    title: 'Transaction Services',
    description: 'Specialized support for mergers, acquisitions, due diligence, complex business transactions, and payroll outsourcing services.',
    icon: Briefcase,
    slug: '/services/transactions',
    category: 'business',
    iconColor: 'text-accent-red',
    image: 'https://images.pexels.com/photos/7821738/pexels-photo-7821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Expert guidance for mergers, acquisitions, and complex business transactions.',
    features: ['Due Diligence', 'Valuation', 'Deal Structure', 'Payroll Outsourcing'],
    content: `
      <h3>Comprehensive Transaction Support</h3>
      <p>With our dedicated specialists in our Global Transaction Services Business, we bring a combination of financial, commercial, and operational insight to every deal. Whether you're making an acquisition, divestiture, or strategic alliance, our objective is to ensure you get the maximum return on your deal.</p>
      
      <h3>Due Diligence</h3>
      <p>We conduct thorough due diligence investigations to assess potential targets or partners. Our comprehensive approach examines financial, operational, tax, and legal aspects to identify potential risks and opportunities.</p>
      
      <h3>Business Valuation & Deal Strategy</h3>
      <p>Our experts provide accurate and well-supported business valuations using multiple methodologies. We combine our financial, commercial, and operational expertise with data-driven insights to help you create value across all stages of the deal lifecycle.</p>
      
      <h3>Payroll Outsourcing</h3>
      <p>We also offer payroll outsourcing services which primarily include maintaining company payroll and salary packaging services for high-level executive personnel and expatriate staff. This allows your business to focus on core activities while ensuring accurate and compliant payroll processing.</p>
    `
  },
  {
    id: 'taxation',
    title: 'Taxation',
    description: 'Expert tax planning, compliance and advisory services including Transfer Pricing Documentation and representation with Tanzania Revenue Authority.',
    icon: FileText,
    slug: '/services/taxation',
    category: 'tax',
    iconColor: 'text-accent-orange',
    image: 'https://images.pexels.com/photos/6863254/pexels-photo-6863254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Comprehensive tax services to ensure compliance while optimizing your tax position.',
    features: ['Tax Planning', 'VAT Returns', 'Transfer Pricing', 'Tax Compliance'],
    content: `
      <h3>Strategic Tax Solutions</h3>
      <p>Our tax services are designed to help clients tap into today's competitive business and fiscal environment through effective tax planning and maximization of tax incentives while maintaining regulatory compliance. We offer a range of superior tax services in line with the government's self-assessment system.</p>
      
      <h3>Tax Compliance & Filing</h3>
      <p>We can act as your appointed tax consultants, handling all taxation matters on your behalf with Tanzania Revenue Authority. Our services include preparing and filing:</p>
      <ul>
        <li>Monthly Value Added Tax returns</li>
        <li>Monthly Withholding Tax payments and returns</li>
        <li>Monthly Skills and Development Levy returns</li>
        <li>Monthly Excise Duty and Bed Night Levy returns</li>
        <li>Monthly NSSF and WCF returns</li>
        <li>Quarterly Provisional Tax returns</li>
        <li>Quarterly City Service Levy returns</li>
        <li>Yearly Final Tax returns</li>
      </ul>
      
      <h3>Transfer Pricing Documentation</h3>
      <p>We specialize in the preparation of Transfer Pricing Documentation to ensure compliance with local regulations while optimizing your cross-border transactions. Our team helps you document and support your transfer pricing strategy with appropriate economic analysis.</p>
      
      <h3>Tax Advisory Services</h3>
      <p>Our tax professionals draw on deep experience and industry-specific knowledge to deliver insights and innovative solutions to maintain compliance while minimizing your tax burden legally.</p>
    `
  },
  {
    id: 'tax-litigation',
    title: 'Tax Litigation',
    description: 'Professional representation in tax disputes, objections, appeals, and litigation with Tanzania Revenue Authority with fact-finding techniques and legal interpretations.',
    icon: Scale,
    slug: '/services/tax-litigation',
    category: 'tax',
    iconColor: 'text-accent-red',
    image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Expert representation and support in tax disputes and litigation matters.',
    features: ['Tax Objections', 'Tax Appeals', 'Tax Court Representation', 'Assessment Review'],
    content: `
      <h3>Expert Tax Dispute Resolution</h3>
      <p>A difference in tax opinion between taxpayers and Tanzania Revenue Authority during routine tax audits (over whether and how much the taxpayer is obliged to pay) is very common. These unresolved differences don't stop Tanzania Revenue Authority from issuing tax assessments.</p>
      
      <h3>Assessment Review</h3>
      <p>When you face questionable assessments, we can assist you with an independent review to determine whether the assessment was issued fairly based on our fact-finding techniques and legal interpretations related to the tax in question.</p>
      
      <h3>Tax Objection & Appeals</h3>
      <p>We provide consulting services regarding the procedures, costs, and chances of winning if you decide to proceed with tax objection, appeals and litigation. If desired, we can also offer total support by handling the tax objection, appeals and tax litigation on your behalf at the Tax Revenue Appeals Board.</p>
      
      <h3>Tax Court Representation</h3>
      <p>In cases requiring formal litigation, we work closely with specialized tax attorneys to provide expert support and representation. Our team's technical tax knowledge combined with legal expertise creates a strong foundation for your case through each step of the tax appeal and litigation process.</p>
    `
  },
  {
    id: 'business-plans',
    title: 'Business Plans',
    description: 'Strategic business planning services with comprehensive financial projections to help secure funding from potential investors and lenders.',
    icon: TrendingUp,
    slug: '/services/business-plans',
    category: 'advisory',
    iconColor: 'text-primary',
    image: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: "Comprehensive business planning services to guide your company's growth strategy.",
    features: ['Strategic Planning', 'Financial Projections', 'Investor Documentation', 'Market Analysis'],
    content: `
      <h3>Strategic Business Planning</h3>
      <p>We prepare business plans with clear business goals, methods on how these goals can be attained, and the time frame within which these goals need to be achieved. Our business plans are known to be robust and stand good chances for securing funding from potential investors and lenders.</p>
      
      <h3>Comprehensive Documentation</h3>
      <p>Our business plans describe the nature of the business, background information on the organization, the organization's financial projections, and the strategies it intends to implement to achieve the stated targets. We believe that your business success is our success.</p>
      
      <h3>Financial Projections</h3>
      <p>Our team develops detailed financial projections based on realistic assumptions and market conditions. These projections are crucial for securing funding and guiding your business decisions, helping you understand potential financial outcomes under different scenarios.</p>
      
      <h3>Strategic Roadmap</h3>
      <p>We provide a road map that offers clear direction to your business, helping you navigate challenges and capitalize on opportunities in your market. Our strategic approach ensures alignment between your business objectives and the strategies to achieve them.</p>
    `
  },
  {
    id: 'training',
    title: 'Corporate Training',
    description: 'Specialized training programs in IFRS, IFRS for SMEs, IPSASs, Tanzanian tax laws and regulations, and internal audit practices.',
    icon: Users,
    slug: '/services/training',
    category: 'advisory',
    iconColor: 'text-accent-orange',
    image: 'https://images.pexels.com/photos/7688334/pexels-photo-7688334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Tailored training programs in finance, taxation, and business management.',
    features: ['IFRS Training', 'Tax Workshops', 'Internal Audit Training', 'Compliance Training'],
    content: `
      <h3>Professional Development Programs</h3>
      <p>Our company offers a series of in-house training and public seminars and coaching services that support individuals and organizations in maintaining and increasing their energy, focus, and vision. When we are clear and focused, our personal and professional effectiveness increases.</p>
      
      <h3>Specialized Training Areas</h3>
      <p>Our certified trainers specialize in providing corporate training in the following areas:</p>
      <ul>
        <li>International Financial Reporting Standards (IFRS)</li>
        <li>IFRS for Small and Medium-sized Entities (SMEs)</li>
        <li>International Public Sector Accounting Standards (IPSASs)</li>
        <li>Tanzanian Tax laws and regulations</li>
        <li>Internal audit practices and methodologies</li>
      </ul>
      
      <h3>Competency Development</h3>
      <p>We assist in bridging competency gaps towards building a skilled and productive workforce to meet the challenges of global business competitions by corporates. Our training programs are designed to enhance organizational capability in financial reporting, compliance, taxation, and internal audit.</p>
      
      <h3>Customized Learning</h3>
      <p>We offer both standardized training modules and customized programs tailored to your organization's specific needs and challenges, ensuring maximum relevance and application of learned concepts.</p>
    `
  },
  {
    id: 'company-setup',
    title: 'Company Setup',
    description: 'Complete guidance for establishing your business in Tanzania, including registration, licensing, tax compliance, and operational setup.',
    icon: Building,
    slug: '/services/company-setup',
    category: 'advisory',
    iconColor: 'text-accent-red',
    image: 'https://images.pexels.com/photos/7821714/pexels-photo-7821714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    shortDescription: 'Comprehensive assistance with legal business establishment and registration in Tanzania.',
    features: ['Business Registration', 'Tax & Regulatory Compliance', 'Bank Account Setup', 'Office Setup'],
    content: `
      <h3>Business Establishment Services</h3>
      <p>We can help you set up a lawful and well-established presence of your business in Tanzania. Our comprehensive business setup services include:</p>
      
      <h3>Business Registration</h3>
      <ul>
        <li>Incorporating an entity with BRELA (Limited Liability Company, Partnership, Sole Proprietorship, Branch)</li>
        <li>Registering your business with Tanzania Revenue Authority and getting Taxpayer Identification Number (TIN) and Value Added Tax Registration Number (VRN)</li>
        <li>Obtaining Business Licenses</li>
        <li>Obtaining necessary regulatory licenses, approvals and clearances (including tax clearance certificate)</li>
      </ul>
      
      <h3>Operational Setup</h3>
      <ul>
        <li>Assistance with acquisition of relevant EFD/ESD machine (that suits your accounting system) and necessary support for EFD compliance purposes</li>
        <li>Assistance for getting office space – be it physical or virtual</li>
        <li>Assistance with setting up website and email domains including web, logo and CI designing services</li>
        <li>Setting up organizational structure and drafting employment contracts</li>
        <li>Recruitment and selection services (restricted to Internal Audit and Finance Department)</li>
      </ul>
      
      <h3>Regulatory Compliance</h3>
      <ul>
        <li>Registering your business with NSSF, WCF, OSHA, PDPC, and other regulatory bodies in Tanzania</li>
        <li>Assistance with opening of business bank accounts in Tanzania</li>
        <li>Any other help that you may require to do business in Tanzania</li>
      </ul>
    `
  }
];

export const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'audit', label: 'Audit & Assurance' },
  { id: 'business', label: 'Business Services' },
  { id: 'tax', label: 'Tax Services' },
  { id: 'advisory', label: 'Advisory Services' }
];

export const getServiceByID = (id: string) => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (categoryId: string) => {
  if (categoryId === 'all') {
    return services;
  }
  return services.filter(service => service.category === categoryId);
};

export const getRelatedServices = (currentServiceId: string, count: number = 3) => {
  const currentService = getServiceByID(currentServiceId);
  if (!currentService) return [];
  
  // Get services from the same category, excluding the current one
  const sameCategory = services.filter(
    service => service.category === currentService.category && service.id !== currentServiceId
  );
  
  // If we have enough services from the same category, return those
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }
  
  // Otherwise, add services from other categories to fill the count
  const otherServices = services.filter(
    service => service.category !== currentService.category && service.id !== currentServiceId
  );
  
  return [...sameCategory, ...otherServices].slice(0, count);
};