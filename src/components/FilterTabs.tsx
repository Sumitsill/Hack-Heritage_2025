import React from 'react';

// Props interface for the FilterTabs component
interface FilterTabsProps {
  activeFilter: string;                    // Currently selected filter
  onFilterChange: (filter: string) => void; // Function called when filter changes
}

// Component for filtering rewards by category
const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  // Available filter options
  const filters = [
    { id: 'all', label: 'All Rewards', count: 0 },      // Show all rewards
    { id: 'digital', label: 'Digital', count: 0 },       // Digital rewards only
    { id: 'physical', label: 'Physical', count: 0 },     // Physical rewards only
    { id: 'affordable', label: 'Affordable', count: 0 }  // Affordable rewards only
  ];

  return (
    // Container for filter tabs
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        // Individual filter tab button
        <button
          key={filter.id} // Unique key for React list
          onClick={() => onFilterChange(filter.id)} // Handle filter change
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${activeFilter === filter.id
              ? 'bg-blue-500 text-white shadow-lg' // Active tab styling
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200' // Inactive tab styling
            }
          `}
        >
          {filter.label} {/* Filter display name */}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;