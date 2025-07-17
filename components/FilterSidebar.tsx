
import React from 'react';
import { JOB_CATEGORIES } from '../constants.ts';
import Input from './common/Input.tsx';
import Select from './common/Select.tsx';
import Button from './common/Button.tsx';

interface FilterSidebarProps {
  filters: {
    jobCategory: string;
    skills: string;
    location: string;
  };
  onFilterChange: (filters: { jobCategory: string; skills: string; location: string }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };
  
  const handleReset = () => {
      onFilterChange({ jobCategory: '', skills: '', location: '' });
  }

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Filter Talent</h3>
        <div className="space-y-4">
          <Select
            label="Job Category"
            name="jobCategory"
            value={filters.jobCategory}
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </Select>
          <Input
            label="Skills"
            name="skills"
            value={filters.skills}
            onChange={handleChange}
            placeholder="e.g., React, Node.js"
            helpText="Comma-separated skills"
          />
          <Input
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="e.g., Colombo"
          />
           <Button onClick={handleReset} variant="outline" fullWidth>Reset Filters</Button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;