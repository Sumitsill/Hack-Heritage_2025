import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';

export default function MapFilters() {
  const { filters, updateFilters } = useAppStore();

  const categories = [
    { value: 'prepared', label: 'Prepared Meals', emoji: '🍽️' },
    { value: 'raw', label: 'Raw Ingredients', emoji: '🥕' },
    { value: 'packaged', label: 'Packaged Food', emoji: '📦' }
  ];

  const timeRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  return (
    <motion.div
      className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      {/* Category Filter */}
      <div>
        <h3 className="font-medium text-gray-900 mb-2">Food Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category.includes(category.value)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.category, category.value]
                    : filters.category.filter(c => c !== category.value);
                  updateFilters({ category: newCategories });
                }}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm">{category.emoji}</span>
              <span className="text-sm text-gray-700">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-2">Time Range</h3>
        <select
          value={filters.timeRange}
          onChange={(e) => updateFilters({ timeRange: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Search Radius */}
      <div>
        <h3 className="font-medium text-gray-900 mb-2">Search Radius</h3>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="1"
            max="25"
            value={useAppStore.getState().searchRadius}
            onChange={(e) => useAppStore.getState().setSearchRadius(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 w-12">
            {useAppStore.getState().searchRadius} km
          </span>
        </div>
      </div>
    </motion.div>
  );
}