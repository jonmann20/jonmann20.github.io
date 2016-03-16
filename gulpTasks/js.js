'use strict';

module.exports = (gulp, concat) => {
	// TODO: sourcemap concat
	let gamesCommonJs = [
		'src/games/common/js/GameEngine.js',
		'src/games/common/js/GameSave.js',
		'src/games/common/js/GameInput.js',
		'src/games/common/js/GameUtils.js',
		'src/games/common/js/physics/SAT.js',
		'src/games/common/js/graphics/GameGraphics.js',
		'src/games/common/js/view/GameView.js',
		'src/games/common/js/view/TitleView.js',
		'src/games/common/js/view/GameSaveView.js'
	];

	return (() => {
		gulp.task('js:master', () => {
			return gulp.src([
				'src/js/plugins/sammy.js',
				'src/js/utils.js',
				'src/js/models/*.js',
				'src/js/routing.js',
				'src/js/main.js'
			]).
			pipe(concat('master.js')).
			pipe(gulp.dest('assets'));
		});

		gulp.task('js:gamesCommon', () => {
			return gulp.src(gamesCommonJs).
				pipe(concat('gamesCommon.js')).
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
			pipe(concat('pageDormanticide.js')).
			pipe(gulp.dest('assets'));
		});

		gulp.task('js:pageVamp', () => {
			return gulp.src(gamesCommonJs.concat([
				'src/games/vamp/js/view/LevelView.js',
				'src/games/vamp/js/level/level1.js',
				'src/games/vamp/js/vamp.js',
				'src/games/vamp/js/main.js'
			])).
			pipe(concat('pageVamp.js')).
			pipe(gulp.dest('assets'));
		});

		gulp.task('js', gulp.parallel(
			'js:master',
			'js:gamesCommon',
			'js:pageDormanticide',
			'js:pageVamp'
		));
	})();
};
