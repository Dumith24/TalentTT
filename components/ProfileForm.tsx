
import React, { useState } from 'react';
import { CandidateProfile, Education, Experience } from '../types.ts';
import { JOB_CATEGORIES } from '../constants.ts';
import { generateProfileSummary } from '../services/geminiService.ts';
import Button from './common/Button.tsx';
import Input from './common/Input.tsx';
import Select from './common/Select.tsx';
import TagInput from './common/TagInput.tsx';
import { Link } from 'react-router-dom';
import { Eye, Save, Trash2, PlusCircle, Sparkles, Loader } from 'lucide-react';


interface ProfileFormProps {
  profile: CandidateProfile;
  onSave: (profile: CandidateProfile) => void;
  isSaving: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave, isSaving }) => {
  const [formData, setFormData] = useState<CandidateProfile>(profile);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const summary = await generateProfileSummary(formData.jobTitle, formData.skills);
    setFormData(prev => ({...prev, profileSummary: summary}));
    setIsGenerating(false);
  }

  const handleNestedChange = <T extends Education | Experience>(
    section: 'education' | 'experience',
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedSection = [...formData[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: value } as T;
    setFormData(prev => ({ ...prev, [section]: updatedSection }));
  };
  
  const addNestedItem = (section: 'education' | 'experience') => {
    const newItem = section === 'education'
      ? { id: `edu-${Date.now()}`, institution: '', degree: '', fieldOfStudy: '', startYear: new Date().getFullYear(), endYear: new Date().getFullYear() }
      : { id: `exp-${Date.now()}`, company: '', title: '', startDate: '', endDate: 'Present', description: '' };
    setFormData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeNestedItem = (section: 'education' | 'experience', index: number) => {
    setFormData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-gray-700 mb-4">{title}</h3>
          {children}
      </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="isPublic" className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-gray-700">Make my profile public for recruiters</span>
        </label>
        {profile.id && (
            <Link to={`/profile/${profile.id}`} target="_blank">
                <Button variant="outline" size="sm" type="button">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Public Profile
                </Button>
            </Link>
        )}
      </div>

      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} disabled />
            <Input label="Current Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Senior Software Engineer" />
            <Select label="Job Category" name="jobCategory" value={formData.jobCategory} onChange={handleChange}>
                <option value="">Select a category</option>
                {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </Select>
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Colombo, Sri Lanka" />
            <Input label="Expected Salary (LKR)" name="expectedSalary" type="number" value={formData.expectedSalary} onChange={handleChange} />
            <Input label="LinkedIn Profile URL" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" />
        </div>
      </FormSection>
      
      <FormSection title="Profile Summary">
        <textarea
            name="profileSummary"
            value={formData.profileSummary}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Write a brief summary about yourself..."
        />
        <Button type="button" onClick={handleGenerateSummary} disabled={isGenerating} variant="secondary" className="mt-2">
            {isGenerating ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {isGenerating ? 'Generating...' : 'Generate with AI'}
        </Button>
        </FormSection>

      <FormSection title="Skills">
        <TagInput tags={formData.skills} onTagsChange={handleSkillsChange} />
      </FormSection>

      <FormSection title="Work Experience">
          {formData.experience.map((exp, index) => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4">
                  <Input label="Job Title" name="title" value={exp.title} onChange={e => handleNestedChange('experience', index, e)} />
                  <Input label="Company" name="company" value={exp.company} onChange={e => handleNestedChange('experience', index, e)} />
                  <Input label="Start Date" name="startDate" type="month" value={exp.startDate} onChange={e => handleNestedChange('experience', index, e)} />
                  <Input label="End Date" name="endDate" type="text" value={exp.endDate} onChange={e => handleNestedChange('experience', index, e)} placeholder="YYYY-MM or Present" />
                  <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <textarea name="description" value={exp.description} onChange={e => handleNestedChange('experience', index, e)} rows={3} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                      <Button type="button" variant="danger" size="sm" onClick={() => removeNestedItem('experience', index)}><Trash2 className="w-4 h-4 mr-1"/>Remove</Button>
                  </div>
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addNestedItem('experience')}><PlusCircle className="w-4 h-4 mr-2"/>Add Experience</Button>
      </FormSection>

       <FormSection title="Education">
          {formData.education.map((edu, index) => (
              <div key={edu.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4">
                  <Input label="Institution" name="institution" value={edu.institution} onChange={e => handleNestedChange('education', index, e)} />
                  <Input label="Degree" name="degree" value={edu.degree} onChange={e => handleNestedChange('education', index, e)} />
                  <Input label="Field of Study" name="fieldOfStudy" value={edu.fieldOfStudy} onChange={e => handleNestedChange('education', index, e)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Start Year" name="startYear" type="number" value={edu.startYear} onChange={e => handleNestedChange('education', index, e)} />
                    <Input label="End Year" name="endYear" type="text" value={String(edu.endYear)} onChange={e => handleNestedChange('education', index, e)} placeholder="YYYY or Present"/>
                  </div>
                   <div className="md:col-span-2 flex justify-end">
                      <Button type="button" variant="danger" size="sm" onClick={() => removeNestedItem('education', index)}><Trash2 className="w-4 h-4 mr-1"/>Remove</Button>
                  </div>
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addNestedItem('education')}><PlusCircle className="w-4 h-4 mr-2"/>Add Education</Button>
      </FormSection>

      <div className="flex justify-end sticky bottom-0 bg-white/80 backdrop-blur-sm py-4">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaving ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;