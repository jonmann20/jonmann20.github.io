module.exports = function(grunt) {

	// configure tasks
	grunt.initConfig({
	    clean: ["www/css/min", "www/js/min"],

	    connect: {
	        dev: {
	            options: {
	                hostname: "jon",
	                port: 80,
	                open: false,
	                base: "www"
	            }
	        },
	        qa: {
	            options: {
	                hostname: "jon",
	                port: 80,
	                open: false,
                    keepalive: true
	            }
	        }
	    },

	    concat_sourcemap: {
	        options: {
                sourcesContent: true
	        },

	        masterJs: {
                //cwd: "www",
	            src: [
	        		"www/js/plugins/sammy.js",
                    "www/js/plugins/jquery.stellar.min.js",
	        		"www/js/utils.js",
	        		"www/js/models/*.js",
	        		"www/js/routing.js",
	        		"www/js/main.js"
	            ],
	            dest: "www/js/min/master.js"
	        },

	        gamesCommonJs: {
	            cwd: "www/games/common/js",
	            src: [
                    "GameEngine.js",
                    "GameSave.js",
                    "GameInput.js",
                    "GameUtils.js",
                    "physics/SAT.js",
                    "graphics/GameGraphics.js",
                    "view/GameView.js",
                    "view/TitleView.js",
                    "view/GameSaveView.js"
	            ],
	            dest: "www/js/min/gamesCommon.js"
	        },

	        pageDormanticide: {
	            cwd: "www",
	            src: [
                    "<%= concat_sourcemap.gamesCommonJs.src %>",
                    "games/dormanticide/js/view/OverworldView.js",
                    "games/dormanticide/js/view/BattleView.js",
                    "games/dormanticide/js/dormant/Dormant.js",
                    "games/dormanticide/js/dormant/FightAction.js",
                    "games/dormanticide/js/main.js"
	            ],
	            dest: "www/js/min/pageDormanticide.js",
	        },

	        pageVamp: {
	            cwd: "www",
	            src: [
                    "<%= concat_sourcemap.gamesCommonJs.src %>",
                    "games/vamp/js/view/LevelView.js",
                    "games/vamp/js/level/level1.js",
                    "games/vamp/js/vamp.js",
                    "games/vamp/js/main.js"
	            ],
	            dest: "www/js/min/pageVamp.js",
	        },

	        css: {
	            src: "www/css/*.css",
	            dest: "www/css/min/master.css"
	        }
	    },

	    watch: {
	        options: {
	            livereload: true
	        },

	        masterJs: {
	            files: ["<%= concat_sourcemap.masterJs.src %>"],
	            tasks: ["concat_sourcemap:masterJs"]
	        },

	        //gamesCommonJs: {
	        //    files: ["<%= concat_sourcemap.gamesCommonJs.src %>"],
	        //    tasks: ["concat_sourcemap:gamesCommonJs", "concat_sourcemap:gamesCommonJs]
	        //}

	        pageDormanticide: {
	            files: ["<%= concat_sourcemap.pageDormanticide.src %>"],
	            tasks: ["concat_sourcemap:pageDormanticide"]
	        },

	        pageVamp: {
	            files: ["<%= concat_sourcemap.pageVamp.src %>"],
	            tasks: ["concat_sourcemap:pageVamp"]
	        },

	        css: {
	            files: ["<%= concat_sourcemap.css.src %>"],
	            tasks: ["concat_sourcemap:css"]
	        }
	    },

	    uglify: {
	        masterJs: {
	            files: {
	                "<%= concat_sourcemap.masterJs.dest %>": ["www/js/analytics.js", "www/js/clientSideLogging", "<%= concat_sourcemap.masterJs.src %>"]
	            }
	        },

	        pageDormanticide: {
	            files: {
	                "<%= concat_sourcemap.pageDormanticide.dest %>": ["www/js/analytics.js", "www/js/clientSideLogging", "<%= concat_sourcemap.pageDormanticide.src %>"]
	            }
	        },

	        pageDormanticide: {
	            files: {
	                "<%= concat_sourcemap.pageVamp.dest %>": ["www/js/analytics.js", "www/js/clientSideLogging", "<%= concat_sourcemap.pageVamp.src %>"]
	            }
	        }
	    },

	    cssmin: {
	        "<%= concat_sourcemap.css.dest %>": "<%= concat_sourcemap.css.src %>"
	    },

	    copy: {
	        everything: {
	            files: [{
	                expand: true,
                    cwd: "www",
                    src: ["**"],
                    dest: "./"
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

	        allHtml: {
	            files: [{
                    expand: true,
                    cwd: "www",
	                src: ["**/*.html"],
                    dest: "./"
	            }]
	        }
	    },

	    imagemin: {
	        options: {
	            optimizationLevel: 3,
	        },

	        allImages: {
	            files: [{
	                expand: true,
	                cwd: "www/img",
	                src: ["**/*.{png,jpg,gif,ico}"],
                    dest: "./img"
	            }]
	        }

            // TODO: game images
	    }

        // TODO: bower (plugin manager - e.g. jQuery, sammy.js, ...)
	});


	// local tasks
	//grunt.loadTasks("tasks");

    // external tasks (plugins)
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-concat-sourcemap");       // grunt-contrib-concat + sourcemaps almost implemented: https://github.com/gruntjs/grunt-contrib-concat/pull/59
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
  
    grunt.registerTask("default", ["concat_sourcemap", "connect:dev", "watch"]);
	grunt.registerTask("qa", ["uglify", "cssmin", "copy", "htmlmin", "imagemin", "connect:qa"]);
	grunt.registerTask("build", ["uglify", "cssmin", "copy", "htmlmin", "imagemin"]);

	grunt.registerTask("clean", ["clean"]);
};
