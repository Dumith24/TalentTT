
import React from 'react';
import { Link } from 'react-router-dom';
import { CandidateProfile } from '../types.ts';
import { MapPin, Briefcase, Star } from 'lucide-react';

interface CandidateCardProps {
  candidate: CandidateProfile;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:border-primary-300 transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-500">{candidate.name.charAt(0)}</span>
        </div>
        <div className="flex-grow">
          <Link to={`/profile/${candidate.id}`} className="block">
            <h3 className="text-xl font-bold text-primary-700 hover:underline">{candidate.name}</h3>
          </Link>
          <p className="text-md font-semibold text-gray-700">{candidate.jobTitle}</p>
          <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {candidate.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {candidate.jobCategory}</span>
          </div>
          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500" /> Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.slice(0, 4).map(skill => (
                <span key={skill} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
              ))}
              {candidate.skills.length > 4 && <span className="text-xs text-gray-500 self-center">+{candidate.skills.length - 4} more</span>}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 self-center">
          <Link to={`/profile/${candidate.id}`}>
            <button className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;