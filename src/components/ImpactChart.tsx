import React from 'react';
import { motion } from 'framer-motion';

export default function ImpactChart() {
  const data = [
    { month: 'Jan', meals: 45 },
    { month: 'Feb', meals: 67 },
    { month: 'Mar', meals: 89 },
    { month: 'Apr', meals: 123 },
    { month: 'May', meals: 156 },
    { month: 'Jun', meals: 234 }
  ];

  const maxMeals = Math.max(...data.map(d => d.meals));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Impact</h3>
      
      <div className="flex items-end space-x-4 h-64">
        {data.map((item, index) => (
          <div key={item.month} className="flex-1 flex flex-col items-center">
            <motion.div
              className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg"
              style={{ height: `${(item.meals / maxMeals) * 200}px` }}
              initial={{ height: 0 }}
              animate={{ height: `${(item.meals / maxMeals) * 200}px` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-gray-900">{item.meals}</p>
              <p className="text-xs text-gray-500">{item.month}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}