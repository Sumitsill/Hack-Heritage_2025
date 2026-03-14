import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Brain,
  Users,
  Utensils,
  Baby,
  Zap,
  Globe,
  ChevronRight,
  Activity,
  Coins
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import VoiceAssistant from "../components/voice assistance";

export default function HomePage() {
  const { t } = useLanguage();

  const stats = [
    { value: "10M+", label: t("stats.food_saved"), icon: Utensils, color: "text-emerald-500" },
    { value: "50K+", label: t("stats.users"), icon: Users, color: "text-blue-500" },
    { value: "500+", label: t("stats.locations"), icon: MapPin, color: "text-rose-500" },
  ];

  const features = [
    {
      icon: MapPin,
      title: t("features.map.title"),
      description: t("features.map.desc"),
      gradient: "from-emerald-400 to-teal-600",
      link: "/map"
    },
    {
      icon: Brain,
      title: t("features.ai.title"),
      description: t("features.ai.desc"),
      gradient: "from-blue-400 to-indigo-600",
      link: "/dashboard"
    },
    {
      icon: Users,
      title: t("features.community.title"),
      description: t("features.community.desc"),
      gradient: "from-amber-400 to-orange-600",
      link: "/contribute"
    },
  ];

  const services = [
    {
      title: "Hungerr Rewards",
      desc: "Earn ecosystem tokens for your contributions and redeem them for premium rewards.",
      icon: Coins,
      color: "bg-amber-500",
      link: "/useCoin"
    },
    {
      title: "RTE Empowerment",
      desc: "Bridging the gap for vulnerable children by facilitating direct school enrollments under the RTE Act.",
      icon: Baby,
      color: "bg-rose-500",
      link: "/rte"
    },
    {
      title: "Climate Repository",
      desc: "Deep-dive into ancestral wisdom and modern climate data to build a sustainable future.",
      icon: Globe,
      color: "bg-blue-600",
      link: "/climate"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white font-outfit overflow-x-hidden">
      <VoiceAssistant />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] bg-[url('https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg')] bg-cover bg-fixed opacity-[0.03] scale-110 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2 -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2 -z-10" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              <Zap size={14} fill="currentColor" />
              Revolutionizing Food Security
            </motion.div>
            
            <motion.h1
              className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Hungerr</span>, Feed our <span className="relative inline-block">Future.<div className="absolute bottom-4 left-0 w-full h-3 bg-emerald-100 -z-10"></div></span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/contribute"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-[24px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-3">
                  {t("hero.cta")}
                  <ArrowRight size={20} />
                </span>
              </Link>

              <Link
                to="/map"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 font-black text-sm uppercase tracking-widest rounded-[24px] border-2 border-slate-100 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-xl shadow-slate-100/50"
              >
                Explore Food Map
                <MapPin size={20} className="ml-3" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300"
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-200 flex justify-center pt-2">
            <div className="w-1 h-2 bg-slate-300 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-50 rounded-[32px] mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
                  <stat.icon size={40} />
                </div>
                <h3 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">{stat.value}</h3>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse Features */}
      <section className="py-32 bg-[#FBFBFE] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
         
         <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
              <div className="max-w-xl">
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                   Built for the <br /> <span className="text-emerald-600">Ancestral Pulse.</span>
                 </h2>
                 <p className="text-lg font-medium text-slate-500">
                   We've engineered a platform that captures the essence of community sharing and scales it through modern intelligence.
                 </p>
              </div>
              <div className="flex gap-4">
                 <div className="h-px w-20 bg-slate-200 mb-6 self-start" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <Link key={i} to={feature.link}>
                  <motion.div
                    className="h-full bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group hover:translate-y-[-8px] relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
                    
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-8 shadow-lg shadow-slate-200 group-hover:rotate-12 transition-transform`}>
                      <feature.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed mb-8">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                       Learn More <ChevronRight size={14} strokeWidth={3} />
                    </div>
                  </motion.div>
                </Link>
              ))}
           </div>
         </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
               <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6 uppercase">The Full Spectrum</h2>
               <p className="text-slate-400 font-medium tracking-wide font-outfit uppercase text-[10px] tracking-[0.4em]">Our Core Impact Framework</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {services.map((service, i) => (
                 <Link key={i} to={service.link}>
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 rounded-[48px] border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all group border-transparent hover:border-slate-100 text-center flex flex-col items-center"
                   >
                     <div className={`w-20 h-20 ${service.color} rounded-[32px] flex items-center justify-center text-white mb-8 shadow-xl shadow-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                        <service.icon size={36} />
                     </div>
                     <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{service.title}</h4>
                     <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{service.desc}</p>
                     <div className="mt-auto w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                        <ArrowRight size={20} />
                     </div>
                   </motion.div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* Call to Action Bar */}
      <section className="container mx-auto px-6 py-20">
         <div className="relative p-10 md:p-20 bg-slate-900 rounded-[64px] overflow-hidden group shadow-2xl shadow-slate-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-teal-500/10 pointer-events-none" />
            <div className="absolute top-0 right-0 p-20 text-white opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-[3000ms]">
               <Activity size={400} />
            </div>

            <div className="max-w-3xl relative z-10 text-center md:text-left">
               <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8">Ready to Impact?</span>
               <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-10">
                  {t("contribute.title")}
               </h2>
               <div className="flex flex-col sm:flex-row gap-6">
                 <Link
                    to="/contribute"
                    className="px-10 py-5 bg-emerald-500 text-slate-900 font-black text-xs uppercase tracking-[0.2em] rounded-[24px] hover:bg-white transition-all active:scale-95 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3"
                 >
                    Get Started <ArrowRight size={20} strokeWidth={3} />
                 </Link>
                 <Link
                    to="/map"
                    className="px-10 py-5 bg-transparent text-white border-2 border-white/20 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-center"
                 >
                    Join the Collective
                 </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-slate-50">
         <div className="container mx-auto px-6 flex flex-col items-center gap-10">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl shadow-slate-200">
                  <Globe size={24} />
               </div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-0 leading-none">Hungerr</h2>
            </div>
            <div className="flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <Link to="/map" className="hover:text-emerald-600 transition-colors">Food Map</Link>
               <Link to="/contribute" className="hover:text-emerald-600 transition-colors">Contribute</Link>
               <Link to="/useCoin" className="hover:text-emerald-600 transition-colors">Rewards</Link>
               <Link to="/rte" className="hover:text-emerald-600 transition-colors">Education</Link>
            </div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.6em] mt-10">Engineered for Global Impact • Hungerr Collective 2025</p>
         </div>
      </footer>
    </div>
  );
}
