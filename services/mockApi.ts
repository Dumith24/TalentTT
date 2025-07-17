
import { CandidateProfile, Role } from '../types.ts';

let mockProfiles: CandidateProfile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Anura Perera',
    email: 'anura.p@example.com',
    isPublic: true,
    jobTitle: 'Senior Software Engineer',
    jobCategory: 'Information Technology',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    education: [
      { id: 'edu1', institution: 'University of Colombo School of Computing', degree: 'B.Sc. in Computer Science', fieldOfStudy: 'Computer Science', startYear: 2012, endYear: 2016 }
    ],
    experience: [
      { id: 'exp1', company: 'Virtusa', title: 'Senior Software Engineer', startDate: '2019-01', endDate: 'Present', description: 'Led development of a major fintech platform.' },
      { id: 'exp2', company: 'Sysco LABS', title: 'Software Engineer', startDate: '2016-06', endDate: '2018-12', description: 'Worked on enterprise-level web applications.' },
    ],
    expectedSalary: 450000,
    linkedinUrl: 'https://linkedin.com/in/anuraperera',
    profileSummary: 'Results-driven Senior Software Engineer with over 8 years of experience in designing, developing, and deploying scalable web applications. Proficient in the MERN stack and cloud technologies like AWS. Passionate about creating efficient solutions to complex problems.',
    location: 'Colombo',
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Nimali Silva',
    email: 'nimali.s@example.com',
    isPublic: true,
    jobTitle: 'Digital Marketing Manager',
    jobCategory: 'Marketing & Sales',
    skills: ['SEO', 'SEM', 'Social Media Marketing', 'Content Strategy'],
    education: [
      { id: 'edu1', institution: 'University of Kelaniya', degree: 'BBA in Marketing', fieldOfStudy: 'Marketing', startYear: 2013, endYear: 2017 }
    ],
    experience: [
      { id: 'exp1', company: 'Daraz', title: 'Digital Marketing Manager', startDate: '2020-02', endDate: 'Present', description: 'Managed a team of 5 and increased organic traffic by 150%.' }
    ],
    expectedSalary: 300000,
    linkedinUrl: 'https://linkedin.com/in/nimalisilva',
    profileSummary: 'A creative and analytical Digital Marketing Manager with a proven track record of developing and executing successful online marketing campaigns. Expert in SEO, SEM, and data-driven strategy to boost brand awareness and ROI.',
    location: 'Kandy',
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Kasun Fernando',
    email: 'kasun.f@example.com',
    isPublic: false, // This profile is private
    jobTitle: 'Accountant',
    jobCategory: 'Finance & Accounting',
    skills: ['QuickBooks', 'Financial Reporting', 'Auditing'],
    education: [
        { id: 'edu1', institution: 'University of Sri Jayewardenepura', degree: 'B.Sc. in Finance', fieldOfStudy: 'Finance', startYear: 2015, endYear: 2019 }
    ],
    experience: [],
    expectedSalary: 150000,
    linkedinUrl: '',
    profileSummary: 'Detail-oriented accountant seeking a challenging role.',
    location: 'Galle',
  },
    {
    id: '4',
    userId: 'user4',
    name: 'Fathima Rizwan',
    email: 'fathima.r@example.com',
    isPublic: true,
    jobTitle: 'UX/UI Designer',
    jobCategory: 'Information Technology',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    education: [
      { id: 'edu1', institution: 'Academy of Design', degree: 'Diploma in Graphic Design', fieldOfStudy: 'Design', startYear: 2018, endYear: 2020 }
    ],
    experience: [
      { id: 'exp1', company: 'Creative Solutions', title: 'UX/UI Designer', startDate: '2020-08', endDate: 'Present', description: 'Designing intuitive and user-friendly interfaces for mobile and web applications.' },
    ],
    expectedSalary: 250000,
    linkedinUrl: 'https://linkedin.com/in/fathimarizwan',
    profileSummary: 'Passionate UX/UI Designer dedicated to creating beautiful and functional digital experiences. Skilled in the entire design process from user research to high-fidelity prototypes. Always eager to learn and tackle new design challenges.',
    location: 'Colombo',
  },
];

export const fetchPublicCandidates = async (): Promise<CandidateProfile[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockProfiles.filter(p => p.isPublic)), 500));
};

export const fetchCandidateById = async (id: string): Promise<CandidateProfile | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockProfiles.find(p => p.id === id)), 300));
};

export const fetchCandidateByUserId = async (userId: string): Promise<CandidateProfile | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockProfiles.find(p => p.userId === userId)), 300));
};

export const updateCandidateProfile = async (profile: CandidateProfile): Promise<CandidateProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProfiles.findIndex(p => p.id === profile.id);
      if (index !== -1) {
        mockProfiles[index] = profile;
        resolve(profile);
      } else {
        // Create new profile if it doesn't exist
        const newProfile = { ...profile, id: (mockProfiles.length + 1).toString() };
        mockProfiles.push(newProfile);
        resolve(newProfile);
      }
    }, 500);
  });
};