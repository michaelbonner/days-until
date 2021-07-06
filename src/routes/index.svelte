<script>
	import { differenceInBusinessDays, differenceInCalendarDays } from 'date-fns';
	import { format, utcToZonedTime } from 'date-fns-tz';
	const today = new Date();
	const todayFormatted = format(today, 'MM/dd/yyyy');
	let selectedDay = todayFormatted;
	$: selectedDate = utcToZonedTime(new Date(selectedDay), new Date().getTimezoneOffset());
	$: daysUntilSelectedDate = differenceInCalendarDays(selectedDate, today);
	$: businessDaysUntilSelectedDate = differenceInBusinessDays(selectedDate, today);
</script>

<h1 class="text-3xl py-2">Welcome to Days Until</h1>
<p class="mt-4">Enter your target date below and we'll tell you how many days away it is.</p>

<div class="flex justify-between items-center mt-12 mx-2 lg:mx-12">
	<div class="mx-auto">
		<input bind:value={selectedDay} class="border py-2 px-4 bg-gray-50" type="date" />
	</div>
	<p class="mx-auto">
		Today&apos;s date is <code class="bg-gray-100 py-1 px-2 font-sans rounded">
			{todayFormatted}</code
		>
	</p>
</div>

<div class="grid grid-cols-2 text-center border-t pt-12 mt-12">
	<div>
		<div>Days Until {selectedDay}</div>
		<div class="text-3xl">{daysUntilSelectedDate}</div>
	</div>
	<div>
		<div>Business Days Until {selectedDay}</div>
		<div class="text-3xl">
			{businessDaysUntilSelectedDate}
		</div>
	</div>
</div>
