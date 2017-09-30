'use strict';

module.exports = (gulp) => {
	return (() => {
		gulp.task('watch', () => {
			gulp.watch('src/**/*.html', gulp.series('include'/*, 'jshint:html'*/));
			gulp.watch('src/**/*.js', gulp.series('js', 'jshint', 'jscs'));
			gulp.watch('src/scss/**/*.scss', gulp.series('scss', 'scss-lint'));
		});
	})();
};