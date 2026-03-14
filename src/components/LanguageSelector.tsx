import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', label: 'Western standard' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', label: 'Ancient Script' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩', label: 'Regional Tongue' }
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="relative font-outfit">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-[18px] transition-all border ${
          isOpen ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] ${isOpen ? 'bg-white/10' : 'bg-slate-50'}`}>
           <Globe size={14} className={isOpen ? 'text-emerald-400' : 'text-slate-400'} />
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest hidden sm:inline-block">
          {currentLanguage?.name}
        </span>
        <ChevronDown size={14} className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-4 w-60 bg-white rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden z-[110] p-2"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          >
            <div className="p-4 mb-2">
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Select Linguist</p>
            </div>
            <div className="space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-[20px] transition-all group ${
                    language === lang.code 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{lang.flag}</span>
                    <div className="flex flex-col items-start">
                       <span className="text-xs font-black uppercase tracking-tight leading-none mb-1">{lang.name}</span>
                       <span className="text-[9px] font-medium text-slate-400 opacity-60 uppercase tracking-widest leading-none">{lang.label}</span>
                    </div>
                  </div>
                  {language === lang.code && <Check size={16} strokeWidth={4} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}