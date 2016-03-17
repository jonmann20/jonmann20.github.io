'use strict';

module.exports = (gulp) => {
	let del = require('del');

	return (() => {
		gulp.task('del', () => {
			return del([
				'**',
				'!.git/**',
				'!gulpTasks/**',
				'!node_modules/**',
				'!.sass-cache/**',
				'!src/**',
				'!.gitignore',
				'!.jshintrc',
				'!CNAME',
				'!gulpfile.js',
				'!jonw.sublime-project',
				'!jonw.sublime-workspace',
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
