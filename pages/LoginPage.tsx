
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { Role, User } from '../types.ts';
import Button from '../components/common/Button.tsx';
import Input from '../components/common/Input.tsx';
import { LogIn } from 'lucide-react';
import { fetchCandidateByUserId } from '../services/mockApi.ts';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This is a mock login. In a real app, you'd call a backend.
    if (email === 'candidate@test.com' && password === 'password') {
      const tempUser = { id: 'user1', email, role: Role.CANDIDATE };
      const profile = await fetchCandidateByUserId(tempUser.id);
      const user: User = { ...tempUser, profileId: profile?.id };
      login(user);
      navigate('/candidate/dashboard');
    } else if (email === 'recruiter@test.com' && password === 'password') {
      const user: User = { id: 'user-recruiter-1', email, role: Role.RECRUITER };
      login(user);
      navigate('/recruiter/dashboard');
    } else {
      setError('Invalid credentials. Use test accounts.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
            <LogIn className="w-12 h-12 text-primary-500 mx-auto mb-2" />
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500">Log in to continue your journey.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <div className="flex">
                <div className="py-1">
                  <p className="text-sm text-yellow-700">
                    <strong>Test Accounts:</strong><br/>
                    Candidate: <code className="font-mono">candidate@test.com</code><br/>
                    Recruiter: <code className="font-mono">recruiter@test.com</code><br/>
                    Password: <code className="font-mono">password</code>
                  </p>
                </div>
              </div>
            </div>
          <Button type="submit" fullWidth>Log In</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;