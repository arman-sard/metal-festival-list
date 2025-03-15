import React, { useState } from 'react';
import { Container, Paper, Stack, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useQueryFestivals } from '../api/generated/apiComponents';
import { FestivalType } from '../api/generated/apiSchemas';
import { FestivalDetail } from '../components/FestivalDetail';
import { FestivalList } from '../components/FestivalList';
import { FestivalSearch } from '../components/FestivalSearch';
import { useFestivalFilter } from '../hooks/useFestivalFilter';

/**
 * Home Page Component
 *
 * Main festival listing page that integrates search, filtering, and detail view
 *
 * Features:
 * - Data fetching from the festivals API
 * - Search and filtering functionality
 * - Responsive festival grid display
 * - Detail view in a modal
 * - Loading and error states
 * - Internationalization support
 *
 * Note on potential improvements:
 * - Add pagination for large festival datasets
 * - Implement sorting options (by date, popularity, location)
 * - Add filters for specific time periods or genres
 * - Implement skeleton loaders for better loading UX
 * - Save search state to URL for shareable filtered views
 * - Cache API results to reduce network requests
 * - Add analytics tracking for search and view events
 * - Store recently viewed festivals in local storage
 * - Add keyboard navigation for accessibility
 * - Implement virtualized lists for better performance with large datasets
 *
 * Error handling improvements:
 * - Implement error boundaries to catch and handle component-level errors
 * - Add retry mechanism for failed API requests
 * - Create more informative error states with specific error codes
 * - Provide fallback content when API is unavailable (cached data)
 * - Log errors to monitoring service for tracking issues
 * - Add error details with expandable technical information (for developers)
 * - Implement different UI for different error types (network, auth, server)
 * - Create a layered error handling approach:
 *   • App level: Catch unexpected errors with Error Boundaries
 *   • Page level: Handle API and data fetching errors (current implementation)
 *   • Component level: Each component handles its own rendering and interaction errors
 */
export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFestival, setSelectedFestival] = useState<FestivalType | null>(
    null
  );
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Fetch festival data
  const { data: festivals, isLoading, error } = useQueryFestivals({});

  // Use our custom filter hook
  const { searchQuery, setSearchQuery, filteredFestivals } =
    useFestivalFilter(festivals);

  // Handle festival card click
  const handleFestivalClick = (festival: FestivalType) => {
    setSelectedFestival(festival);
    setDetailModalOpen(true);
  };

  return (
    <Container size="xl" py="xl">
      <Stack mb="xl">
        <Title order={1} mb="md">
          {t('HEADLINE')}
        </Title>
        <Text mb="xl">{t('GREETING')}</Text>

        {/* Search component */}
        <FestivalSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Loading and error states */}
        {isLoading && <Text>Loading festivals...</Text>}
        {/* Basic error handling - could be improved as noted in the component documentation */}
        {error && <Text color="red">Error loading festivals</Text>}

        {/* 
          A more robust error handling approach might look like:
          
          {error && (
            <Paper p="md" withBorder color="red">
              <Stack>
                <Title order={4}>Unable to load festivals</Title>
                <Text>
                  {getErrorMessage(error)} // Helper to extract user-friendly messages
                </Text>
                <Button onClick={() => refetch()}>
                  Try Again
                </Button>
                {process.env.NODE_ENV === 'development' && (
                  <Accordion>
                    <Accordion.Item value="details">
                      <Accordion.Control>Technical Details</Accordion.Control>
                      <Accordion.Panel>
                        <Code block>{JSON.stringify(error, null, 2)}</Code>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                )}
              </Stack>
            </Paper>
          )}
        */}

        {/* Festival list */}
        {!isLoading && !error && (
          <Paper p="md" shadow="xs" radius="md">
            <FestivalList
              festivals={filteredFestivals || []}
              onFestivalClick={handleFestivalClick}
            />
          </Paper>
        )}
      </Stack>

      {/* Festival detail modal */}
      <FestivalDetail
        festival={selectedFestival}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </Container>
  );
};
