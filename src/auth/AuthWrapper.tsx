import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from './AuthPage';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading screen while Supabase checks the session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Verifying session...</p>
      </div>
    );
  }

  // Show our beautiful new Supabase AuthPage if user is not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Show main application if user is authenticated
  return <>{children}</>;
};

export default AuthWrapper;