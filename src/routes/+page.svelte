<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
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

	let queryStringDateString = page.url.searchParams.get('date');

	const queryStringDate =
		queryStringDateString && isValid(parse(queryStringDateString, 'yyyy-MM-dd', new Date()))
			? queryStringDateString
			: '';

	const interestingDates = getInterestingDates();

	let toastVisible = $state(false);
	let toastTimeout = $state(null);

	let showInvalidDateAlert =
		queryStringDateString && !isValid(parse(queryStringDateString, 'yyyy-MM-dd', new Date()));

	const today = new Date();
	const todayFormatted = format(today, 'MM/dd/yyyy');
	let selectedDay = $state(
		(queryStringDate as string) || (format(interestingDates[0].date, 'yyyy-MM-dd') as string)
	);
	const selectedDate = $derived(parse(selectedDay, 'yyyy-MM-dd', new Date()));
	const selectedDateFormatted = $derived(format(selectedDate, 'MM/dd/yyyy'));
	const daysUntilSelectedDate = $derived(differenceInCalendarDays(selectedDate, today));

	const selectedInterestingDate = $derived(
		interestingDates.find((date) => isSameDay(date.date, selectedDate))
	);
	const sinceOrUntil = $derived(daysUntilSelectedDate < 0 ? 'since' : 'until');
	const absoluteValueOfDaysUntil = $derived(
		new Intl.NumberFormat().format(Math.abs(differenceInCalendarDays(selectedDate, today)))
	);
	const absoluteValueOfBusinessDaysUntil = $derived(
		new Intl.NumberFormat().format(Math.abs(differenceInBusinessDays(selectedDate, today)))
	);

	const exampleQueryStringUrl = new URL(
		typeof window !== 'undefined' ? window.location.href : 'https://days-until.michaelbonner.dev'
	);
	exampleQueryStringUrl.searchParams.set('date', '2050-01-01');
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
	<h1 class="grid gap-2 py-2 text-3xl font-black lg:text-5xl">
		<span>
			Days {sinceOrUntil}
		</span>
		<span class="text-2xl font-bold text-slate-600 lg:text-4xl">
			{#if selectedInterestingDate}
				{selectedInterestingDate.name}
			{:else}
				<span class="font-normal">{selectedDateFormatted}</span>
			{/if}
		</span>
	</h1>
	{#if showInvalidDateAlert}
		<div class="prose mx-auto mt-4 max-w-full p-4">
			<div class="flex-1">
				<p>
					The date you passed in the url (<code>?date={queryStringDateString}</code>) is not valid.
					Make sure you are passing dates in <code>yyyy-MM-dd</code> format
				</p>
			</div>
			<div>
				<p>
					<button
						class="rounded-lg border border-orange-500 px-3 py-1 text-sm text-orange-800 hover:bg-orange-50 hover:text-orange-900"
						onclick={() => {
							const url = new URL(window.location.href);
							url.searchParams.delete('date');
							goto(url.toString());
						}}
					>
						Clear query date
					</button>
				</p>
			</div>
		</div>
	{/if}
	<p class="prose mx-auto mt-4 max-w-lg">
		Enter your target date below and the display below will tell you how many days away your date
		is. That&apos;s all there is to it.
	</p>

	<div class="mx-auto grid max-w-md grid-cols-2 gap-2 pt-8 text-center sm:pt-12">
		<div>
			<div class="text-4xl">{absoluteValueOfDaysUntil}</div>
			<div class="text-lg">Days {sinceOrUntil}</div>
			<div class="text-sm">
				{selectedDateFormatted}
				{selectedInterestingDate ? `(${selectedInterestingDate?.name})` : ''}
			</div>
		</div>
		<div>
			<div class="text-4xl">
				{absoluteValueOfBusinessDaysUntil}
			</div>
			<div class="text-lg">Business Days {sinceOrUntil}</div>
			<div class="text-sm">
				{selectedDateFormatted}
				{selectedInterestingDate ? `(${selectedInterestingDate?.name})` : ''}
			</div>
		</div>
	</div>

	<div class="mx-auto mt-24 flex max-w-md items-center justify-between lg:mt-16 lg:flex-wrap">
		<div class="mx-auto grid w-full gap-2 text-center lg:w-1/2">
			<div class="grid gap-1">
				<label for="date" class="block text-sm font-medium">Date</label>
				<input
					bind:value={selectedDay}
					class="mx-auto appearance-none border bg-slate-50 px-4 py-2"
					id="date"
					type="date"
				/>
			</div>

			<div class="flex justify-center">
				<button
					class="flex items-center justify-center gap-1 text-sm hover:underline"
					onclick={() => {
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
						class="h-4 w-4"
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
			<p>Today&apos;s date is<br />{todayFormatted}</p>
		</div>
	</div>

	<div class="mt-12">
		<h2 class="text-2xl">Interesting Dates</h2>
		<div class="mt-4 gap-x-2 gap-y-2 sm:grid sm:grid-cols-3">
			{#each interestingDates as interestingDate (interestingDate.date)}
				<button
					class={`hover:bg-pizazz-200 hover:text-pizazz-700 hover:border-pizazz-300 m-0.5 rounded border px-3 py-2 text-xs tracking-wider uppercase transition-all sm:m-0 ${
						selectedInterestingDate === interestingDate
							? 'bg-pizazz-100 text-pizazz-800 border-pizazz-300'
							: 'bg-malibu-200 text-malibu-900 border-malibu-300'
					}`}
					onclick={() => (selectedDay = interestingDate.formattedDate)}
				>
					<span class="block font-light">{format(interestingDate.date, 'MM/dd/yyyy')}</span>
					<span class="block font-medium">{interestingDate.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="prose mx-auto mt-12 max-w-md">
		<p class="text-center text-sm text-slate-800">
			FYI: You can also give this page a date in the url. Something like
			<button
				class="text-malibu-800 underline"
				onclick={() => {
					goto(exampleQueryStringUrl.toString());
					selectedDay = '2050-01-01';
				}}
				type="button"
			>
				{exampleQueryStringUrl.toString()}
			</button>
		</p>
	</div>

	{#if toastVisible}
		<div
			class="fixed bottom-1 left-0 text-left sm:bottom-0"
			transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
		>
			<div class="mx-1 bg-white shadow-sm sm:mb-4 sm:ml-4 sm:rounded-lg">
				<div class="p-3 sm:p-4">
					<div class="flex items-start justify-between gap-4">
						<h3 class="text-sm leading-6 font-semibold text-slate-900">Link copied</h3>
						<button
							onclick={() => {
								toastVisible = false;
								clearTimeout(toastTimeout);
							}}
							class="relative -top-2 -right-4 px-4 py-1 text-base text-slate-500 hover:text-slate-700"
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
