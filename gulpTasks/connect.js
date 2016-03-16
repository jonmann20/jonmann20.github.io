'use strict';

module.exports = (gulp) => {
	let connect = require('gulp-connect'); // NOTE: >2.3.1 listing directory bug

	return (() => {
		gulp.task('connect', () => {
		  connect.server({
		  	root: './'//, fallback: 'index.html'
		  });
		});
	})();
};
