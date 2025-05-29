<script>
	import '../styles/tailwind.css';
</script>

<div class="ui-main-wrapper flex flex-col items-center justify-center px-4 lg:min-h-screen lg:px-0">
	<div
		class="mx-6 my-4 w-full max-w-3xl rounded-xs bg-white px-6 py-4 shadow-lg lg:mx-auto lg:px-12 lg:py-8 xl:px-24 xl:py-12"
	>
		<slot />
	</div>

	<div class="prose">
		<p class="mt-12 pb-8 text-center text-sm text-slate-800">
			&copy;2021-{new Date().getFullYear()}
			<a class="underline" href="https://michaelbonner.dev"> Michael Bonner </a>
		</p>
	</div>
</div>
