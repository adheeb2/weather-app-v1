import { useState, useEffect } from 'react';
import { LocationCoords } from '../types/weather';

interface GeolocationState {
  coords: LocationCoords | null;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    loading: false,
    error: null
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported by this browser' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          loading: false,
          error: null
        });
      },
      (error) => {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return {
    ...state,
    getCurrentLocation
  };
};