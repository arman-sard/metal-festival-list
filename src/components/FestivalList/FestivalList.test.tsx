import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { FestivalType } from '../../api/generated/apiSchemas';
import { FestivalList } from './index';

// Mock the dateFormatter module to avoid i18n complexities in tests
jest.mock('../../utils/dateFormatter', () => ({
  formatDateRange: jest.fn(() => 'Mar 15 - Mar 20, 2023'),
}));

describe('FestivalList Component', () => {
  const mockFestivals: FestivalType[] = [
    {
      id: '1',
      name: 'Metal Festival 2023',
      start: '2023-03-15',
      end: '2023-03-20',
      location: {
        city: 'Berlin',
        country: 'Germany',
      },
    },
    {
      id: '2',
      name: 'Rock Fest',
      start: '2023-07-10',
      end: '2023-07-15',
      location: {
        city: 'Munich',
        country: 'Germany',
      },
    },
  ];

  const mockOnFestivalClick = jest.fn();

  test('renders a list of festivals', () => {
    render(
      <MantineProvider>
        <FestivalList
          festivals={mockFestivals}
          onFestivalClick={mockOnFestivalClick}
        />
      </MantineProvider>
    );

    // Check if festival names are displayed
    expect(screen.getByText('Metal Festival 2023')).toBeInTheDocument();
    expect(screen.getByText('Rock Fest')).toBeInTheDocument();

    // Check if locations are displayed
    expect(screen.getByText('Berlin, Germany')).toBeInTheDocument();
    expect(screen.getByText('Munich, Germany')).toBeInTheDocument();
  });

  test('renders "No festivals found" when list is empty', () => {
    render(
      <MantineProvider>
        <FestivalList festivals={[]} onFestivalClick={mockOnFestivalClick} />
      </MantineProvider>
    );

    expect(screen.getByText('No festivals found')).toBeInTheDocument();
  });
});
