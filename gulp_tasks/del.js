import _del from 'del';

del.description = 'Cleanup built files';
export default function del() {
	return _del([
		'dist/**',
		'!dist',
		'games/vamp/assets/**',
		'games/dormanticide/assets/**'
	]);
}