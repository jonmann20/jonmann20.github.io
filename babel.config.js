function isBabelRegister(caller) {
	return !!(caller && caller.name === '@babel/register');
}

module.exports = (api) => {
	const isRegister = api.caller(isBabelRegister);
	let config = {};

	if(isRegister) { // is a gulp task script
		config = {
			presets: [[
				'@babel/preset-env', {
					targets: {
						node: 'current'
					}
				}
			]]
		};
	}

	return config;
};