import { getInterestingDateByMonthDayString } from './getInterestingDateByMonthDayString';
import { getNextFathersDay } from './getNextFathersDay';
import { getNextIndigenousPeoplesDay } from './getNextIndigenousPeoplesDay';
import { getNextLaborDay } from './getNextLaborDay';
import { getNextMemorialDay } from './getNextMemorialDay';
import { getNextMlkDay } from './getNextMlkDay';
import { getNextMothersDay } from './getNextMothersDay';
import { getNextPresidentsDay } from './getNextPresidentsDay';
import { getNextThanksgiving } from './getNextThanksgiving';

export const getInterestingDates = () => {
	return [
		getInterestingDateByMonthDayString('01-01', "New Year's Day"),
		getInterestingDateByMonthDayString(`06-19`, `Juneteenth`),
		getInterestingDateByMonthDayString(`07-04`, `Independence Day`),
		getInterestingDateByMonthDayString(`07-24`, `Pioneer Day`),
		getInterestingDateByMonthDayString(`11-11`, `Veterans Day`),
		getInterestingDateByMonthDayString(`11-18`, `Ski Season-ish`),
		getInterestingDateByMonthDayString(`12-25`, `Christmas Day`),
		getInterestingDateByMonthDayString(`12-31`, `New Years Eve`),
		getNextPresidentsDay(),
		getNextMothersDay(),
		getNextFathersDay(),
		getNextThanksgiving(),
		getNextIndigenousPeoplesDay(),
		getNextLaborDay(),
		getNextMemorialDay(),
		getNextMlkDay()
	].sort((a, b) => {
		if (!a.date || !b.date) return 0;
		return a.date > b.date ? 1 : -1;
	});
};
