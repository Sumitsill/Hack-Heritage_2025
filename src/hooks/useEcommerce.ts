import { useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerInfo } from '../types';

// Custom hook to manage the ecommerce system
// This centralizes all the shopping-related logic and state management
export const useEcommerce = () => {
  // State for storing all available products
  const [products, setProducts] = useState<Product[]>([]);
  
  // State for storing shopping cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // State for storing order history
  const [orders, setOrders] = useState<Order[]>([]);
  
  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false);
  
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // Initialize products data when component mounts
  useEffect(() => {
    initializeProducts();
    loadCartFromStorage();
    loadOrdersFromStorage();
  }, []);

  // Function to set up initial product catalog
  const initializeProducts = () => {
    // Sample products data - in a real app, this would come from an API
    const initialProducts: Product[] = [
      {
        id: 1,
        name: "100ml Plate",
        description: "Compact and durable 100ml plate, perfect for travel and everyday use",
        price: 3,
        image: "https://m.media-amazon.com/images/I/71CY2-QbxjL._UF894,1000_QL80_.jpg",
        category: "daily use plates",
        inStock: true,
        stockCount: 15,
        rating: 4.5,
        reviews: 128
      },
      {
        id: 2,
        name: "250ml Container",
        description: "Compact and durable 250ml container, perfect for travel and everyday use",
        price: 8,
        image: "data:image/jpeg;base64,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",
        category: "daily use containers",
        inStock: true,
        stockCount: 50,
        rating: 4.2,
        reviews: 89
      },
      {
        id: 3,
        name: "500ml Container",
        description: "Compact and durable 500ml container, perfect for travel and everyday use",
        price: 17,
        image: "data:image/jpeg;base64,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",
        category: "daily use containers",
        inStock: true,
        stockCount: 8,
        rating: 4.7,
        reviews: 203
      },
      {
        id: 4,
        name: "1 Litre Container",
        description: "Compact and durable 1l container, perfect for travel and everyday use",
        price: 30,
        image: "data:image/jpeg;base64,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",
        category: "daily use containers",
        inStock: false,
        stockCount: 25,
        rating: 4.8,
        reviews: 156
      },
      // {
      //   id: 5,
      //   name: "Leather Wallet",
      //   description: "Handcrafted genuine leather wallet with RFID protection",
      //   price: 49.99,
      //   image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
      //   category: "accessories",
      //   inStock: false, // This one is out of stock
      //   stockCount: 0,
      //   rating: 4.3,
      //   reviews: 67
      // },
      // {
      //   id: 6,
      //   name: "Yoga Mat",
      //   description: "Non-slip eco-friendly yoga mat perfect for all types of workouts",
      //   price: 34.99,
      //   image: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400",
      //   category: "fitness",
      //   inStock: true,
      //   stockCount: 12,
      //   rating: 4.4,
      //   reviews: 94
      // }
    ];

    // Set the products in state
    setProducts(initialProducts);
  };

  // Function to load cart from localStorage
  const loadCartFromStorage = () => {
    try {
      // Try to get saved cart from browser storage
      const savedCart = localStorage.getItem('ecommerceCart');
      if (savedCart) {
        // Parse the JSON string and set cart items
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      // If there's an error loading cart, log it but don't crash
      console.error('Error loading cart from storage:', error);
    }
  };

  // Function to save cart to localStorage
  const saveCartToStorage = (cart: CartItem[]) => {
    try {
      // Save cart to browser storage for persistence
      localStorage.setItem('ecommerceCart', JSON.stringify(cart));
    } catch (error) {
      // Log error if saving fails
      console.error('Error saving cart to storage:', error);
    }
  };

  // Function to load orders from localStorage
  const loadOrdersFromStorage = () => {
    try {
      // Try to get saved orders from browser storage
      const savedOrders = localStorage.getItem('ecommerceOrders');
      if (savedOrders) {
        // Parse the JSON string and convert date strings back to Date objects
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          date: new Date(order.date) // Convert string back to Date object
        }));
        setOrders(parsedOrders);
      }
    } catch (error) {
      // If there's an error loading orders, log it but don't crash
      console.error('Error loading orders from storage:', error);
    }
  };

  // Function to save orders to localStorage
  const saveOrdersToStorage = (orderList: Order[]) => {
    try {
      // Save orders to browser storage for persistence
      localStorage.setItem('ecommerceOrders', JSON.stringify(orderList));
    } catch (error) {
      // Log error if saving fails
      console.error('Error saving orders to storage:', error);
    }
  };

  // Function to add item to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    // Check if product is in stock
    if (!product.inStock || product.stockCount < quantity) {
      setError('Product is out of stock or insufficient quantity available');
      return false;
    }

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    let updatedCart: CartItem[];
    
    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      const existingItem = cartItems[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      
      // Check if new quantity exceeds stock
      if (newQuantity > product.stockCount) {
        setError(`Cannot add more items. Only ${product.stockCount} available in stock`);
        return false;
      }
      
      // Update the existing item's quantity
      updatedCart = cartItems.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: newQuantity }
          : item
      );
    } else {
      // Item doesn't exist, add new item to cart
      const newCartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        maxStock: product.stockCount
      };
      
      // Add new item to cart array
      updatedCart = [...cartItems, newCartItem];
    }

    // Update cart state and save to storage
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
    return true;
  };

  // Function to remove item from cart
  const removeFromCart = (productId: number) => {
    // Filter out the item with matching ID
    const updatedCart = cartItems.filter(item => item.id !== productId);
    
    // Update cart state and save to storage
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  // Function to update item quantity in cart
  const updateCartQuantity = (productId: number, newQuantity: number) => {
    // If quantity is 0 or less, remove item from cart
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // Find the cart item to update
    const cartItem = cartItems.find(item => item.id === productId);
    if (!cartItem) return;

    // Check if new quantity exceeds available stock
    if (newQuantity > cartItem.maxStock) {
      setError(`Cannot add more items. Only ${cartItem.maxStock} available in stock`);
      return;
    }

    // Update the quantity for the specific item
    const updatedCart = cartItems.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );

    // Update cart state and save to storage
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  // Function to clear entire cart
  const clearCart = () => {
    // Empty the cart array
    setCartItems([]);
    // Remove cart from storage
    localStorage.removeItem('ecommerceCart');
  };

  // Function to calculate cart total
  const getCartTotal = (): number => {
    // Sum up all items (price * quantity) in cart
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Function to get cart item count
  const getCartItemCount = (): number => {
    // Sum up all quantities in cart
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Function to place an order
  const placeOrder = async (customerInfo: CustomerInfo): Promise<boolean> => {
    // Set loading state
    setIsLoading(true);
    setError(null);

    try {
      // Check if cart is empty
      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      // Validate customer information
      if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
        throw new Error('Please fill in all required customer information');
      }

      // Simulate API call delay (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create new order
      const newOrder: Order = {
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
        items: [...cartItems], // Copy cart items
        total: getCartTotal(), // Calculate total
        date: new Date(), // Current date
        status: 'pending', // Initial status
        customerInfo: { ...customerInfo } // Copy customer info
      };

      // Update orders list
      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      
      // Save orders to storage
      saveOrdersToStorage(updatedOrders);

      // Clear the cart after successful order
      clearCart();

      // Update product stock (in a real app, this would be handled by the backend)
      const updatedProducts = products.map(product => {
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            stockCount: product.stockCount - cartItem.quantity,
            inStock: (product.stockCount - cartItem.quantity) > 0
          };
        }
        return product;
      });
      setProducts(updatedProducts);

      return true;

    } catch (err) {
      // Handle any errors that occurred during order placement
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return false;
    } finally {
      // Always turn off loading state when done
      setIsLoading(false);
    }
  };

  // Return all the state and functions that components can use
  return {
    products,           // Available products
    cartItems,          // Items in shopping cart
    orders,             // Order history
    isLoading,          // Loading state
    error,              // Error messages
    addToCart,          // Function to add items to cart
    removeFromCart,     // Function to remove items from cart
    updateCartQuantity, // Function to update item quantities
    clearCart,          // Function to clear entire cart
    getCartTotal,       // Function to calculate cart total
    getCartItemCount,   // Function to get total item count
    placeOrder,         // Function to place an order
    setError            // Function to clear errors
  };
};