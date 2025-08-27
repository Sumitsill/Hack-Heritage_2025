import React, { useState } from 'react';
import { useEcommerce } from '../hooks/useEcommerce';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import CheckoutForm from '../components/CheckoutForm';
import OrderHistory from '../components/OrderHistory';
import CategoryFilter from '../components/CategoryFilter';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import { Search } from 'lucide-react';

function OnlineMarketplace() {
  // Get ecommerce state and functions from custom hook
  const {
    products,           // Available products array
    cartItems,          // Shopping cart items
    orders,             // Order history
    isLoading,          // Loading state for operations
    error,              // Error messages
    addToCart,          // Function to add items to cart
    removeFromCart,     // Function to remove items from cart
    updateCartQuantity, // Function to update item quantities
    getCartTotal,       // Function to calculate cart total
    getCartItemCount,   // Function to get total item count
    placeOrder,         // Function to place an order
    setError            // Function to clear errors
  } = useEcommerce();

  // Local state for UI features
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart sidebar visibility
  const [currentView, setCurrentView] = useState('products'); // Current page/view
  const [activeCategory, setActiveCategory] = useState('all'); // Selected product category
  const [searchQuery, setSearchQuery] = useState(''); // Product search query
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success messages

  // Function to handle adding products to cart
  const handleAddToCart = (product: any) => {
    // Try to add product to cart
    const success = addToCart(product, 1); // Add 1 quantity
    
    // Show success message if addition worked
    if (success) {
      setSuccessMessage(`${product.name} added to cart!`);
    }
    // Error handling is done in the hook and displayed via error state
  };

  // Function to handle order placement
  const handlePlaceOrder = async (customerInfo: any) => {
    // Try to place the order
    const success = await placeOrder(customerInfo);
    
    // Handle success or failure
    if (success) {
      setSuccessMessage('Order placed successfully! Check your email for confirmation.');
      setCurrentView('orders'); // Switch to orders view
    }
    // Error handling is done in the hook and displayed via error state
  };

  // Function to filter products based on category and search
  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by category if not 'all'
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Filter by search query if exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Get the filtered products for display
  const filteredProducts = getFilteredProducts();

  // Function to render the main content based on current view
  const renderMainContent = () => {
    switch (currentView) {
      case 'checkout':
        // Show checkout form
        return (
          <CheckoutForm
            onSubmit={handlePlaceOrder} // Handle order submission
            isLoading={isLoading} // Pass loading state
            total={getCartTotal()} // Pass cart total
          />
        );
      
      case 'orders':
        // Show order history
        return <OrderHistory orders={orders} />;
      
      default:
        // Show products catalog (default view)
        return (
          <div className="space-y-6">
            {/* Search and filter section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Search bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category filter */}
              <CategoryFilter
                products={products}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory} // Update active category
              />
            </div>

            {/* Products section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Section header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === 'all' ? 'All Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Products`}
                </h2>
                <span className="text-gray-500 text-sm">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
              </div>

              {/* Products grid */}
              {filteredProducts.length > 0 ? (
                // Grid of product cards when products exist
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id} // Unique key for React list
                      product={product}
                      onAddToCart={handleAddToCart} // Pass add to cart handler
                      isLoading={isLoading} // Pass loading state
                    />
                  ))}
                </div>
              ) : (
                // Empty state when no products match filters
                <div className="text-center py-12 text-gray-500">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    // Main application container
    <div className="min-h-screen bg-gray-50">
      {/* Header navigation */}
      {/* Success message display */}
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onDismiss={() => setSuccessMessage(null)} // Clear success message when dismissed
        />
      )}

      {/* Error message display */}
      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => setError(null)} // Clear error when dismissed
        />
      )}

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <button
              onClick={() => setCurrentView('products')} // Go to products view
              className={`hover:text-blue-600 transition-colors ${
                currentView === 'products' ? 'text-blue-600 font-medium' : ''
              }`}
            >
              Products
            </button>
            {currentView === 'checkout' && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-medium">Checkout</span>
              </>
            )}
            {currentView === 'orders' && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-medium">My Orders</span>
              </>
            )}
          </nav>
        </div>

        {/* Render main content based on current view */}
        {renderMainContent()}
      </main>
      {/* Shopping cart sidebar */}
      <ShoppingCart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)} // Close cart
        onUpdateQuantity={updateCartQuantity} // Update item quantities
        onRemoveItem={removeFromCart} // Remove items from cart
        onCheckout={() => {
          setIsCartOpen(false); // Close cart
          setCurrentView('checkout'); // Switch to checkout view
        }}
        total={getCartTotal()} // Pass cart total
      />

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            {/* Company info */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">ShopEasy</h3>
              <p className="text-gray-300 text-sm">
                Your trusted online shopping destination with quality products and excellent service.
              </p>
            </div> */}
            
            {/* Quick links */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => setCurrentView('products')} className="hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => setCurrentView('orders')} className="hover:text-white transition-colors">My Orders</button></li>
                <li><button onClick={() => setIsCartOpen(true)} className="hover:text-white transition-colors">Shopping Cart</button></li>
              </ul>
            </div> */}
            
            {/* Contact info */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>Email: support@shopeasy.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Hours: Mon-Fri 9AM-6PM</p>
              </div>
            </div>
          </div> */}
          
          {/* Copyright */}
          {/* <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ShopEasy. All rights reserved. Happy shopping! 🛒</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default OnlineMarketplace;