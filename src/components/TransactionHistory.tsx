import React from 'react';
import { Transaction } from '../types';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Props interface for the TransactionHistory component
interface TransactionHistoryProps {
  transactions: Transaction[]; // Array of user's transactions
}

// Component to display transaction history
const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  // Function to get icon based on transaction status
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />; // Green check for completed
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />; // Yellow warning for pending
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />; // Red X for failed
      default:
        return <Clock className="w-5 h-5 text-gray-500" />; // Gray clock for unknown
    }
  };

  // Function to get status color class
  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50'; // Green styling for completed
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'; // Yellow styling for pending
      case 'failed':
        return 'text-red-600 bg-red-50'; // Red styling for failed
      default:
        return 'text-gray-600 bg-gray-50'; // Gray styling for unknown
    }
  };

  // Function to format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',  // Short month name (e.g., "Jan")
      day: '2-digit',  // Two-digit day (e.g., "01")
      year: 'numeric', // Full year (e.g., "2024")
      hour: '2-digit', // Two-digit hour (e.g., "02")
      minute: '2-digit' // Two-digit minute (e.g., "30")
    }).format(date);
  };

  return (
    // Main container for transaction history
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-gray-700" /> {/* Clock icon */}
        <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
      </div>

      {/* Check if there are any transactions */}
      {transactions.length === 0 ? (
        // Empty state when no transactions exist
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" /> {/* Large clock icon */}
          <p className="text-lg font-medium">No transactions yet</p>
          <p className="text-sm">Your redemption history will appear here</p>
        </div>
      ) : (
        // List of transactions when they exist
        <div className="space-y-3">
          {transactions.map((transaction) => (
            // Individual transaction item
            <div 
              key={transaction.id} // Unique key for React list
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Transaction details row */}
              <div className="flex items-center justify-between">
                {/* Left side: Icon, name, and date */}
                <div className="flex items-center gap-3">
                  {/* Status icon */}
                  {getStatusIcon(transaction.status)}
                  
                  {/* Transaction details */}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {transaction.rewardName} {/* Name of redeemed reward */}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(transaction.date)} {/* Formatted transaction date */}
                    </p>
                  </div>
                </div>

                {/* Right side: Cost and status */}
                <div className="flex items-center gap-3">
                  {/* Cost display */}
                  <span className="font-bold text-gray-900">
                    -{transaction.cost.toLocaleString()} coins {/* Negative cost with formatting */}
                  </span>
                  
                  {/* Status badge */}
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${getStatusColor(transaction.status)} 
                  `}>
                    {transaction.status} {/* Status text */}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;