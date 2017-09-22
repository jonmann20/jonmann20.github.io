'use strict';

module.exports = (gulp, scssSrc) => {
	return (() => {
		gulp.task('watch', () => {
			gulp.watch('src/**/*.html', gulp.series('include'/*, 'jshint:html'*/));
			gulp.watch('src/**/*.js', gulp.series('js', 'jshint', 'jscs'));
			gulp.watch(scssSrc, gulp.series('scss', 'scss-lint'));
		});
	})();
};