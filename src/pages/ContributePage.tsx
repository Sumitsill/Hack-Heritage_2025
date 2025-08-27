// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Upload, MapPin, Clock, Camera, Plus, X } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { useAppStore } from '../stores/useAppStore';
// import toast from 'react-hot-toast';

// interface ContributeFormData {
//   title: string;
//   description: string;
//   quantity: number;
//   category: 'prepared' | 'raw' | 'packaged';
//   expiryDate: string;
//   address: string;
//   pickupInstructions: string;
// }

// export default function ContributePage() {
//   const [images, setImages] = useState<string[]>([]);
//   const { addFoodItem } = useAppStore();
//   const { register, handleSubmit, reset, formState: { errors } } = useForm<ContributeFormData>();

//   const onSubmit = async (data: ContributeFormData) => {
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       addFoodItem({
//         ...data,
//         location: {
//           lat: 40.7128 + (Math.random() - 0.5) * 0.1,
//           lng: -74.0060 + (Math.random() - 0.5) * 0.1,
//           address: data.address
//         },
//         contributor: 'Current User',
//         status: 'available',
//         imageUrl: images[0] || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
//       });

//       toast.success('Food contribution added successfully!');
//       reset();
//       setImages([]);
//     } catch (error) {
//       toast.error('Failed to add contribution. Please try again.');
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImages(prev => [...prev, event.target?.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index: number) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           className="bg-white rounded-2xl shadow-lg p-8"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               Share Your Food
//             </h1>
//             <p className="text-lg text-gray-600">
//               Help reduce food waste by sharing your surplus with those in need
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Images */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Food Photos
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                 {images.map((image, index) => (
//                   <motion.div
//                     key={index}
//                     className="relative aspect-square rounded-lg overflow-hidden"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <img src={image} alt={`Food ${index + 1}`} className="w-full h-full object-cover" />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <X size={12} />
//                     </button>
//                   </motion.div>
//                 ))}
                
//                 {images.length < 4 && (
//                   <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
//                     <Camera size={24} className="text-gray-400 mb-2" />
//                     <span className="text-sm text-gray-500">Add Photo</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       multiple
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>

//             {/* Basic Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Food Title *
//                 </label>
//                 <input
//                   {...register('title', { required: 'Title is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   placeholder="e.g., Fresh vegetables, Prepared meals"
//                 />
//                 {errors.title && (
//                   <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   {...register('category', { required: 'Category is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                 >
//                   <option value="">Select category</option>
//                   <option value="prepared">Prepared Meals</option>
//                   <option value="raw">Raw Ingredients</option>
//                   <option value="packaged">Packaged Food</option>
//                 </select>
//                 {errors.category && (
//                   <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 {...register('description', { required: 'Description is required' })}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
//                 placeholder="Describe the food, ingredients, preparation method, etc."
//               />
//               {errors.description && (
//                 <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
//               )}
//             </div>

//             {/* Quantity and Expiry */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Quantity (portions) *
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   {...register('quantity', { 
//                     required: 'Quantity is required',
//                     min: { value: 1, message: 'Minimum 1 portion required' }
//                   })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   placeholder="Number of people this can feed"
//                 />
//                 {errors.quantity && (
//                   <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Best Before Date *
//                 </label>
//                 <input
//                   type="date"
//                   {...register('expiryDate', { required: 'Expiry date is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//                 {errors.expiryDate && (
//                   <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Location */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pickup Address *
//               </label>
//               <div className="relative">
//                 <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register('address', { required: 'Address is required' })}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   placeholder="Enter pickup address"
//                 />
//               </div>
//               {errors.address && (
//                 <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
//               )}
//             </div>

//             {/* Pickup Instructions */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pickup Instructions
//               </label>
//               <textarea
//                 {...register('pickupInstructions')}
//                 rows={3}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
//                 placeholder="Special instructions for pickup (optional)"
//               />
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               type="submit"
//               className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Share Food
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Camera, X } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { useAppStore } from '../stores/useAppStore';
// import toast from 'react-hot-toast';

// interface ContributeFormData {
//   title: string;
//   description: string;
//   quantity: number;
//   category: 'prepared' | 'raw' | 'packaged';
//   expiryDate: string;
//   address: string;
//   pickupInstructions: string;
// }

// export default function ContributePage() {
//   const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [uploadFiles, setUploadFiles] = useState<File[]>([]);
//   const { addFoodItem } = useAppStore();
//   const { register, handleSubmit, reset, formState: { errors } } = useForm<ContributeFormData>();

  // const handleSubmit = async (data: ContributeFormData) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", data.title);
  //     formData.append("category", data.category);
  //     formData.append("description", data.description);
  //     formData.append("quantity", data.quantity.toString());
  //     formData.append("expiry_date", data.expiryDate); // snake_case for Django
  //     formData.append("address", data.address);
  //     if (data.pickupInstructions) {
  //       formData.append("pickup_instructions", data.pickupInstructions);
  //     }

  //     // append real files
  //     uploadFiles.forEach((file) => {
  //       formData.append("uploaded_images", file);
  //     });

  //     const response = await fetch("http://127.0.0.1:8000/food_api/", {
  //       method: "POST",
  //       headers: {
  //         // Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       const errData = await response.json();
  //       console.error("Upload failed:", errData);
  //       toast.error("Failed to share food");
  //       return;
  //     }

  //     const result = await response.json();
  //     addFoodItem(result);  // ✅ add real Django response to store

  //     toast.success("Food shared successfully!");
  //     reset();
  //     setPreviewImages([]);
  //     setUploadFiles([]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Error uploading food");
  //   }
  // };

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import AxiosInstance from "../AxiosInstance";
// import { motion } from "framer-motion";
// import { Camera, X, MapPin } from "lucide-react";

// type FormValues = {
//   title: string;
//   category: string;
//   description: string;
//   quantity: number;
//   expiryDate: string;
//   address: string;
//   pickupInstructions?: string;
// };

// export default function ContributePage() {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
//   const [uploadFiles, setUploadFiles] = useState<File[]>([]);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("category", data.category);
//       formData.append("description", data.description);
//       formData.append("quantity", data.quantity.toString());
//       formData.append("expiry_date", data.expiryDate);
//       formData.append("address", data.address);
//       formData.append("pickup_instructions", data.pickupInstructions || "");

//       // append uploaded images
//       uploadFiles.forEach((file) => {
//         formData.append("uploaded_images", file);
//       });

//       const response = await AxiosInstance.post("http://127.0.0.1:8000/food_api/", formData, {
//         headers: {
//           method: "POST",
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("✅ Success:", response.data);
//     } catch (error: any) {
//       console.error("❌ Upload failed:", error.response?.data || error.message);
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     files.forEach(file => {
//       setUploadFiles(prev => [...prev, file]);

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreviewImages(prev => [...prev, event.target?.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index: number) => {
//     setPreviewImages(prev => prev.filter((_, i) => i !== index));
//     setUploadFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           className="bg-white rounded-2xl shadow-lg p-8"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               Share Your Food
//             </h1>
//             <p className="text-lg text-gray-600">
//               Help reduce food waste by sharing your surplus with those in need
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//             {/* Images */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Food Photos
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                 {previewImages.map((image, index) => (
//                   <motion.div
//                     key={index}
//                     className="relative aspect-square rounded-lg overflow-hidden"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <img src={image} alt={`Food ${index + 1}`} className="w-full h-full object-cover" />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <X size={12} />
//                     </button>
//                   </motion.div>
//                 ))}
//                 {previewImages.length < 4 && (
//                   <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
//                     <Camera size={24} className="text-gray-400 mb-2" />
//                     <span className="text-sm text-gray-500">Add Photo</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       multiple
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>

//             {/* Title & Category */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Food Title *
//                 </label>
//                 <input
//                   {...register('title', { required: 'Title is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   placeholder="e.g., Fresh vegetables, Prepared meals"
//                 />
//                 {errors.title && (
//                   <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   {...register('category', { required: 'Category is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                 >
//                   <option value="">Select category</option>
//                   <option value="prepared">Prepared Meals</option>
//                   <option value="raw">Raw Ingredients</option>
//                   <option value="packaged">Packaged Food</option>
//                 </select>
//                 {errors.category && (
//                   <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 {...register('description', { required: 'Description is required' })}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
//                 placeholder="Describe the food, ingredients, preparation method, etc."
//               />
//               {errors.description && (
//                 <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
//               )}
//             </div>

//             {/* Quantity & Expiry */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Quantity (portions) *
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   {...register('quantity', { 
//                     required: 'Quantity is required',
//                     min: { value: 1, message: 'Minimum 1 portion required' }
//                   })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   placeholder="Number of people this can feed"
//                 />
//                 {errors.quantity && (
//                   <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Best Before Date *
//                 </label>
//                 <input
//                   type="date"
//                   {...register('expiryDate', { required: 'Expiry date is required' })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//                 {errors.expiryDate && (
//                   <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pickup Address *
//               </label>
//               <div className="relative">
//                 <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register('address', { required: 'Address is required' })}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                   placeholder="Enter pickup address"
//                 />
//               </div>
//               {errors.address && (
//                 <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
//               )}
//             </div>

//             {/* Pickup Instructions */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pickup Instructions
//               </label>
//               <textarea
//                 {...register('pickupInstructions')}
//                 rows={3}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
//                 placeholder="Special instructions for pickup (optional)"
//               />
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               type="submit"
//               className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Share Food
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { MapPin, Upload, Camera, X } from "lucide-react";

function FoodDonation() {
  const [foodForm, setFoodForm] = useState({
    title: "",
    category: "",
    description: "",
    quantity: 1,
    expiryDate: "",
    address: "",
    pickupInstructions: "",
    foodImages: [] as File[],
  });

  // --- Image Handling for Food Donation ---
  const handleFoodImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    setFoodForm((prev) => ({
      ...prev,
      foodImages: [...prev.foodImages, ...validFiles].slice(0, 4), // max 4 images
    }));
  };

  const removeFoodImage = (index: number) => {
    setFoodForm((prev) => ({
      ...prev,
      foodImages: prev.foodImages.filter((_, i) => i !== index),
    }));
  };

  // --- Submit Handler ---
  const handleFoodDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", foodForm.title);
      formData.append("category", foodForm.category);
      formData.append("description", foodForm.description);
      formData.append("quantity", foodForm.quantity.toString());
      formData.append("expiry_date", foodForm.expiryDate);
      formData.append("address", foodForm.address);
      formData.append("pickup_instructions", foodForm.pickupInstructions);

      foodForm.foodImages.forEach((file: File) => {
        formData.append("uploaded_images", file);
      });

      const response = await fetch("http://127.0.0.1:8000/food_api/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Food donation submitted successfully!");
        setFoodForm({
          title: "",
          category: "",
          description: "",
          quantity: 1,
          expiryDate: "",
          address: "",
          pickupInstructions: "",
          foodImages: [],
        });
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        alert("Error submitting form.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error.");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Share Your Food
            </h1>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Help reduce food waste by sharing your surplus with those in need.
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleFoodDonationSubmit} className="space-y-8">
            
            {/* Food Title + Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Food Title *
                </label>
                <input
                  type="text"
                  value={foodForm.title}
                  onChange={(e) => setFoodForm({ ...foodForm, title: e.target.value })}
                  placeholder="e.g., Fresh vegetables, Prepared meals"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category *
                </label>
                <select
                  value={foodForm.category}
                  onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="prepared">Prepared Meals</option>
                  <option value="raw">Raw Ingredients</option>
                  <option value="packaged">Packaged Food</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Description *
              </label>
              <textarea
                value={foodForm.description}
                onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
                placeholder="Describe the food, ingredients, preparation method, etc."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                required
              />
            </div>

            {/* Quantity + Expiry Date */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantity (portions) *
                </label>
                <input
                  type="number"
                  min="1"
                  value={foodForm.quantity}
                  onChange={(e) =>
                    setFoodForm({ ...foodForm, quantity: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Best Before Date *
                </label>
                <input
                  type="date"
                  value={foodForm.expiryDate}
                  onChange={(e) =>
                    setFoodForm({ ...foodForm, expiryDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Pickup Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pickup Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={foodForm.address}
                  onChange={(e) => setFoodForm({ ...foodForm, address: e.target.value })}
                  placeholder="Enter pickup address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Pickup Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pickup Instructions
              </label>
              <textarea
                value={foodForm.pickupInstructions}
                onChange={(e) =>
                  setFoodForm({ ...foodForm, pickupInstructions: e.target.value })
                }
                placeholder="Special instructions for pickup (optional)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Upload Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Food Images (Max 4)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-300 transition-colors">
                <input
                  type="file"
                  id="food-image-upload"
                  multiple
                  accept="image/png,image/jpeg"
                  onChange={handleFoodImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="food-image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-1">
                    Click to upload images
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG up to 5MB each (max 4 images)
                  </p>
                </label>
              </div>

              {/* Preview Images */}
              {foodForm.foodImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {foodForm.foodImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFoodImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Share Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoodDonation;
