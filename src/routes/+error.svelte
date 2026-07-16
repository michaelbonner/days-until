<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const isNotFound = page.status === 404;
</script>

<svelte:head>
	<title>{isNotFound ? 'Page Not Found' : `Error ${page.status}`} | Days Until</title>
</svelte:head>

<div class="text-center">
	<div
		class="text-malibu-800 mx-auto flex size-16 items-center justify-center rounded-full border bg-white"
	>
		<svg
			class="size-7"
			stroke="currentColor"
			fill="none"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
		>
			{#if isNotFound}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
				/>
			{:else}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
				/>
			{/if}
		</svg>
	</div>

	<p class="mt-8 text-sm font-medium text-slate-500">{page.status}</p>

	<h1 class="mt-2 text-3xl font-black lg:text-4xl">
		{#if isNotFound}
			Page not found
		{:else if page.status === 500}
			Something went wrong
		{:else}
			An error occurred
		{/if}
	</h1>

	<p class="prose mx-auto mt-4 max-w-md">
		{#if isNotFound}
			The page you&apos;re looking for doesn&apos;t exist or may have been moved to a different URL.
		{:else if page.error?.message}
			{page.error.message}
		{:else}
			We ran into an unexpected problem. Please try again in a moment.
		{/if}
	</p>

	<div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
		<button
			class="bg-malibu-800 hover:bg-malibu-900 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white sm:w-auto"
			onclick={() => {
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				goto('/');
			}}
		>
			<svg
				class="size-4"
				stroke="currentColor"
				fill="none"
				stroke-width="2"
				viewBox="0 0 24 24"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"
				/>
			</svg>
			Back to home
		</button>
		<button
			class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
			onclick={() => history.back()}
		>
			<svg
				class="size-4"
				stroke="currentColor"
				fill="none"
				stroke-width="2"
				viewBox="0 0 24 24"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7 7-7M3 12h18" />
			</svg>
			Go back
		</button>
	</div>
</div>
