// import gulp from 'gulp';
// import iff from 'gulp-if';
// import sourcemaps from 'gulp-sourcemaps';
// import replace from 'gulp-replace';
// import fs from 'fs';

// import cleanCss from 'gulp-clean-css';
// import isDev from './env';

// const cssSrc = 'src/elts/styles/*.js';

// function _inline(src, filename, dest) {
// 	const cond = `<link rel="stylesheet" href="${filename}">`;
// 	const file = `${__dirname}/..${filename}`;

// 	return gulp.src(src).
// 		pipe(replace(cond, () => {
// 			const styles = fs.readFileSync(file, 'utf8');
// 			return `<style>${styles}</style>`;
// 		})).
// 		pipe(gulp.dest(dest));
// }

// // function cssLint() {
// // 	return gulp.src(cssSrc).
// // 		pipe(cssLint());
// // }

// const cssInlineVamp = () => _inline('games/vamp/index.html', '/games/common/css/main.css', './games/vamp');
// const cssInlineDormanticide = () => _inline('games/dormanticide/index.html', '/games/common/css/main.css', './games/dormanticide');

// const cssInline = gulp.parallel(
// 	cssInlineVamp,
// 	cssInlineDormanticide
// );

// export {
// 	//cssLint
// };