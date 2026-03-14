import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  MapPin, 
  Plus, 
  ShoppingBag, 
  ChevronDown, 
  ChevronRight,
  LogOut, 
  Settings, 
  Globe,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/map', label: t('nav.map'), icon: MapPin },
    { path: '/contribute', label: t('nav.contribute'), icon: Plus },
    { path: '/marketplace', label: t('nav.marketplace'), icon: ShoppingBag },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <>
      <motion.header 
        className={`sticky top-0 z-[100] transition-all duration-500 font-outfit ${
          scrolled 
            ? 'py-4 bg-white/70 backdrop-blur-2xl border-b border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
            : 'py-6 bg-transparent border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Elegant Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-200 group-hover:rotate-6 transition-transform">
                <Globe className="text-emerald-500" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">Hungerr</span>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mt-1">Pulse v1.4</span>
              </div>
            </Link>

            {/* Futuristic Desktop Navigation */}
            <nav className="hidden xl:flex items-center bg-slate-100/50 p-1.5 rounded-[24px] border border-slate-200/50 backdrop-blur-md">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-8 py-3 rounded-[18px] transition-all duration-500 group overflow-hidden ${
                      active ? 'text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {active && (
                      <motion.div 
                        layoutId="activeHeaderTab"
                        className="absolute inset-0 bg-slate-900 shadow-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2.5">
                      <Icon size={16} strokeWidth={active ? 3 : 2} className={active ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-900 transition-colors"} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Global Actions Area */}
            <div className="hidden md:flex items-center gap-6">
              <div className="h-8 w-px bg-slate-200" />
              <LanguageSelector />
              
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 bg-white border border-slate-100 p-1.5 pr-4 rounded-[20px] hover:shadow-xl hover:shadow-slate-100 transition-all active:scale-95 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                       {user.name?.[0] || 'U'}
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{(user?.name || 'User').split(' ')[0]}</span>
                       <ChevronDown size={14} className={`text-slate-300 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full right-0 mt-4 w-72 bg-white rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 p-4 z-[110]"
                      >
                         <div className="p-4 bg-slate-50 rounded-[24px] mb-2 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400">
                               <User size={24} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hungerr Profile</p>
                               <h4 className="font-black text-slate-900 truncate max-w-[140px]">{user.name}</h4>
                            </div>
                         </div>
                         
                         <div className="space-y-1">
                            <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 w-full p-4 rounded-2xl text-[11px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all">
                               <Settings size={16} /> Persona Settings
                            </Link>
                            <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 w-full p-4 rounded-2xl text-[11px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all">
                               <LayoutDashboard size={16} /> Central Dashboard
                            </Link>
                            <div className="my-2 h-px bg-slate-100" />
                            <button onClick={handleLogout} className="flex items-center gap-3 w-full p-4 rounded-2xl text-[11px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 transition-all">
                               <LogOut size={16} /> Disconnect
                            </button>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-3"
                >
                  <Zap size={14} fill="currentColor" />
                  Initiate Sync
                </button>
              )}
            </div>

            {/* Modern Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-4 rounded-[20px] bg-white border border-slate-100 text-slate-900 hover:shadow-lg transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Fullscreen-ish Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="xl:hidden fixed inset-0 top-[80px] bg-white z-[90] p-6 pt-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                <div className="space-y-4">
                  <p className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Navigation Repository</p>
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center justify-between p-6 rounded-[32px] transition-all ${
                          isActive(item.path) ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <item.icon size={24} />
                          <span className="text-xl font-black uppercase tracking-tight">{item.label}</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-10 border-t border-slate-100 mb-10">
                   <div className="flex items-center justify-between mb-8 px-4">
                      <LanguageSelector />
                   </div>
                   {user ? (
                     <div className="space-y-4">
                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 p-6 bg-rose-50 text-rose-600 rounded-[32px] font-black uppercase text-sm tracking-widest">
                           <LogOut size={20} /> Disconnect Account
                        </button>
                     </div>
                   ) : (
                     <button onClick={() => {setIsMenuOpen(false); setIsAuthModalOpen(true);}} className="w-full p-6 bg-slate-900 text-white rounded-[32px] font-black uppercase text-sm tracking-widest shadow-2xl">
                        Initiate Portal Sync
                     </button>
                   )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
