import React from 'react';
import { CartItem } from '../types';
import { ShoppingCartIcon, Plus, Minus, Trash2, X } from 'lucide-react';

// Props interface for the ShoppingCart component
interface ShoppingCartProps {
  cartItems: CartItem[];                                    // Items in the cart
  isOpen: boolean;                                         // Whether cart is open/visible
  onClose: () => void;                                     // Function to close cart
  onUpdateQuantity: (id: number, quantity: number) => void; // Function to update item quantity
  onRemoveItem: (id: number) => void;                      // Function to remove item
  onCheckout: () => void;                                  // Function to proceed to checkout
  total: number;                                           // Total cart amount
}


// Component for shopping cart sidebar/modal
const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  total
}) => {
  // Don't render anything if cart is not open
  if (!isOpen) return null;

  return (
    // Overlay background that covers entire screen
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      {/* Cart sidebar panel */}
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
        {/* Cart header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {/* Cart title with icon */}
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose} // Close cart when clicked
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close cart" // Accessibility label
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex-1 p-4">
          {/* Check if cart has items */}
          {cartItems.length === 0 ? (
            // Empty cart state
            <div className="text-center py-12">
              <ShoppingCartIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some products to get started!</p>
            </div>
          ) : (
            // Cart items list
            <div className="space-y-4">
              {cartItems.map((item) => (
                // Individual cart item
                <div key={item.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg" // Square image with rounded corners
                  />
                  
                  {/* Product details */}
                  <div className="flex-1">
                    {/* Product name */}
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item.name}
                    </h4>
                    
                    {/* Product price */}
                    <p className="text-gray-600 text-sm mb-2">
                      ${item.price.toFixed(2)} each {/* Format price */}
                    </p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      {/* Decrease quantity button */}
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        disabled={item.quantity <= 1} // Disable if quantity is 1
                      >
                        <Minus className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {/* Quantity display */}
                      <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                        {item.quantity}
                      </span>
                      
                      {/* Increase quantity button */}
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        disabled={item.quantity >= item.maxStock} // Disable if at max stock
                      >
                        <Plus className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-red-100 rounded transition-colors ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Item total price */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)} {/* Calculate item total */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart footer with total and checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Cart summary */}
            <div className="space-y-2">
              {/* Subtotal */}
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {/* Shipping info */}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              {/* Total */}
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={onCheckout} // Proceed to checkout
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;