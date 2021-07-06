<script>
	import '../styles/tailwind-output.css';
</script>

<div class="ui-main-wrapper lg:min-h-screen flex flex-col justify-center items-center">
	<div
		class="mx-6 lg:mx-auto my-12 px-8 py-4 lg:px-8 lg:py-8 bg-white max-w-3xl rounded-lg shadow-lg"
	>
		<slot />
	</div>
</div>
