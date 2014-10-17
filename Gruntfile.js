module.exports = function(grunt) {
	grunt.initConfig({
	    clean: {
            all: ["audio"],
            //all: ["audio", "blog", "font", "games", "img", "js", "music", "playground", "portfolio", "*.html", "assets"],
            dev: ["assets/css"]
        }

	    //connect: {
	    //    dev: {
	    //        options: {
	    //            hostname: "jon",
	    //            port: 88,
	    //            open: false,
	    //            base: "src"
	    //        }
	    //    },
	    //    qa: {
	    //        options: {
	    //            hostname: "jon",
	    //            port: 88,
	    //            open: false,
        //            keepalive: true
	    //        }
	    //    }
	    //},

	    //concat: {
	    //    options: {
        //        sourceMap: true
	    //    },

	    //    //masterJs: {
        //    //    //cwd: "src",
	    //    //    src: [
	    //    //		"src/js/plugins/sammy.js",
        //    //        "src/js/plugins/jquery.stellar.min.js",
	    //    //		"src/js/utils.js",
	    //    //		"src/js/models/*.js",
	    //    //		"src/js/routing.js",
	    //    //		"src/js/main.js"
	    //    //    ],
	    //    //    dest: "src/js/min/master.js"
	    //    //},

	    //    //gamesCommonJs: {
	    //    //    cwd: "src",
	    //    //    src: [
        //    //        "games/common/js/GameEngine.js",
        //    //        "games/common/js/GameSave.js",
        //    //        "games/common/js/GameInput.js",
        //    //        "games/common/js/GameUtils.js",
        //    //        "games/common/js/physics/SAT.js",
        //    //        "games/common/js/graphics/GameGraphics.js",
        //    //        "games/common/js/view/GameView.js",
        //    //        "games/common/js/view/TitleView.js",
        //    //        "games/common/js/view/GameSaveView.js"
	    //    //    ],
	    //    //    dest: "src/js/min/gamesCommon.js"
	    //    //},

	    //    //pageDormanticide: {
	    //    //    cwd: "src",
	    //    //    src: [
        //    //        "<%= concat_sourcemap.gamesCommonJs.src %>",
        //    //        "games/dormanticide/js/view/OverworldView.js",
        //    //        "games/dormanticide/js/view/BattleView.js",
        //    //        "games/dormanticide/js/dormant/Dormant.js",
        //    //        "games/dormanticide/js/dormant/FightAction.js",
        //    //        "games/dormanticide/js/main.js"
	    //    //    ],
	    //    //    dest: "src/js/min/pageDormanticide.js",
	    //    //},

	    //    //pageVamp: {
	    //    //    cwd: "src",
	    //    //    src: [
        //    //        "<%= concat_sourcemap.gamesCommonJs.src %>",
        //    //        "games/vamp/js/view/LevelView.js",
        //    //        "games/vamp/js/level/level1.js",
        //    //        "games/vamp/js/vamp.js",
        //    //        "games/vamp/js/main.js"
	    //    //    ],
	    //    //    dest: "src/js/min/pageVamp.js",
	    //    //},

	    //    masterCss: {
	    //        src: "assets/css/*.css",
	    //        dest: "assets/master.css"
	    //    }
	    //},

	    //watch: {
	    //    options: {
	    //        livereload: true
	    //    },

	    //    masterJs: {
	    //        files: ["<%= concat_sourcemap.masterJs.src %>"],
	    //        tasks: ["concat_sourcemap:masterJs"]
	    //    },

	    //    //gamesCommonJs: {
	    //    //    files: ["<%= concat_sourcemap.gamesCommonJs.src %>"],
	    //    //    tasks: ["concat_sourcemap:gamesCommonJs", "concat_sourcemap:gamesCommonJs]
	    //    //}

	    //    pageDormanticide: {
	    //        files: ["<%= concat_sourcemap.pageDormanticide.src %>"],
	    //        tasks: ["concat_sourcemap:pageDormanticide"]
	    //    },

	    //    pageVamp: {
	    //        files: ["<%= concat_sourcemap.pageVamp.src %>"],
	    //        tasks: ["concat_sourcemap:pageVamp"]
	    //    },

	    //    masterCss: {
	    //        files: ["<%= concat.masterCss.src %>"],
	    //        tasks: ["concat:masterCss"]
	    //    }
	    //},

	    //uglify: {
	    //    masterJs: {
	    //        files: {
	    //            "<%= concat_sourcemap.masterJs.dest %>": ["src/js/analytics.js", "src/js/clientSideLogging", "<%= concat_sourcemap.masterJs.src %>"]
	    //        }
	    //    },

	    //    pageDormanticide: {
	    //        files: {
	    //            "<%= concat_sourcemap.pageDormanticide.dest %>": ["src/js/analytics.js", "src/js/clientSideLogging", "<%= concat_sourcemap.pageDormanticide.src %>"]
	    //        }
	    //    },

	    //    pageDormanticide: {
	    //        files: {
	    //            "<%= concat_sourcemap.pageVamp.dest %>": ["src/js/analytics.js", "src/js/clientSideLogging", "<%= concat_sourcemap.pageVamp.src %>"]
	    //        }
	    //    }
	    //},

	    //sass: {
	    //    all: {
	    //        files: [{
	    //            expand: true,
	    //            cwd: "src/scss",
	    //            src: ["**/*.scss", "!vars.scss"],
	    //            dest: "assets/css",
	    //            ext: ".css"
	    //        }]
	    //    }
	    //},

	    //cssmin: {
	    //    "<%= concat.masterCss.dest %>": "<%= concat.masterCss.src %>"
	    //},

	    //copy: {
	    //    allButScss: {
	    //        files: [{
	    //            expand: true,
        //            cwd: "src",
        //            src: ["**", "!scss"],
        //            dest: "./"
	    //        }]
	    //    }
	    //},

	    //htmlmin: {
	    //    options: {
	    //        removeComments: true,
	    //        collapseWhitespace: true,
	    //        removeAttributeQuotes: true,
	    //        removeEmptyAttributes: true,
	    //        minifyJS: true,
        //        minifyCSS: true
	    //    },

	    //    allHtml: {
	    //        files: [{
        //            expand: true,
        //            cwd: "src",
	    //            src: ["**/*.html"],
        //            dest: "./"
	    //        }]
	    //    }
	    //},

	    //imagemin: {
	    //    options: {
	    //        optimizationLevel: 3,
	    //    },

	    //    allImages: {
	    //        files: [{
	    //            expand: true,
	    //            cwd: "src/img",
	    //            src: ["**/*.{png,jpg,gif,ico}"],
        //            dest: "./img"
	    //        }]
	    //    }

        //    // TODO: game images
	    //},

	    //includereplace: {
	    //    options: {
        //        includesDir: "src"
	    //    },

	    //    allImports: {
        //        files: [{
        //            expand: true,
        //            cwd: "src",
	    //            src: ["**/*.html"],
	    //            dest: "./"
        //        }]
	    //    }
	    //}

        // TODO: bower (plugin manager - e.g. jQuery, sammy.js, ...)
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
    //grunt.loadNpmTasks("grunt-contrib-concat");
	//grunt.loadNpmTasks("grunt-contrib-connect");
    //grunt.loadNpmTasks("grunt-contrib-copy");
	//grunt.loadNpmTasks("grunt-contrib-cssmin");
    //grunt.loadNpmTasks("grunt-contrib-htmlmin");
    //grunt.loadNpmTasks("grunt-contrib-imagemin");
    //grunt.loadNpmTasks("grunt-include-replace");
    //grunt.loadNpmTasks("grunt-contrib-sass");
	//grunt.loadNpmTasks("grunt-contrib-uglify");
    //grunt.loadNpmTasks("grunt-contrib-watch");
  
    //grunt.registerTask("default", ["sass", "concat", "copy", "clean:dev"]);
    //grunt.registerTask("default", ["sass", "concat", "copy", "includereplace", "connect:dev", "watch"]);
    //grunt.registerTask("prd", ["sass", "concat", "uglify", "cssmin", "copy", "htmlmin", "includereplace", "imagemin"]);
    //grunt.registerTask("srv", ["connect:qa"]);

	grunt.registerTask("clean", ["clean:all"]);
};
