
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, UserSearch } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-4xl mx-auto -mt-20 relative z-10 border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Find Your Next Opportunity in Sri Lanka
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Lanka Jobs CV connects talented professionals with leading companies. Build your profile and let recruiters find you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary-50 p-8 rounded-lg border border-primary-200 transition-transform transform hover:scale-105">
            <Briefcase className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">For Candidates</h2>
            <p className="text-gray-600 mb-6">
              Create a professional profile, showcase your skills, and get discovered by top employers.
            </p>
            <Link to="/register" state={{ role: 'candidate' }} className="inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors">
              Create My Profile
            </Link>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg border border-gray-200 transition-transform transform hover:scale-105">
            <UserSearch className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">For Recruiters</h2>
            <p className="text-gray-600 mb-6">
              Access a curated pool of talented professionals. Search, filter, and find your next great hire.
            </p>
            <Link to="/register" state={{ role: 'recruiter' }} className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors">
              Find Talent
            </Link>
          </div>
        </div>
      </div>
       <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-primary-500 font-bold text-5xl mb-2">1</div>
                    <h4 className="font-bold text-lg">Create Your Profile</h4>
                    <p className="text-gray-600">Candidates build a detailed professional profile or get help from our AI assistant.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-primary-500 font-bold text-5xl mb-2">2</div>
                    <h4 className="font-bold text-lg">Get Discovered</h4>
                    <p className="text-gray-600">Recruiters search our talent pool using powerful filters to find the perfect match.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-primary-500 font-bold text-5xl mb-2">3</div>
                    <h4 className="font-bold text-lg">Connect & Hire</h4>
                    <p className="text-gray-600">Recruiters connect directly with candidates to start the hiring process.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;