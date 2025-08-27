import { create } from 'zustand';

interface FoodItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  contributor: string;
  expiryDate: string;
  category: 'prepared' | 'raw' | 'packaged';
  status: 'available' | 'claimed' | 'collected';
  imageUrl?: string;
}

interface AppState {
  foodItems: FoodItem[];
  selectedItem: FoodItem | null;
  mapCenter: { lat: number; lng: number };
  userLocation: { lat: number; lng: number } | null;
  searchRadius: number;
  filters: {
    category: string[];
    status: string[];
    timeRange: string;
  };
  setFoodItems: (items: FoodItem[]) => void;
  setSelectedItem: (item: FoodItem | null) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  setSearchRadius: (radius: number) => void;
  updateFilters: (filters: Partial<AppState['filters']>) => void;
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  foodItems: [
    {
      id: '1',
      title: 'Fresh Vegetable Surplus',
      description: 'Farm fresh vegetables - carrots, potatoes, onions',
      quantity: 50,
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: 'Manhattan, NY'
      },
      contributor: 'Green Valley Farm',
      expiryDate: '2024-01-20',
      category: 'raw',
      status: 'available',
      imageUrl: 'https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg'
    },
    {
      id: '2',
      title: 'Prepared Meals Ready',
      description: 'Hot meals prepared for immediate distribution',
      quantity: 25,
      location: {
        lat: 40.7580,
        lng: -73.9855,
        address: 'Central Park, NY'
      },
      contributor: 'Community Kitchen',
      expiryDate: '2024-01-18',
      category: 'prepared',
      status: 'available',
      imageUrl: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'
    }
  ],
  selectedItem: null,
  mapCenter: { lat: 40.7128, lng: -74.0060 },
  userLocation: null,
  searchRadius: 5,
  filters: {
    category: [],
    status: ['available'],
    timeRange: 'today'
  },
  setFoodItems: (items) => set({ foodItems: items }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setMapCenter: (center) => set({ mapCenter: center }),
  setUserLocation: (location) => set({ userLocation: location }),
  setSearchRadius: (radius) => set({ searchRadius: radius }),
  updateFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  addFoodItem: (item) => 
    set((state) => ({ 
      foodItems: [...state.foodItems, { ...item, id: Date.now().toString() }] 
    }))
}));