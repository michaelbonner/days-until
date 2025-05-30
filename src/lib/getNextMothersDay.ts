import { addDays, format, isFuture, setDate, setMonth } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

export const getMothersDayForYear = (year: number): Date => {
	// Start with May 1st of the given year
	const mayFirst = setMonth(setDate(new Date(year, 0), 1), 4); // 4 is May (0-based)

	// Find the first Sunday in May
	const firstSunday = addDays(mayFirst, (7 - mayFirst.getDay()) % 7);

	// Add 7 days to get to the second Sunday
	return addDays(firstSunday, 7);
};

export const getNextMothersDay = (): InterestingDate => {
	const mothersDayThisYear = getMothersDayForYear(new Date().getFullYear());

	const mothersDay = isFuture(mothersDayThisYear)
		? mothersDayThisYear
		: getMothersDayForYear(new Date().getFullYear() + 1);

	return {
		monthDay: '',
		name: "Mother's Day",
		date: mothersDay,
		formattedDate: format(mothersDay, 'yyyy-MM-dd')
	};
};
