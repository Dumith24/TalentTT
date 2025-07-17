
export enum Role {
  CANDIDATE = 'candidate',
  RECRUITER = 'recruiter',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  profileId?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number | 'Present';
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string; // e.g., 'YYYY-MM'
  endDate: string | 'Present'; // e.g., 'YYYY-MM'
  description: string;
}

export interface CandidateProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  isPublic: boolean;
  jobTitle: string;
  jobCategory: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  expectedSalary: number;
  linkedinUrl: string;
  profileSummary: string;
  location: string;
}