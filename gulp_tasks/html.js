import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import webpack from 'webpack-stream';

function htmlBundleIcons() {
	return gulp.src('src/elts/icons.html').
		pipe(webpack(require('../webpack.config.js'))).
		pipe(gulp.dest('assets'));
}

function htmlMinify() {
	return gulp.src(['**/*.html', '!src/**', '!node_modules/**', '!bower_components/**']).
		pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true,
			minifyCSS: true
		})).
		pipe(gulp.dest('./'));
}

export {
	htmlBundleIcons,
	htmlMinify
};