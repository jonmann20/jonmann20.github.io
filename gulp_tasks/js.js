'use strict';

module.exports = (gulp, isDev, iff, concat, sourcemaps, replace, fs) => {
	const babel = require('gulp-babel'),
		uglify = require('gulp-uglify-es').default,
		jshint = require('gulp-jshint'),
		jscs = require('gulp-jscs'),
		stylish = require('gulp-jscs-stylish'),
		gamesCommonJs = [
			'src/games/common/js/GameEngine.js',
			'src/games/common/js/GameSave.js',
			'src/games/common/js/GameInput.js',
			'src/games/common/js/GameUtils.js',
			'src/games/common/js/physics/SAT.js',
			'src/games/common/js/graphics/GameGraphics.js',
			'src/games/common/js/view/GameView.js',
			'src/games/common/js/view/TitleView.js',
			'src/games/common/js/view/GameSaveView.js'
		],
		lints = [
			'src/js/**/*.js',
			'gulpfile.js',
			'gulp_tasks/**/*.js',
			'!src/js/analytics.js'
		],
		presets = [
			['env', {
				targets: {
					browsers: [
						'last 2 Chrome versions',
						'last 2 Firefox versions',
						'last 2 Edge versions',
						'last 2 Safari versions',
						'last 2 iOS versions',
						'last 2 ChromeAndroid versions'
					]
				}
			}]
		],
		handleErr = function(e) {
			console.log(`caught error: ${e}`);
			this.emit('end');
		};

	return (() => {
		gulp.task('js:master', () => {
			return gulp.src([
					'src/js/util.js',
					'src/js/controllers/*.js',
					'src/js/router.js',
					'src/js/main.js'
				]).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(concat('master.js')).
				pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets'));
		});

		gulp.task('js:pageDormanticide', () => {
			return gulp.src(gamesCommonJs.concat([
					'src/games/dormanticide/js/view/OverworldView.js',
					'src/games/dormanticide/js/view/BattleView.js',
					'src/games/dormanticide/js/dormant/Dormant.js',
					'src/games/dormanticide/js/dormant/FightAction.js',
					'src/games/dormanticide/js/main.js'
				])).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(concat('pageDormanticide.js')).
				// NOTE: babel was causing page to break (due to SAT.js)
				//pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets'));
		});

		gulp.task('js:pageVamp', () => {
			return gulp.src(gamesCommonJs.concat([
					'src/games/vamp/js/view/LevelView.js',
					'src/games/vamp/js/level/level1.js',
					'src/games/vamp/js/vamp.js',
					'src/games/vamp/js/main.js'
				])).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(concat('pageVamp.js')).
				// NOTE: babel was causing page to break (due to SAT.js)
				//pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets'));
		});

		gulp.task('js:other', () => {
			return gulp.src([
					'src/js/ballPit.js',
					'src/js/stars.js',
					'src/js/listCarousel.js'
				]).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets'));
		});

		gulp.task('js:serviceWorker', () => {
			return gulp.src('src/js/sw.js').
				pipe(replace('const CACHE_VERSION = 1;', () => {
					return `const CACHE_VERSION = ${new Date().getTime()};`;
				})).
				pipe(gulp.dest('./'));
		});

		gulp.task('jshint', () => {
			return gulp.src(lints).
				pipe(jshint('.eslintrc')).
				pipe(jshint.reporter('jshint-stylish'));
		});

		gulp.task('jscs', () => {
			return gulp.src(lints).
				pipe(jscs('.jscsrc')).
				pipe(stylish());
		});

		gulp.task('js:minifyBundle', () => {
			return gulp.src('assets/icons.bundle.js').
				pipe(uglify({
					// https://github.com/mishoo/UglifyJS2/issues/1753
					mangle: {
						safari10: true
					}
				})).
				pipe(gulp.dest('assets'));
		});

		gulp.task('js:inlineIndex', () => {
			return gulp.src('index.html').
				// https://github.com/webcomponents/webcomponentsjs/issues/801
				// pipe(replace('<script src=/bower_components/webcomponentsjs/webcomponents-loader.js></script>', () => {
				// 	const s = fs.readFileSync(`${__dirname}/../bower_components/webcomponentsjs/webcomponents-loader.js`, 'utf8');
				// 	return `<script>${s}</script>`;
				// })).
				pipe(replace('<script src=/assets/master.js></script>', () => {
					const s = fs.readFileSync(`${__dirname}/../assets/master.js`, 'utf8');
					return `<script>${s}</script>`;
				})).
				pipe(gulp.dest('./'));
		});

		gulp.task('js', gulp.parallel(
			'js:master',
			'js:pageDormanticide',
			'js:pageVamp',
			'js:other',
			'js:serviceWorker'
		));
	})();
};