function isBabelRegister(caller) {
	return !!(caller && caller.name === '@babel/register');
}

module.exports = (api) => {
	const isRegister = api.caller(isBabelRegister);

	if(isRegister) { // is a gulp task script
		return {
			presets: [[
				'@babel/preset-env', {
					targets: {
						node: 'current'
					}
				}
			]]
		};
	}
	else {
		return {
			plugins: ['@babel/plugin-syntax-dynamic-import']
		};
	}
};

// presets: [
// 	['@babel/preset-env', {
// 		targets: {
// 			browsers: [
// 				'last 2 Chrome versions',
// 				'last 2 Firefox versions',
// 				'last 2 Edge versions',
// 				'last 2 Safari versions',
// 				'last 2 iOS versions',
// 				'last 2 ChromeAndroid versions'
// 			]
// 		}
// 	}]
// ],
// plugins: ['@babel/plugin-syntax-dynamic-import']