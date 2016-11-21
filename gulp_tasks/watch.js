'use strict';

module.exports = (gulp, liveReload, scssSrc) => {
	return (() => {
		// NOTE: keep dependencies up to date with 'default' task
		gulp.task('watch', () => {
			// TODO: break down into smaller tasks

			gulp.watch('src/**/*.html', gulp.series('include'/*, 'jshint:html'*/));
			gulp.watch('src/**/*.js', gulp.series('js', 'jshint', 'jscs'));
			gulp.watch(scssSrc, gulp.series('scss', 'scss-lint'));

			//gulp.watch('clientSrc/fonts/**/*.{eot,svg,ttf,woff}', ['copy:fonts']);
			//gulp.watch('clientSrc/img/**/*.{png,jpg,gif,ico,svg}', ['copy:img']);

			// NOTE: done automatically by gulp-live-server??
			//liveReload.listen();
		});
	})();
};