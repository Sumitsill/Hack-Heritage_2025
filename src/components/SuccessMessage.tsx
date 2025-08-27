import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

// Props interface for the SuccessMessage component
interface SuccessMessageProps {
  message: string;                    // Success message to display
  onDismiss: () => void;             // Function called when message is dismissed
  autoHide?: boolean;                // Whether to auto-hide after a delay
  duration?: number;                 // How long to show before auto-hiding (in ms)
}

// Component to display success messages
const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message, 
  onDismiss, 
  autoHide = true,    // Default to auto-hide
  duration = 5000     // Default 5 seconds
}) => {
  // Auto-hide effect
  useEffect(() => {
    if (autoHide) {
      // Set timer to auto-dismiss after specified duration
      const timer = setTimeout(() => {
        onDismiss(); // Call dismiss function
      }, duration);

      // Cleanup timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onDismiss]); // Dependencies for effect

  return (
    // Success container with green styling and slide-in animation
    <div className="fixed top-4 right-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg shadow-lg animate-slide-in z-50 max-w-md">
      <div className="flex items-center justify-between">
        {/* Success content */}
        <div className="flex items-center">
          {/* Success icon */}
          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
          
          {/* Success message text */}
          <p className="text-green-700 font-medium">
            {message}
          </p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={onDismiss} // Call dismiss function when clicked
          className="text-green-400 hover:text-green-600 transition-colors ml-4"
          aria-label="Dismiss success message" // Accessibility label
        >
          <X className="w-5 h-5" /> {/* X icon for close */}
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;