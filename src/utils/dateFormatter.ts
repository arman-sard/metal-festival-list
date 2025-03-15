/**
 * Date formatting utility functions
 *
 * Current i18n features:
 * - Locale-aware date formatting via i18n.language
 * - Translated fallback messages
 * - English and German language support
 * - Extensible for additional languages
 *
 * Note on potential improvements:
 * - Implement timezone handling for global events
 * - Add memoization/caching for performance with repeated date formatting
 * - Use more advanced TypeScript patterns (generics, etc.) if complexity increases
 */

import i18n from '../i18n';

/**
 * Formats a date string into a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Mar 15, 2025" in English or "15. März 2025" in German)
 */
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return i18n.t('DATE_NA');

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return i18n.t('DATE_INVALID');
    }

    // Use the current language from i18n system
    return date.toLocaleDateString(i18n.language, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return i18n.t('ERROR');
  }
};

/**
 * Creates a date range string from start and end dates
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Formatted date range that adapts to the current language
 */
export const formatDateRange = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
): string => {
  if (!startDate) return i18n.t('DATE_NA');
  if (!endDate) return formatDate(startDate);

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return i18n.t('DATE_RANGE_INVALID');
    }

    // If same year, only show year once at the end
    if (start.getFullYear() === end.getFullYear()) {
      const startFormat = start.toLocaleDateString(i18n.language, {
        month: 'short',
        day: 'numeric',
      });

      const endFormat = end.toLocaleDateString(i18n.language, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      return `${startFormat} - ${endFormat}`;
    } else {
      // Different years, show both fully
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
  } catch (error) {
    console.error('Error formatting date range:', error);
    return i18n.t('ERROR');
  }
};
