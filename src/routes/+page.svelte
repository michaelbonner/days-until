<script lang="ts">
	import { getInterestingDateByMonthDayString } from '$lib/getInterestingDateByMonthDayString';
	import { getNextColumbusDay } from '$lib/getNextColumbusDay';
	import { getNextLaborDay } from '$lib/getNextLaborDay';
	import { getNextMemorialDay } from '$lib/getNextMemorialDay';
	import { getNextMlkDay } from '$lib/getNextMlkDay';
	import { getNextPresidentsDay } from '$lib/getNextPresidentsDay';
	import { getNextThanksgiving } from '$lib/getNextThanksgiving';
	import {
		differenceInBusinessDays,
		differenceInCalendarDays,
		format,
		isSameDay,
		isValid,
		parse
	} from 'date-fns';
	import type { ParsedQuery } from 'query-string';
	import queryString from 'query-string';

	let parsedQueryString = {} as ParsedQuery;

	if (typeof window !== 'undefined') {
		parsedQueryString = queryString.parse(window.location.search);
	}

	const interestingDates = [
		getInterestingDateByMonthDayString('01-01', "New Year's Day"),
		getInterestingDateByMonthDayString(`06-19`, `Juneteenth`),
		getInterestingDateByMonthDayString(`07-04`, `Independence Day`),
		getInterestingDateByMonthDayString(`07-24`, `Pioneer Day`),
		getInterestingDateByMonthDayString(`11-11`, `Veterans Day`),
		getInterestingDateByMonthDayString(`11-18`, `Ski Season-ish`),
		getInterestingDateByMonthDayString(`12-25`, `Christmas Day`),
		getInterestingDateByMonthDayString(`12-31`, `New Years Eve`),
		getNextPresidentsDay(),
		getNextThanksgiving(),
		getNextColumbusDay(),
		getNextLaborDay(),
		getNextMemorialDay(),
		getNextMlkDay()
	].sort((a, b) => {
		return a.date > b.date ? 1 : -1;
	});

	const today = new Date();
	const todayFormatted = format(today, 'MM/dd/yyyy');
	let selectedDay =
		(parsedQueryString.date as string) ||
		(format(interestingDates[0].date, 'yyyy-MM-dd') as string);
	$: selectedDate = parse(selectedDay, 'yyyy-MM-dd', new Date());
	if (typeof window !== 'undefined' && !isValid(parse(selectedDay, 'yyyy-MM-dd', new Date()))) {
		alert('Make sure you are passing dates as yyyy-MM-dd format');
	}
	$: selectedDateFormatted = format(selectedDate, 'MM/dd/yyyy');
	$: daysUntilSelectedDate = new Intl.NumberFormat().format(
		differenceInCalendarDays(selectedDate, today)
	);
	$: businessDaysUntilSelectedDate = new Intl.NumberFormat().format(
		differenceInBusinessDays(selectedDate, today)
	);

	$: selectedInterestingDate = interestingDates.find((date) => isSameDay(date.date, selectedDate));
</script>

<svelte:head>
	<title
		>Days Until {`${selectedInterestingDate ? selectedInterestingDate.name : selectedDateFormatted}`}</title
	>
	<meta
		name="description"
		content={`Find out how many days until ${selectedInterestingDate ? selectedInterestingDate.name : selectedDateFormatted || 'a specific date'}`}
	/>
</svelte:head>

<div class="text-center">
	<h1 class="text-3xl py-2">Days Until</h1>
	<p class="mt-4 max-w-sm mx-auto">
		Enter your target date below and the display below will tell you how many days away your date
		is. That&apos;s all there is it
	</p>

	<div class="lg:flex lg:flex-wrap justify-between items-center mt-12 mx-2 lg:mx-12">
		<div class="mx-auto w-full lg:w-1/2 text-center">
			<input bind:value={selectedDay} class="border py-2 px-4 bg-gray-50" type="date" />
		</div>
		<p class="mx-auto w-full lg:w-1/2 text-center mt-4 lg:mt-0">
			Today&apos;s date is <code class="bg-gray-100 py-1 px-2 font-sans rounded">
				{todayFormatted}</code
			>
		</p>
	</div>

	<div class="lg:grid grid-cols-2 text-center pt-12 mt-8">
		<div>
			<div class="text-4xl">{daysUntilSelectedDate}</div>
			<div class="text-lg">Days Until</div>
			<div class="text-sm">
				{selectedDateFormatted}
				{selectedInterestingDate ? `(${selectedInterestingDate?.name})` : ''}
			</div>
		</div>
		<div class="mt-4 lg:mt-0">
			<div class="text-4xl">
				{businessDaysUntilSelectedDate}
			</div>
			<div class="text-lg">Business Days Until</div>
			<div class="text-sm">{selectedDateFormatted}</div>
		</div>
	</div>

	<div class="mt-12">
		<h2 class="text-2xl">Interesting Dates</h2>
		<div class="sm:grid sm:grid-cols-3 mt-4 gap-x-2 gap-y-2">
			{#each interestingDates as interestingDate}
				<button
					class={`rounded border py-2 px-3 text-xs tracking-wider uppercase transition-all hover:bg-pizazz-200 hover:text-pizazz-700 hover:border-pizazz-300 ${
						selectedInterestingDate === interestingDate
							? 'bg-pizazz-100 text-pizazz-800 border-pizazz-300'
							: 'bg-malibu-200 text-malibu-900 border-malibu-300'
					}`}
					on:click={() => (selectedDay = interestingDate.formattedDate)}
				>
					<span class="font-light block">{format(interestingDate.date, 'MM/dd/yyyy')}</span>
					<span class="font-medium block">{interestingDate.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="mt-12 max-w-md mx-auto">
		<p class="text-center text-sm text-gray-800">
			FYI: You can also give this page a date in the url. Something like
			<a
				class="text-malibu-800 underline"
				href="https://days-until.michaelbonner.dev/?date=2050-01-01"
				>https://days-until.michaelbonner.dev/?date=2050-01-01</a
			>
		</p>
	</div>
</div>
