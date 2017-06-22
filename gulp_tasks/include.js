'use strict';

module.exports = (gulp, isDev, iff, liveReload) => {
	const fileInclude = require('gulp-file-include'),
		htmlmin = require('gulp-htmlmin'),
		bash = require('./bash');

	return (() => {
		gulp.task('include', () => {
			return gulp.src(['src/**/*.html']).
				pipe(fileInclude({
					prefix: '@@',
					basepath: '@file'
				})).
				pipe(iff(!isDev, htmlmin({
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true
				}))).
				pipe(gulp.dest('./')).
				pipe(iff(isDev, liveReload()));
		});

		gulp.task('include:bundle', (done) => {
			bash.cmd('polymer-bundler', ['index.html', '--out-html', 'index.html']).then(p => {
				done();
			});
		});

		gulp.task('include:minify', () => {
			return gulp.src(['./index.html']).
				pipe(htmlmin({
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true
				})).
				pipe(gulp.dest('./'));
		});
	})();
};