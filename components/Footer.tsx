
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto py-6 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Lanka Jobs CV. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Connecting Talent in Sri Lanka</p>
      </div>
    </footer>
  );
};

export default Footer;