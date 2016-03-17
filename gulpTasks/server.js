'use strict';

module.exports = (gulp) => {
	let liveServer = require('gulp-live-server');

	return (() => {
		gulp.task('server', () => {
			let server = liveServer.static('./', 8080);
			server.start();
		});
	})();
};
