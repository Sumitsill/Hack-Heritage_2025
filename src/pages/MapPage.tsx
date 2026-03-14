import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MapPin, Navigation, Compass, Layers, Info } from "lucide-react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useAppStore } from "../stores/useAppStore";
import FoodItemCard from "../components/FoodItemCard";
import MapFilters from "../components/MapFilters";

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Modern, clean map styling (Minimalist / Silver theme)
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  scaleControl: false,
  rotateControl: false,
  fullscreenControl: false,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9b2a6" }] },
    { featureType: "administrative.land_parcel", elementType: "geometry.stroke", stylers: [{ color: "#dcd2be" }] },
    { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#ae9e90" }] },
    { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#93817c" }] },
    { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#a5b076" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#447530" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fdfcf8" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f8c967" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e9bc62" }] },
    { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#e98d58" }] },
    { featureType: "road.highway.controlled_access", elementType: "geometry.stroke", stylers: [{ color: "#db8555" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#806b63" }] },
    { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
    { featureType: "transit.line", elementType: "labels.text.fill", stylers: [{ color: "#8f7d77" }] },
    { featureType: "transit.line", elementType: "labels.text.stroke", stylers: [{ color: "#ebe3cd" }] },
    { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#92998d" }] },
  ],
};

export default function MapPage() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { foodItems, selectedItem, setSelectedItem, mapCenter } = useAppStore();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBToEOs4jFNTl_DSDUGqUcUFTFKdDPThAE",
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return foodItems;
    const query = searchQuery.toLowerCase();
    return foodItems.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }, [foodItems, searchQuery]);

  const handleCenterMap = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.panTo(coords);
        map.setZoom(14);
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-emerald-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full" />
          <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 w-6 h-6" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden font-outfit">
      {/* Background Map layer */}
      <div className="absolute inset-0 z-0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {filteredItems.map((item) => (
            <Marker
              key={item.id}
              position={item.location}
              onClick={() => setSelectedItem(item)}
              icon={{
                path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                fillColor: selectedItem?.id === item.id ? "#10B981" : "#064E3B",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
                scale: 2,
              }}
            />
          ))}

          {selectedItem && (
            <InfoWindow
              position={selectedItem.location}
              onCloseClick={() => setSelectedItem(null)}
            >
              <div className="p-2 max-w-[200px]">
                <h3 className="font-bold text-gray-900">{selectedItem.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{selectedItem.description}</p>
                <div className="mt-2 text-emerald-600 text-xs font-bold">{selectedItem.quantity} units available</div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Floating UI Elements */}
      <div className="relative z-10 h-full pointer-events-none p-6 flex gap-6">
        {/* Left Floating Sidebar */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           className="w-96 flex flex-col pointer-events-auto"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[32px] flex flex-col overflow-hidden max-h-full">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight">Food Map</h1>
                  <p className="text-gray-500 text-sm font-medium">Find Hungerr food near you</p>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-2xl transition-all ${showFilters ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Filter size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="relative group">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Search delicious insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium"
                />
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 overflow-hidden"
                >
                  <MapFilters />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
              <div className="space-y-4 pt-2">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">Nothing found for "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <FoodItemCard
                      key={item.id}
                      item={item}
                      isSelected={selectedItem?.id === item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        map?.panTo(item.location);
                        map?.setZoom(15);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Floating Controls */}
        <div className="flex-1 flex flex-col justify-between items-end pointer-events-none">
          <div className="flex flex-col gap-3 pointer-events-auto">
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleCenterMap}
               className="p-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 text-gray-700 hover:text-emerald-600 transition-all group"
             >
               <Navigation size={24} className="group-hover:rotate-12 transition-transform" />
             </motion.button>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="p-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 text-gray-700 hover:text-emerald-600 transition-all"
             >
               <Layers size={24} />
             </motion.button>
          </div>

          <div className="flex flex-col items-end gap-4">
             {/* Selected Item Floating Card (Quick Preview) */}
             <AnimatePresence>
               {selectedItem && (
                 <motion.div
                   initial={{ y: 100, opacity: 0, scale: 0.9 }}
                   animate={{ y: 0, opacity: 1, scale: 1 }}
                   exit={{ y: 100, opacity: 0, scale: 0.9 }}
                   className="pointer-events-auto"
                 >
                   <div className="bg-emerald-900 text-white p-6 rounded-[32px] shadow-2xl w-80 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4">
                        <motion.button 
                          onClick={() => setSelectedItem(null)}
                          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                        >
                          <Info size={16} />
                        </motion.button>
                      </div>
                      <div className="relative z-10">
                        <span className="bg-emerald-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">Featured</span>
                        <h3 className="text-xl font-bold mt-2">{selectedItem.title}</h3>
                        <p className="text-emerald-100/70 text-sm mt-1 line-clamp-2">{selectedItem.description}</p>
                        <div className="flex items-center gap-4 mt-4">
                           <div className="flex items-center gap-1.5">
                              <Info size={16} className="text-emerald-400" />
                              <span className="text-xs font-bold">{selectedItem.quantity} units</span>
                           </div>
                           <button className="flex-1 bg-white text-emerald-900 py-2.5 rounded-xl font-black text-sm hover:bg-emerald-50 transition-colors">
                              Claim Now
                           </button>
                        </div>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-800 rounded-full blur-3xl opacity-50" />
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
             
             <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl pointer-events-auto flex items-center gap-3 font-bold text-sm"
             >
               <Compass className="animate-pulse" />
               Live Hungerr Tracking Active
             </motion.div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
    </div>
  );
}
