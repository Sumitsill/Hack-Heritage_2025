import React from 'react';
import { Product } from '../types';

// Props interface for the CategoryFilter component
interface CategoryFilterProps {
  products: Product[];                          // All available products
  activeCategory: string;                       // Currently selected category
  onCategoryChange: (category: string) => void; // Function called when category changes
}

// Component for filtering products by category
const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  products, 
  activeCategory, 
  onCategoryChange 
}) => {
  // Get unique categories from products and count items in each
  const getCategories = () => {
    // Create a map to count products in each category
    const categoryCount = products.reduce((acc, product) => {
      const category = product.category;
      acc[category] = (acc[category] || 0) + 1; // Increment count for category
      return acc;
    }, {} as Record<string, number>);

    // Create category options array
    const categories = [
      { id: 'all', label: 'All Products', count: products.length }, // All products option
      ...Object.entries(categoryCount).map(([category, count]) => ({
        id: category,
        label: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize first letter
        count
      }))
    ];

    return categories;
  };

  // Get the categories with counts
  const categories = getCategories();

  return (
    // Container for category filter tabs
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        // Individual category filter button
        <button
          key={category.id} // Unique key for React list
          onClick={() => onCategoryChange(category.id)} // Handle category change
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
            ${activeCategory === category.id
              ? 'bg-blue-500 text-white shadow-lg' // Active category styling
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200' // Inactive category styling
            }
          `}
        >
          {/* Category label */}
          <span>{category.label}</span>
          
          {/* Product count badge */}
          <span className={`
            px-2 py-1 rounded-full text-xs font-bold
            ${activeCategory === category.id
              ? 'bg-white/20 text-white' // Active badge styling
              : 'bg-gray-100 text-gray-600' // Inactive badge styling
            }
          `}>
            {category.count} {/* Number of products in category */}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;