<script lang="ts">
	import { page } from '$app/stores';
	import { getInterestingDates } from '$lib/getInterestingDates';
	import {
		differenceInBusinessDays,
		differenceInCalendarDays,
		format,
		isSameDay,
		isValid,
		parse
	} from 'date-fns';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	const queryStringDate = $page.url.searchParams.get('date');

	const interestingDates = getInterestingDates();

	let toastVisible = false;
	let toastTimeout: any;

	const today = new Date();
	const todayFormatted = format(today, 'MM/dd/yyyy');
	let selectedDay =
		(queryStringDate as string) || (format(interestingDates[0].date, 'yyyy-MM-dd') as string);
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
	$: sinceOrUntil = +daysUntilSelectedDate < 0 ? 'since' : 'until';
	$: absoluteValueOfDaysUntil = Math.abs(+daysUntilSelectedDate);
	$: absoluteValueOfBusinessDaysUntil = Math.abs(+businessDaysUntilSelectedDate);
</script>

<svelte:head>
	<title
		>Days {sinceOrUntil}
		{`${selectedInterestingDate ? selectedInterestingDate.name : selectedDateFormatted}`}</title
	>
	<meta
		name="description"
		content={`Find out how many days ${sinceOrUntil} ${selectedInterestingDate ? selectedInterestingDate.name : selectedDateFormatted || 'a specific date'}. Or enter your target date and the display below will tell you how many days away your date is.`}
	/>
	<link
		rel="canonical"
		href={`https://days-until.michaelbonner.dev/${queryStringDate ? `?date=${queryStringDate}` : ''}`}
	/>

	<meta
		property="og:url"
		content={`https://days-until.michaelbonner.dev/${queryStringDate ? `?date=${queryStringDate}` : ''}`}
	/>
	<meta
		property="og:title"
		content={`Days ${sinceOrUntil} ${selectedInterestingDate ? selectedInterestingDate.name : selectedDateFormatted}`}
	/>
	<meta
		property="og:description"
		content={`Find out how many days ${sinceOrUntil} ${selectedInterestingDate ? selectedInterestingDate.name : selectedDateFormatted || 'a specific date'}. Or enter your target date and the display below will tell you how many days away your date is.`}
	/>
	<meta
		property="og:image"
		content={`https://days-until.michaelbonner.dev/og${queryStringDate ? `?date=${queryStringDate}` : ''}`}
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="text-center">
	<h1 class="py-2 text-3xl font-black lg:text-5xl grid gap-2">
		<span>
			Days {sinceOrUntil}
		</span>
		<span class="text-slate-600 font-bold">
			{#if selectedInterestingDate}
				{selectedInterestingDate.name}
			{:else}
				<span class="font-normal">{selectedDateFormatted}</span>
			{/if}
		</span>
	</h1>
	<p class="mx-auto mt-4 max-w-sm">
		Enter your target date below and the display below will tell you how many days away your date
		is. That&apos;s all there is it
	</p>

	<div class="justify-between items-center mx-2 mt-12 lg:flex lg:flex-wrap lg:mx-12">
		<div class="grid gap-2 mx-auto w-full text-center lg:w-1/2">
			<div class="grid gap-1">
				<label for="date" class="block text-sm font-medium">Date</label>
				<input
					bind:value={selectedDay}
					class="py-2 px-4 mx-auto bg-slate-50 border appearance-none"
					id="date"
					type="date"
				/>
			</div>

			<div class="flex justify-center">
				<button
					class="flex gap-1 justify-center items-center text-sm hover:underline"
					on:click={() => {
						const url = new URL(window.location.href);
						url.searchParams.set('date', selectedDay);
						navigator.clipboard.writeText(url.toString());
						toastVisible = true;

						toastTimeout = setTimeout(() => {
							toastVisible = false;
						}, 3000);
					}}
				>
					<svg
						class="w-4 h-4"
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						aria-hidden="true"
						height="200px"
						width="200px"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
						></path></svg
					>
					Copy link
				</button>
			</div>
		</div>
		<div class="mx-auto mt-8 w-full text-center lg:mt-0 lg:w-1/2">
			<p>Today&apos;s date is</p>
			<code class="inline-block py-2 px-3 mt-1 font-sans rounded border border-dashed">
				{todayFormatted}
			</code>
		</div>
	</div>

	<div class="grid-cols-2 mt-8 text-center sm:pt-12 lg:grid">
		<div>
			<div class="text-4xl">{absoluteValueOfDaysUntil}</div>
			<div class="text-lg">Days {sinceOrUntil}</div>
			<div class="text-sm">
				{selectedDateFormatted}
				{selectedInterestingDate ? `(${selectedInterestingDate?.name})` : ''}
			</div>
		</div>
		<div class="mt-4 lg:mt-0">
			<div class="text-4xl">
				{absoluteValueOfBusinessDaysUntil}
			</div>
			<div class="text-lg">Business Days {sinceOrUntil}</div>
			<div class="text-sm">{selectedDateFormatted}</div>
		</div>
	</div>

	<div class="mt-12">
		<h2 class="text-2xl">Interesting Dates</h2>
		<div class="gap-x-2 gap-y-2 mt-4 sm:grid sm:grid-cols-3">
			{#each interestingDates as interestingDate}
				<button
					class={`m-0.5 sm:m-0 rounded border py-2 px-3 text-xs tracking-wider uppercase transition-all hover:bg-pizazz-200 hover:text-pizazz-700 hover:border-pizazz-300 ${
						selectedInterestingDate === interestingDate
							? 'bg-pizazz-100 text-pizazz-800 border-pizazz-300'
							: 'bg-malibu-200 text-malibu-900 border-malibu-300'
					}`}
					on:click={() => (selectedDay = interestingDate.formattedDate)}
				>
					<span class="block font-light">{format(interestingDate.date, 'MM/dd/yyyy')}</span>
					<span class="block font-medium">{interestingDate.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="mx-auto mt-12 max-w-md">
		<p class="text-sm text-center text-slate-800">
			FYI: You can also give this page a date in the url. Something like
			<a
				class="underline text-malibu-800"
				href="https://days-until.michaelbonner.dev/?date=2050-01-01"
				>https://days-until.michaelbonner.dev/?date=2050-01-01</a
			>
		</p>
	</div>

	{#if toastVisible}
		<div
			class="fixed left-0 bottom-1 text-left sm:bottom-0"
			transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
		>
			<div class="mx-1 bg-white shadow sm:mb-4 sm:ml-4 sm:rounded-lg">
				<div class="p-3 sm:p-4">
					<div class="flex gap-4 justify-between items-start">
						<h3 class="text-sm font-semibold leading-6 text-slate-900">Link copied</h3>
						<button
							on:click={() => {
								toastVisible = false;
								clearTimeout(toastTimeout);
							}}
							class="relative -top-2 -right-4 py-1 px-4 text-base text-slate-500 hover:text-slate-700"
						>
							x
						</button>
					</div>
					<div class="max-w-xl text-sm text-slate-500">
						<p>A link to this date has been copied to your clipboard.</p>
						<p>Share it with your friends</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
