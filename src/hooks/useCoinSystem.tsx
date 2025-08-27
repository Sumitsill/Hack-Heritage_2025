import { useState, useEffect } from 'react';
import { Reward, Transaction, User } from '../types';

// Custom hook to manage the coin redemption system
// This centralizes all the coin-related logic and state management
export const useCoinSystem = () => {
  // State for storing user information
  const [user, setUser] = useState<User>({
    id: 'user-001',
    name: 'John Doe',
    coinBalance: 1500, // Starting with 1500 coins for demo
    totalEarned: 2000,
    totalSpent: 500,
  });

  // State for storing all available rewards
  const [rewards, setRewards] = useState<Reward[]>([]);
  
  // State for storing transaction history
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // Initialize rewards data when component mounts
  useEffect(() => {
    initializeRewards();
    loadTransactionHistory();
  }, []);

  // Function to set up initial rewards catalog
  const initializeRewards = () => {
    // Sample rewards data - in a real app, this would come from an API
    const initialRewards: Reward[] = [
      {
        id: 1,
        name: "Premium Theme Pack",
        description: "Unlock 10 exclusive themes for your profile",
        cost: 500,
        image: "https://images.pexels.com/photos/1036846/pexels-photo-1036846.jpeg?auto=compress&cs=tinysrgb&w=300",
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
        available: false // This one is out of stock
      }
    ];

    // Set the rewards in state
    setRewards(initialRewards);
  };

  // Function to load transaction history from localStorage
  const loadTransactionHistory = () => {
    try {
      // Try to get saved transactions from browser storage
      const savedTransactions = localStorage.getItem('coinTransactions');
      if (savedTransactions) {
        // Parse the JSON string and convert date strings back to Date objects
        const parsedTransactions = JSON.parse(savedTransactions).map((t: any) => ({
          ...t,
          date: new Date(t.date) // Convert string back to Date object
        }));
        setTransactions(parsedTransactions);
      }
    } catch (error) {
      // If there's an error loading transactions, log it but don't crash
      console.error('Error loading transaction history:', error);
    }
  };

  // Function to save transaction history to localStorage
  const saveTransactionHistory = (newTransactions: Transaction[]) => {
    try {
      // Save transactions to browser storage for persistence
      localStorage.setItem('coinTransactions', JSON.stringify(newTransactions));
    } catch (error) {
      // Log error if saving fails
      console.error('Error saving transaction history:', error);
    }
  };

  // Function to redeem a reward
  const redeemReward = async (rewardId: number): Promise<boolean> => {
    // Set loading state to show user something is happening
    setIsLoading(true);
    setError(null);

    try {
      // Find the reward being redeemed
      const reward = rewards.find(r => r.id === rewardId);
      
      // Check if reward exists
      if (!reward) {
        throw new Error('Reward not found');
      }

      // Check if reward is available
      if (!reward.available) {
        throw new Error('This reward is currently unavailable');
      }

      // Check if user has enough coins
      if (user.coinBalance < reward.cost) {
        throw new Error('Insufficient coins for this redemption');
      }

      // Simulate API call delay (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new transaction record
      const newTransaction: Transaction = {
        id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
        rewardId: reward.id,
        rewardName: reward.name,
        cost: reward.cost,
        date: new Date(),
        status: 'completed'
      };

      // Update user's coin balance
      const updatedUser: User = {
        ...user,
        coinBalance: user.coinBalance - reward.cost, // Subtract cost from balance
        totalSpent: user.totalSpent + reward.cost    // Add to total spent
      };

      // Update transaction history
      const updatedTransactions = [newTransaction, ...transactions];

      // Update all state at once
      setUser(updatedUser);
      setTransactions(updatedTransactions);
      
      // Save transactions to localStorage for persistence
      saveTransactionHistory(updatedTransactions);

      // Return success
      return true;

    } catch (err) {
      // Handle any errors that occurred during redemption
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return false;
    } finally {
      // Always turn off loading state when done
      setIsLoading(false);
    }
  };

  // Function to add coins (for testing or admin purposes)
  const addCoins = (amount: number) => {
    // Update user's coin balance and total earned
    setUser(prevUser => ({
      ...prevUser,
      coinBalance: prevUser.coinBalance + amount,
      totalEarned: prevUser.totalEarned + amount
    }));
  };

  // Return all the state and functions that components can use
  return {
    user,           // Current user data
    rewards,        // Available rewards
    transactions,   // Transaction history
    isLoading,      // Loading state
    error,          // Error messages
    redeemReward,   // Function to redeem rewards
    addCoins,       // Function to add coins (for demo)
    setError        // Function to clear errors
  };
};