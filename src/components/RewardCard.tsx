import React from 'react';
import { Reward } from '../types';
import { ShoppingBag, Lock, Star } from 'lucide-react';

// Props interface for the RewardCard component
interface RewardCardProps {
  reward: Reward;                           // The reward data to display
  userBalance: number;                      // User's current coin balance
  onRedeem: (rewardId: number) => void;     // Function called when redeem button is clicked
  isLoading: boolean;                       // Whether a redemption is in progress
}

// Component to display individual reward cards
const RewardCard: React.FC<RewardCardProps> = ({ 
  reward, 
  userBalance, 
  onRedeem, 
  isLoading 
}) => {
  // Check if user has enough coins to redeem this reward
  const canAfford = userBalance >= reward.cost;
  
  // Check if reward is available and user can afford it
  const canRedeem = reward.available && canAfford && !isLoading;

  // Handle redeem button click
  const handleRedeem = () => {
    // Only proceed if redemption is allowed
    if (canRedeem) {
      onRedeem(reward.id); // Call the redemption function with reward ID
    }
  };

  return (
    // Main card container with hover effects and conditional styling
    <div className={`
      bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden
      ${!reward.available ? 'opacity-60' : ''} // Dim unavailable rewards
      ${canAfford ? 'hover:scale-105' : ''} // Slight scale on hover if affordable
    `}>
      {/* Reward image section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={reward.image} 
          alt={reward.name}
          className="w-full h-full object-cover" // Make image fill container
        />
        
        {/* Overlay badges */}
        <div className="absolute top-2 left-2">
          {/* Category badge */}
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${reward.category === 'digital' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
            }
          `}>
            {reward.category} {/* Show category type */}
          </span>
        </div>

        {/* Unavailable overlay */}
        {!reward.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <Lock className="w-8 h-8 mx-auto mb-2" /> {/* Lock icon */}
              <span className="text-sm font-medium">Unavailable</span>
            </div>
          </div>
        )}
      </div>

      {/* Card content section */}
      <div className="p-4">
        {/* Reward name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {reward.name}
        </h3>
        
        {/* Reward description */}
        <p className="text-gray-600 text-sm mb-4">
          {reward.description}
        </p>

        {/* Cost and redeem section */}
        <div className="flex items-center justify-between">
          {/* Cost display */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" /> {/* Star icon for cost */}
            <span className={`font-bold ${canAfford ? 'text-gray-900' : 'text-red-500'}`}>
              {reward.cost.toLocaleString()} coins
            </span>
          </div>

          {/* Redeem button */}
          <button
            onClick={handleRedeem}
            disabled={!canRedeem} // Disable if can't redeem
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
              ${canRedeem 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <ShoppingBag className="w-4 h-4" /> {/* Shopping bag icon */}
            {/* Button text based on state */}
            {isLoading 
              ? 'Redeeming...' 
              : !reward.available 
                ? 'Unavailable' 
                : !canAfford 
                  ? 'Not enough coins' 
                  : 'Redeem'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;