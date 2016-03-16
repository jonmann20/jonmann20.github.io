'use strict';

module.exports = (gulp, liveReload, /*jsAll, jsPageMeet,*/ scssSrc) => {
	let del = require('del');

	return (() => {
		// NOTE: keep dependencies up to date with 'default' task
		gulp.task('watch', () => {
			//gulp.watch('clientSrc/fonts/**/*.{eot,svg,ttf,woff}', ['copy:fonts']);
			//gulp.watch('clientSrc/img/**/*.{png,jpg,gif,ico,svg}', ['copy:img']);
			//gulp.watch(jsPageMeet, ['jsPageMeet', 'jshint', 'jscs']);  // TODO: jasmine:client

			 // TODO: break down into smaller tasks

			gulp.watch('src/**/*.html', gulp.series('include'/*, 'jshint:html'*/));
			gulp.watch('src/**/*.js', gulp.series('js'/*, 'jasmine:client'*/));
			gulp.watch(scssSrc, gulp.series('scss'/*, 'scsslint'*/));

			liveReload.listen();
		});
	})();
};
