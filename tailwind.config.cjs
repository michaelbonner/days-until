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
				pizazz: {
					DEFAULT: '#FA8F00',
					50: '#FFF2E1',
					100: '#FFE7C7',
					200: '#FFD194',
					300: '#FFBB61',
					400: '#FFA62E',
					500: '#FA8F00',
					600: '#C77200',
					700: '#945500',
					800: '#613700',
					900: '#2E1A00'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
