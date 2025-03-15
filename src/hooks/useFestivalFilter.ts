import { useMemo, useState } from 'react';
import { FestivalType } from '../api/generated/apiSchemas';

/**
 * Custom hook for filtering festivals based on search criteria
 *
 * Features:
 * - Client-side filtering of festivals
 * - Filters by name, location (city/country), and artist names
 * - Case-insensitive search
 * - Memoized results to prevent unnecessary re-renders
 *
 * Note on potential improvements:
 * - Add debounced searching for performance with rapid typing
 * - Integrate with larger state management if needed insed of local useState; a global (Redux/Context) would allow:
 *     • Search state access across multiple components
 *     • State persistence during navigation
 *     • Connection to other features (sorting, pagination)
 * - Implement more complex filtering options (AND logic between fields, category-specific filters)
 * - Support URL-based (query search functionality) filters for shareable search results
 *     • Allows users to share specific search results, bookmark searches, and maintain criteria after page refresh
 *     • Requires backend API support for complete integration
 *
 * @param festivals - Array of festivals to filter
 * @returns Object containing search query state and filtered festivals
 */
export const useFestivalFilter = (festivals: FestivalType[] | undefined) => {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize the filtered festivals to avoid recalculating on every render
  const filteredFestivals = useMemo(() => {
    // If no festivals data or empty search query, return all festivals
    if (!festivals) return [];
    if (!searchQuery.trim()) return festivals;

    const query = searchQuery.toLowerCase().trim();

    return festivals.filter((festival) => {
      // Search by name
      if (festival.name?.toLowerCase().includes(query)) {
        return true;
      }

      // Search by location (city or country)
      if (
        festival.location?.city?.toLowerCase().includes(query) ||
        festival.location?.country?.toLowerCase().includes(query)
      ) {
        return true;
      }

      // Search by artists
      if (
        festival.artists?.some((artist) =>
          artist.name?.toLowerCase().includes(query)
        )
      ) {
        return true;
      }

      // No matches found
      return false;
    });
  }, [festivals, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFestivals,
  };
};
