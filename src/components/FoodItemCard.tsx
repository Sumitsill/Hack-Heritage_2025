import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, Utensils, Box, Zap } from 'lucide-react';
import { format } from 'date-fns';

interface FoodItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  contributor: string;
  expiryDate: string;
  category: 'prepared' | 'raw' | 'packaged';
  status: 'available' | 'claimed' | 'collected';
  imageUrl?: string;
}

interface FoodItemCardProps {
  item: FoodItem;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function FoodItemCard({ item, isSelected, onClick }: FoodItemCardProps) {
  const statusConfig = {
    available: { color: 'text-emerald-600 bg-emerald-50', icon: Zap },
    claimed: { color: 'text-amber-600 bg-amber-50', icon: Clock },
    collected: { color: 'text-slate-600 bg-slate-50', icon: Box }
  };

  const categoryIcons = {
    prepared: Utensils,
    raw: Zap, // Using Zap for 'raw' as a placeholder or consistent icon
    packaged: Box
  };

  const Icon = categoryIcons[item.category] || Utensils;
  const StatusIcon = statusConfig[item.status].icon;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border-2 ${
        isSelected 
          ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' 
          : 'border-transparent hover:border-emerald-100 hover:shadow-2xl hover:shadow-gray-200/50'
      }`}
    >
      {item.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md bg-white/90 ${statusConfig[item.status].color}`}>
              <StatusIcon size={12} />
              {item.status}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
           <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-emerald-600">
             <Icon size={16} />
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed font-medium">
          {item.description}
        </p>

        <div className="grid grid-cols-1 gap-2.5">
          <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
            <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center">
              <MapPin size={12} />
            </div>
            <span className="text-[11px] font-bold truncate">{item.location.address}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
            <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center">
              <User size={12} />
            </div>
            <span className="text-[11px] font-bold">{item.contributor}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
            <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-amber-500">
              <Clock size={12} />
            </div>
            <span className="text-[11px] font-bold">Expires: {format(new Date(item.expiryDate), 'MMM dd')}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Quantity</span>
            <span className="text-sm font-black text-emerald-900">{item.quantity} Portions</span>
          </div>
          
          {item.status === 'available' && (
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-2"
            >
              Claim Item
              <Zap size={14} className="fill-white" />
            </motion.button>
          )}
        </div>
      </div>

      {isSelected && (
        <motion.div
           layoutId="active-indicator"
           className="absolute top-0 right-0 w-12 h-12 bg-emerald-500 flex items-center justify-center rounded-bl-[24px]"
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
        >
          <Zap size={20} className="text-white fill-white" />
        </motion.div>
      )}
    </motion.div>
  );
}