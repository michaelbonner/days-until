<script>
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { getInterestingDates } from '#lib/getInterestingDates.ts';
	import {
		differenceInBusinessDays,
		differenceInCalendarDays,
		format,
		isSameDay,
		isValid,
		parse
	} from 'date-fns';

	const today = new Date();
	const interestingDates = getInterestingDates();
	const queryStringDateString = page.url.searchParams.get('date');
	const queryStringDate =
		queryStringDateString && isValid(parse(queryStringDateString, 'yyyy-MM-dd', today))
			? queryStringDateString
			: '';
	let showInvalidDateAlert = $state(Boolean(queryStringDateString && !queryStringDate));
	let selectedDay = $state(
		queryStringDate || format(interestingDates[0].date ?? today, 'yyyy-MM-dd')
	);
	const selectedDate = $derived(parse(selectedDay, 'yyyy-MM-dd', today));
	const selectedDateFormatted = $derived(format(selectedDate, 'MM/dd/yyyy'));
	const daysUntilSelectedDate = $derived(differenceInCalendarDays(selectedDate, today));
	const selectedInterestingDate = $derived(
		interestingDates.find((date) => date.date && isSameDay(date.date, selectedDate))
	);
	const sinceOrUntil = $derived(daysUntilSelectedDate < 0 ? 'since' : 'until');
	const absoluteValueOfDaysUntil = $derived(
		new Intl.NumberFormat().format(Math.abs(daysUntilSelectedDate))
	);
	const absoluteValueOfBusinessDaysUntil = $derived(
		new Intl.NumberFormat().format(Math.abs(differenceInBusinessDays(selectedDate, today)))
	);
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': 'https://days-until.michaelbonner.dev/#website',
				name: 'Days Until',
				url: 'https://days-until.michaelbonner.dev/',
				inLanguage: 'en',
				author: { '@type': 'Person', name: 'Michael Bonner', url: 'https://michaelbonner.dev' }
			},
			{
				'@type': 'WebApplication',
				'@id': 'https://days-until.michaelbonner.dev/#app',
				name: 'Days Until',
				url: 'https://days-until.michaelbonner.dev/',
				description:
					'Calculate calendar days and business days until or since a date, choose upcoming holidays, and share a countdown link.',
				applicationCategory: 'UtilitiesApplication',
				operatingSystem: 'Any',
				isAccessibleForFree: true,
				isPartOf: { '@id': 'https://days-until.michaelbonner.dev/#website' },
				image: 'https://days-until.michaelbonner.dev/og-image.jpg',
				author: { '@type': 'Person', name: 'Michael Bonner', url: 'https://michaelbonner.dev' }
			}
		]
	};

	const structuredDataScript = `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</${'script'}>`;
	let shareMessage = $state('');
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let shareTimeout;
	async function copyLink() {
		const url = new URL(window.location.href);
		url.searchParams.set('date', selectedDay);
		try {
			await navigator.clipboard.writeText(url.toString());
			shareMessage = 'Link copied.';
		} catch {
			shareMessage = 'Could not copy the link. Please try again.';
		}
		clearTimeout(shareTimeout);
		shareTimeout = setTimeout(() => (shareMessage = ''), 4000);
	}
</script>

<svelte:head>
	<!-- JSON-LD contains only fixed application metadata, with HTML characters escaped. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html structuredDataScript}
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

<div class="site-shell">
	<header class="site-header">
		<a href={resolve('/')} class="wordmark" aria-label="Days Until home"
			><span class="brand-icon" aria-hidden="true"><i></i><i></i><i></i><i></i></span>days until<span
				class="brand-dot">.</span
			></a
		>
		<span class="today"><span class="status-dot"></span>{format(today, 'EEE, MMM d, yyyy')}</span>
	</header>
	<main>
		{#if showInvalidDateAlert}
			<div class="alert" role="alert">
				That link has an invalid date. Try choosing a date below.<button
					onclick={() => (showInvalidDateAlert = false)}
					aria-label="Dismiss invalid date message">×</button
				>
			</div>
		{/if}

		<section class="countdown" aria-labelledby="countdown-title">
			<div class="countdown-main">
				<div class="card-top">
					<h1 class="eyebrow" id="countdown-title">
						<span class="status-dot"></span>YOUR COUNTDOWN
					</h1>
				</div>
				<div class="count-number" aria-live="polite">
					{absoluteValueOfDaysUntil}<span class="number-dot">.</span>
				</div>
				<div class="count-caption">
					<span>{Math.abs(daysUntilSelectedDate) === 1 ? 'day' : 'days'} {sinceOrUntil}</span>
					<h2>{selectedInterestingDate?.name || 'selected date'}</h2>
				</div>
				<div class="count-date">
					<span class="small-calendar" aria-hidden="true">▦</span>{format(
						selectedDate,
						'EEEE, MMMM d, yyyy'
					)}
				</div>
			</div>
			<div class="countdown-controls">
				<div class="date-field">
					<label for="date">Custom date</label><input
						id="date"
						type="date"
						value={selectedDay}
						onchange={(event) => {
							if (
								event.currentTarget.value &&
								isValid(parse(event.currentTarget.value, 'yyyy-MM-dd', today))
							)
								selectedDay = event.currentTarget.value;
						}}
					/>
				</div>
				<div class="business-count">
					<span class="business-number">{absoluteValueOfBusinessDaysUntil}</span>
					<div>
						<strong>business days {sinceOrUntil}</strong><span
							>Monday–Friday, holidays included</span
						>
					</div>
				</div>
				<button class="share-button" onclick={copyLink}
					><svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.7"
						aria-hidden="true"
						><path
							d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"
						/></svg
					>Copy countdown link<span aria-hidden="true">↗</span></button
				>
			</div>
		</section>
		<section class="upcoming" aria-labelledby="upcoming-title">
			<div class="section-heading">
				<div>
					<h2 id="upcoming-title">Upcoming dates</h2>
				</div>
			</div>
			<div class="date-grid" id="upcoming-dates">
				{#each interestingDates as interestingDate (interestingDate.name)}
					<button
						class="occasion"
						class:active={selectedInterestingDate === interestingDate}
						aria-pressed={selectedInterestingDate === interestingDate}
						onclick={() => {
							if (interestingDate.formattedDate) selectedDay = interestingDate.formattedDate;
						}}
					>
						<span class="date-tile"
							><span>{format(interestingDate.date ?? today, 'MMM')}</span><strong
								>{format(interestingDate.date ?? today, 'dd')}</strong
							></span
						><span class="occasion-info"
							><strong>{interestingDate.name}</strong><span
								>{differenceInCalendarDays(interestingDate.date ?? today, today)} days away</span
							></span
						><span class="occasion-arrow" aria-hidden="true"
							>{selectedInterestingDate === interestingDate ? '↗' : '→'}</span
						>
					</button>
				{/each}
			</div>
		</section>
	</main>
	<footer>
		<span
			>By <a href="https://michaelbonner.dev">Michael Bonner</a><span class="footer-year"
				>© {today.getFullYear()}</span
			></span
		>
	</footer>
</div>
{#if shareMessage}<div class="toast" role="status">{shareMessage}</div>{/if}
