module.exports = {
	mode: 'jit', // ⚠ Make sure to have this
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				malibu: {
					DEFAULT: '#70E1F5',
					50: '#f3f9fa',
					100: '#eaf5f8',
					200: '#e3f9fe',
					300: '#CFF5FC',
					400: '#A0EBF8',
					500: '#70E1F5',
					600: '#40D7F2',
					700: '#11CDEE',
					800: '#0DA4BF',
					900: '#0A7B8F'
				},
				'peach-orange': {
					DEFAULT: '#FFD194',
					50: '#FFFFFF',
					100: '#FFFFFF',
					200: '#FFFFFF',
					300: '#FFFDFA',
					400: '#FFE7C7',
					500: '#FFD194',
					600: '#FFBB61',
					700: '#FFA52E',
					800: '#FA8F00',
					900: '#C77100'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
