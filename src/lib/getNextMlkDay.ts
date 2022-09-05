import { addDays, format, isFuture, isToday } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

const getHolidayForYear = (year: number): Date => {
	const firstDayOfMonth = new Date(year, 0, 1);
	const holiday = addDays(firstDayOfMonth, 8 - firstDayOfMonth.getDay() + 7);
	return holiday;
};

export const getNextMlkDay = (): InterestingDate => {
	// 3rd monday in january

	const holidayThisYear = getHolidayForYear(new Date().getFullYear());

	const holiday =
		isToday(holidayThisYear) || isFuture(holidayThisYear)
			? holidayThisYear
			: getHolidayForYear(new Date().getFullYear() + 1);

	return {
		monthDay: '',
		name: 'MLK Day',
		date: holiday,
		formattedDate: format(holiday, 'yyyy-MM-dd')
	};
};
