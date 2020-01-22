module.exports = api => {
	api.cache(true);

	// Used by server (dynamic transform)
	return {
		plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	};
};