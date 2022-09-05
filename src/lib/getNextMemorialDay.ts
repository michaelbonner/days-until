import { addDays, format, isFuture, isToday } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

const getHolidayForYear = (year: number): Date => {
	const firstDayOfMonth = new Date(year, 4, 1);
	const holiday = addDays(firstDayOfMonth, 8 - firstDayOfMonth.getDay() + 21);
	return holiday;
};

export const getNextMemorialDay = (): InterestingDate => {
	// 1st monday in september

	const holidayThisYear = getHolidayForYear(new Date().getFullYear());

	const holiday =
		isToday(holidayThisYear) || isFuture(holidayThisYear)
			? holidayThisYear
			: getHolidayForYear(new Date().getFullYear() + 1);

	return {
		monthDay: '',
		name: 'Memorial Day',
		date: holiday,
		formattedDate: format(holiday, 'yyyy-MM-dd')
	};
};
