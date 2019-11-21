import {series, parallel} from 'gulp';
import del from './gulp_tasks/del';
import copy from './gulp_tasks/copy';
import {bundleComponents, prdIndex, htmlMinify} from './gulp_tasks/html';
import {cssLint, cssInline} from './gulp_tasks/css';
import {eslint, jsServiceWorker, jsInline} from './gulp_tasks/js';
import srv from './gulp_tasks/server';

const lint = parallel(/*htmlLint, */cssLint, eslint);
lint.description = 'Lint HTML, CSS, and JS files';

const prd = series(
	parallel(lint, jsServiceWorker, copy, bundleComponents),
	series(prdIndex, cssInline, jsInline, htmlMinify)
);
prd.description = 'Build files for production';

export {
	del,
	lint,
	prd,
	srv
};

export default srv;