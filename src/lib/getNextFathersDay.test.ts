// TODO: add tests for getFathersDayForYe.getFullYear(ar

import { format } from 'date-fns';
import { getFathersDayForYear } from './getNextFathersDay';
import { describe, it, expect } from 'vitest';

describe('getFathersDayForYear', () => {
	it('should return June 16th 2024 for Fathers Day if the current date is Jan 1st 2024', () => {
		const fathersDay = getFathersDayForYear(new Date('2024-01-01 10:00:00').getFullYear());
		expect(format(fathersDay, 'yyyy-MM-dd')).toBe('2024-06-16');
	});

	it('should return June 15th 2025 for Fathers Day if the current date is Jan 1st 2025', () => {
		const fathersDay = getFathersDayForYear(new Date('2025-01-01 10:00:00').getFullYear());
		expect(format(fathersDay, 'yyyy-MM-dd')).toBe('2025-06-15');
	});

	it('should return June 21st 2026 for Fathers Day if the current date is Jan 1st 2026', () => {
		const fathersDay = getFathersDayForYear(new Date('2026-01-01 10:00:00').getFullYear());
		expect(format(fathersDay, 'yyyy-MM-dd')).toBe('2026-06-21');
	});

	it('should return Jun 20th 2027 for Fathers Day if the current date is Jan 1st 2027', () => {
		const fathersDay = getFathersDayForYear(new Date('2027-01-01 10:00:00').getFullYear());
		expect(format(fathersDay, 'yyyy-MM-dd')).toBe('2027-06-20');
	});

	it('should return Jun 18th 2028 for Fathers Day if the current date is Jan 1st 2028', () => {
		const fathersDay = getFathersDayForYear(new Date('2028-01-01 10:00:00').getFullYear());
		expect(format(fathersDay, 'yyyy-MM-dd')).toBe('2028-06-18');
	});

	it('should return Jun 17th 2029 for Fathers Day if the current date is Jan 1st 2029', () => {
		const fathersDay = getFathersDayForYear(new Date('2029-01-01 10:00:00').getFullYear());
		expect(format(fathersDay, 'yyyy-MM-dd')).toBe('2029-06-17');
	});
});
