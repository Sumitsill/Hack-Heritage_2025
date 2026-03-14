import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Coins, 
  Gift, 
  History, 
  ArrowUpCircle, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Star,
  ShoppingBag,
  ArrowRight,
  Info
} from "lucide-react";
import useCoinSystem from "./DashboardPage";

export default function CoinSystemPage() {
  const { user, rewards, redeemReward, addCoins, isLoading, error } = useCoinSystem();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FBFBFE] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white"
        >
          <Coins size={32} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFE] font-outfit pt-10 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Wallet Header */}
        <div className="bg-slate-900 rounded-[40px] p-8 md:p-14 mb-16 relative overflow-hidden shadow-2xl shadow-slate-200 group">
          <div className="absolute -right-20 -top-20 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
             <Coins size={400} />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6"
              >
                <Zap size={12} fill="currentColor" />
                Heritage Currency
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white text-5xl font-black tracking-tight mb-2"
              >
                Hello, <span className="text-emerald-400">{user.name.split(' ')[0]}</span>.
              </motion.h1>
              <p className="text-slate-400 font-medium">Earn coins by contributing and redeem them for exclusive rewards.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-8 border border-white/10 min-w-[280px]">
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Current Balance</p>
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                     <Coins size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-4xl font-black text-white">{user.coinBalance}</span>
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mt-1">Heritage Coins</p>
                  </div>
               </div>
               <button 
                onClick={() => addCoins(500)}
                className="w-full mt-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
               >
                 Test: Add 500 Coins
               </button>
            </div>
          </div>
        </div>

        {/* Categories / Info Chips */}
        <div className="flex flex-wrap gap-4 mb-12">
           {['All Rewards', 'Exclusive', 'Digital', 'Vouchers', 'Early Access'].map((cat, i) => (
             <button key={i} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}>
               {cat}
             </button>
           ))}
        </div>

        {/* Error Handling */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 font-bold"
          >
            <Info size={18} />
            {error}
          </motion.div>
        )}

        {/* Rewards Section */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <Gift size={24} className="text-amber-500" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Available Rewards</h2>
           </div>
           <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">View History</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward) => (
            <motion.div 
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500"
            >
              <div className="h-52 relative overflow-hidden">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                   <Coins size={14} className="text-amber-500" />
                   <span className="font-black text-slate-900 text-sm">{reward.cost}</span>
                </div>
                {!reward.available && (
                   <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest text-slate-900">Sold Out</span>
                   </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{reward.category}</p>
                   {reward.cost > 1000 ? <Star size={14} className="text-amber-400 fill-current" /> : <ShoppingBag size={14} className="text-slate-300" />}
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-2 leading-tight group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{reward.name}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{reward.description}</p>
                
                <button
                  disabled={!reward.available || isLoading || user.coinBalance < reward.cost}
                  onClick={() => redeemReward(reward.id)}
                  className={`w-full py-5 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${
                    reward.available && user.coinBalance >= reward.cost
                      ? "bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200"
                      : "bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100"
                  }`}
                >
                  {isLoading ? "Processing..." : reward.available ? "Redeem Reward" : "Currently Unavailable"}
                  {reward.available && user.coinBalance >= reward.cost && <ArrowRight size={16} />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Earn More Section */}
        <div className="mt-20 p-10 bg-emerald-50 rounded-[40px] border border-emerald-100 flex flex-col md:flex-row items-center gap-10">
           <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10 shrink-0">
              <History size={40} />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-emerald-900 mb-2">Earn More Heritage Coins</h3>
              <p className="text-emerald-700/70 font-medium">Contribute your surplus food, help families, and participate in community heritage events to grow your balance.</p>
           </div>
           <button 
            onClick={() => window.location.href = '/contribute'}
            className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
           >
             Share Food Now
           </button>
        </div>

        {/* Footer Detail */}
        <div className="mt-16 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Heritage Rewards V1.4 • Secure Transaction Protocol</p>
        </div>
      </div>
    </div>
  );
}
