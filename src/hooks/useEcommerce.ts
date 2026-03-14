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

  // Function to add a new product to the catalog (Dynamic Marketplace)
  const addProduct = (newProduct: Omit<Product, 'id' | 'rating' | 'reviews' | 'inStock'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now(), // Generate unique numeric ID
      rating: 0,
      reviews: 0,
      inStock: newProduct.stockCount > 0
    };
    
    const updatedProducts = [product, ...products];
    setProducts(updatedProducts);
    // In a real app, we'd persist this to a database
    // For now, let's also save products to localStorage for persistence
    localStorage.setItem('marketplaceProducts', JSON.stringify(updatedProducts));
    return true;
  };

  // Modify initializeProducts to check localStorage first
  const initializeProducts = () => {
    const savedProducts = localStorage.getItem('marketplaceProducts');
    if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
        return;
    }

    const initialProducts: Product[] = [
      {
        id: 1,
        name: "Bamboo Dining Set",
        description: "Elegant 4-piece dining set made from sustainable bamboo fiber.",
        price: 28,
        image: "https://images.pexels.com/photos/5993881/pexels-photo-5993881.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Kitchenware",
        inStock: true,
        stockCount: 25,
        rating: 4.8,
        reviews: 124
      },
      {
        id: 2,
        name: "Steel Water Bottle",
        description: "Vacuum insulated 1L bottle that keeps drinks cold for 24 hours.",
        price: 15,
        image: "https://images.pexels.com/photos/1029844/pexels-photo-1029844.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Hydration",
        inStock: true,
        stockCount: 40,
        rating: 4.6,
        reviews: 89
      },
      {
        id: 3,
        name: "Cotton Tote Bag",
        description: "Heavy-duty organic cotton bag for plastic-free shopping.",
        price: 10,
        image: "https://images.pexels.com/photos/3737603/pexels-photo-3737603.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Accessories",
        inStock: true,
        stockCount: 100,
        rating: 4.9,
        reviews: 215
      },
      {
        id: 4,
        name: "Solar Powered Lamp",
        description: "Portable LED lamp with integrated solar panel for camping.",
        price: 45,
        image: "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Outdoor",
        inStock: true,
        stockCount: 15,
        rating: 4.7,
        reviews: 56
      },
      {
        id: 5,
        name: "Beeswax Wraps",
        description: "Set of 3 reusable food wraps to eliminate plastic film use.",
        price: 12,
        image: "https://images.pexels.com/photos/4033230/pexels-photo-4033230.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Kitchenware",
        inStock: true,
        stockCount: 60,
        rating: 4.5,
        reviews: 178
      },
      {
        id: 6,
        name: "Glass Storage Jars",
        description: "Airtight glass jars with bamboo lids for pantry organization.",
        price: 32,
        image: "https://images.pexels.com/photos/4243163/pexels-photo-4243163.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Kitchenware",
        inStock: true,
        stockCount: 30,
        rating: 4.8,
        reviews: 92
      },
      {
        id: 7,
        name: "Bamboo Toothbrush",
        description: "Pack of 4 biodegradable toothbrushes with soft bristles.",
        price: 8,
        image: "https://images.pexels.com/photos/3951881/pexels-photo-3951881.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Personal Care",
        inStock: true,
        stockCount: 150,
        rating: 4.9,
        reviews: 310
      },
      {
        id: 8,
        name: "Canvas Backpack",
        description: "Durable hemp canvas backpack for daily commuting.",
        price: 55,
        image: "https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Accessories",
        inStock: true,
        stockCount: 20,
        rating: 4.6,
        reviews: 43
      }
    ];

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
    addProduct,         // Function to add a new dynamic product
    setError            // Function to clear errors
  };
};