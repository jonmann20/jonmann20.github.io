import connect from 'gulp-connect';

function srv(done) {
	connect.server({
		root: './',
		host: '0.0.0.0'
	});
	done();
}

export {srv};