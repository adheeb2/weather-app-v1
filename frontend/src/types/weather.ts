export type WeatherData = {
  lat: number;
  lon: number;
  tz: string;
  date: string;
  units: string;
  weather_overview: string;
  forecast_5_days: ForecastDay[];
};

export type ForecastDay = {
  date: string;
  temp_min: number;
  temp_max: number;
  weather: string;
  icon: string;
};

export type LocationCoords = {
  latitude: number;
  longitude: number;
};
