<script>
	import {
		addYears,
		differenceInBusinessDays,
		differenceInCalendarDays,
		format,
		isFuture,
		isValid,
		parse
	} from 'date-fns';
	import queryString from 'query-string';

	let parsedQueryString = {};

	if (typeof window !== 'undefined') {
		parsedQueryString = queryString.parse(window.location.search);
	}

	const today = new Date();
	const todayFormatted = format(today, 'MM/dd/yyyy');
	let selectedDay = parsedQueryString.date || format(new Date(), 'yyyy-MM-dd');
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

	const interestingDates = [
		{ monthDay: `01-01`, name: `New Year's Day` },
		{ monthDay: `01-18`, name: `MLK Jr. Day` },
		{ monthDay: `02-15`, name: `Presidents' Day` },
		{ monthDay: `05-31`, name: `Memorial Day` },
		{ monthDay: `06-19`, name: `Juneteenth` },
		{ monthDay: `07-04`, name: `Independence Day` },
		{ monthDay: `09-06`, name: `Labor Day` },
		{ monthDay: `10-11`, name: `Columbus Day` },
		{ monthDay: `11-11`, name: `Veterans Day` },
		{ monthDay: `12-25`, name: `Christmas Day` }
	]
		.map((interestingDate) => {
			const parsedDate = parse(
				`${new Date().getFullYear()}-${interestingDate.monthDay}`,
				'yyyy-MM-dd',
				new Date()
			);
			interestingDate.date = isFuture(parsedDate) ? parsedDate : addYears(parsedDate, 1);
			interestingDate.formattedDate = format(interestingDate.date, 'yyyy-MM-dd');
			return interestingDate;
		})
		.sort((a, b) => {
			return a.date > b.date ? 1 : -1;
		});
</script>

<div class="text-center">
	<h1 class="text-2xl lg:text-3xl py-2">Days Until</h1>
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
			<div class="text-sm">{selectedDateFormatted}</div>
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
		<div class="sm:grid sm:grid-cols-4 mt-4 gap-x-2 gap-y-2">
			{#each interestingDates as interestingDate}
				<button
					class="rounded border border-gray-400 py-1 px-2 text-xs bg-gray-50 hover:bg-gray-100 transition-all"
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
			<a class="text-malibu-800 underline" href="https://days-until.vercel.app/?date=2050-01-01"
				>https://days-until.vercel.app/?date=2050-01-01</a
			>
		</p>
	</div>
</div>
