// Type definitions for the ecommerce system
// This helps with TypeScript type checking and code completion

// Interface defining the structure of a product
export interface Product {
  id: number;           // Unique identifier for each product
  name: string;         // Display name of the product
  description: string;  // Detailed description of the product
  price: number;        // Price in dollars
  image: string;        // Image URL for the product
  category: string;     // Category grouping (e.g., "electronics", "clothing")
  inStock: boolean;     // Whether the product is currently available
  stockCount: number;   // Number of items available in inventory
  rating: number;       // Average rating (1-5 stars)
  reviews: number;      // Number of customer reviews
}

// Interface defining the structure of a cart item
export interface CartItem {
  id: number;           // Product ID
  name: string;         // Product name
  price: number;        // Product price
  image: string;        // Product image
  quantity: number;     // How many of this item in cart
  maxStock: number;     // Maximum available stock
}

// Interface defining the structure of an order
export interface Order {
  id: string;           // Unique order identifier
  items: CartItem[];    // Array of ordered items
  total: number;        // Total order amount
  date: Date;           // When the order was placed
  status: 'pending' | 'processing' | 'shipped' | 'delivered'; // Order status
  customerInfo: CustomerInfo; // Customer details
}

// Interface for customer information
export interface CustomerInfo {
  name: string;         // Customer's full name
  email: string;        // Customer's email address
  address: string;      // Shipping address
  city: string;         // City
  zipCode: string;      // ZIP/Postal code
  phone: string;        // Phone number
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  cost: number;
  image: string;
  category: "digital" | "physical";
  available: boolean;
}

export interface Transaction {
  id: string;
  rewardId: number;
  rewardName: string;
  cost: number;
  date: Date;
  status: "completed" | "pending" | "failed";
}

export interface User {
  id: string;
  name: string;
  coinBalance: number;
  totalEarned: number;
  totalSpent: number;
}