
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import CandidateDashboardPage from './pages/CandidateDashboardPage.tsx';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

const PrivateRoute: React.FC<{ children: React.ReactNode; role: 'candidate' | 'recruiter' }> = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }
  return user && user.role === role ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile/:candidateId" element={<ProfilePage />} />
                    <Route path="/candidate/dashboard" element={
                        <PrivateRoute role="candidate">
                            <CandidateDashboardPage />
                        </PrivateRoute>
                    } />
                    <Route path="/recruiter/dashboard" element={
                        <PrivateRoute role="recruiter">
                            <RecruiterDashboardPage />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
        <HashRouter>
            <AppContent />
        </HashRouter>
    </AuthProvider>
  );
};

export default App;