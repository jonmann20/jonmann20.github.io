module.exports = function(grunt) {

	var pth = "games/jonsQuest/js/";

	// configure tasks
	grunt.initConfig({
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
	        		"js/main.js",
	            ]
	        },

	        pageJonsQuestJs: {
	            dest: "js/min/pageJonsQuest.js",
	            src: [
	                pth + "utils.js",
	        		pth + "audio/audio.js",
	        		pth + "graphics/graphics.js",
	        		pth + "physics/physics.js",
	        		pth + "engine/gameObject.js",
	        		pth + "engine/gameItem.js",
	        		pth + "enemy/enemy.js",
	        		pth + "level/startScreen.js",
	        		pth + "level/level.js",
	        		pth + "level/level0.js",
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


	    uglify: {
	        masterJs: {
	            files: {
	                "<%= concat_sourcemap.masterJs.dest %>": ["js/analytics.js", "<%= concat_sourcemap.masterJs.src %>"]
	            }
	        },

	        pageJonsQuestJs: {
	            files: {
	                "<%= concat_sourcemap.pageJonsQuestJs.dest %>": ["js/analytics.js", "<%= concat_sourcemap.pageJonsQuestJs.src %>"]
	            }
	        }
	    },

	    cssmin: {
	        "<%= concat_sourcemap.css.dest %>": "<%= concat_sourcemap.css.src %>"
	    },

	    connect: {
	        server: {
	            options: {
                    hostname: "jon",
	                port: 80,
	                keepalive: true
                    //open: true
	            }
	        }
	    },

	    clean: ["css/min", "js/min"]

	    //watch: {
	    //    css: {
	    //        files: ["css/*.css"],
	    //        tasks: ["cssmin"],
	    //        options: {
	    //            livereload: 80
	    //        }
	    //    },

	    //    masterJs: {
	    //        files: ["js/*.js"],
	    //        tasks: ["uglify:masterJs"],
	    //        options: {
	    //            livereload: 80
	    //        }
	    //    },

	    //    pageJonsQuestJs: {
	    //        files: ["games/jonsQuest/**/*.js"],
	    //        tasks: ["uglify:pageJonsQuestJs"],
	    //        options: {
	    //            livereload: 80
	    //        }
	    //    }
	    //}


        // TODO: imagemin, htmlmin + copy, bower??, browserify??

	});


	// local tasks
	//grunt.loadTasks("tasks");

	// external tasks (plugins)
	grunt.loadNpmTasks("grunt-concat-sourcemap");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-clean");
	//grunt.loadNpmTasks("grunt-contrib-watch");
  
    // task runner options
	grunt.registerTask("default", ["concat_sourcemap", "connect"]);
	grunt.registerTask("prd", ["uglify", "cssmin"]);
};