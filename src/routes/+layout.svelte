<script>
	import '../styles/tailwind-output.css';
</script>

<div class="flex flex-col justify-center items-center px-4 lg:px-0 lg:min-h-screen ui-main-wrapper">
	<div
		class="py-4 px-8 my-4 mx-6 w-full max-w-3xl bg-white rounded-sm shadow-lg lg:py-8 lg:px-12 lg:mx-auto xl:py-12 xl:px-24"
	>
		<slot />
	</div>

	<div>
		<p class="pb-8 mt-12 text-sm text-center text-gray-800">
			&copy;{new Date().getFullYear()}
			<a class="underline" href="https://michaelbonner.dev"> Michael Bonner </a>
		</p>
	</div>
</div>
