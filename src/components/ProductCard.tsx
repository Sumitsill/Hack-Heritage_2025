import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Star, Package } from 'lucide-react';

// Props interface for the ProductCard component
interface ProductCardProps {
  product: Product;                         // The product data to display
  onAddToCart: (product: Product) => void; // Function called when add to cart is clicked
  isLoading: boolean;                       // Whether an operation is in progress
}

// Component to display individual product cards
const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isLoading 
}) => {
  // Handle add to cart button click
  const handleAddToCart = () => {
    // Only proceed if not loading and product is in stock
    if (!isLoading && product.inStock) {
      onAddToCart(product); // Call the add to cart function with product data
    }
  };

  // Function to render star rating
  const renderStars = (rating: number) => {
    // Create array of 5 elements for 5 stars
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index} // Unique key for React list
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' // Filled star for ratings
            : 'text-gray-300' // Empty star for remaining
        }`}
      />
    ));
  };

  return (
    // Main card container with hover effects and conditional styling
    <div className={`
      bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden
      ${!product.inStock ? 'opacity-60' : ''} // Dim out-of-stock products
      ${product.inStock ? 'hover:scale-105' : ''} // Slight scale on hover if in stock
    `}>
      {/* Product image section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover" // Make image fill container
        />
        
        {/* Overlay badges */}
        <div className="absolute top-2 left-2">
          {/* Category badge */}
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {product.category} {/* Show product category */}
          </span>
        </div>

        {/* Stock status badge */}
        <div className="absolute top-2 right-2">
          {product.inStock ? (
            // In stock badge
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Package className="w-3 h-3" />
              {product.stockCount} left {/* Show remaining stock */}
            </span>
          ) : (
            // Out of stock badge
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <Package className="w-8 h-8 mx-auto mb-2" /> {/* Package icon */}
              <span className="text-sm font-medium">Out of Stock</span>
            </div>
          </div>
        )}
      </div>

      {/* Card content section */}
      <div className="p-4">
        {/* Product name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        
        {/* Product description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating and reviews section */}
        <div className="flex items-center gap-2 mb-3">
          {/* Star rating display */}
          <div className="flex items-center">
            {renderStars(product.rating)} {/* Render star rating */}
          </div>
          {/* Rating number and review count */}
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Price and add to cart section */}
        <div className="flex items-center justify-between">
          {/* Price display */}
          <div className="text-2xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)} {/* Format price to 2 decimal places */}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading} // Disable if out of stock or loading
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
              ${product.inStock && !isLoading
                ? 'bg-blue-500 hover:bg-blue-600 text-white' // Active button styling
                : 'bg-gray-200 text-gray-400 cursor-not-allowed' // Disabled button styling
              }
            `}
          >
            <ShoppingCart className="w-4 h-4" /> {/* Shopping cart icon */}
            {/* Button text based on state */}
            {isLoading 
              ? 'Adding...' 
              : !product.inStock 
                ? 'Out of Stock' 
                : 'Add to Cart'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;