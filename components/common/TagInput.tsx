
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setInputValue('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
        <p className="text-sm text-gray-600 mb-2">Enter skills and press Enter or comma to add them.</p>
        <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md">
        {tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
            {tag}
            <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-primary-100 hover:text-white"
            >
                <X size={16} />
            </button>
            </span>
        ))}
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-1 focus:outline-none bg-transparent"
            placeholder="Add a skill..."
        />
        </div>
    </div>
  );
};

export default TagInput;