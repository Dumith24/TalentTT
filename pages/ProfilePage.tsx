
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCandidateById } from '../services/mockApi.ts';
import { CandidateProfile } from '../types.ts';
import Spinner from '../components/common/Spinner.tsx';
import Button from '../components/common/Button.tsx';
import { Linkedin, Mail, MapPin, Briefcase, GraduationCap, DollarSign, Download, Settings } from 'lucide-react';

declare const jspdf: any;
declare const html2canvas: any;


const ProfilePage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const profileContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!candidateId) {
        setLoading(false);
        return;
    };
    const loadProfile = async () => {
      setLoading(true);
      const data = await fetchCandidateById(candidateId);
      setProfile(data || null);
      setLoading(false);
    };
    loadProfile();
  }, [candidateId]);

  const handleDownloadPdf = () => {
      if (!profileContentRef.current || !profile) return;
      setIsDownloading(true);
      const element = profileContentRef.current;
      
      html2canvas(element, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
      }).then((canvas: any) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jspdf.jsPDF({
              orientation: 'portrait',
              unit: 'px',
              format: [canvas.width, canvas.height]
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save(`${profile.name.replace(' ', '_')}_CV.pdf`);
          setIsDownloading(false);
      }).catch((err: any) => {
          console.error("Error generating PDF:", err);
          setIsDownloading(false);
      });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (!profile) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700">Profile Not Found</h2>
            <p className="text-gray-500 mt-2">The profile you are looking for does not exist or is set to private.</p>
            <Link to="/recruiter/dashboard" className="mt-4 inline-block text-primary-600 hover:underline">
                Back to Talent Pool
            </Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex justify-end gap-2 mb-4">
           <Button onClick={handleDownloadPdf} disabled={isDownloading} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download as PDF'}
           </Button>
        </div>
        <div ref={profileContentRef} className="bg-white p-8 md:p-12 shadow-lg rounded-xl border border-gray-200">
            <header className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-gray-500">{profile.name.charAt(0)}</span>
                </div>
                <div className="flex-grow">
                    <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
                    <h2 className="text-xl text-primary-600 font-semibold mt-1">{profile.jobTitle}</h2>
                    <div className="flex items-center gap-4 text-gray-500 mt-2 text-sm">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profile.location}</span>
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-primary-600"><Mail className="w-4 h-4" /> {profile.email}</a>
                        {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary-600"><Linkedin className="w-4 h-4" /> LinkedIn</a>}
                    </div>
                </div>
            </header>

            <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-primary-200 pb-2 mb-4">Profile Summary</h3>
                <p className="text-gray-600 leading-relaxed">{profile.profileSummary}</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div><span className="flex items-center gap-2 font-semibold text-gray-700"><Briefcase className="w-5 h-5 text-primary-500" />Job Category:</span> <span className="text-gray-600">{profile.jobCategory}</span></div>
                <div><span className="flex items-center gap-2 font-semibold text-gray-700"><DollarSign className="w-5 h-5 text-primary-500" />Expected Salary:</span> <span className="text-gray-600">LKR {profile.expectedSalary.toLocaleString()}</span></div>
            </div>

            <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-primary-200 pb-2 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
                        <span key={skill} className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-primary-200 pb-2 mb-4 flex items-center gap-2"><Briefcase className="w-6 h-6"/>Work Experience</h3>
                <div className="space-y-6">
                    {profile.experience.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="text-lg font-semibold text-gray-800">{exp.title}</h4>
                                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-md text-gray-600 font-medium">{exp.company}</p>
                            <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-gray-700 border-b-2 border-primary-200 pb-2 mb-4 flex items-center gap-2"><GraduationCap className="w-6 h-6"/>Education</h3>
                <div className="space-y-4">
                    {profile.education.map(edu => (
                         <div key={edu.id}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="text-lg font-semibold text-gray-800">{edu.degree}</h4>
                                <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                            </div>
                            <p className="text-md text-gray-600 font-medium">{edu.institution}</p>
                            <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
  );
};

export default ProfilePage;