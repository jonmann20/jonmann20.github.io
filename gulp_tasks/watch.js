'use strict';

module.exports = (gulp) => {
	return (() => {
		gulp.task('watch', done => {
			gulp.watch('src/**/*.html', gulp.series('include'/*, 'jshint:html'*/));
			gulp.watch('src/scss/*.scss', gulp.series('scss', 'scss-lint'));
			gulp.watch('src/**/*.js', gulp.series('js', 'jshint', 'jscs'));

			done();
		});
	})();
};