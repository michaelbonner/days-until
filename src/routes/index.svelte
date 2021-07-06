<script>
	import {
		differenceInBusinessDays,
		differenceInCalendarDays,
		format,
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
	$: daysUntilSelectedDate = new Intl.NumberFormat().format(
		differenceInCalendarDays(selectedDate, today)
	);
	$: businessDaysUntilSelectedDate = new Intl.NumberFormat().format(
		differenceInBusinessDays(selectedDate, today)
	);
</script>

<div>
	<h1 class="text-3xl py-2">Welcome to Days Until</h1>
	<p class="mt-4">Enter your target date below and we'll tell you how many days away it is.</p>

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

	<div class="lg:grid grid-cols-2 text-center border-t pt-12 mt-12">
		<div>
			<div>Days Until {selectedDay}</div>
			<div class="text-3xl">{daysUntilSelectedDate}</div>
		</div>
		<div class="mt-4 lg:mt-0">
			<div>Business Days Until {selectedDay}</div>
			<div class="text-3xl">
				{businessDaysUntilSelectedDate}
			</div>
		</div>
	</div>
</div>
