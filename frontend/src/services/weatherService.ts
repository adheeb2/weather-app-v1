import axios from 'axios';
import { WeatherData, LocationCoords } from '../types/weather';

const API_BASE_URL = 'http://localhost:3000/weather';

export const weatherService = {
  async getWeatherByLocation(location: string): Promise<WeatherData> {
    const response = await axios.get(API_BASE_URL, {
      params: { location }
    });
    return response.data;
  },

  async getWeatherByCoords(coords: LocationCoords): Promise<WeatherData> {
    const response = await axios.get(API_BASE_URL, {
      params: { location: `${coords.latitude},${coords.longitude}` }
    });
    return response.data;
  }
};