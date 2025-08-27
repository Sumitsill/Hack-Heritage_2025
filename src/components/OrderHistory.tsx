import React from 'react';
import { Order } from '../types';
import { Package, Clock, Truck, CheckCircle, Calendar } from 'lucide-react';

// Props interface for the OrderHistory component
interface OrderHistoryProps {
  orders: Order[]; // Array of user's orders
}

// Component to display order history
const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  // Function to get icon based on order status
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />; // Clock for pending
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />; // Package for processing
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />; // Truck for shipped
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />; // Check for delivered
      default:
        return <Clock className="w-5 h-5 text-gray-500" />; // Default clock
    }
  };

  // Function to get status color class
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'; // Yellow for pending
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200'; // Blue for processing
      case 'shipped':
        return 'text-purple-600 bg-purple-50 border-purple-200'; // Purple for shipped
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200'; // Green for delivered
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'; // Gray for unknown
    }
  };

  // Function to format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',   // Full year
      month: 'long',     // Full month name
      day: 'numeric',    // Day of month
      hour: '2-digit',   // Hour
      minute: '2-digit'  // Minute
    }).format(date);
  };

  return (
    // Main container for order history
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <Package className="w-6 h-6 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
      </div>

      {/* Check if there are any orders */}
      {orders.length === 0 ? (
        // Empty state when no orders exist
        <div className="text-center py-12 text-gray-500">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">No orders yet</h3>
          <p className="text-gray-400">Your order history will appear here after you make your first purchase</p>
        </div>
      ) : (
        // List of orders when they exist
        <div className="space-y-6">
          {orders.map((order) => (
            // Individual order card
            <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Order header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                {/* Order info */}
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Order #{order.id.slice(-8).toUpperCase()} {/* Show last 8 characters of order ID */}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(order.date)}</span> {/* Formatted order date */}
                  </div>
                </div>

                {/* Order status and total */}
                <div className="flex flex-col md:items-end gap-2">
                  {/* Status badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {/* Status icon */}
                    <span className="capitalize">{order.status}</span> {/* Status text */}
                  </div>
                  
                  {/* Order total */}
                  <div className="text-xl font-bold text-gray-900">
                    ${order.total.toFixed(2)} {/* Format total to 2 decimal places */}
                  </div>
                </div>
              </div>

              {/* Customer information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Shipping Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {order.customerInfo.name}</p>
                  <p><strong>Email:</strong> {order.customerInfo.email}</p>
                  <p><strong>Address:</strong> {order.customerInfo.address}, {order.customerInfo.city} {order.customerInfo.zipCode}</p>
                  <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                </div>
              </div>

              {/* Order items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Items Ordered ({order.items.length})</h4>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    // Individual order item
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      {/* Item image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg" // Small square image
                      />
                      
                      {/* Item details */}
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} × {item.quantity} {/* Price and quantity */}
                        </p>
                      </div>
                      
                      {/* Item total */}
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)} {/* Calculate item total */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;