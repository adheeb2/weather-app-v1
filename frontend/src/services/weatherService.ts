import axios from 'axios';
// import { WeatherData } from '../types/weather';
import type * as WeatherTypes from '../types/weather';
import type { LocationCoords } from '../types/weather';

const API_BASE_URL = 'http://localhost:3000/weather';

export const weatherService = {
  // Fetch weather by city name or string location
  async getWeatherByLocation(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(API_BASE_URL, {
        params: { location },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch weather for location "${location}": ${error.response?.data?.message || error.message}`
      );
    }
  },

  // Fetch weather by coordinates
  async getWeatherByCoords(coords: LocationCoords): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(API_BASE_URL, {
        params: { location: `${coords.latitude},${coords.longitude}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch weather for coordinates (${coords.latitude}, ${coords.longitude}): ${error.response?.data?.message || error.message}`
      );
    }
  },
};
