<script>
	import '../styles/tailwind.css';
</script>

<div class="flex flex-col justify-center items-center px-4 lg:px-0 lg:min-h-screen ui-main-wrapper">
	<div
		class="py-4 px-6 my-4 mx-6 w-full max-w-3xl bg-white rounded-xs shadow-lg lg:py-8 lg:px-12 lg:mx-auto xl:py-12 xl:px-24"
	>
		<slot />
	</div>

	<div class="prose">
		<p class="pb-8 mt-12 text-sm text-center text-slate-800">
			&copy;2021-{new Date().getFullYear()}
			<a class="underline" href="https://michaelbonner.dev"> Michael Bonner </a>
		</p>
	</div>
</div>
