import connect from 'gulp-connect';

export default function srv(done) {
	connect.server({
		root: './',
		host: '0.0.0.0'
	});
	done();
}