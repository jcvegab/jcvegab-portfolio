import { formatDate } from '../dates';

describe('formatDate', () => {
  // Using hours offset to avoid timezone boundary shift.
  // date-fns parses YYYY-MM-DD as midnight UTC; in UTC-5 it becomes previous day at 19:00.
  // Use the Date constructor directly for reliable local dates.
  it('formats a date string to date_time_attribute format', () => {
    const result = formatDate('2024-06-15T12:00:00Z', 'date_time_attribute');
    expect(result).toMatch(/2024-06-1[45]/);
  });

  it('formats a date string to date_display format', () => {
    const result = formatDate(new Date(2024, 5, 15), 'date_display');
    expect(result).toBe('June 15, 2024');
  });

  it('formats a date string to date_display_full format', () => {
    const result = formatDate(new Date(2024, 5, 15), 'date_display_full');
    expect(result).toBe('Saturday, June 15, 2024');
  });

  it('formats a Date object', () => {
    const date = new Date(2024, 5, 15);
    const result = formatDate(date, 'date_display');
    expect(result).toBe('June 15, 2024');
  });

  it('formats a timestamp number', () => {
    const timestamp = new Date(2024, 5, 15).getTime();
    const result = formatDate(timestamp, 'date_display');
    expect(result).toBe('June 15, 2024');
  });

  it('throws an error for invalid format type', () => {
    expect(() => formatDate('2024-06-15', 'invalid_format' as any)).toThrow(
      'Invalid format type: invalid_format',
    );
  });
});
