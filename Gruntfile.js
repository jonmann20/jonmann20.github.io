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
                    pth + "physics/objectPhysics.js",
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

	        css: {
	            dest: "css/min/master.css",
	            src: "css/*.css"
	        }
	    },

	    watch: {
	        //options: {
	        //    livereload: true
	        //},

	        pageJonsQuestJs: {
	            files: ["games/jonsQuest/**/*.js"],
	            tasks: ["concat_sourcemap:pageJonsQuestJs"]
	        }
	        //css: {
	        //    files: ["<%= concat_sourcemap.css.dest %>"],                //"css/*.css"
	        //    tasks: ["cssmin"],
	        //    options: {
	        //        livereload: true
	        //    }
	        //},

	        //masterJs: {
	        //    files: ["<%= concat_sourcemap.masterJs.dest %>"],           //"js/*.js"
	        //    tasks: ["uglify:masterJs"],
	        //    options: {
	        //        livereload: 80
	        //    }
	        //},

	        //pageJonsQuestJs: {
	        //    files: ["/games/jonsQuest/js/physics/physics.js"],    //"games/jonsQuest/**/*.js"
	        //    tasks: ["uglify:pageJonsQuestJs"],
	        //    options: {
	        //        livereload: true
	        //    }
	        //}
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
	        }
	    },

	    cssmin: {
	        "<%= concat_sourcemap.css.dest %>": "<%= concat_sourcemap.css.src %>"
	    }

        // TODO: imagemin, htmlmin + copy, bower??, browserify??

	});


	// local tasks
	//grunt.loadTasks("tasks");

    // external tasks (plugins)
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.loadNpmTasks("grunt-concat-sourcemap");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
  
    // task runner options
	grunt.registerTask("default", ["concat_sourcemap", "connect", "watch"]);
	grunt.registerTask("srv", ["connect", "watch"]);
	grunt.registerTask("prd", ["uglify", "cssmin"]);
};