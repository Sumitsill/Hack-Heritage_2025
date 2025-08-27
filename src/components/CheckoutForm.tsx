import React, { useState } from 'react';
import { CustomerInfo } from '../types';
import { User, Mail, MapPin, Phone, CreditCard } from 'lucide-react';

// Props interface for the CheckoutForm component
interface CheckoutFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void; // Function called when form is submitted
  isLoading: boolean;                             // Whether order is being processed
  total: number;                                  // Total order amount
}

// Component for checkout form
const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isLoading, total }) => {
  // State for form data
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',       // Customer's full name
    email: '',      // Customer's email
    address: '',    // Shipping address
    city: '',       // City
    zipCode: '',    // ZIP code
    phone: ''       // Phone number
  });

  // State for form validation errors
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Get field name and value
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value // Update the specific field
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof CustomerInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined // Remove error for this field
      }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    // Check required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Basic email validation regex
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // Set errors and return validation result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form before submitting
    if (validateForm()) {
      onSubmit(formData); // Call the submit function with form data
    }
  };

  return (
    // Main checkout form container
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Form header */}
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
      </div>

      {/* Order summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount:</span>
          <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Information
          </h3>

          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {/* Show error message if exists */}
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {/* Show error message if exists */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              <Phone className="w-4 h-4 inline mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
            {/* Show error message if exists */}
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Shipping Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Shipping Information
          </h3>

          {/* Address field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your street address"
            />
            {/* Show error message if exists */}
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* City and ZIP code row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City field */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your city"
              />
              {/* Show error message if exists */}
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* ZIP code field */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter ZIP code"
              />
              {/* Show error message if exists */}
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading} // Disable while processing
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed' // Disabled styling
                : 'bg-blue-500 hover:bg-blue-600' // Active styling
            } text-white`}
          >
            {/* Button text based on loading state */}
            {isLoading ? 'Processing Order...' : `Place Order - $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;