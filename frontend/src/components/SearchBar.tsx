import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onLocationRequest: () => void;
  loading: boolean;
  locationLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationRequest, 
  loading, 
  locationLoading 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city or location..."
            className="w-full rounded-2xl bg-white/90 backdrop-blur-sm py-4 pl-12 pr-32 text-lg shadow-xl transition-all duration-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            disabled={loading}
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 space-x-2">
            <button
              type="button"
              onClick={onLocationRequest}
              disabled={locationLoading || loading}
              className="flex items-center space-x-2 rounded-xl bg-green-500 px-4 py-2 text-white transition-all duration-200 hover:bg-green-600 disabled:opacity-50"
            >
              {locationLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">GPS</span>
            </button>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center space-x-2 rounded-xl bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};