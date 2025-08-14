import React from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon, getWeatherGradient } from '../utils/weatherIcons';
import { MapPin, Thermometer, Wind, Droplets, Gauge, Calendar } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const currentTemp = weather.forecast_5_days[0]?.temp_max || 0;
  const feelsLike = weather.weather_overview.match(/feels like ([\d.]+)°C/)?.[1] || '0';
  const windSpeed = weather.weather_overview.match(/Wind speed is ([\d.]+) m\/s/)?.[1] || '0';
  const humidity = weather.weather_overview.match(/humidity is (\d+)%/)?.[1] || '0';
  const pressure = weather.weather_overview.match(/pressure is (\d+) hPa/)?.[1] || '0';
  
  const isNight = weather.forecast_5_days[0]?.icon.includes('n');
  const WeatherIcon = getWeatherIcon(weather.forecast_5_days[0]?.icon || '01d');
  const gradient = getWeatherGradient(weather.forecast_5_days[0]?.icon || '01d', isNight);

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 text-white shadow-2xl`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-medium">
              {weather.lat.toFixed(2)}, {weather.lon.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">{weather.tz}</div>
            <div className="text-sm opacity-80">
              {new Date(weather.date).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-6xl font-bold">{Math.round(currentTemp)}°</div>
            <div className="text-xl capitalize opacity-90">
              {weather.forecast_5_days[0]?.weather}
            </div>
            <div className="text-sm opacity-75">
              Feels like {feelsLike}°C
            </div>
          </div>
          <div className="text-right">
            <WeatherIcon className="h-24 w-24 drop-shadow-lg" />
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Wind className="h-5 w-5 opacity-80" />
            <div>
              <div className="text-sm opacity-75">Wind</div>
              <div className="font-semibold">{windSpeed} m/s</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Droplets className="h-5 w-5 opacity-80" />
            <div>
              <div className="text-sm opacity-75">Humidity</div>
              <div className="font-semibold">{humidity}%</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Gauge className="h-5 w-5 opacity-80" />
            <div>
              <div className="text-sm opacity-75">Pressure</div>
              <div className="font-semibold">{pressure} hPa</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Thermometer className="h-5 w-5 opacity-80" />
            <div>
              <div className="text-sm opacity-75">Range</div>
              <div className="font-semibold">
                {Math.round(weather.forecast_5_days[0]?.temp_min || 0)}° - {Math.round(weather.forecast_5_days[0]?.temp_max || 0)}°
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};