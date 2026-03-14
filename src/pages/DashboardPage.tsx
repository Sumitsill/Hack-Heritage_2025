import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar, 
  Award, 
  Bell, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Heart,
  Droplets,
  Cloud,
  ChevronRight,
  LayoutDashboard,
  Activity,
  Zap,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Reward, Transaction, User as CoinUser } from '../types';

// Centralized Coin System Hook (Internal for now as per previous structure)
export const useCoinSystem = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<CoinUser | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authUser) {
      setUser({
        id: authUser.phone,
        name: authUser.name || authUser.phone,
        coinBalance: 1500,
        totalEarned: 2000,
        totalSpent: 500,
      });
    }

    const initialRewards: Reward[] = [
      { id: 1, name: "Premium Theme Pack", description: "Unlock 10 exclusive themes", cost: 500, image: "https://images.unsplash.com/photo-1614850523296-e8c1d07ed7a9?auto=format&fit=crop&q=80&w=400", category: "digital", available: true },
      { id: 2, name: "Eco-Friendly Kit", description: "Start your zero-waste journey", cost: 1200, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400", category: "physical", available: true },
      { id: 3, name: "Digital Badge", description: "Unique contributor status", cost: 300, image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=400", category: "digital", available: true }
    ];
    setRewards(initialRewards);
    
    const saved = localStorage.getItem('coinTransactions');
    if (saved) {
      setTransactions(JSON.parse(saved).map((t: any) => ({ ...t, date: new Date(t.date) })));
    }
  }, [authUser]);

  const redeemReward = async (rewardId: number) => {
    if (!user) return false;
    setIsLoading(true);
    try {
      const reward = rewards.find(r => r.id === rewardId);
      if (!reward || user.coinBalance < reward.cost) throw new Error('Cannot redeem');
      await new Promise(r => setTimeout(r, 800));
      const newTx: Transaction = { id: `tx-${Date.now()}`, rewardId, rewardName: reward.name, cost: reward.cost, date: new Date(), status: 'completed' };
      setUser({ ...user, coinBalance: user.coinBalance - reward.cost, totalSpent: user.totalSpent + reward.cost });
      setTransactions([newTx, ...transactions]);
      localStorage.setItem('coinTransactions', JSON.stringify([newTx, ...transactions]));
      return true;
    } catch { return false; } 
    finally { setIsLoading(false); }
  };

  const addCoins = (amount: number) => {
    if (!user) return;
    setUser({ ...user, coinBalance: user.coinBalance + amount, totalEarned: user.totalEarned + amount });
  };

  return { user, rewards, transactions, isLoading, error, redeemReward, addCoins };
};

