import { addDays, format, isFuture, isToday } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

const getHolidayForYear = (year: number): Date => {
	const firstDayOfMonth = new Date(year, 9, 1);
	const holiday = addDays(firstDayOfMonth, 8 - firstDayOfMonth.getDay() + 7);
	return holiday;
};

export const getNextColumbusDay = (): InterestingDate => {
	// 2nd monday in october

	const holidayThisYear = getHolidayForYear(new Date().getFullYear());

	const holiday =
		isToday(holidayThisYear) || isFuture(holidayThisYear)
			? holidayThisYear
			: getHolidayForYear(new Date().getFullYear() + 1);

	return {
		monthDay: '',
		name: 'Columbus Day',
		date: holiday,
		formattedDate: format(holiday, 'yyyy-MM-dd')
	};
};
