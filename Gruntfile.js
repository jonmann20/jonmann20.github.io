module.exports = function(grunt) {

	var pth = "games/jonsQuest/js/";

	// configure tasks
	grunt.initConfig({
	    clean: ["css/min", "js/min"],

	    connect: {
	        server: {
	            options: {
	                hostname: "jon",
	                port: 80
	                //open: true
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
	        		"js/utils.js",
	        		"js/models/*.js",
	        		"js/routing.js",
	        		"js/main.js"
	            ]
	        },

	        pageJonsQuestJs: {
	            dest: "js/min/pageJonsQuest.js",
	            src: [
                    "js/plugins/jquery.colorbox-min.js",
                    pth + "physics/SAT.js",
	                pth + "utils.js",
	        		pth + "audio/audio.js",
	        		pth + "graphics/graphics.js",
	        		pth + "physics/physics.js",
	        		pth + "engine/gameObject.js",
	        		pth + "engine/gameItem.js",
                    pth + "engine/hud.js",
	        		pth + "enemy/enemy.js",
	        		pth + "level/level.js",
                    pth + "level/lvlComplete.js",
                    pth + "level/startScreen.js",
	        		pth + "level/level1.js",
                    pth + "level/level2.js",        // TODO load new levels/assets dynamically?
	        		pth + "engine/game.js",
	        		pth + "hero/hero.js",
	        		pth + "hero/heroGraphics.js",
	        		pth + "hero/heroPhysics.js",
	        		pth + "hero/heroInput.js",
	        		pth + "main.js"
	            ]
	        },

	        pageDormanticide: {
	            dest: "js/min/pageDormanticide.js",
	            src: [
                    "games/dormanticide/js/engine/GameEngine.js",
                    "games/dormanticide/js/engine/Input.js",
                    "games/dormanticide/js/view/BattleView.js",
                    "games/dormanticide/js/dormant/Dormant.js",
                    "games/dormanticide/js/dormant/FightAction.js",
                    "games/dormanticide/js/main.js",
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

	        pageJonsQuestJs: {
	            files: ["<%= concat_sourcemap.pageJonsQuestJs.src %>"],
	            tasks: ["concat_sourcemap:pageJonsQuestJs"]
	        },

	        pageDormanticide: {
	            files: ["<%= concat_sourcemap.pageDormanticide.src %>"],
	            tasks: ["concat_sourcemap:pageDormanticide"]
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

	        pageJonsQuestJs: {
	            files: {
	                "<%= concat_sourcemap.pageJonsQuestJs.dest %>": ["js/analytics.js", "js/clientSideLogging", "<%= concat_sourcemap.pageJonsQuestJs.src %>"]
	            }
	        },

	        pageDormanticide: {
	            files: {
	                "<%= concat_sourcemap.pageDormanticide.dest %>": ["js/analytics.js", "js/clientSideLogging", "<%= concat_sourcemap.pageDormanticide.src %>"]
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