<script>
	import { differenceInBusinessDays, differenceInCalendarDays, format } from 'date-fns';
	const today = new Date();
	const todayFormatted = format(today, 'MM/dd/yyyy');
	let selectedDay = todayFormatted;
	$: selectedDate = new Date(selectedDay);
	$: daysUntilSelectedDate = differenceInCalendarDays(selectedDate, today);
	$: businessDaysUntilSelectedDate = differenceInBusinessDays(selectedDate, today);
</script>

<h1 class="font-light text-3xl py-2">Welcome to Days Until</h1>
<p class="mt-4">Enter your target date below and we'll tell you how many days away it is.</p>
<p class="mt-4">Today&apos;s date is {todayFormatted}</p>

<div class="mt-8">
	<input bind:value={selectedDay} class="border py-2 px-4" type="date" />
</div>

<div class="grid grid-cols-2 text-center border-t pt-12 mt-12">
	<div>
		<div>Days between</div>
		<div class="text-3xl">{daysUntilSelectedDate}</div>
	</div>
	<div>
		<div>Business days between</div>
		<div class="text-3xl">
			{businessDaysUntilSelectedDate}
		</div>
	</div>
</div>
