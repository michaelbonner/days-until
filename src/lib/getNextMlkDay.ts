import { addDays, format, isSameDay, startOfWeek, startOfYear } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

export const getNextMlkDay = (currentDate: Date = new Date()): InterestingDate => {
	// get the third monday of this year
	const currentYear = currentDate.getFullYear();
	const thirdMonday =
		addDays(startOfWeek(startOfYear(currentDate), { weekStartsOn: 1 }), 21).getDate() > 21
			? addDays(startOfWeek(startOfYear(currentDate), { weekStartsOn: 1 }), 14)
			: addDays(startOfWeek(startOfYear(currentDate), { weekStartsOn: 1 }), 21);

	// if the third monday is in the future, return it
	if (thirdMonday > currentDate || isSameDay(thirdMonday, currentDate)) {
		return {
			monthDay: '',
			name: 'MLK Day',
			date: thirdMonday,
			formattedDate: format(thirdMonday, 'yyyy-MM-dd')
		};
	}

	// if the third monday is in the past, return the next year's third monday
	const nextYear = currentYear + 1;
	const nextYearThirdMonday = addDays(
		startOfWeek(startOfYear(new Date(nextYear, 0, 1)), { weekStartsOn: 1 }),
		21
	);

	return {
		monthDay: '',
		name: 'MLK Day',
		date: nextYearThirdMonday,
		formattedDate: format(nextYearThirdMonday, 'yyyy-MM-dd')
	};
};
