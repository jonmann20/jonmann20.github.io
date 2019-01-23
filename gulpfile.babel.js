import {series, parallel} from 'gulp';
import del from './gulp_tasks/del';
import copy from './gulp_tasks/copy';
import {bundleComponents, prdIndex} from './gulp_tasks/html';
//import {/*cssLint,*/ cssInline} from './gulp_tasks/css';
import {js, eslint, /* jsInline, jsInlineIndex2,*/ jsMinifyBundles} from './gulp_tasks/js';
import srv from './gulp_tasks/server';
//import watch from './gulp_tasks/watch';

const test = parallel(/*cssLint,*/ eslint);
test.description = 'Lint SCSS and JS files';

const dev = parallel(
	series(js),
	series(srv/*, watch*/)
);
dev.description = 'Build files and run server';

const prd = series(
	test,  // NOTE: running test in parallel w/JS was causing bugs
	js,
	parallel(copy, bundleComponents),
	series(/*cssInline, jsInline, jsInlineIndex2,*/ prdIndex, jsMinifyBundles/*, htmlMinify*/)
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