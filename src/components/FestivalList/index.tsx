import { Button, Card, Group, Image, SimpleGrid, Text } from '@mantine/core';
import { FestivalType } from '../../api/generated/apiSchemas';
import { formatDateRange } from '../../utils/dateFormatter';

interface FestivalListProps {
  festivals: FestivalType[];
  onFestivalClick: (festival: FestivalType) => void;
}

/**
 * FestivalList Component
 *
 * Displays a grid of festival cards showing key information
 *
 * Features:
 * - Responsive grid layout
 * - Card-based UI for each festival
 * - Shows image, name, date, and location
 * - Click handler for viewing festival details
 *
 * Note on potential improvements:
 * - Add better handling for missing dates (currently shows "N/A")
 * - Improve display of incomplete location data
 * - Add loading state skeleton UI for images
 * - Implement virtualization for long festival lists
 *
 * @param festivals - Array of festivals to display
 * @param onFestivalClick - Handler for when a festival card is clicked
 */
export function FestivalList({
  festivals,
  onFestivalClick,
}: FestivalListProps) {
  if (!festivals || festivals.length === 0) {
    return <Text>No festivals found</Text>;
  }

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3 }}
      spacing="lg"
      verticalSpacing="xl"
    >
      {festivals.map((festival) => (
        <Card
          key={festival.id}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          onClick={() => onFestivalClick(festival)}
          style={{ cursor: 'pointer' }}
        >
          {festival.image && (
            <Card.Section>
              <Image
                src={festival.image}
                alt={festival.name || 'Festival image'}
                height={160}
                fit="cover"
              />
            </Card.Section>
          )}

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{festival.name}</Text>
          </Group>

          <Text size="sm" c="dimmed" mb="md">
            {formatDateRange(festival.start, festival.end)}
          </Text>

          <Text size="sm" c="dimmed" mb="md">
            {festival.location?.city}, {festival.location?.country}
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            View Details
          </Button>
        </Card>
      ))}
    </SimpleGrid>
  );
}
