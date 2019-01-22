import gulp from 'gulp';
import copy from './gulp_tasks/copy';
import del from './gulp_tasks/del';
import {bundleComponents, htmlMinify} from './gulp_tasks/html';
//import {/*cssLint,*/ cssInline} from './gulp_tasks/css';
import {js, eslint, jsInline, /*jsInlineIndex2,*/ jsMinifyBundles} from './gulp_tasks/js';
import srv from './gulp_tasks/server';
import watch from './gulp_tasks/watch';

const test = gulp.parallel(/*cssLint,*/ eslint);
test.description = 'Lint SCSS and JS files';

const dev = gulp.parallel(
	gulp.series(js, copy),
	gulp.series(srv, watch)
);
dev.description = 'Build files and run server';

const prd = gulp.series(
	test,  // NOTE: running test in parallel w/JS was causing bugs
	gulp.parallel(js, copy, bundleComponents),
	gulp.series(/*cssInline,*/ jsInline, /*jsInlineIndex2,*/ jsMinifyBundles, htmlMinify)
);
prd.description = 'Build files for production';

export {
	del,
	//cssLint,
	js, eslint,
	test, prd, srv,
	bundleComponents
};

export default dev;