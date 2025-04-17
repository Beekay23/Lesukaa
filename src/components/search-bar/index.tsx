"use client";

import { useState, useCallback } from 'react';
import { SearchIcon } from '../icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Add debouncing to prevent too many search calls
  const debouncedSearch = useCallback((query: string) => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [onSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const query = e.target.value;
      setSearchQuery(query);
      debouncedSearch(query);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto lg:px-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search food and drinks..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#029E1F] focus:border-transparent text-sm sm:text-base"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#029E1F] border-t-transparent rounded-full animate-spin" />
            ) : (
              <SearchIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
