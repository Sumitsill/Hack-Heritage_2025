import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, User, Check, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'Cashback Recieved',
    title: 'Cashback Recieved for contribution',
    description: 'CODE XX73F4',
    time: '5 minutes ago',
    status: 'new',
    icon: MapPin
  },
  {
    id: 2,
    type: 'delivery',
    title: 'Food delivered successfully',
    description: 'Prepared meals delivered to Central Community Center',
    time: '2 hours ago',
    status: 'completed',
    icon: Check
  },
  {
    id: 3,
    type: 'urgent',
    title: 'Urgent: Food expiring soon',
    description: 'Bakery items need immediate pickup',
    time: '4 hours ago',
    status: 'urgent',
    icon: AlertCircle
  },
  {
    id: 4,
    type: 'volunteer',
    title: 'New volunteer joined',
    description: 'Sarah joined as a food collector in downtown area',
    time: '1 day ago',
    status: 'info',
    icon: User
  }
];

export default function ActivityFeed() {
  const statusColors = {
    new: 'bg-blue-100 text-blue-600',
    completed: 'bg-green-100 text-green-600',
    urgent: 'bg-red-100 text-red-600',
    info: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`p-2 rounded-lg ${statusColors[activity.status]}`}>
                <Icon size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{activity.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}