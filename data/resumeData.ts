// data/resumeData.ts

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  status: 'Active' | 'In Development' | 'Completed';
  description: string[];
  highlights: string[];
  technologies: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  status: 'Live' | 'In Development';
  liveLink?: string;
  ghLink?: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  focus?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const resumeData = {
  personal: {
    name: 'Rahul Verma',
    title: 'Full Stack Developer',
    subtitle: 'Building production-grade applications with React, Next.js, and Node.js',
    email: 'hello@rahulwebdev.in',
    phone: '+91 9135271562',
    location: 'Patna, India',
    links: {
      portfolio: 'https://rahulwebdev.in',
      github: 'https://github.com/rahul1015s',
      linkedin: 'https://linkedin.com/in/rahul1015s',
      twitter: 'https://twitter.com/rahul1015s',
    },
  },

  about: {
    summary: `Full-stack developer with hands-on experience building enterprise-grade SaaS applications. Working at Oplus Cowork on systems used across multiple workspaces in India. Brings a strong analytical mindset and a thoughtful, problem-first approach to development.`,
    values: ['Clarity over cleverness', 'Robustness over speed', 'Maintainability over shortcuts', 'User-first thinking'],
    focus: ['Enterprise SaaS development', 'System design & architecture', 'Production deployment', 'Technical mentoring'],
  },

  experience: [
    {
      title: 'Full Stack Developer',
      company: 'Oplus Cowork',
      period: 'Jan 2026 - Present',
      status: 'Active',
      description: [
        'Led product architecture and shipped a workspace management platform using Next.js, React, MongoDB, and Tailwind CSS',
        'Owned end-to-end development from schema design to deployment',
        'Built admin workflows and operational dashboards',
      ],
      highlights: [
        'Focused on fast, maintainable UI and API performance',
        'Workspace management platform delivery',
        'Schema design to deployment ownership',
      ],
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Node.js', 'Express', 'PWA', 'AI'],
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Oplus Cowork',
      period: 'Sep 2025 - Dec 2025',
      status: 'Completed',
      description: [
        'Built reusable frontend modules and backend endpoints for authentication, content workflows, and internal tools',
        'Implemented production-ready API routes',
        'Contributed to reusable UI component patterns',
      ],
      highlights: [
        'Improved app stability and response times',
        'Authentication and content workflow support',
        'Internal tools contribution',
      ],
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Authentication'],
    },
    {
      title: 'Full Stack Developer',
      company: 'SDRF India - CSR & Donation Platform',
      period: '2025',
      status: 'In Development',
      description: [
        'Building production-grade CSR and donation platform with real-world impact',
        'Supporting education-first initiatives aligned with UN SDG Goals',
        'Implementing secure payment processing and admin workflows',
      ],
      highlights: [
        'Secure payment integration and processing(upcoming)',
        'Admin workflows and dashboard development',
        'Email infrastructure for notifications',
        'Donation tracking and reporting system',
        'User management and authentication',
        'Deployment at scale for non-profit organizations',
      ],
      technologies: ['Next.js', 'MongoDB', 'Payments', 'Email Services', 'TypeScript'],
    },
  ] as ExperienceItem[],

  projects: [
    {
      title: 'Gen-Notes',
      description: 'Secure MERN Stack PWA for note-taking with offline capabilities, JWT authentication, and private data handling',
      status: 'Live',
      liveLink: 'https://gennotes.vercel.app',
      ghLink: 'https://github.com/rahul1015s/Gen-Notes',
      highlights: [
        'User authentication with JWT & secure sessions',
        'Full CRUD note operations with private data isolation',
        'Progressive Web App (PWA) with offline support',
        'Reminder service with notifications',
        'Folder management with drag-drop functionality',
        'Rich text editor with full formatting support',
        'Real-time note syncing',
        'Rate limiting & security',
        '46+ commits showing consistent development',
        'Comprehensive documentation (API, setup, deployment)',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'PWA', 'JWT'],
    },
    {
      title: 'AtoZ Market',
      description: 'Serverless e-commerce platform with Firebase authentication, Redux state management, and modern UI',
      status: 'Live',
      liveLink: 'https://atoz-market.vercel.app',
      ghLink: 'https://github.com/rahul1015s/AtoZ-market',
      highlights: [
        'Firebase authentication with guest access',
        'Product catalog with category filtering',
        'Shopping cart system with Redux management',
        'Newsletter subscription feature',
        'Mobile-responsive design',
        'Amazon-style category layout',
        'Hero section with carousel animations',
        'Login-required cart access control',
        'RTK Query for efficient API fetching',
        '15+ commits with feature development',
      ],
      technologies: ['React', 'Redux', 'Firebase', 'Tailwind CSS', 'Vite', 'TypeScript'],
    },
    {
      title: 'Rahul Webdev - Portfolio',
      description: 'Professional portfolio and blog website showcasing projects, skills, and technical insights',
      status: 'Live',
      liveLink: 'https://rahulwebdev.in',
      ghLink: 'https://github.com/rahul1015s/rahulwebdev',
      highlights: [
        'Professional portfolio showcase',
        'Blog management system with articles',
        'Project portfolio display',
        'Technical skills section',
        'Professional bio and about section',
        'Newsletter subscription',
        'Mobile-optimized responsive design',
        'SEO-friendly structure',
        '10+ commits with continuous updates',
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    },
    {
      title: 'OPlus - Enterprise Workspace Platform',
      description: 'Solo-built enterprise SaaS with RBAC, AI chatbot, 40+ APIs, complex workflows, admin dashboards',
      status: 'Live',
      liveLink: 'https://opluscowork.com',
      highlights: [
        'Enterprise SaaS platform for 500+ workspaces',
        'Multi-tenant architecture with RBAC',
        '40+ RESTful APIs for system integration',
        'Real-time admin dashboards',
        'OTP and JWT authentication system',
        'AI chatbot for customer support',
        'Advanced caching strategies',
        'PWA with offline support',
        'Production-grade deployment',
        'Handles thousands of concurrent users',
      ],
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'PWA', 'AI', 'Node.js', 'Express'],
    },
  ] as ProjectItem[],

  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'IGNOU (Indira Gandhi National Open University)',
      period: '2025 - Present (1st Semester)',
      focus: ['Data Structures', 'Algorithms', 'Web Development', 'Software Engineering'],
    },
    {
      degree: 'Self-Taught Full Stack Developer',
      institution: 'Online Courses & Hands-on Experience',
      period: '2024 - Present',
      focus: ['React & Next.js', 'Node.js & Express', 'MongoDB & Databases', 'Production Deployment'],
    },
  ] as EducationItem[],

  skills: [
    {
      category: 'Frontend',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'MongoDB', 'Database Design'],
    },
    {
      category: 'Tools & Services',
      skills: ['Git & GitHub', 'Vercel', 'Firebase', 'VS Code', 'Postman', 'Figma'],
    },
    {
      category: 'Specializations',
      skills: ['PWA Development', 'Enterprise SaaS', 'RBAC Systems', 'Email Services'],
    },
    {
      category: 'Soft Skills',
      skills: ['Problem-solving', 'Technical Writing', 'Code Documentation', 'Team Collaboration', 'Leadership'],
    },
  ] as SkillCategory[],

  stats: {
    repositories: 17,
    projects: 4,
    commits: '100+',
    yearsExperience: '2+',
    internshipLocations: '50+',
  },

  languages: ['JavaScript (94.2%)', 'TypeScript (98.0%)', 'CSS (3.5%)', 'HTML (0.2%)'],

  certifications: [
    'MCA Coursework - IGNOU',
    'Multiple Online Web Development Courses',
    'Self-Taught Full Stack Development',
  ],

  socialProof: {
    github: {
      username: 'rahul1015s',
      repos: 17,
      stars: 18,
    },
    blog: {
      articles: 'Regular technical content',
      focus: 'Engineering thinking and problem-solving',
    },
  },
};
