'use strict';

module.exports = (gulp) => {
	const del = require('del');

	return (() => {
		gulp.task('del', () => {
			return del([
				'**',
				'!.git/**',
				'!gulp_tasks/**',
				'!node_modules/**',
				'!.sass-cache/**',
				'!src/**',
				'!.gitignore',
				'!.eslintrc',
				'!.jscsrc',
				'!.sass-lint.yml',
				'!CNAME',
				'!gulpfile.js',
				'!license.txt',
				'!notes.md',
				'!package.json',
				'!params.json',
				'!readme.md',
				'!server.js'
			]);
		});
	})();
};