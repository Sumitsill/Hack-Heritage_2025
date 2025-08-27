// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { BarChart3, TrendingUp, Users, MapPin, Calendar, Award, Bell } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import StatCard from '../components/StatCard';
// import ActivityFeed from '../components/ActivityFeed';
// import ImpactChart from '../components/ImpactChart';

// export default function DashboardPage() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('overview');

//   const stats = [
//     {
//       title: 'Meals Contributed',
//       value: '247',
//       change: '+23%',
//       icon: BarChart3,
//       color: 'emerald'
//     },
//     {
//       title: 'People Helped',
//       value: '89',
//       change: '+15%',
//       icon: Users,
//       color: 'blue'
//     },
//     {
//       title: 'Locations Served',
//       value: '12',
//       change: '+8%',
//       icon: MapPin,
//       color: 'orange'
//     },
//     {
//       title: 'Impact Score',
//       value: '8.9',
//       change: '+0.5',
//       icon: Award,
//       color: 'purple'
//     }
//   ];

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: BarChart3 },
//     { id: 'activity', label: 'Activity', icon: Bell },
//     { id: 'impact', label: 'Impact', icon: TrendingUp }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <motion.div 
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome back, {user?.name}!
//           </h1>
//           <p className="text-gray-600">
//             Here's your impact summary and recent activity
//           </p>
//         </motion.div>

//         {/* Tabs */}
//         <div className="mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex space-x-8">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
//                       activeTab === tab.id
//                         ? 'border-emerald-500 text-emerald-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     <Icon size={16} />
//                     <span>{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>

//         {/* Content */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {activeTab === 'overview' && (
//             <>
//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 {stats.map((stat, index) => (
//                   <StatCard key={index} {...stat} />
//                 ))}
//               </div>

//               {/* Charts */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <ImpactChart />
//                 <div className="bg-white rounded-xl shadow-sm p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Recent Contributions
//                   </h3>
//                   <div className="space-y-4">
//                     {[
//                       { title: 'Fresh Vegetables', date: '2 hours ago', status: 'delivered' },
//                       { title: 'Prepared Meals', date: '1 day ago', status: 'claimed' },
//                       { title: 'Bakery Items', date: '2 days ago', status: 'delivered' }
//                     ].map((item, index) => (
//                       <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <div>
//                           <p className="font-medium text-gray-900">{item.title}</p>
//                           <p className="text-sm text-gray-500">{item.date}</p>
//                         </div>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           item.status === 'delivered' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {item.status}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {activeTab === 'activity' && <ActivityFeed />}
          
//           {activeTab === 'impact' && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <ImpactChart />
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Environmental Impact
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">CO₂ Saved</p>
//                       <p className="text-sm text-gray-600">This month</p>
//                     </div>
//                     <span className="text-2xl font-bold text-green-600">124 kg</span>
//                   </div>
//                   <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Water Saved</p>
//                       <p className="text-sm text-gray-600">This month</p>
//                     </div>
//                     <span className="text-2xl font-bold text-blue-600">1,890 L</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from 'react';
// import { Reward, Transaction, User } from '../types';

// // Custom hook to manage the coin redemption system
// // This centralizes all the coin-related logic and state management
// export const useCoinSystem = () => {
//   // State for storing user information
//   const [user, setUser] = useState<User>({
//     id: 'user-001',
//     name: 'John Doe',
//     coinBalance: 1500, // Starting with 1500 coins for demo
//     totalEarned: 2000,
//     totalSpent: 500,
//   });

//   // State for storing all available rewards
//   const [rewards, setRewards] = useState<Reward[]>([]);
  
//   // State for storing transaction history
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
  
//   // State for loading indicators
//   const [isLoading, setIsLoading] = useState(false);
  
//   // State for error messages
//   const [error, setError] = useState<string | null>(null);

//   // Initialize rewards data when component mounts
//   useEffect(() => {
//     initializeRewards();
//     loadTransactionHistory();
//   }, []);

