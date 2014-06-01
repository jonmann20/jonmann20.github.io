module.exports = function(grunt) {

	// configure tasks
	grunt.initConfig({
	    clean: ["css/min", "js/min"],

	    connect: {
	        server: {
	            options: {
	                hostname: "jon",
	                port: 80,
	                open: true
	            }
	        }
	    },

	    concat_sourcemap: {
	        options: {
                sourcesContent: true
	        },

	        masterJs: {
	            dest: "js/min/master.js",
	            src: [
	        		"js/plugins/sammy.js",
                    "js/plugins/jquery.stellar.min.js",
	        		"js/utils.js",
	        		"js/models/*.js",
	        		"js/routing.js",
	        		"js/main.js"
	            ]
	        },

	        gamesCommonJs: {
	            dest: "js/min/gamesCommon.js",
	            src: [
                    "games/common/js/GameEngine.js",
                    "games/common/js/GameSave.js",
                    "games/common/js/GameInput.js",
                    "games/common/js/GameUtils.js",
                    "games/common/js/physics/SAT.js",
                    "games/common/js/graphics/GameGraphics.js",
                    "games/common/js/view/GameView.js",
                    "games/common/js/view/TitleView.js",
                    "games/common/js/view/GameSaveView.js"
	            ]
	        },

	        pageDormanticide: {
	            dest: "js/min/pageDormanticide.js",
	            src: [
                    "<%= concat_sourcemap.gamesCommonJs.src %>",
                    "games/dormanticide/js/view/OverworldView.js",
                    "games/dormanticide/js/view/BattleView.js",
                    "games/dormanticide/js/dormant/Dormant.js",
                    "games/dormanticide/js/dormant/FightAction.js",
                    "games/dormanticide/js/main.js"
                ]
	        },

	        pageVamp: {
	            dest: "js/min/pageVamp.js",
	            src: [
                    "<%= concat_sourcemap.gamesCommonJs.src %>",
                    "games/vamp/js/view/LevelView.js",
                    "games/vamp/js/level/level1.js",
                    "games/vamp/js/vamp.js",
                    "games/vamp/js/main.js"
	            ]
	        },

	        css: {
	            dest: "css/min/master.css",
	            src: "css/*.css"
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
	                "<%= concat_sourcemap.masterJs.dest %>": ["js/analytics.js", "js/clientSideLogging", "<%= concat_sourcemap.masterJs.src %>"]
	            }
	        },

	        pageDormanticide: {
	            files: {
	                "<%= concat_sourcemap.pageDormanticide.dest %>": ["js/analytics.js", "js/clientSideLogging", "<%= concat_sourcemap.pageDormanticide.src %>"]
	            }
	        },

	        pageDormanticide: {
	            files: {
	                "<%= concat_sourcemap.pageVamp.dest %>": ["js/analytics.js", "js/clientSideLogging", "<%= concat_sourcemap.pageVamp.src %>"]
	            }
	        }
	    },

	    cssmin: {
	        "<%= concat_sourcemap.css.dest %>": "<%= concat_sourcemap.css.src %>"
	    }

        // TODO: imagemin, htmlmin + copy, bower (plugin manager - e.g. jQuery, sammy.js, ... )

	});


	// local tasks
	//grunt.loadTasks("tasks");

    // external tasks (plugins)
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-concat-sourcemap");
  
    // task runner options
	grunt.registerTask("default", ["concat_sourcemap", "connect", "watch"]);
	grunt.registerTask("srv", ["connect", "watch"]);
	grunt.registerTask("prd", ["uglify", "cssmin"]);
};


// NOTES:
//
// "gets/all_subDirectories/**/*.js"
