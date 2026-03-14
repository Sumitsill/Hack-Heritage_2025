import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Award, 
  Settings, 
  Edit, 
  Camera, 
  Star, 
  Heart, 
  Zap, 
  ShieldCheck, 
  Calendar,
  ChevronRight,
  Mail,
  Phone,
  Bookmark,
  Share2,
  Trash2,
  Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const achievements = [
    { title: 'First Contribution', description: 'Made your first food donation', date: '2 weeks ago', icon: '🎉', color: 'bg-amber-100 text-amber-600' },
    { title: 'Helper', description: 'Helped 10 families with food', date: '1 week ago', icon: '🤝', color: 'bg-blue-100 text-blue-600' },
    { title: 'Eco Warrior', description: 'Saved 50kg of food from waste', date: '3 days ago', icon: '🌱', color: 'bg-emerald-100 text-emerald-600' }
  ];

  const contributions = [
    { title: 'Fresh Vegetables', quantity: 25, status: 'delivered', date: '2 days ago', category: 'Raw' },
    { title: 'Prepared Meals', quantity: 15, status: 'claimed', date: '1 week ago', category: 'Prepared' },
    { title: 'Bakery Items', quantity: 30, status: 'delivered', date: '2 weeks ago', category: 'Packaged' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] font-outfit py-12 px-6 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-[-100px] w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[80px] -z-10" />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Profile Card Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-12 mb-12 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
             <User size={300} strokeWidth={1} />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-40 h-40 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[48px] p-1 shadow-2xl shadow-emerald-500/20 group-hover:rotate-3 transition-transform duration-500">
                <div className="w-full h-full bg-white rounded-[46px] flex items-center justify-center overflow-hidden">
                   {user?.profileImage ? (
                     <img src={user.profileImage} className="w-full h-full object-cover" />
                   ) : (
                     <div className="text-6xl font-black text-emerald-600">{user?.name?.[0] || 'U'}</div>
                   )}
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-black transition-all active:scale-90 border-4 border-white">
                <Camera size={20} />
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center md:text-left pt-2">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3 uppercase">{user?.name || 'Heritage Member'}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400">
                       <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                          <MapPin size={14} className="text-emerald-500" />
                          {user?.location || 'New Delhi, India'}
                       </div>
                       <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-widest bg-emerald-500 text-white px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">
                          <ShieldCheck size={14} />
                          Verified {user?.role || 'Contributor'}
                       </div>
                       <div className="flex items-center gap-1.5 text-slate-900">
                          <Star size={16} className="text-amber-400 fill-current" />
                          <span className="font-black">4.9</span>
                       </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                     <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
                     >
                       <Edit size={16} strokeWidth={3} />
                       Edit Persona
                     </button>
                     <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 hover:bg-white hover:text-slate-900 transition-all hover:shadow-md">
                        <Settings size={20} />
                     </button>
                  </div>
               </div>
               
               <p className="mt-8 text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Dedicated to preserving heritage practices and ensuring food security through community contributions. Proud member of the Hack Heritage initiative since 2025.
               </p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Stats */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
             {/* Impact Stats */}
             <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
                   <Zap size={14} className="text-emerald-500" />
                   Impact Metrics
                </h3>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-all">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm">
                            <Heart size={20} />
                         </div>
                         <span className="text-[11px] font-black uppercase text-slate-400">Donations</span>
                      </div>
                      <span className="text-xl font-black text-slate-900">247</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
                            <Users size={20} />
                         </div>
                         <span className="text-[11px] font-black uppercase text-slate-400">Helped</span>
                      </div>
                      <span className="text-xl font-black text-slate-900">89</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-all">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                            <Zap size={20} />
                         </div>
                         <span className="text-[11px] font-black uppercase text-slate-400">Waste Saved</span>
                      </div>
                      <span className="text-xl font-black text-slate-900">156kg</span>
                   </div>
                </div>
             </div>

             {/* Achievements Carousel/List */}
             <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Award size={100} />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-8">Hall of Fame</h3>
                <div className="space-y-5">
                   {achievements.map((ach, i) => (
                     <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="flex items-start gap-4 group cursor-help"
                     >
                        <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl ${ach.color} shadow-sm group-hover:scale-110 transition-transform`}>
                           {ach.icon}
                        </div>
                        <div>
                           <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{ach.title}</h4>
                           <p className="text-[11px] font-medium text-slate-400 leading-tight mt-1">{ach.description}</p>
                           <time className="text-[9px] font-black text-slate-300 uppercase mt-2 block tracking-widest">{ach.date}</time>
                        </div>
                     </motion.div>
                   ))}
                </div>
                <button className="w-full mt-10 py-4 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all group">
                   Show all 12 Badges
                </button>
             </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
             <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm">
                <div className="flex items-center justify-between mb-12">
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Recent Contributions</h3>
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Activity Log</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900"><Share2 size={18} /></button>
                      <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900"><Bookmark size={18} /></button>
                   </div>
                </div>

                <div className="space-y-6">
                   {contributions.map((con, i) => (
                     <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-6 border border-slate-100 rounded-[32px] hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                     >
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                              <Calendar size={20} />
                              <span className="text-[8px] font-black mt-1 uppercase tracking-tighter">OCT 1{i}</span>
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{con.category}</span>
                                 <h4 className="font-black text-lg text-slate-900 tracking-tight uppercase">{con.title}</h4>
                              </div>
                              <p className="text-sm font-medium text-slate-400">{con.quantity} Portions • Local Collective NGO</p>
                              <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-[0.2em]">{con.date}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right hidden sm:block">
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</p>
                              <div className={`inline-flex items-center gap-1.5 font-black text-[11px] uppercase tracking-widest ${
                                con.status === 'delivered' ? 'text-emerald-500' : 'text-amber-500'
                              }`}>
                                 <Check size={14} strokeWidth={3} />
                                 {con.status}
                              </div>
                           </div>
                           <ChevronRight size={20} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
                        </div>
                     </motion.div>
                   ))}
                </div>

                <div className="mt-12 text-center">
                   <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all">
                      Archive and Sync Profile
                   </button>
                </div>
             </div>

             {/* Danger Zone / Preferences */}
             <div className="bg-rose-50/50 rounded-[40px] border border-rose-100 p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                   <div>
                      <h4 className="text-xl font-black text-rose-900 uppercase tracking-tight">Privacy & Security</h4>
                      <p className="text-rose-700/60 font-medium text-sm">Manage your account persistence and data sovereignty.</p>
                   </div>
                   <button className="px-8 py-4 bg-white text-rose-600 border border-rose-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                      Revoke Access
                   </button>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Footer Meta */}
        <div className="mt-16 text-center opacity-30 group hover:opacity-100 transition-opacity">
           <p className="text-[9px] font-black text-slate-900 uppercase tracking-[0.5em]">Identity Token: {user?._id || 'UID-8827-X'}</p>
        </div>
      </div>
    </div>
  );
}