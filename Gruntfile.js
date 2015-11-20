module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			all: ['.sass-cache', 'assets', 'audio', 'blog', 'font', 'games', 'img', 'js', 'music', 'playground', 'portfolio', 'scss', '*.html']
		},

		connect: {
			dev: {
				options: {
					//hostname: 'jonw',
					port: 5000,
					open: false//,base: 'src'
				}
			},

			qa: {
				options: {
					hostname: 'jonw',
					port: 1612,
					open: true,
					keepalive: true
				}
			}
		},

		concat: {
			options: {
				sourceMap: true
			},

			masterJs: {
				src: [
					'src/js/plugins/sammy.js',
					'src/js/utils.js',
					'src/js/models/*.js',
					'src/js/routing.js',
					'src/js/main.js'
				],
				dest: 'assets/master.js'
			},

			gamesCommonJs: {
				src: [
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
				dest: 'assets/gamesCommon.js'
			},

			pageDormanticide: {
				src: [
					'<%= concat.gamesCommonJs.src %>',
					'src/games/dormanticide/js/view/OverworldView.js',
					'src/games/dormanticide/js/view/BattleView.js',
					'src/games/dormanticide/js/dormant/Dormant.js',
					'src/games/dormanticide/js/dormant/FightAction.js',
					'src/games/dormanticide/js/main.js'
				],
				dest: 'assets/pageDormanticide.js',
			},

			pageVamp: {
				src: [
					'<%= concat.gamesCommonJs.src %>',
					'src/games/vamp/js/view/LevelView.js',
					'src/games/vamp/js/level/level1.js',
					'src/games/vamp/js/vamp.js',
					'src/games/vamp/js/main.js'
				],
				dest: 'assets/pageVamp.js',
			},

			masterCss: {
				src: [
					'assets/css/normalize.css',
					'assets/css/base.css',
					'assets/css/layout.css',

					'assets/css/state/home.css',
					'assets/css/state/games.css',
					'assets/css/state/music.css',
					'assets/css/state/playground.css',
					'assets/css/state/portfolio.css',

					'assets/css/state/responsive.css'
				],
				dest: 'assets/master.css'
			}
		},

		watch: {
			options: {
				livereload: true
			},

			masterJs: {
				files: ['<%= concat.masterJs.src %>'],
				tasks: ['concat:masterJs']
			},

			//gamesCommonJs: {
			//    files: ['<%= concat_sourcemap.gamesCommonJs.src %>'],
			//    tasks: ['concat_sourcemap:gamesCommonJs', 'concat_sourcemap:gamesCommonJs]
			//}

			pageDormanticide: {
				files: ['<%= concat.pageDormanticide.src %>'],
				tasks: ['concat:pageDormanticide']
			},

			pageVamp: {
				files: ['<%= concat.pageVamp.src %>'],
				tasks: ['concat:pageVamp']
			},

			sass: {    // TODO: other css files
				files: ['src/scss/**/*.scss'],
				tasks: ['sass', 'concat:masterCss'] // TODO: copy
			},

			html: {
				files: ['src/**/*.html'],
				tasks: ['includereplace']
			}
		},

		uglify: {
			masterJs: {
				files: {
					'<%= concat.masterJs.dest %>': ['src/js/analytics.js', 'src/js/clientSideLogging.js', '<%= concat.masterJs.src %>']
				}
			},

			pageDormanticide: {
				files: {
					'<%= concat.pageDormanticide.dest %>': ['src/js/analytics.js', 'src/js/clientSideLogging.js', '<%= concat.pageDormanticide.src %>']
				}
			},

			pageVamp: {
				files: {
					'<%= concat.pageVamp.dest %>': ['src/js/analytics.js', 'src/js/clientSideLogging.js', '<%= concat.pageVamp.src %>']
				}
			}
		},

		sass: {
			all: {
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['**/*.scss', '!vars.scss'],
					dest: 'assets/css',
					ext: '.css'
				}]
			}
		},

		cssmin: {
			'<%= concat.masterCss.dest %>': '<%= concat.masterCss.src %>'
		},

		copy: {
			allBut_Html_Scss: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**', '!**/*.html', '!scss/**'],
					dest: './'
				}]
			}
		},

		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeEmptyAttributes: true,
				minifyJS: true,
				minifyCSS: true
			},

			all: {
				files: [{
					expand: true,
					src: ['**/*.html', '!src/**', '!node_modules/**'],
					dest: './'
				}]
			}
		},

		imagemin: {
			options: {
				optimizationLevel: 3,
			},

			all: {
				files: [{
					expand: true,
					cwd: 'img',
					src: ['**/*.{png,jpg,gif,ico}'],
					dest: 'img'
				}]
			}

			// TODO: game images
		},

		includereplace: {
			options: {
				includesDir: 'src'
			},

			all: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.html'],
					dest: './'
				}]
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'src/js/**/*.js', '!src/js/analytics.js',  '!src/js/plugins/**']
		}

		// TODO: bower (plugin manager - e.g. jQuery, sammy.js, ...)
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-include-replace');        // TODO: use assemble instead
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// TODO: base dev in src (avoid copy)
	grunt.registerTask('default', ['sass', 'concat', 'copy', 'includereplace', 'connect:dev', 'watch']);
	grunt.registerTask('prd', ['clean:all', 'sass', 'concat', 'uglify', 'cssmin', 'copy', 'imagemin', 'includereplace', 'htmlmin']);
	grunt.registerTask('srv', ['connect:qa']);

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('cleanA', ['clean:all']);
};