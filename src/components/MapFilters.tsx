import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';
import { Utensils, Box, Zap, Calendar, Map as MapIcon } from 'lucide-react';

export default function MapFilters() {
  const { filters, updateFilters, searchRadius, setSearchRadius } = useAppStore();

  const categories = [
    { value: 'prepared', label: 'Meals', icon: Utensils, color: 'emerald' },
    { value: 'raw', label: 'Ingredients', icon: Zap, color: 'amber' },
    { value: 'packaged', label: 'Packaged', icon: Box, color: 'blue' }
  ];

  const timeRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ];

  return (
    <motion.div
      className="bg-gray-50/50 rounded-3xl p-6 mb-2 space-y-6 border border-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Category Filter */}
      <div>
        <div className="flex items-center gap-2 mb-4">
           <Zap size={16} className="text-emerald-500" />
           <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest">Categories</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = filters.category.includes(category.value);
            const Icon = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => {
                  const newCategories = isActive
                    ? filters.category.filter(c => c !== category.value)
                    : [...filters.category, category.value];
                  updateFilters({ category: newCategories });
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
                  isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <Icon size={14} />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Time Range */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
             <Calendar size={16} className="text-blue-500" />
             <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest">Timeline</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => updateFilters({ timeRange: range.value })}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold text-left transition-all ${
                  filters.timeRange === range.value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Radius */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
             <MapIcon size={16} className="text-amber-500" />
             <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest">Radius</h3>
          </div>
          <div className="flex flex-col items-center gap-3">
             <span className="text-2xl font-black text-emerald-900">{searchRadius}<span className="text-[10px] text-gray-400 ml-1">KM</span></span>
             <input
                type="range"
                min="1"
                max="50"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
}