//   // Function to set up initial rewards catalog
//   const initializeRewards = () => {
//     // Sample rewards data - in a real app, this would come from an API
//     const initialRewards: Reward[] = [
//       {
//         id: 1,
//         name: "Premium Theme Pack",
//         description: "Unlock 10 exclusive themes for your profile",
//         cost: 500,
//         image: "https://images.pexels.com/photos/1036846/pexels-photo-1036846.jpeg?auto=compress&cs=tinysrgb&w=300",
//         category: "digital",
//         available: true
//       },
//       {
//         id: 2,
//         name: "Coffee Shop Voucher",
//         description: "$10 voucher for your favorite coffee shop",
//         cost: 800,
//         image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300",
//         category: "physical",
//         available: true
//       },
//       {
//         id: 3,
//         name: "Ad-Free Experience",
//         description: "Remove ads for 30 days",
//         cost: 300,
//         image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300",
//         category: "digital",
//         available: true
//       },
//       {
//         id: 4,
//         name: "Exclusive Badge",
//         description: "Limited edition golden badge for your profile",
//         cost: 1200,
//         image: "https://images.pexels.com/photos/1068883/pexels-photo-1068883.jpeg?auto=compress&cs=tinysrgb&w=300",
//         category: "digital",
//         available: true
//       },
//       {
//         id: 5,
//         name: "Gift Card Bundle",
//         description: "Collection of $5 gift cards for popular stores",
//         cost: 2000,
//         image: "https://images.pexels.com/photos/264573/pexels-photo-264573.jpeg?auto=compress&cs=tinysrgb&w=300",
//         category: "physical",
//         available: false // This one is out of stock
//       }
//     ];

//     // Set the rewards in state
//     setRewards(initialRewards);
//   };

//   // Function to load transaction history from localStorage
//   const loadTransactionHistory = () => {
//     try {
//       // Try to get saved transactions from browser storage
//       const savedTransactions = localStorage.getItem('coinTransactions');
//       if (savedTransactions) {
//         // Parse the JSON string and convert date strings back to Date objects
//         const parsedTransactions = JSON.parse(savedTransactions).map((t: any) => ({
//           ...t,
//           date: new Date(t.date) // Convert string back to Date object
//         }));
//         setTransactions(parsedTransactions);
//       }
//     } catch (error) {
//       // If there's an error loading transactions, log it but don't crash
//       console.error('Error loading transaction history:', error);
//     }
//   };

//   // Function to save transaction history to localStorage
//   const saveTransactionHistory = (newTransactions: Transaction[]) => {
//     try {
//       // Save transactions to browser storage for persistence
//       localStorage.setItem('coinTransactions', JSON.stringify(newTransactions));
//     } catch (error) {
//       // Log error if saving fails
//       console.error('Error saving transaction history:', error);
//     }
//   };

//   // Function to redeem a reward
//   const redeemReward = async (rewardId: number): Promise<boolean> => {
//     // Set loading state to show user something is happening
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Find the reward being redeemed
//       const reward = rewards.find(r => r.id === rewardId);
      
//       // Check if reward exists
//       if (!reward) {
//         throw new Error('Reward not found');
//       }

//       // Check if reward is available
//       if (!reward.available) {
//         throw new Error('This reward is currently unavailable');
//       }

//       // Check if user has enough coins
//       if (user.coinBalance < reward.cost) {
//         throw new Error('Insufficient coins for this redemption');
//       }

//       // Simulate API call delay (remove this in production)
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Create new transaction record
//       const newTransaction: Transaction = {
//         id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
//         rewardId: reward.id,
//         rewardName: reward.name,
//         cost: reward.cost,
//         date: new Date(),
//         status: 'completed'
//       };

//       // Update user's coin balance
//       const updatedUser: User = {
//         ...user,
//         coinBalance: user.coinBalance - reward.cost, // Subtract cost from balance
//         totalSpent: user.totalSpent + reward.cost    // Add to total spent
//       };

//       // Update transaction history
//       const updatedTransactions = [newTransaction, ...transactions];

//       // Update all state at once
//       setUser(updatedUser);
//       setTransactions(updatedTransactions);
      
//       // Save transactions to localStorage for persistence
//       saveTransactionHistory(updatedTransactions);

//       // Return success
//       return true;

//     } catch (err) {
//       // Handle any errors that occurred during redemption
//       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
//       setError(errorMessage);
//       return false;
//     } finally {
//       // Always turn off loading state when done
//       setIsLoading(false);
//     }
//   };

//   // Function to add coins (for testing or admin purposes)
//   const addCoins = (amount: number) => {
//     // Update user's coin balance and total earned
//     setUser(prevUser => ({
//       ...prevUser,
//       coinBalance: prevUser.coinBalance + amount,
//       totalEarned: prevUser.totalEarned + amount
//     }));
//   };

