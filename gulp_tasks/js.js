'use strict';

module.exports = (gulp, isDev, iff, concat, liveReload, sourcemaps) => {
	const babel = require('gulp-babel');
	const uglify = require('gulp-uglify');
	const jshint = require('gulp-jshint');
	const jscs = require('gulp-jscs');
	const stylish = require('gulp-jscs-stylish');

	const gamesCommonJs = [
		'src/games/common/js/GameEngine.js',
		'src/games/common/js/GameSave.js',
		'src/games/common/js/GameInput.js',
		'src/games/common/js/GameUtils.js',
		'src/games/common/js/physics/SAT.js', // NOTE: babel causes error; have to ignore transpile
		'src/games/common/js/graphics/GameGraphics.js',
		'src/games/common/js/view/GameView.js',
		'src/games/common/js/view/TitleView.js',
		'src/games/common/js/view/GameSaveView.js'
	];

	const lints = [
		'src/js/**/*.js',
		'gulpfile.js',
		'gulp_tasks/**/*.js',
		'!src/js/plugins/**/*.js',
		'!src/js/analytics.js'
	];

	const presets = [
		['es2015', {
			loose: true,
			modules: false
		}]
	];

	return (() => {
		gulp.task('js:master', () => {
			return gulp.src([
					'src/js/util.js',
					'src/js/controllers/*.js',
					'src/js/router.js',
					'src/js/main.js'
				]).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(babel({presets: presets})).
				pipe(concat('master.js')).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets')).
				pipe(iff(isDev, liveReload()));
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
				pipe(babel({
					presets: presets,
					ignore: ['src/games/common/js/physics/SAT.js']
				})).
				pipe(concat('pageDormanticide.js')).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets')).
				pipe(iff(isDev, liveReload()));
		});

		gulp.task('js:pageVamp', () => {
			return gulp.src(gamesCommonJs.concat([
					'src/games/vamp/js/view/LevelView.js',
					'src/games/vamp/js/level/level1.js',
					'src/games/vamp/js/vamp.js',
					'src/games/vamp/js/main.js'
				])).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(babel({
					presets: presets,
					ignore: ['src/games/common/js/physics/SAT.js']
				})).
				pipe(concat('pageVamp.js')).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets')).
				pipe(iff(isDev, liveReload()));
		});

		gulp.task('js:other', () => {
			return gulp.src(['src/js/ballPit.js', 'src/js/stars.js', 'src/js/listCarousel.js']).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(babel({presets: presets})).
				pipe(iff(!isDev, uglify())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets')).
				pipe(iff(isDev, liveReload()));
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

		gulp.task('js', gulp.parallel(
			'js:master',
			'js:pageDormanticide',
			'js:pageVamp',
			'js:other'
		));
	})();
};