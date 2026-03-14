import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MapPin, 
  Camera, 
  X, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Box, 
  Utensils, 
  Zap,
  Calendar,
  Package,
  ArrowRight,
  ClipboardList
} from "lucide-react";

export default function ContributePage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodForm, setFoodForm] = useState({
    title: "",
    category: "",
    description: "",
    quantity: 1,
    expiryDate: "",
    address: "",
    pickupInstructions: "",
    foodImages: [] as { file: File; preview: string }[],
  });

  const categories = [
    { id: 'prepared', title: 'Prepared Meals', icon: Utensils, desc: 'Hot or cold ready-to-eat meals', color: 'emerald' },
    { id: 'raw', title: 'Raw Ingredients', icon: Zap, desc: 'Fresh produce, grains, or dairy', color: 'amber' },
    { id: 'packaged', title: 'Packaged Food', icon: Package, desc: 'Sealed items with labels', color: 'blue' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFoodForm(prev => ({
      ...prev,
      foodImages: [...prev.foodImages, ...newImages].slice(0, 4)
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(foodForm.foodImages[index].preview);
    setFoodForm(prev => ({
      ...prev,
      foodImages: prev.foodImages.filter((_, i) => i !== index)
    }));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", foodForm.title);
      formData.append("category", foodForm.category);
      formData.append("description", foodForm.description);
      formData.append("quantity", foodForm.quantity.toString());
      formData.append("expiry_date", foodForm.expiryDate);
      formData.append("address", foodForm.address);
      formData.append("pickup_instructions", foodForm.pickupInstructions);

      foodForm.foodImages.forEach(img => {
        formData.append("uploaded_images", img.file);
      });

      const response = await fetch("http://127.0.0.1:8000/food_api/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStep(4); // Success Step
      } else {
        alert("There was an error submitting your donation. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-4xl mx-auto relative">
        
        {/* Progress Tracker */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-16 max-w-lg mx-auto relative px-8">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full overflow-hidden">
               <motion.div 
                className="h-full bg-emerald-500"
                animate={{ width: `${((step - 1) / 2) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
               />
            </div>
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{ 
                    scale: step === s ? 1.1 : step > s ? 1 : 0.9,
                    backgroundColor: step >= s ? '#10b981' : '#ffffff',
                    color: step >= s ? '#ffffff' : '#94a3b8',
                    borderColor: step >= s ? '#10b981' : '#e2e8f0',
                    boxShadow: step === s ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none'
                  }}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center font-bold text-base transition-all duration-300`}
                >
                  {step > s ? <Check size={20} strokeWidth={3} /> : s}
                </motion.div>
                <div className={`absolute top-16 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${step >= s ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s === 1 ? 'Details' : s === 2 ? 'Logistics' : 'Review'}
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 4 ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-16 text-center border border-gray-100"
            >
              <div className="w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-full h-full bg-emerald-100 rounded-full absolute animate-ping opacity-25"
                />
                <Check className="text-emerald-600 w-14 h-14 relative z-10" strokeWidth={3} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Contribution Shared!</h2>
              <p className="text-gray-500 text-lg mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                Thank you for your generosity. Your surplus is now visible to people in need on the live map.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/map'}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-[24px] font-black hover:bg-black transition-all group shadow-xl hover:shadow-gray-200"
                >
                  Live Map View
                  <MapPin size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="px-10 py-5 bg-gray-100 text-gray-700 rounded-[24px] font-black hover:bg-gray-200 transition-all shadow-md"
                >
                  Share More
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
            >
              <form onSubmit={handleFinalSubmit}>
                <div className="p-8 md:p-16">
                  {step === 1 && (
                    <div className="space-y-10">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-4">Phase 01</span>
                          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Item Details</h2>
                          <p className="text-gray-500 font-medium mt-2">What kind of heritage food are you sharing today?</p>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                          <Info size={16} className="text-emerald-500" />
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Required Fields *</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {categories.map((cat) => (
                           <button
                            key={cat.id}
                            type="button"
                            onClick={() => setFoodForm({...foodForm, category: cat.id})}
                            className={`p-7 rounded-[32px] border-2 transition-all text-left flex flex-col gap-5 group relative overflow-hidden ${
                              foodForm.category === cat.id 
                                ? 'border-emerald-500 bg-emerald-50/30' 
                                : 'border-gray-100 hover:border-emerald-100 hover:bg-gray-50/50'
                            }`}
                           >
                              {foodForm.category === cat.id && (
                                <motion.div layoutId="cat-active" className="absolute top-4 right-4 text-emerald-600 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                                  <Check size={14} strokeWidth={4} />
                                </motion.div>
                              )}
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                foodForm.category === cat.id ? 'bg-emerald-500 text-white rotate-[10deg]' : 'bg-white text-gray-400 shadow-sm'
                              }`}>
                                <cat.icon size={28} />
                              </div>
                              <div>
                                <h4 className={`font-black text-lg transition-colors duration-300 ${foodForm.category === cat.id ? 'text-emerald-900' : 'text-gray-900'}`}>{cat.title}</h4>
                                <p className="text-[11px] text-gray-400 mt-1 font-bold leading-relaxed">{cat.desc}</p>
                              </div>
                           </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 gap-8 pt-4">
                        <div className="relative group">
                          <div className="flex items-center gap-2 mb-3">
                             <ClipboardList size={14} className="text-emerald-500" />
                             <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Food Title *</label>
                          </div>
                          <input
                            required
                            type="text"
                            value={foodForm.title}
                            onChange={(e) => setFoodForm({...foodForm, title: e.target.value})}
                            placeholder="e.g., Traditional Jabeli Platter"
                            className="w-full px-8 py-5 bg-[#F8FAFC] border-2 border-transparent rounded-[24px] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-inner"
                          />
                        </div>

                        <div className="relative group">
                          <div className="flex items-center gap-2 mb-3">
                             <Box size={14} className="text-emerald-500" />
                             <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Detailed Description *</label>
                          </div>
                          <textarea
                            required
                            value={foodForm.description}
                            onChange={(e) => setFoodForm({...foodForm, description: e.target.value})}
                            placeholder="Tell us about the preparation, ingredients, or any allergens people should know about..."
                            rows={4}
                            className="w-full px-8 py-5 bg-[#F8FAFC] border-2 border-transparent rounded-[24px] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-inner resize-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-10">
                       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-4">Phase 02</span>
                          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Logistics</h2>
                          <p className="text-gray-500 font-medium mt-2">Coordinate the pickup details smoothly.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                          <div className="flex items-center gap-2 mb-3">
                             <Package size={14} className="text-emerald-500" />
                             <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Portions <span className="normal-case opacity-50">(servings)</span> *</label>
                          </div>
                          <input
                            required
                            type="number"
                            min="1"
                            value={foodForm.quantity}
                            onChange={(e) => setFoodForm({...foodForm, quantity: parseInt(e.target.value)})}
                            className="w-full px-8 py-5 bg-[#F8FAFC] border-2 border-transparent rounded-[24px] focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-xl text-gray-900 shadow-inner"
                          />
                        </div>

                        <div className="relative group">
                          <div className="flex items-center gap-2 mb-3">
                             <Calendar size={14} className="text-emerald-500" />
                             <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Best Before Date *</label>
                          </div>
                          <input
                            required
                            type="date"
                            value={foodForm.expiryDate}
                            onChange={(e) => setFoodForm({...foodForm, expiryDate: e.target.value})}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-8 py-5 bg-[#F8FAFC] border-2 border-transparent rounded-[24px] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-900 shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="flex items-center gap-2 mb-3">
                           <MapPin size={14} className="text-emerald-500" />
                           <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Pickup Address *</label>
                        </div>
                        <input
                          required
                          type="text"
                          value={foodForm.address}
                          onChange={(e) => setFoodForm({...foodForm, address: e.target.value})}
                          placeholder="Search or enter exact location..."
                          className="w-full px-8 py-5 bg-[#F8FAFC] border-2 border-transparent rounded-[24px] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-900 shadow-inner"
                        />
                      </div>

                      <div className="relative group">
                        <div className="flex items-center justify-between mb-3">
                           <div className="flex items-center gap-2">
                             <Info size={14} className="text-emerald-500" />
                             <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Special Instructions</label>
                           </div>
                           <span className="text-[9px] font-black text-gray-300 uppercase letter-wider">Optional</span>
                        </div>
                        <textarea
                          value={foodForm.pickupInstructions}
                          onChange={(e) => setFoodForm({...foodForm, pickupInstructions: e.target.value})}
                          placeholder="e.g., Gate code is 1234, Leave at the reception..."
                          rows={2}
                          className="w-full px-8 py-5 bg-[#F8FAFC] border-2 border-transparent rounded-[24px] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-900 shadow-inner resize-none leading-relaxed"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-10">
                       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">Phase 03</span>
                          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Final Review</h2>
                          <p className="text-gray-500 font-medium mt-2">Add visuals and confirm your quality commitment.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                          {foodForm.foodImages.map((img, index) => (
                            <motion.div
                              key={img.preview}
                              layout
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="relative aspect-square rounded-[32px] overflow-hidden group shadow-lg border-2 border-white"
                            >
                              <img src={img.preview} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="w-10 h-10 bg-white/20 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md active:scale-90"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {foodForm.foodImages.length < 4 && (
                          <label className="aspect-square rounded-[32px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-200 transition-all group active:scale-[0.98]">
                            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-gray-300 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-all group-hover:rotate-12">
                              <Camera size={28} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-emerald-600">Upload Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              multiple
                            />
                          </label>
                        )}
                      </div>

                      <div className="p-8 rounded-[32px] border-2 border-emerald-50 bg-emerald-50/20 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-emerald-100 -z-10 rotate-12">
                           <Zap size={100} strokeWidth={3} />
                        </div>
                        <div className="flex items-start gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                            <Check size={24} strokeWidth={3} />
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-emerald-900 mb-2">Quality Pledge</h4>
                            <p className="text-emerald-700/80 text-sm font-semibold leading-relaxed">
                              I confirm that the shared items are fresh, hygienically prepared, and safe for consumption. I understand that my transparency helps build a stronger community.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky Mobile Footer or Regular Desktop Controls */}
                <div className="bg-[#F8FAFC] p-10 flex items-center justify-between border-t border-gray-100">
                   <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1 || isSubmitting}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                      step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-sm active:scale-95'
                    }`}
                   >
                    <ChevronLeft size={20} />
                    Previous
                   </button>

                   <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-3 px-12 py-5 bg-emerald-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-700 shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50 ${isSubmitting ? 'animate-pulse' : ''}`}
                   >
                    {isSubmitting ? 'Processing...' : step === 3 ? 'Finalize Sharing' : 'Proceed'}
                    {!isSubmitting && <ArrowRight size={20} />}
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 flex flex-col items-center gap-6 opacity-30 group hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-4">
              <span className="h-px w-24 bg-gray-900" />
              <div className="flex items-center gap-2">
                 <Package size={16} className="text-emerald-600" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900">Hack Heritage</span>
              </div>
              <span className="h-px w-24 bg-gray-900" />
           </div>
           <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Ensuring food security through heritage practices • 2025</p>
        </div>
      </div>
    </div>
  );
}
