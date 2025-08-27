import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Award, Settings, Edit, Camera, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const achievements = [
    { title: 'First Contribution', description: 'Made your first food donation', date: '2 weeks ago', icon: '🎉' },
    { title: 'Helper', description: 'Helped 10 families with food', date: '1 week ago', icon: '🤝' },
    { title: 'Eco Warrior', description: 'Saved 50kg of food from waste', date: '3 days ago', icon: '🌱' }
  ];

  const contributions = [
    { title: 'Fresh Vegetables', quantity: 25, status: 'delivered', date: '2 days ago' },
    { title: 'Prepared Meals', quantity: 15, status: 'claimed', date: '1 week ago' },
    { title: 'Bakery Items', quantity: 30, status: 'delivered', date: '2 weeks ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <User size={64} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Camera size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 mb-2">
                    <MapPin size={16} />
                    <span>{user?.location}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-1">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                      {user?.role}
                    </span>
                    <div className="flex items-center space-x-1 ml-4">
                      <Star size={16} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">4.9</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats & Achievements */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <motion.div
              className="bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Impact Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Contributions</span>
                  <span className="font-bold text-emerald-600">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">People Helped</span>
                  <span className="font-bold text-blue-600">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Food Saved (kg)</span>
                  <span className="font-bold text-orange-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Community Rating</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={`${star <= 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              className="bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{achievement.title}</h3>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Activity */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Contributions</h2>
              
              <div className="space-y-4">
                {contributions.map((contribution, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{contribution.title}</h3>
                      <p className="text-sm text-gray-600">{contribution.quantity} portions</p>
                      <p className="text-xs text-gray-500">{contribution.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contribution.status === 'delivered' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {contribution.status}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <motion.button
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={16} className="mr-2" />
                  Add New Contribution
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}