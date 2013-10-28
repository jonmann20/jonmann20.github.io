module.exports = function(grunt) {

	var pth = "games/jonsQuest/js/";

	// configure tasks
	grunt.initConfig({
	    concat: {
	        masterJs: {
	            dest: "js/min/master.js",
	            src: [
				  "js/analytics.js",        // TODO: setup dev bundle without google analytics
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
					"js/analytics.js", 
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
	        all: {
	            files: {
	                "js/min/master.js": ["js/min/master.js"],
	                "js/min/pageJonsQuest.js": ["js/min/pageJonsQuest.js"]
	            }
	        }
	    },

	    cssmin: {
	        "css/min/master.css": ["css/min/master.css"]
	    },

	    connect: {
	        server: {
	            options: {
	                port: 80,
	                base: "",
	                keepalive: true,
                    open: true
	            }
	        }
	    }

	    /*
        clean: {
            workspaces: ["", ""]
        }
        */

	    /*
        push: {
        
            // a custom push to github??
        
        }

        */
	});


	// local tasks
	//grunt.loadTasks("tasks");

	// external tasks (plugins)
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-connect");
  
	grunt.registerTask("default", ["concat", "connect:server"]);
	grunt.registerTask("prd", ["concat", "uglify", "cssmin"]);  // "push"
};