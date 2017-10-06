'use strict';

module.exports = gulp =>
	gulp.task('del', () =>
		require('del')([
			'**',
			'!.git/**',
			'!gulp_tasks/**',
			'!bower_components/**',
			'!node_modules/**',
			'!.sass-cache/**',
			'!src/**',
			'!.gitignore',
			'!.eslintrc',
			'!.eslintrc.js',
			'!.sass-lint.yml',
			'!CNAME',
			'!gulpfile.js',
			'!license.txt',
			'!notes.md',
			'!bower.json',
			'!package.json',
			'!package-lock.json',
			'!webpack.config.js',
			'!readme.md',
			'!server.js'
		])
	);