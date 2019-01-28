import path from 'path';

module.exports = {
	entry: {
		router: './js/router.js',
		vamp: './games/vamp/js/main.js',
		dormanticide: './games/dormanticide/js/main.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	resolve: {
		modules: ['node_modules'],
		descriptionFiles: ['package.json']
	},
	mode: 'production'
};