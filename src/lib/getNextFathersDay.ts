import { addDays, format, isFuture, setDate, setMonth } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

export const getFathersDayForYear = (year: number): Date => {
	// Start with June 1st of the given year
	const juneFirst = setMonth(setDate(new Date(year, 0), 1), 5); // 5 is June (0-based)

	// Find the first Sunday in June
	const firstSunday = addDays(juneFirst, (7 - juneFirst.getDay()) % 7);

	// Add 7 days to get to the third Sunday
	return addDays(firstSunday, 14);
};

export const getNextFathersDay = (): InterestingDate => {
	const fathersDayThisYear = getFathersDayForYear(new Date().getFullYear());

	const fathersDay = isFuture(fathersDayThisYear)
		? fathersDayThisYear
		: getFathersDayForYear(new Date().getFullYear() + 1);

	return {
		monthDay: '',
		name: "Father's Day",
		date: fathersDay,
		formattedDate: format(fathersDay, 'yyyy-MM-dd')
	};
};