//   // Return all the state and functions that components can use
//   return {
//     user,           // Current user data
//     rewards,        // Available rewards
//     transactions,   // Transaction history
//     isLoading,      // Loading state
//     error,          // Error messages
//     redeemReward,   // Function to redeem rewards
//     addCoins,       // Function to add coins (for demo)
//     setError        // Function to clear errors
//   };
// };


// export default useCoinSystem;

import { useState, useEffect } from 'react';
import { Reward, Transaction, User } from '../types';
import { useAuth } from '../contexts/AuthContext'; // ✅ import auth

export const useCoinSystem = () => {
  const { user: authUser } = useAuth(); // ✅ get authenticated user
  const [user, setUser] = useState<User | null>(null);

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authUser) {
      // ✅ Use authenticated user’s name instead of "John Doe"
      setUser({
        id: authUser.phone, // using phone as unique ID
        name: authUser.name || authUser.phone, // fallback if no name
        coinBalance: 1500,
        totalEarned: 2000,
        totalSpent: 500,
      });
    }

    initializeRewards();
    loadTransactionHistory();
  }, [authUser]); // re-run whenever user logs in/out

  const initializeRewards = () => {
    const initialRewards: Reward[] = [
      {
        id: 1,
        name: "Premium Theme Pack",
        description: "Unlock 10 exclusive themes for your profile",
        cost: 500,
        image: "https://winaero.com/blog/wp-content/uploads/2020/06/Night-Skies-themepack.png",
        category: "digital",
        available: true
      },
      {
        id: 2,
        name: "Coffee Shop Voucher",
        description: "$10 voucher for your favorite coffee shop",
        cost: 800,
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "physical",
        available: true
      },
      {
        id: 3,
        name: "Ad-Free Experience",
        description: "Remove ads for 30 days",
        cost: 300,
        image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "digital",
        available: true
      },
      {
        id: 4,
        name: "Exclusive Badge",
        description: "Limited edition golden badge for your profile",
        cost: 1200,
        image: "https://images.pexels.com/photos/1068883/pexels-photo-1068883.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "digital",
        available: true
      },
      {
        id: 5,
        name: "Gift Card Bundle",
        description: "Collection of $5 gift cards for popular stores",
        cost: 2000,
        image: "https://images.pexels.com/photos/264573/pexels-photo-264573.jpeg?auto=compress&cs=tinysrgb&w=300",
        category: "physical",
        available: false
      }
    ];
    setRewards(initialRewards);
  };

  const loadTransactionHistory = () => {
    try {
      const savedTransactions = localStorage.getItem('coinTransactions');
      if (savedTransactions) {
        const parsedTransactions = JSON.parse(savedTransactions).map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
        setTransactions(parsedTransactions);
      }
    } catch (error) {
      console.error('Error loading transaction history:', error);
    }
  };

  const saveTransactionHistory = (newTransactions: Transaction[]) => {
    try {
      localStorage.setItem('coinTransactions', JSON.stringify(newTransactions));
    } catch (error) {
      console.error('Error saving transaction history:', error);
    }
  };

  const redeemReward = async (rewardId: number): Promise<boolean> => {
    if (!user) return false;

    setIsLoading(true);
    setError(null);

    try {
      const reward = rewards.find(r => r.id === rewardId);
      if (!reward) throw new Error('Reward not found');
      if (!reward.available) throw new Error('This reward is currently unavailable');
      if (user.coinBalance < reward.cost) throw new Error('Insufficient coins for this redemption');

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newTransaction: Transaction = {
        id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        rewardId: reward.id,
        rewardName: reward.name,
        cost: reward.cost,
        date: new Date(),
        status: 'completed'
      };

      const updatedUser: User = {
        ...user,
        coinBalance: user.coinBalance - reward.cost,
        totalSpent: user.totalSpent + reward.cost
      };

      const updatedTransactions = [newTransaction, ...transactions];

      setUser(updatedUser);
      setTransactions(updatedTransactions);
      saveTransactionHistory(updatedTransactions);

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const addCoins = (amount: number) => {
    if (!user) return;
    setUser(prevUser => prevUser ? {
      ...prevUser,
      coinBalance: prevUser.coinBalance + amount,
      totalEarned: prevUser.totalEarned + amount
    } : null);
  };

  return {
    user,
    rewards,
    transactions,
    isLoading,
    error,
    redeemReward,
    addCoins,
    setError
  };
};

export default useCoinSystem;
