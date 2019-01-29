import {src, dest, parallel} from 'gulp';
import replace from 'gulp-replace';
import fs from 'fs';
//import cleanCss from 'gulp-clean-css';

// function cssLint() {
// 	return gulp.src('elts/styles/*.js').
// 		pipe(_cssLint());
// }

function _inline(_src, _dest, assetHref, assetFile) {
	const cond = `<link rel="stylesheet" href="${assetHref}">`;
	const file = `${__dirname}/../${assetFile}`;

	return src(_src).
		pipe(replace(cond, () => {
			const styles = fs.readFileSync(file, 'utf8');
			return `<style>${styles}</style>`;
		})).
		pipe(dest(_dest));
}

function cssInlineDormanticide() {
	return _inline(
		'dist/games/dormanticide/index.html', 'dist/games/dormanticide',
		'/games/common/css/main.css', 'dist/games/common/css/main.css'
	);
}

function cssInlineVamp() {
	return _inline(
		'dist/games/vamp/index.html', 'dist/games/vamp',
		'/games/common/css/main.css', 'dist/games/common/css/main.css'
	);
}

const cssInline = parallel(
	cssInlineDormanticide,
	cssInlineVamp
);

export {
	//cssLint,
	cssInline
};