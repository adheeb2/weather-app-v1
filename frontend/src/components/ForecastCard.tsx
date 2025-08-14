import React from 'react';
import { ForecastDay } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-sm p-6 shadow-xl">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.icon);
          const isToday = index === 0;
          
          return (
            <div
              key={day.date}
              className={`flex items-center justify-between rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] ${
                isToday 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <WeatherIcon 
                  className={`h-8 w-8 ${isToday ? 'text-white' : 'text-blue-600'}`} 
                />
                <div>
                  <div className={`font-semibold ${isToday ? 'text-white' : 'text-gray-800'}`}>
                    {getDayName(day.date)}
                  </div>
                  <div className={`text-sm capitalize ${isToday ? 'text-blue-100' : 'text-gray-600'}`}>
                    {day.weather}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-bold ${isToday ? 'text-white' : 'text-gray-800'}`}>
                  {Math.round(day.temp_max)}°
                </div>
                <div className={`text-sm ${isToday ? 'text-blue-100' : 'text-gray-500'}`}>
                  {Math.round(day.temp_min)}°
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};