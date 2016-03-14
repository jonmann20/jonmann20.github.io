'use strict';

module.exports = (gulp) => {
	let del = require('del');

	return (() => {
		gulp.task('clean', () => {
			del([
				'**',
				'!.git/**',
				'!gulpTasks/**',
				'!node_modules/**',
				'!.sass-cache/**',
				'!src/**',
				'!.gitignore',
				'!CNAME',
				'!gulpfile.js',
				'!jonw.sublime-project',
				'!jonw.sublime-workspace',
				'!license.txt',
				'!notes.md',
				'!package.json',
				'!params.json',
				'!readme.md'
			]);
		});
	})();
};
