import gulp from 'gulp';
import _del from 'del';

del.description = 'Cleanup built files';
function del() {
	return _del([
		'**',
		'!.git/**',
		'!gulp_tasks/**',
		'!bower_components/**',
		'!node_modules/**',
		'!.sass-cache/**',
		'!src/**',
		'!.babelrc',
		'!.gitignore',
		'!.eslintrc',
		'!.eslintrc.js',
		'!.sass-lint.yml',
		'!CNAME',
		'!gulpfile.babel.js',
		'!license.txt',
		'!notes.md',
		'!bower.json',
		'!package.json',
		'!package-lock.json',
		'!webpack.config.js',
		'!readme.md',
		'!server.js'
	]);
}

export {del};