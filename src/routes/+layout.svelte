<script lang="ts">
	import '../styles/tailwind.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="ui-main-wrapper flex flex-col items-center justify-center px-4 lg:min-h-screen lg:px-0">
	<div
		class="mx-6 my-4 w-full max-w-4xl rounded-lg bg-white px-6 py-4 shadow-lg lg:mx-auto lg:mt-12 lg:px-12 lg:py-8 xl:px-24 xl:py-12"
	>
		{@render children?.()}
	</div>

	<div class="prose mt-4 mb-8">
		<p class="text-center text-sm text-slate-800">
			&copy;2021-{new Date().getFullYear()}
			<a class="underline" href="https://michaelbonner.dev"> Michael Bonner </a>
		</p>
	</div>
</div>
