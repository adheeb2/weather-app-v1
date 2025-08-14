import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle,
  Eye,
  CloudLightning
} from 'lucide-react';

export const getWeatherIcon = (iconCode: string) => {
  const iconMap: Record<string, any> = {
    '01d': Sun,      // clear sky day
    '01n': Sun,      // clear sky night
    '02d': Cloud,    // few clouds day
    '02n': Cloud,    // few clouds night
    '03d': Cloud,    // scattered clouds day
    '03n': Cloud,    // scattered clouds night
    '04d': Cloud,    // broken clouds day
    '04n': Cloud,    // broken clouds night
    '09d': CloudDrizzle, // shower rain day
    '09n': CloudDrizzle, // shower rain night
    '10d': CloudRain,    // rain day
    '10n': CloudRain,    // rain night
    '11d': CloudLightning, // thunderstorm day
    '11n': CloudLightning, // thunderstorm night
    '13d': CloudSnow,    // snow day
    '13n': CloudSnow,    // snow night
    '50d': Eye,          // mist day
    '50n': Eye,          // mist night
  };

  return iconMap[iconCode] || Cloud;
};

export const getWeatherGradient = (iconCode: string, isNight: boolean = false) => {
  if (isNight) {
    return 'from-slate-900 via-purple-900 to-slate-900';
  }

  const gradientMap: Record<string, string> = {
    '01d': 'from-blue-400 via-blue-500 to-blue-600', // clear sky
    '02d': 'from-blue-400 via-blue-500 to-gray-500', // few clouds
    '03d': 'from-gray-400 via-gray-500 to-gray-600', // scattered clouds
    '04d': 'from-gray-500 via-gray-600 to-gray-700', // broken clouds
    '09d': 'from-gray-600 via-blue-600 to-blue-700', // shower rain
    '10d': 'from-blue-600 via-blue-700 to-gray-700', // rain
    '11d': 'from-gray-700 via-purple-700 to-gray-800', // thunderstorm
    '13d': 'from-blue-200 via-blue-300 to-gray-400', // snow
    '50d': 'from-gray-400 via-gray-500 to-blue-500', // mist
  };

  return gradientMap[iconCode] || 'from-blue-400 via-blue-500 to-blue-600';
};