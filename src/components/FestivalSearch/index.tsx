import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group, TextInput } from '@mantine/core';

interface FestivalSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/**
 * FestivalSearch Component
 *
 * Provides a search input for filtering festivals
 *
 * Features:
 * - Clean search input with icon
 * - Real-time filtering as user types
 * - Full-width responsive design
 *
 * Note on potential improvements:
 * - Add debounced search for better performance
 * - Implement advanced filters (by date, location, genre)
 * - Add autocomplete suggestions based on festivals data
 * - Include search history or recent searches
 *
 * @param searchQuery - Current search query
 * @param setSearchQuery - Function to update search query
 */
export function FestivalSearch({
  searchQuery,
  setSearchQuery,
}: FestivalSearchProps) {
  return (
    <Group mb="xl">
      <TextInput
        placeholder="Search festivals by name, location, or artist..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        leftSection={<FontAwesomeIcon icon={faSearch} size="sm" />}
        style={{ flexGrow: 1 }}
      />
    </Group>
  );
}
