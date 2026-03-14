import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Clock, Users } from "lucide-react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  LoadScript,
} from "@react-google-maps/api";
import { useAppStore } from "../stores/useAppStore";
import FoodItemCard from "../components/FoodItemCard";
import MapFilters from "../components/MapFilters";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { foodItems, selectedItem, setSelectedItem, mapCenter } = useAppStore();

  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=gemini_key`;
      script.async = true;
      document.head.appendChild(script);

      window.initMap = () => {
        setIsMapLoaded(true);
      };
    } else {
      setIsMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isMapLoaded && mapRef.current && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 12,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      setMap(googleMap);
    }
  }, [isMapLoaded, mapCenter]);

  useEffect(() => {
    if (map && foodItems.length > 0) {
      // Clear existing markers
      // Add markers for food items
      foodItems.forEach((item) => {
        const marker = new window.google.maps.Marker({
          position: { lat: item.location.lat, lng: item.location.lng },
          map: map,
          title: item.title,
          icon: {
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#10B981" stroke="white" stroke-width="4"/>
                <path d="M20 10v20M10 20h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
              </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        marker.addListener("click", () => {
          setSelectedItem(item);
        });
      });
    }
  }, [map, foodItems, setSelectedItem]);

  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.209 }); // default Delhi
  const watchIdRef = useRef<number | null>(null);

  // ✅ Load Google Maps API safely
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBToEOs4jFNTl_DSDUGqUcUFTFKdDPThAE", // replace with your actual API key
  });

  const trackLocation = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
      watchIdRef.current = id;
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // ⏳ Wait until maps API is ready
  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <motion.div
        className="w-full md:w-96 bg-white shadow-lg overflow-y-auto"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Food Map</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search for food or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Filters */}
          {showFilters && <MapFilters />}

          {/* Food Items List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Available Food ({foodItems.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock size={16} />
                <span>Updated 2 min ago</span>
              </div>
            </div>

            {foodItems.map((item) => (
              <FoodItemCard
                key={item.id}
                item={item}
                isSelected={selectedItem?.id === item.id}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Map */}
      {/* <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full" />
        
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <motion.div
              className="flex flex-col items-center space-y-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <MapPin size={48} className="text-emerald-600" />
              <p className="text-gray-600 font-medium">Loading map...</p>
            </motion.div>
          </div>
        )} */}

      {/* Map Controls */}
      {/* <div className="absolute top-4 right-4 space-y-2">
          <motion.button
            className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
                  map?.setCenter(center);
                  map?.setZoom(15);
                });
              }
            }}
          >
            <MapPin size={20} className="text-gray-700" />
          </motion.button>
        </div>
      </div> */}

      <div className="p-4">
        <button
          onClick={trackLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Start Live Tracking
        </button>
        <button
          onClick={stopTracking}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Stop Tracking
        </button>

        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={{ width: '600px', height: '400px' }}
            center={location}
            zoom={15}
          >
            <Marker
              position={location}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(40, 40), // ✅ Safe now
              }}
            />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
