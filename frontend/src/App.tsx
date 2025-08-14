import React, { useState, useEffect } from 'react';
import { WeatherData } from './types/weather';
import { weatherService } from './services/weatherService';
import { useGeolocation } from './hooks/useGeolocation';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CloudSun, AlertCircle } from 'lucide-react';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { coords, loading: locationLoading, error: locationError, getCurrentLocation } = useGeolocation();

  // Fetch weather by coordinates when location is obtained
  useEffect(() => {
    if (coords) {
      handleLocationWeather();
    }
  }, [coords]);

  const handleLocationWeather = async () => {
    if (!coords) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherService.getWeatherByCoords(coords);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data for your location');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherService.getWeatherByLocation(location);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the location and try again.');
      console.error('Weather search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    setError(null);
    getCurrentLocation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <CloudSun className="h-10 w-10" />
            <h1 className="text-4xl font-bold">WeatherScope</h1>
          </div>
          <p className="text-center text-lg opacity-90 mb-8">
            Get accurate weather forecasts for any location worldwide
          </p>
          
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            loading={loading}
            locationLoading={locationLoading}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Error Messages */}
        {(error || locationError) && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error || locationError}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mb-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Weather Card */}
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} />
            </div>
            
            {/* 5-Day Forecast */}
            <div className="lg:col-span-1">
              <ForecastCard forecast={weather.forecast_5_days} />
            </div>
          </div>
        )}

        {/* Welcome State */}
        {!weather && !loading && (
          <div className="text-center py-16">
            <CloudSun className="h-24 w-24 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to WeatherScope
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Search for any city or use your current location to get detailed weather information and a 5-day forecast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleLocationRequest}
                disabled={locationLoading}
                className="flex items-center space-x-2 rounded-xl bg-green-500 px-6 py-3 text-white transition-all duration-200 hover:bg-green-600 disabled:opacity-50"
              >
                <CloudSun className="h-5 w-5" />
                <span>Use My Location</span>
              </button>
              <span className="text-gray-500">or search for a city above</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-gray-400">
            Powered by OpenWeather API • Built with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;