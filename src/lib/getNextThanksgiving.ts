import { addDays, format, isFuture } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

const getThanksgivingForYear = (year: number): Date => {
	const firstDayOfMonth = new Date(year, 10, 1);
	const thanksgiving = addDays(firstDayOfMonth, 11 - firstDayOfMonth.getDay() + 14);
	return thanksgiving;
};

export const getNextThanksgiving = (): InterestingDate => {
	// 4th thursday in november

	const thanksgivingThisYear = getThanksgivingForYear(new Date().getFullYear());

	const thanksgiving = isFuture(thanksgivingThisYear)
		? thanksgivingThisYear
		: getThanksgivingForYear(new Date().getFullYear() + 1);

	return {
		monthDay: '',
		name: 'Thanksgiving',
		date: thanksgiving,
		formattedDate: format(thanksgiving, 'yyyy-MM-dd')
	};
};
