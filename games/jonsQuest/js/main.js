var Main = (function () {

    function setCanvasGlobals() {
        canvas = $("canvas")[0];
        ctx = canvas.getContext("2d");

        FULLW = canvas.width;
        FULLH = canvas.height;
        FULLH -= game.padHUD;

        HALFW = FULLW / 2;
        HALFH = FULLH / 2;
    }

    function setAudio() {
        audio.bgMusic.loop = true;
        audio.bgMusic.volume = 0.7;
        audio.bgMusic.pause();

        audio.enemyDeath.volume = 0.6;
        audio.jump.volume = 0.4;
        audio.thud.volume = 0.78;
        audio.discovery.volume = 0.7;

        audio.mute(true);
        $(".audioState").on("click", audio.handleMuteButton);

        var wasClicked = false;
        $(".resize").on("click", function(){
            if (wasClicked) {
                $(canvas).css({ width: "", height: "" });
                $(this).attr("class", "resize off");
                $(this).children("span").attr("class", "icon-expand");
            }
            else {
                $(canvas).css({ width: "100%" });

                // fix for IE
                var width = $(canvas).width();
                $(canvas).css({ height: 0.611 * width });


                $(this).attr("class", "resize on");
                $(this).children("span").attr("class", "icon-contract");
            }

            wasClicked = !wasClicked;
        });

        //----- enable audio on start -----
        audio.handleMuteButton()
    }

    function setupLoadingScreen() {
        ctx.fillStyle = "#e1e1e1";
        ctx.font = "25px 'Press Start 2P'";
        ctx.fillText("LOADING...", HALFW - 80, HALFH + 20);
    }

    return {
        /*
			REQUIRES: game and hero singleton objects already instantiated
		*/
        init: function () {
            setCanvasGlobals();

            setAudio();
            setupLoadingScreen();

            level.init();
            hero.init();
            

            // game timer
            setInterval(function () {
                ++game.actualTime;

                //console.log(game.actualTime + 's', hero.x + "px");
                //console.log(game.actualTime + 's', hero.y + "px");

            }, 1000);

            startScreen.start();
        }
    }
})();

$(function () {
    Main.init();
});
