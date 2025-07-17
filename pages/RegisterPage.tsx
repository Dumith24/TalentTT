
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { Role, User } from '../types.ts';
import Button from '../components/common/Button.tsx';
import Input from '../components/common/Input.tsx';
import { UserPlus } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.CANDIDATE);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Mock registration and login
    const user: User = { id: `user-${Math.random()}`, email, role };
    login(user);

    if (role === Role.CANDIDATE) {
      navigate('/candidate/dashboard');
    } else {
      navigate('/recruiter/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
            <UserPlus className="w-12 h-12 text-primary-500 mx-auto mb-2" />
            <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
            <p className="text-gray-500">Join our network of professionals.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">I am a...</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setRole(Role.CANDIDATE)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${role === Role.CANDIDATE ? 'bg-primary-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setRole(Role.RECRUITER)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${role === Role.RECRUITER ? 'bg-primary-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Recruiter
              </button>
            </div>
          </div>
          <Input
            id="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" fullWidth>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;