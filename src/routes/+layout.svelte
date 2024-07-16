<script>
	import '../styles/tailwind-output.css';
</script>

<div class="ui-main-wrapper lg:min-h-screen flex flex-col justify-center items-center px-4 lg:px-0">
	<div
		class="mx-6 lg:mx-auto my-4 px-8 py-4 lg:px-12 lg:py-8 xl:px-24 xl:py-12 bg-white w-full max-w-3xl rounded-sm shadow-lg"
	>
		<slot />
	</div>

	<div>
		<p class="text-center mt-12 text-sm text-gray-800 pb-8">
			&copy;{new Date().getFullYear()}
			<a class="underline" href="https://michaelbonner.dev"> Michael Bonner </a>
		</p>
	</div>
</div>
