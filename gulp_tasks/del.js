'use strict';

module.exports = (gulp) => {
	const del = require('del');

	return (() => {
		gulp.task('del', () => {
			// TODO: whitelist instead of blacklist

			return del([
				'**',
				'!.git/**',
				'!gulp_tasks/**',
				'!bower_components/**',
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
				'!bower.json',
				'!package.json',
				'!package-lock.json',
				'!webpack.config.js',
				'!readme.md',
				'!server.js'
			]);
		});
	})();
};