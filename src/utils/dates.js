import { format } from 'date-fns';

const DATE_FORMAT_TYPES = {
  date_time_attribute: 'yyyy-MM-dd HH:mm',
  date_display: 'MMMM dd, yyyy',
  date_display_full: 'EEEE, MMMM d, yyyy',
};

/**
 * @typedef {"date_time_attribute"|"date_display"|"date_display_full"} DateFormat
 */

/**
 * Formats a date using the specified format.
 *
 * @param {string} date - The date to format.
 * @param {DateFormat} type - The format to use for formatting the date.
 * @returns {string} The formatted date string.
 * @throws {Error} If the output format is not provided.
 */
export const formatDate = (date, type) => {
  const outputFormat = DATE_FORMAT_TYPES[type];

  if (!outputFormat) {
    throw new Error(`Invalid format type: ${type}`);
  }

  return format(new Date(date), outputFormat);
};
