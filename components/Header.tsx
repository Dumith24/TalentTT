
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { Role } from '../types.ts';
import Button from './common/Button.tsx';
import { LogOut, LayoutDashboard, User, UserSearch } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-600 hover:text-white'}`;

  return (
    <header className="bg-primary-800 shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              Lanka<span className="text-primary-300">Jobs</span>CV
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user?.role === Role.CANDIDATE && (
                <>
                  <NavLink to="/candidate/dashboard" className={navLinkClass}>
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </NavLink>
                  {user.profileId && (
                    <NavLink to={`/profile/${user.profileId}`} className={navLinkClass}>
                      <User className="w-5 h-5" />
                      <span>My Public Profile</span>
                    </NavLink>
                  )}
                </>
              )}
              {user?.role === Role.RECRUITER && (
                <NavLink to="/recruiter/dashboard" className={navLinkClass}>
                  <UserSearch className="w-5 h-5" />
                  <span>Find Talent</span>
                </NavLink>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white text-sm hidden sm:block">Welcome, {user.email}</span>
                <Button onClick={handleLogout} variant="secondary" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary-800">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;