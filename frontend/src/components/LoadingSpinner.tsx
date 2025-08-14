import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="relative">
        {/* Animated weather icons */}
        <div className="flex space-x-4">
          <Sun className="h-8 w-8 text-yellow-500 animate-pulse" />
          <Cloud className="h-8 w-8 text-blue-500 animate-bounce" />
          <CloudRain className="h-8 w-8 text-blue-600 animate-pulse" />
        </div>
        
        {/* Loading dots */}
        <div className="mt-4 flex justify-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></div>
        </div>
      </div>
      
      <p className="text-lg font-medium text-gray-600">
        Fetching weather data...
      </p>
    </div>
  );
};