
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, className, ...props }) => {
  const selectId = id || props.name;
  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;