module.exports = {
	processors: [
		[
			'stylelint-processor-styled-components',
			{
				moduleName: 'lit',
				importName: 'css',
				strict: true
			}
		]
	],
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-styled-components'
	],
	rules: {
		'selector-type-no-unknown': null,
		'property-no-vendor-prefix': null,
		'no-descending-specificity': null
	}
};