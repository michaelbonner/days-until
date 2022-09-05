import { addYears, format, isFuture, parse } from 'date-fns';
import type { InterestingDate } from './types/InterestingDate';

export const getInterestingDateByMonthDayString = (
	monthDay: string,
	name: string
): InterestingDate => {
	const interestingDate: InterestingDate = {
		monthDay,
		name
	};

	const parsedDate = parse(`${new Date().getFullYear()}-${monthDay}`, 'yyyy-MM-dd', new Date());
	interestingDate.date = isFuture(parsedDate) ? parsedDate : addYears(parsedDate, 1);
	interestingDate.formattedDate = format(interestingDate.date, 'yyyy-MM-dd');
	return interestingDate;
};
