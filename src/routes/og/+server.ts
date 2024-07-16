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
		url.searchParams.get('date') ?? format(interestingDates[0].date, 'yyyy-MM-dd');

	// if the search param is not a valid date, reset it
	if (!searchParamDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
		searchParamDate = format(interestingDates[0].date, 'yyyy-MM-dd');
	}

	const dateForSearchParam = parse(searchParamDate, 'yyyy-MM-dd', new Date());

	// is the searchParamDate in the interestingDates array?
	const dateIsInterestingDate = interestingDates.find(
		(date) => format(date.date, 'yyyy-MM-dd') === searchParamDate
	);

	const daysUntil = new Intl.NumberFormat().format(
		differenceInCalendarDays(dateForSearchParam, new Date())
	);

	const template = `
	 <div tw="flex flex-col w-full h-full items-center justify-center bg-gray-50" style="
	 	background-color: #70e1f5;
		background-image: linear-gradient(320deg, #70e1f5 0%, #fed194 100%);
	 ">
	  <div tw="flex w-full" style="width:540px">
		<div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-around p-8">
		  <h2 tw="flex flex-col text-5xl font-bold tracking-tight text-gray-900 items-center">
			<span tx="font-bold">Days Until</span>
			<span tw="mt-2 text-gray-800 text-4xl font-normal">${dateIsInterestingDate ? dateIsInterestingDate.name : format(dateForSearchParam, displayDateFormatString)}</span>
		  </h2>
		  <h3 tw="flex text-7xl font-bold tracking-tight text-gray-900 items-center">
			<span tx="font-black">${daysUntil}</span>
			<span tw="text-gray-800 text-2xl font-normal ml-2 pt-8">days</span>
		  </h3>

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
