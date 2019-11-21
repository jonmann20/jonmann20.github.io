module.exports = api => {
	api.cache(true);

	// Used by server (dynamic transform)
	return {
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties'
		]
	};
};