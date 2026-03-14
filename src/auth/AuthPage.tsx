import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, MapPin, ArrowRight, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../utils/supabase';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    location: '',
    role: 'contributor',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) throw error;
        toast.success('✅ Logged in successfully!');
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              location: formData.location,
              role: formData.role
            }
          }
        });
        
        if (error) throw error;
        // The most common Supabase flow sends a verification email.
        toast.success(
          '✅ Account created successfully! Please check your email for the verification link.', 
          { duration: 5000 }
        );
        setIsLoginMode(true);
      }
    } catch (error: any) {
      toast.error(error.message || '⚠️ Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-50 via-gray-50 to-emerald-50">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-200/30 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-200/30 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-md w-full mx-auto p-4 relative z-10">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-xl shadow-emerald-500/30">
              <Heart className="h-8 w-8 text-white fill-current animate-pulse" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent tracking-tight">
                Hungerr
              </h1>
              <p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Empowering Lives</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-white p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoginMode ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {isLoginMode 
                ? 'Enter your credentials to access your account' 
                : 'Join us to help distribute food and reduce waste'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLoginMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Your City/Location"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium text-gray-800 appearance-none cursor-pointer"
                    >
                      <option value="contributor">Food Contributor</option>
                      <option value="collector">Food Collector</option>
                      <option value="consumer">Food Consumer</option>
                      <option value="volunteer">Volunteer</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLoginMode ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Secure Verification Hint */}
          {!isLoginMode && (
            <div className="mt-6 p-4 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-start space-x-3">
              <div className="bg-blue-100 p-1.5 rounded-lg mt-0.5">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-0.5">Email Verification</p>
                <p className="text-blue-700/80 leading-snug">We'll send a secure verification link to your email to verify your account.</p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600 font-medium text-sm">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                type="button"
                className="ml-2 text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-colors"
              >
                {isLoginMode ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </motion.div>
        
        <div className="text-center mt-8 text-sm text-gray-400 font-medium">
          <p>By continuing, you agree to our Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
