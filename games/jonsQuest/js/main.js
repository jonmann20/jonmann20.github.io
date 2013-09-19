jq.Main = (function () {

    function setCanvasGlobals() {
        canvas = $("canvas")[0];
        ctx = canvas.getContext("2d");
        FULLW = canvas.width = 720;
        FULLH = canvas.height = 440;
        FULLH -= game.padHUD;

        HALFW = FULLW / 2;
        HALFH = FULLH / 2;
    }

    function setAudio() {
        audio.bgMusic.loop = true;
        audio.bgMusic.pause();

        audio.mute(true);
        $(".audioState").on("click", audio.handleMuteButton);

        //----- for testing audio -----
        //audio.handleMuteButton()
    }

    function setupLoadingScreen() {
        ctx.fillStyle = "#e1e1e1";
        ctx.font = "25px Helvetica";
        ctx.fillText("Loading...", 150, canvas.height / 2);
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

            startScreen.loop();
            //game.loop();
        }
    }
})();

// pre-load game
$(function () {
    var waitForScripts = setInterval(function () {
        if (jq.scriptsLoaded === jq.numScripts) {
            jq.Main.init();
            clearInterval(waitForScripts);
        }
    }, 10);
});
