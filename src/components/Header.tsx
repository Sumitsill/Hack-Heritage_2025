// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, Globe, User, MapPin, Home, BarChart3, Plus } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';
// import { useAuth } from '../contexts/AuthContext';
// import LanguageSelector from './LanguageSelector';
// import AuthModal from './AuthModal';

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const { t } = useLanguage();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const { user, logout } = useAuth();
//   const location = useLocation();

//   const navItems = [
//     { path: '/', label: t('nav.home'), icon: Home },
//     { path: '/map', label: t('nav.map'), icon: MapPin },
//     { path: '/dashboard', label: t('nav.dashboard'), icon: BarChart3 },
//     { path: '/contribute', label: t('nav.contribute'), icon: Plus }
//   ];
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) setIsLoggedIn(true);
//   }, []);

//   const isActive = (path: string) => location.pathname === path;

//   const handleLogout = () => {
//     localStorage.removeItem("authToken"); // remove token
//     setIsLoggedIn(false);
//   };
//   return (
//     <>
//       <motion.header 
//         className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-2">
//               <motion.div 
//                 className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <span className="text-white font-bold text-lg">H</span>
//               </motion.div>
//               <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
//                 Hungerr
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
//                       isActive(item.path)
//                         ? 'text-emerald-600 bg-emerald-50'
//                         : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
//                     }`}
//                   >
//                     <Icon size={16} />
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>

//             {/* Right side */}
//             <div className="hidden md:flex items-center space-x-4">
//               <LanguageSelector />
              
//               {isLoggedIn ? (
//                 <div className="flex items-center space-x-3">
//                   <Link
//                     to="/profile"
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
//                       <User size={16} className="text-emerald-600" />
//                     </div>
//                     <span className="font-medium text-gray-700">{user.name}</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="text-gray-500 hover:text-gray-700 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <motion.button
//                   onClick={() => setIsAuthModalOpen(true)}
//                   className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   Sign In
//                 </motion.button>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               className="md:hidden bg-white border-t border-gray-100"
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <div className="px-4 py-4 space-y-2">
//                 {navItems.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <Link
//                       key={item.path}
//                       to={item.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
//                         isActive(item.path)
//                           ? 'text-emerald-600 bg-emerald-50'
//                           : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
//                       }`}
//                     >
//                       <Icon size={20} />
//                       <span className="font-medium">{item.label}</span>
//                     </Link>
//                   );
//                 })}
                
//                 <div className="pt-4 border-t border-gray-100">
//                   <LanguageSelector />
                  
//                   {user ? (
//                     <div className="mt-4 space-y-2">
//                       <Link
//                         to="/profile"
//                         onClick={() => setIsMenuOpen(false)}
//                         className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-all"
//                       >
//                         <User size={20} />
//                         <span className="font-medium">{user.name}</span>
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-3 py-3 text-gray-500 hover:text-gray-700 transition-colors"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   ) : (
//                     <motion.button
//                       onClick={() => {
//                         setIsAuthModalOpen(true);
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full mt-4 bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       Sign In
//                     </motion.button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.header>

//       <AuthModal 
//         isOpen={isAuthModalOpen} 
//         onClose={() => setIsAuthModalOpen(false)} 
//       />
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, MapPin, Home, BarChart3, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';  // ✅ useAuth
import LanguageSelector from './LanguageSelector';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { t } = useLanguage();
  const { user, logout } = useAuth();   // ✅ now using from AuthContext
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/map', label: t('nav.map'), icon: MapPin },
    { path: '/useCoin', label: t('Coin System'), icon: Plus },
    // { path: '/dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { path: '/contribute', label: t('nav.contribute'), icon: Plus },
    { path: '/rte', label: t('RTE Enrollment'), icon: Plus },
    { path: '/marketplace', label: t('Online Marketplace'), icon: Plus },
    // { path: '/resource-library', label: t('Resource Library'), icon: Plus },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout(); // ✅ call context logout (should also clear token inside AuthContext)
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg">H</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Hungerr
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                  // <button
                  //   onClick={() => setShowRTEEnrollmentForm(true)}
                  //   className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200"
                  // >
                  //   Enroll a Child
                  // </button>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              
              {user ? (   // ✅ if logged in show profile + logout
                <div className="flex items-center space-x-3">
                  {/* <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-emerald-600" />
                    </div>
                    <span className="font-medium text-gray-700">{user.name}</span>
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (   // ✅ if NOT logged in show sign in
                <motion.button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                        isActive(item.path)
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-gray-100">
                  <LanguageSelector />
                  
                  {user ? (   // ✅ Mobile version
                    <div className="mt-4 space-y-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-all"
                      >
                        <User size={20} />
                        <span className="font-medium">{user.name}</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full mt-4 bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
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
