import path from 'path';

module.exports = {
	entry: {
		router: './js/router.js',
		vamp: './games/vamp/js/main.js',
		dormanticide: './games/dormanticide/js/main.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '',
		filename: '[name].js'
	},
	resolve: {
		modules: ['node_modules'],
		descriptionFiles: ['package.json']
	},
	mode: 'production',

	// NOTE: implicit babel.config.js not working with @babel/public-class-properties plugin
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-modules']
					],
					plugins: [
						'@babel/plugin-proposal-class-properties'
					]
				}
			}
		]
	}
};