export default function DashboardPage() {
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const stats = [
    { title: 'Meals Contributed', value: '247', trend: '+12%', trendUp: true, icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Community Impact', value: '89', trend: '+5%', trendUp: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Waste Prevented', value: '156kg', trend: '-2%', trendUp: false, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Heritage Score', value: '920', trend: '+40', trendUp: true, icon: Star, color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  const recentActivity = [
    { title: 'Donation Claimed', desc: 'Your "Samosa Platter" was claimed by Green Valley NGO', time: '2h ago', status: 'completed' },
    { title: 'Milestone Reached', desc: 'You\'ve saved over 100kg of food waste!', time: '5h ago', status: 'achievement' },
    { title: 'New Partner', desc: 'Heritage Kitchen joined your network', time: 'Yesterday', status: 'update' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] font-outfit pt-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-2"
            >
              <Activity size={14} strokeWidth={3} />
              Real-time Impact 
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black text-slate-900 tracking-tight"
            >
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{authUser?.name || 'Explorer'}</span>.
            </motion.h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 transition-all hover:shadow-md active:scale-95">
              <Bell size={20} />
            </button>
            <button className="flex items-center gap-3 pl-2 pr-6 py-2 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black">
                {authUser?.name?.[0] || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                <p className="text-sm font-black text-slate-900 leading-none">Account</p>
              </div>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
           {['overview', 'impact', 'activity'].map((tab) => (
             <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                  : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
              }`}
             >
               {tab}
             </button>
           ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                   <motion.div
                    key={i}
                    variants={itemVariants}
                    className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm relative group overflow-hidden hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500"
                   >
                     <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <stat.icon size={28} />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.title}</p>
                     <p className="text-3xl font-black text-slate-900 mb-4">{stat.value}</p>
                     <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {stat.trend} from last week
                     </div>
                   </motion.div>
                ))}
              </div>

              {/* Main Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder Area */}
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-2 p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden relative"
                >
                   <div className="flex items-center justify-between mb-10">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-1">Impact Analytics</h3>
                        <p className="text-sm font-bold text-slate-400">Monthly distribution & activity overview</p>
                      </div>
                      <div className="flex gap-2">
                         <span className="w-3 h-3 rounded-full bg-emerald-500" />
                         <span className="w-3 h-3 rounded-full bg-indigo-500" />
                      </div>
                   </div>

                   {/* Mock Canvas / Chart Visual */}
                   <div className="h-64 flex items-end justify-between gap-4 px-2">
                      {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60, 85, 55].map((val, i) => (
                        <div key={i} className="flex-1 group relative">
                           <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${val}%` }}
                              transition={{ delay: 0.5 + (i * 0.05), duration: 1, ease: "easeOut" }}
                              className="w-full bg-slate-50 rounded-t-xl group-hover:bg-emerald-500 transition-colors relative"
                           >
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                                 {val}%
                              </div>
                           </motion.div>
                           <p className="text-[8px] font-black text-slate-300 text-center mt-3 uppercase">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</p>
                        </div>
                      ))}
                   </div>
                </motion.div>

                {/* Right Side Info */}
                <div className="space-y-8">
                   <motion.div 
                    variants={itemVariants}
                    className="p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group shadow-2xl shadow-slate-200"
                   >
                      <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                         <TrendingUp size={240} strokeWidth={1} />
                      </div>
                      <h4 className="text-xl font-black mb-2 relative z-10">Eco Savings</h4>
                      <p className="text-slate-400 text-sm font-medium mb-8 relative z-10">Collective environmental impact of your Heritage journey.</p>
                      
                      <div className="space-y-6 relative z-10">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                               <Cloud size={20} />
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">CO2 Reduced</p>
                               <p className="text-lg font-black">124.5 kg</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                               <Droplets size={20} />
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Water Preserved</p>
                               <p className="text-lg font-black">1,890 L</p>
                            </div>
                         </div>
                      </div>
                   </motion.div>

                   <motion.div 
                    variants={itemVariants}
                    className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm"
                   >
                     <div className="flex items-center justify-between mb-6">
                        <h4 className="font-black text-slate-900 tracking-tight">Active Pulse</h4>
                        <Activity size={16} className="text-emerald-500" />
                     </div>
                     <div className="space-y-5">
                        {recentActivity.map((act, i) => (
                           <div key={i} className="flex gap-4 group cursor-pointer">
                              <div className="mt-1 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-emerald-500 shrink-0 transition-colors" />
                              <div>
                                 <p className="text-[13px] font-black text-slate-900 leading-none mb-1 group-hover:text-emerald-600 transition-colors">{act.title}</p>
                                 <p className="text-[11px] font-medium text-slate-400 leading-tight">{act.desc}</p>
                                 <p className="text-[9px] font-black text-slate-300 uppercase mt-2">{act.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                   </motion.div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'impact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <motion.div variants={itemVariants} className="lg:col-span-2 p-10 bg-white rounded-[40px] border border-slate-100 min-h-[400px] flex items-center justify-center text-center">
                  <div>
                    <div className="w-20 h-20 bg-emerald-50 rounded-[24px] flex items-center justify-center text-emerald-500 mx-auto mb-6">
                       <BarChart3 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Detailed Impact Score</h3>
                    <p className="text-slate-400 font-medium max-w-sm">Deeper visual insights coming soon as we transition to our Heritage Analytics engine.</p>
                  </div>
               </motion.div>
               <motion.div variants={itemVariants} className="p-10 bg-indigo-600 rounded-[40px] text-white flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Award size={120} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-2">Heritage Champion</h3>
                    <p className="text-indigo-200 font-medium uppercase text-xs tracking-[0.2em]">Ranked #14 in your City</p>
                  </div>
                  <div className="mt-20">
                     <p className="text-5xl font-black mb-4">9.2</p>
                     <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-[92%]" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-70">Next Tier: Global Ambassador</p>
                  </div>
               </motion.div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="max-w-3xl mx-auto space-y-6">
               {[1,2,3,4,5].map((item) => (
                 <motion.div 
                  key={item} 
                  variants={itemVariants}
                  className="p-6 bg-white rounded-[24px] border border-slate-100 flex items-center justify-between group hover:shadow-lg transition-all"
                 >
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                          <Clock size={20} />
                       </div>
                       <div>
                          <p className="font-black text-slate-900 text-sm">System Update {item}</p>
                          <p className="text-xs font-medium text-slate-400">A detailed log entry for heritage tracking purposes.</p>
                       </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
                 </motion.div>
               ))}
            </div>
          )}
        </motion.div>

        {/* Footer Link */}
        <div className="mt-20 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Analytics Engine V2.0 • 2025</p>
        </div>
      </div>
    </div>
  );
}
