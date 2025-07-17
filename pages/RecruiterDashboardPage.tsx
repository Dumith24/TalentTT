
import React, { useState, useEffect, useMemo } from 'react';
import { fetchPublicCandidates } from '../services/mockApi.ts';
import { CandidateProfile } from '../types.ts';
import CandidateCard from '../components/CandidateCard.tsx';
import FilterSidebar from '../components/FilterSidebar.tsx';
import Spinner from '../components/common/Spinner.tsx';

const RecruiterDashboardPage: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobCategory: '',
    skills: '',
    location: '',
  });

  useEffect(() => {
    const loadCandidates = async () => {
      setLoading(true);
      const data = await fetchPublicCandidates();
      setCandidates(data);
      setLoading(false);
    };
    loadCandidates();
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const categoryMatch = filters.jobCategory ? candidate.jobCategory === filters.jobCategory : true;
      const locationMatch = filters.location ? candidate.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
      const skillsMatch = filters.skills
        ? filters.skills.toLowerCase().split(',').every(skill =>
            candidate.skills.some(cs => cs.toLowerCase().includes(skill.trim()))
          )
        : true;
      return categoryMatch && locationMatch && skillsMatch;
    });
  }, [candidates, filters]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <FilterSidebar filters={filters} onFilterChange={setFilters} />
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Talent Pool</h1>
        <p className="text-gray-600 mb-6">Discover and connect with top professionals.</p>
        {loading ? (
          <div className="flex justify-center items-center h-64"><Spinner /></div>
        ) : (
          <div className="space-y-4">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))
            ) : (
              <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-700">No Candidates Found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters to find more talent.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;