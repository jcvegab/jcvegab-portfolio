import { format } from 'date-fns';

const DATE_FORMAT_TYPES = {
  date_time_attribute: 'yyyy-MM-dd HH:mm',
  date_display: 'MMMM dd, yyyy',
  date_display_full: 'EEEE, MMMM d, yyyy',
};

type DateFormat = 'date_time_attribute' | 'date_display' | 'date_display_full';

/**
 * Formats a date using the specified format.
 * @returns {string} The formatted date string.
 * @throws {Error} If the output format is not provided.
 */
export const formatDate = (
  date: string | number | Date,
  type: DateFormat,
): string => {
  const outputFormat = DATE_FORMAT_TYPES[type];

  if (!outputFormat) {
    throw new Error(`Invalid format type: ${type}`);
  }

  return format(new Date(date), outputFormat);
};
