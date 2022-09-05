import { addDays, format, isFuture, isToday } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

const getHolidayForYear = (year: number): Date => {
	const firstDayOfMonth = new Date(year, 1, 1);
	const holiday = addDays(firstDayOfMonth, 8 - firstDayOfMonth.getDay() + 14);
	return holiday;
};

export const getNextPresidentsDay = (): InterestingDate => {
	// third Monday in February

	const holidayThisYear = getHolidayForYear(new Date().getFullYear());

	const holiday =
		isToday(holidayThisYear) || isFuture(holidayThisYear)
			? holidayThisYear
			: getHolidayForYear(new Date().getFullYear() + 1);

	return {
		monthDay: '',
		name: "Presidents' Day",
		date: holiday,
		formattedDate: format(holiday, 'yyyy-MM-dd')
	};
};
