import React from 'react';
import { Coins, TrendingUp, TrendingDown } from 'lucide-react';
import { User } from '../types';

// Props interface for the CoinBalance component
interface CoinBalanceProps {
  user: User;          // User data containing coin information
  onAddCoins: () => void; // Function to add coins (for demo purposes)
}

// Component to display user's coin balance and statistics
const CoinBalance: React.FC<CoinBalanceProps> = ({ user, onAddCoins }) => {
  return (
    // Main container with gradient background and shadow
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
      {/* Header section with title and add coins button */}
      <div className="flex justify-between items-center mb-4">
        {/* Title with coin icon */}
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6" /> {/* Lucide coin icon */}
          <h2 className="text-xl font-bold">My Coins</h2>
        </div>
        
        {/* Add coins button for demo purposes */}
        <button
          onClick={onAddCoins} // Call the add coins function when clicked
          className="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-lg text-sm font-medium"
        >
          + Add Coins
        </button>
      </div>

      {/* Main balance display */}
      <div className="text-3xl font-bold mb-4">
        {user.coinBalance.toLocaleString()} {/* Format number with commas */}
        <span className="text-lg font-normal ml-2 opacity-90">coins</span>
      </div>

      {/* Statistics row showing earned and spent */}
      <div className="flex gap-4 text-sm">
        {/* Total earned section */}
        <div className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-2">
          <TrendingUp className="w-4 h-4 text-green-200" /> {/* Up arrow for earned */}
          <span>Earned: {user.totalEarned.toLocaleString()}</span>
        </div>
        
        {/* Total spent section */}
        <div className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-2">
          <TrendingDown className="w-4 h-4 text-red-200" /> {/* Down arrow for spent */}
          <span>Spent: {user.totalSpent.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CoinBalance;