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
						['@babel/preset-env', {
							targets: {
								browsers: [
									'last 2 Chrome versions',
									'last 2 Firefox versions',
									'last 2 Edge versions',
									'last 2 Safari versions',
									'last 2 iOS versions',
									'last 2 ChromeAndroid versions'
								]
							}
						}]
					],
					plugins: [
						'@babel/plugin-proposal-class-properties'
					]
				}
			}
		]
	}
};