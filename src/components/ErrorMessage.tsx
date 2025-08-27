import React from 'react';
import { AlertCircle, X } from 'lucide-react';

// Props interface for the ErrorMessage component
interface ErrorMessageProps {
  message: string;                    // Error message to display
  onDismiss: () => void;             // Function called when error is dismissed
}

// Component to display error messages with dismiss functionality
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    // Error container with red styling and animation
    <div className="fixed top-4 right-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg shadow-lg animate-pulse z-50 max-w-md">
      <div className="flex items-center justify-between">
        {/* Error content */}
        <div className="flex items-center">
          {/* Warning icon */}
          <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
          
          {/* Error message text */}
          <p className="text-red-700 font-medium">
            {message}
          </p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={onDismiss} // Call dismiss function when clicked
          className="text-red-400 hover:text-red-600 transition-colors ml-4"
          aria-label="Dismiss error" // Accessibility label
        >
          <X className="w-5 h-5" /> {/* X icon for close */}
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;