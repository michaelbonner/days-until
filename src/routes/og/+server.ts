import { getInterestingDates } from '#lib/getInterestingDates.ts';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';
import { differenceInCalendarDays, format, isValid, parse } from 'date-fns';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const fontData = await (await fetch('/fonts/Lato/Lato-Regular.ttf')).arrayBuffer();
	const fontDataBold = await (await fetch('/fonts/Lato/Lato-Bold.ttf')).arrayBuffer();
	const today = new Date();
	const interestingDates = getInterestingDates();
	const fallbackDate = interestingDates[0].date ?? today;
	const searchParamDate = url.searchParams.get('date') ?? '';
	const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(searchParamDate)
		? parse(searchParamDate, 'yyyy-MM-dd', today)
		: fallbackDate;
	const selectedDate = isValid(parsedDate) ? parsedDate : fallbackDate;
	const interestingDate = interestingDates.find(
		(date) => date.date && format(date.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
	);
	const days = differenceInCalendarDays(selectedDate, today);
	const count = new Intl.NumberFormat('en-US').format(Math.abs(days));
	const template = `
	<div style="display:flex;flex-direction:column;width:100%;height:100%;background:#f7f6f0;color:#292c25;padding:48px 64px;font-family:Lato;">
		<div style="display:flex;align-items:center;font-size:32px;font-weight:700;padding-bottom:28px;border-bottom:1px solid #daddcd;">
			<svg width="36" height="36" viewBox="0 0 64 64" style="margin-right:12px"><rect x="10" y="15" width="44" height="42" rx="6" fill="#e9eddf" stroke="#303d2b" stroke-width="3"/><path d="M10 28h44M23 8v14M41 8v14" stroke="#303d2b" stroke-width="3" stroke-linecap="round"/><path d="M22 37h7v7h-7zM36 37h7v7h-7z" fill="#799160"/></svg>
			days until<span style="color:#799160">.</span>
		</div>
		<div style="display:flex;flex-direction:column;flex:1;background:#e9eddf;border:1px solid #daddcd;border-radius:16px;margin-top:30px;padding:25px 40px;">
			<div style="display:flex;font-size:${count.length > 5 ? '112' : '144'}px;line-height:1.05;letter-spacing:-6px;">${count}<span style="color:#829267">.</span></div>
			<div style="display:flex;align-items:baseline;margin-top:12px;font-size:29px;color:#6b735c;">${Math.abs(days) === 1 ? 'day' : 'days'} ${days < 0 ? 'since' : 'until'}<span style="margin-left:14px;font-size:42px;color:#292c25;">${interestingDate?.name ?? 'selected date'}</span></div>
			<div style="display:flex;margin-top:20px;font-size:23px;color:#6d745e;">${format(selectedDate, 'EEEE, MMMM d, yyyy')}</div>
		</div>
	</div>`;

	return new ImageResponse(template, {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Lato', data: fontData, weight: 400 },
			{ name: 'Lato', data: fontDataBold, weight: 700 }
		]
	});
};
