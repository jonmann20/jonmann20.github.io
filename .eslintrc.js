module.exports = {
	extends: 'eslint:recommended',
	plugins: ['html'],
	env: {
		// TODO: split config files for server/client code
		browser: true,
		node: true,
		es6: true
	},
	globals: {
		ga: true,
		Router: true,
		router: true,
		twttr: true,
		util: true,
		pListen: true,
		ListCarousel: true,
		StarryBg: true,
		starryBg: true,
		BallPit: true,
		ballPit: true,
		aboutController: true,
		gamesController: true,
		homeController: true,
		playgroundController: true,
		portfolioController: true
	},
	rules: {
		quotes: ['error', 'single', {avoidEscape: true}],
		strict: ['error', 'global'],
		'no-global-assign': 'error',
		'no-console': ['off'],
		'keyword-spacing': ['error', {
			after: false,
			overrides: {
				'try': {after: true},
				'case': {after: true},
				'return': {after: true},
				'else': {after: true}
			}
		}],
		semi: ['error', 'always'],
		curly: ['error', 'all'],
		'no-trailing-spaces': 'error',
		'quote-props': ['error', 'as-needed'],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'never'],
		'space-in-parens': ['error', 'never'],
		'dot-notation': 'error',
		'space-before-blocks': 'error',
		camelcase: 'error',
		'brace-style': ['error', 'stroustrup', {allowSingleLine: false}],
		'space-before-function-paren': ['error', 'never'],
		'comma-spacing': ['error', {after: true}],
		indent: ['error', 'tab', {SwitchCase: 1}],
		'linebreak-style': ['error', 'unix'],
		'space-infix-ops': 'error',
		//'max-len': ['error', 120]
	}
};