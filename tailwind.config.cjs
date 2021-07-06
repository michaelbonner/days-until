module.exports = {
	mode: 'jit', // ⚠ Make sure to have this
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'custom-turquoise': '#97d9e1',
				'custom-pink': '#d9afd9'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
