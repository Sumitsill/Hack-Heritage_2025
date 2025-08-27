import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, Utensils } from 'lucide-react';
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
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    claimed: 'bg-yellow-100 text-yellow-800',
    collected: 'bg-gray-100 text-gray-800'
  };

  const categoryIcons = {
    prepared: Utensils,
    raw: '🥕',
    packaged: '📦'
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected ? 'ring-2 ring-emerald-500' : ''
      }`}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {item.imageUrl && (
        <div className="h-32 bg-gray-200 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {item.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
            {item.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin size={12} />
            <span>{item.location.address}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <User size={12} />
            <span>{item.contributor}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>Expires: {format(new Date(item.expiryDate), 'MMM dd, yyyy')}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-emerald-600">
            <span className="text-lg">{typeof categoryIcons[item.category] === 'string' ? categoryIcons[item.category] : '🍽️'}</span>
            <span className="text-sm font-medium">{item.quantity} portions</span>
          </div>
          
          {item.status === 'available' && (
            <motion.button
              className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Claim
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}