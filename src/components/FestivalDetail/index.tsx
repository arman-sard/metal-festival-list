import { Divider, Group, Image, List, Modal, Text, Title } from '@mantine/core';
import { FestivalType } from '../../api/generated/apiSchemas';
import { formatDateRange } from '../../utils/dateFormatter';

interface FestivalDetailProps {
  festival: FestivalType | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * FestivalDetail Component
 *
 * Displays detailed information about a festival in a modal
 *
 * Features:
 * - Modal-based detail view
 * - Responsive layout
 * - Conditional rendering of available data
 * - External link to festival website
 *
 * Note on potential improvements:
 * - Add fallback UI for missing images
 * - Improve handling of missing date information
 * - Add location map
 * - Implement image gallery for festivals with multiple images
 * - Add social sharing functionality
 *
 * @param festival - Festival to display details for
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to close the modal
 */
export function FestivalDetail({
  festival,
  isOpen,
  onClose,
}: FestivalDetailProps) {
  if (!festival) return null;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Title order={3}>{festival.name}</Title>}
      size="lg"
    >
      {festival.image && (
        <Image
          src={festival.image}
          alt={festival.name || 'Festival image'}
          height={200}
          fit="cover"
          radius="md"
          mb="md"
        />
      )}

      <Group mb="xs">
        <Text fw={500}>{formatDateRange(festival.start, festival.end)}</Text>
      </Group>

      <Text mb="md">
        {festival.location?.city}, {festival.location?.country}
      </Text>

      {festival.info && (
        <>
          <Divider my="md" />
          <Text>{festival.info}</Text>
        </>
      )}

      {festival.artists && festival.artists.length > 0 && (
        <>
          <Divider my="md" />
          <Title order={4} mb="sm">
            Artists
          </Title>
          <List>
            {festival.artists.map((artist, index) => (
              <List.Item key={index}>{artist.name}</List.Item>
            ))}
          </List>
        </>
      )}

      {festival.link && (
        <Group mt="md">
          <Text fw={500}>Website:</Text>
          <Text
            component="a"
            href={festival.link}
            target="_blank"
            rel="noopener noreferrer"
            c="blue"
          >
            Visit Website
          </Text>
        </Group>
      )}
    </Modal>
  );
}
