
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { fetchCandidateByUserId, updateCandidateProfile } from '../services/mockApi.ts';
import { CandidateProfile } from '../types.ts';
import ProfileForm from '../components/ProfileForm.tsx';
import Spinner from '../components/common/Spinner.tsx';

const CandidateDashboardPage: React.FC = () => {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProfile = useCallback(async () => {
    if (user) {
      setLoading(true);
      let existingProfile = await fetchCandidateByUserId(user.id);
      if (!existingProfile) {
        existingProfile = {
          id: '', // Will be set on first save
          userId: user.id,
          name: '',
          email: user.email,
          isPublic: true,
          jobTitle: '',
          jobCategory: '',
          skills: [],
          education: [],
          experience: [],
          expectedSalary: 0,
          linkedinUrl: '',
          profileSummary: '',
          location: '',
        };
      }
      setProfile(existingProfile);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSave = async (updatedProfile: CandidateProfile) => {
    setSaving(true);
    try {
      const savedProfile = await updateCandidateProfile(updatedProfile);
      setProfile(savedProfile);
      // Update auth context if profile ID was missing
      if (user && !user.profileId && savedProfile.id) {
        login({ ...user, profileId: savedProfile.id });
      }
    } catch (error) {
      console.error("Failed to save profile", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (!profile) {
    return <div className="text-center text-red-500">Could not load profile.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile Dashboard</h1>
      <p className="text-gray-600 mb-6">Keep your profile updated to attract the best opportunities.</p>
      <ProfileForm profile={profile} onSave={handleSave} isSaving={saving} />
    </div>
  );
};

export default CandidateDashboardPage;