import { getInterestingDates } from '$lib/getInterestingDates';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';
import { differenceInCalendarDays, format, parse } from 'date-fns';

const displayDateFormatString = 'MM/dd/yyyy';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const fontFile = await fetch('https://days-until.michaelbonner.dev/fonts/Lato/Lato-Regular.ttf');
	const fontData: ArrayBuffer = await fontFile.arrayBuffer();

	const fontFileBlack = await fetch(
		'https://days-until.michaelbonner.dev/fonts/Lato/Lato-Black.ttf'
	);
	const fontDataBlack: ArrayBuffer = await fontFileBlack.arrayBuffer();

	const interestingDates = getInterestingDates();

	let searchParamDate =
		url.searchParams.get('date') ?? format(interestingDates[0].date ?? new Date(), 'yyyy-MM-dd');

	// if the search param is not a valid date, reset it
	if (!searchParamDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
		searchParamDate = format(interestingDates[0].date ?? new Date(), 'yyyy-MM-dd');
	}

	const dateForSearchParam = parse(searchParamDate, 'yyyy-MM-dd', new Date());

	// is the searchParamDate in the interestingDates array?
	const dateIsInterestingDate = interestingDates.find(
		(date) => date.date && format(date.date, 'yyyy-MM-dd') === searchParamDate
	);

	const daysUntil = new Intl.NumberFormat().format(
		differenceInCalendarDays(dateForSearchParam, new Date())
	);

	const absoluteValueOfDaysUntil = Math.abs(+daysUntil);

	const template = `
	 <div tw="flex flex-col w-full h-full items-center justify-center bg-slate-50" style="
	 	background-color: #70e1f5;
		background-image: linear-gradient(320deg, #70e1f5 0%, #fed194 100%);
	 ">
	  <div tw="flex w-full" style="width:720px">
		<div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-around p-8">
		  <h2 tw="flex flex-col text-7xl font-bold tracking-tight text-slate-900 items-center">
			<span>${absoluteValueOfDaysUntil}&nbsp; Days ${+daysUntil < 0 ? 'Since' : 'Until'}</span>
			${dateIsInterestingDate ? `<span tw="mt-2 mb-6 text-slate-800 text-5xl font-normal">${dateIsInterestingDate.name} </span>` : ''}
			<span tw="mt-4 text-slate-800 text-4xl font-medium">${format(dateForSearchParam, displayDateFormatString)}</span>
		  </h2>
		</div>
	  </div>
	</div>
	`;

	return new ImageResponse(
		template,
		{
			height: 400,
			width: 800,
			fonts: [
				{
					name: 'Inter',
					data: fontData,
					weight: 400
				},
				{
					name: 'Inter',
					data: fontDataBlack,
					weight: 800
				}
			]
		},
		{ props: {} }
	);
};
