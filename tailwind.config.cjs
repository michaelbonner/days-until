module.exports = {
	mode: 'jit', // ⚠ Make sure to have this
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'sandy-teal': '#70e1f5',
				'sandy-sand': '#ffd194'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
