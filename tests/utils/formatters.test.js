import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  formatPercentage,
  formatLargeNumber,
  capitalizeWords,
  truncateText
} from '../../src/utils/formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format valid currency amounts', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(99.99)).toBe('$99.99');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(-50.25)).toBe('-$50.25');
    });

    it('should handle invalid inputs', () => {
      expect(formatCurrency(NaN)).toBe('$0.00');
      expect(formatCurrency(null)).toBe('$0.00');
      expect(formatCurrency(undefined)).toBe('$0.00');
      expect(formatCurrency('invalid')).toBe('$0.00');
    });

    it('should format with different currencies', () => {
      expect(formatCurrency(100, 'EUR')).toBe('€100.00');
      expect(formatCurrency(100, 'GBP')).toBe('£100.00');
    });
  });

  describe('formatDate', () => {
    const testDate = new Date('2023-12-25');

    it('should format dates with different formats', () => {
      expect(formatDate(testDate, 'short')).toBe('Dec 25');
      expect(formatDate(testDate, 'medium')).toBe('Dec 25, 2023');
      expect(formatDate(testDate, 'long')).toBe('Monday, December 25, 2023');
    });

    it('should handle string dates', () => {
      expect(formatDate('2023-12-25', 'medium')).toBe('Dec 25, 2023');
    });

    it('should handle invalid dates', () => {
      expect(formatDate('invalid')).toBe('Invalid Date');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });

    it('should use medium format as default', () => {
      expect(formatDate(testDate)).toBe('Dec 25, 2023');
    });
  });

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      // Mock current time to December 25, 2023, 12:00 PM
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-12-25T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should format recent times', () => {
      const now = new Date('2023-12-25T12:00:00Z');
      const fiveMinutesAgo = new Date('2023-12-25T11:55:00Z');
      const oneHourAgo = new Date('2023-12-25T11:00:00Z');
      const twoHoursAgo = new Date('2023-12-25T10:00:00Z');

      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
      expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago');
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago');
    });

    it('should format days', () => {
      const yesterday = new Date('2023-12-24T12:00:00Z');
      const twoDaysAgo = new Date('2023-12-23T12:00:00Z');
      const aWeekAgo = new Date('2023-12-18T12:00:00Z');

      expect(formatRelativeTime(yesterday)).toBe('Yesterday');
      expect(formatRelativeTime(twoDaysAgo)).toBe('2 days ago');
      expect(formatRelativeTime(aWeekAgo)).toBe('Dec 18, 2023');
    });

    it('should handle invalid dates', () => {
      expect(formatRelativeTime(null)).toBe('');
      expect(formatRelativeTime(undefined)).toBe('');
    });
  });

  describe('formatPercentage', () => {
    it('should format valid percentages', () => {
      expect(formatPercentage(0.5)).toBe('50.0%');
      expect(formatPercentage(0.75)).toBe('75.0%');
      expect(formatPercentage(1)).toBe('100.0%');
      expect(formatPercentage(0)).toBe('0.0%');
    });

    it('should handle different decimal places', () => {
      expect(formatPercentage(0.12345, 2)).toBe('12.35%');
      expect(formatPercentage(0.12345, 0)).toBe('12%');
    });

    it('should handle invalid inputs', () => {
      expect(formatPercentage(NaN)).toBe('0%');
      expect(formatPercentage(null)).toBe('0%');
      expect(formatPercentage('invalid')).toBe('0%');
    });
  });

  describe('formatLargeNumber', () => {
    it('should format large numbers with suffixes', () => {
      expect(formatLargeNumber(1500)).toBe('1.5K');
      expect(formatLargeNumber(1500000)).toBe('1.5M');
      expect(formatLargeNumber(1500000000)).toBe('1.5B');
      expect(formatLargeNumber(500)).toBe('500');
    });

    it('should handle negative numbers', () => {
      expect(formatLargeNumber(-1500)).toBe('-1.5K');
      expect(formatLargeNumber(-1500000)).toBe('-1.5M');
    });

    it('should handle invalid inputs', () => {
      expect(formatLargeNumber(NaN)).toBe('0');
      expect(formatLargeNumber(null)).toBe('0');
      expect(formatLargeNumber('invalid')).toBe('0');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
      expect(capitalizeWords('THE QUICK BROWN FOX')).toBe('The Quick Brown Fox');
      expect(capitalizeWords('mixed CaSe TeXt')).toBe('Mixed Case Text');
    });

    it('should handle edge cases', () => {
      expect(capitalizeWords('')).toBe('');
      expect(capitalizeWords(null)).toBe('');
      expect(capitalizeWords(undefined)).toBe('');
      expect(capitalizeWords('a')).toBe('A');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 10)).toBe('This is...');
      expect(truncateText(longText, 20, '...')).toBe('This is a very lo...');
    });

    it('should not truncate short text', () => {
      expect(truncateText('Short text', 20)).toBe('Short text');
    });

    it('should handle custom suffix', () => {
      expect(truncateText('Long text here', 8, '***')).toBe('Long ***');
    });

    it('should handle edge cases', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText(null, 10)).toBe('');
      expect(truncateText(undefined, 10)).toBe('');
    });
  });
});
