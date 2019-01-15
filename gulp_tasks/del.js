import _del from 'del';

del.description = 'Cleanup built files';
export default function del() {
	return _del([
		'**',
		'!.git/**',
		'!gulp_tasks/**',
		'!node_modules/**',
		'!src/**',
		'!babel.config.js',
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
		'!webpack.config.js',
		'!readme.md',
		'!server.js'
	]);
}