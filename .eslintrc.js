module.exports = {
	extends: 'eslint:recommended',
	plugins: ['html'],
	env: {
		// TODO: split config files for server/client code
		browser: true,
		node: true,
		es6: true,
		jest: true
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 8,
		//sourceType: 'module',
		allowImportExportEverywhere: true
	},
	globals: {
		ga: true,
		twttr: true,
		WebComponents: true
	},
	rules: {
		quotes: ['error', 'single', {avoidEscape: true}],
		strict: ['warn', 'global'],
		'no-unused-vars': 'warn',
		'no-global-assign': 'error',
		'no-console': ['off'],
		'keyword-spacing': ['error', {
			after: false,
			overrides: {
				try: {after: true},
				case: {after: true},
				return: {after: true},
				else: {after: true},
				from: {after: true},
				import: {after: true},
				export: {after: true}
			}
		}],
		semi: ['warn', 'always'],
		curly: ['error', 'all'],
		'no-trailing-spaces': 'error',
		'quote-props': ['error', 'as-needed'],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'never'],
		'template-curly-spacing': 0,
		'space-in-parens': ['error', 'never'],
		'dot-notation': 'error',
		'space-before-blocks': 'error',
		camelcase: 'error',
		'brace-style': ['error', 'stroustrup', {allowSingleLine: false}],
		'space-before-function-paren': ['warn', 'never'],
		'comma-spacing': ['error', {after: true}],
		indent: ['error', 'tab', {
			SwitchCase: 1,
			ignoredNodes: ['TemplateLiteral']
		}],
		'space-infix-ops': 'error',
		//'linebreak-style': ['error', 'unix'],
		//'max-len': ['error', 120]
	}
};