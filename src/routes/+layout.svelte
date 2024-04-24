<script>
	import '../styles/tailwind-output.css';
</script>

<div class="ui-main-wrapper lg:min-h-screen flex flex-col justify-center items-center px-8 lg:px-0">
	<div
		class="mx-6 lg:mx-auto my-12 px-8 py-4 lg:px-8 lg:py-8 bg-white w-full max-w-2xl rounded-sm shadow-lg"
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
