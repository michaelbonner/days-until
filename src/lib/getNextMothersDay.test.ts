// TODO: add tests for getMothersDayForYe.getFullYear(ar

import { format } from 'date-fns';
import { getMothersDayForYear } from './getNextMothersDay';
import { describe, it, expect } from 'vitest';

describe('getMothersDayForYear', () => {
	it('should return May 12th 2024 for Mothers Day if the current date is Jan 1st 2024', () => {
		const MothersDay = getMothersDayForYear(new Date('2024-01-01 10:00:00').getFullYear());
		expect(format(MothersDay, 'yyyy-MM-dd')).toBe('2024-05-12');
	});

	it('should return May 11th 2025 for Mothers Day if the current date is Jan 1st 2025', () => {
		const MothersDay = getMothersDayForYear(new Date('2025-01-01 10:00:00').getFullYear());
		expect(format(MothersDay, 'yyyy-MM-dd')).toBe('2025-05-11');
	});

	it('should return May 10th 2026 for Mothers Day if the current date is Jan 1st 2026', () => {
		const MothersDay = getMothersDayForYear(new Date('2026-01-01 10:00:00').getFullYear());
		expect(format(MothersDay, 'yyyy-MM-dd')).toBe('2026-05-10');
	});

	it('should return May 9th 2027 for Mothers Day if the current date is Jan 1st 2027', () => {
		const MothersDay = getMothersDayForYear(new Date('2027-01-01 10:00:00').getFullYear());
		expect(format(MothersDay, 'yyyy-MM-dd')).toBe('2027-05-09');
	});

	it('should return May 14th 2028 for Mothers Day if the current date is Jan 1st 2028', () => {
		const MothersDay = getMothersDayForYear(new Date('2028-01-01 10:00:00').getFullYear());
		expect(format(MothersDay, 'yyyy-MM-dd')).toBe('2028-05-14');
	});

	it('should return May 13th 2029 for Mothers Day if the current date is Jan 1st 2029', () => {
		const MothersDay = getMothersDayForYear(new Date('2029-01-01 10:00:00').getFullYear());
		expect(format(MothersDay, 'yyyy-MM-dd')).toBe('2029-05-13');
	});
});
