part of dungeon;

class Game {
	var fpsHolder;
	num oldTime, fps,
	    w, 			// actual canvas width
	    h, 			// actual canvas height
	    invRatio 	// inverse precentage shrunk/expanded from 540p
	;

	Game(){
		cWrap = querySelector(".canvasWrap");
		canvas = cWrap.querySelector("canvas");

		ctx = canvas.getContext("2d");
		canvas.width = FULLW;
		canvas.height = FULLH;

		fpsHolder = querySelector("title");
		dt = oldTime = fps = curLvl = 0;

		resizeGame();
		window.onResize.listen((e){resizeGame();});
		window.onDeviceOrientation.listen((e){resizeGame();});

		key = new Keyboard();
		util = new Utils();
		p = new Player(0, 0, 28, 38, "sprites/player/playerDungeon.png");
		overworld = new Overworld();
		level = new Level();

		// overworld position
		p.x = overworld.lvlArr[overworld.ovrCurLvl].x + overworld.fixX;
		p.y = overworld.lvlArr[overworld.ovrCurLvl].y + overworld.fixY;

		lvlSelected = DEBUG_LVL;
		if(DEBUG_LVL)
			overworld.initLevel();

		new StartScreen();
  	}

	/*

	EFFECTS: allow scaling up to 540p

	*/
	void resizeGame(){
		num maxScaleFactor = 70; // 60 ==> 540p
		num scaledW = maxScaleFactor*16,
		    scaledH = maxScaleFactor*9;

		w = (window.innerWidth > scaledW) ? scaledW : window.innerWidth;
		h = (window.innerHeight > scaledH) ? scaledH : window.innerHeight;
		num scaleX = w / FULLW;
		num scaleY = h / FULLH;
		//    num aspectRatio = gW / gH;
		num ratio = (scaleX < scaleY) ? scaleX : scaleY;

		//    if(ratio >= 1.77 && aspectRatio <= 1.79){    //1080p
		//      game.ratio = aspectRatio;
		//    }
		//    else {
		  w = FULLW * ratio;
		  h = FULLH * ratio;
		//}

		invRatio = 1 / ratio;

		cWrap.style.width = "$w\px";
		cWrap.style.height = "$h\px";

		num mTop = (window.innerHeight - h)/2;

		cWrap.style.marginTop = "$mTop\px";
	}

	void gameLoop(num time){
		displayFps(time, oldTime);

		Update();
		Render();

		window.requestAnimationFrame(gameLoop);
	}

	/**************** Update **************/
	void Update(){
		if(!lvlSelected || curLvl == 0){
			overworld.Update();
		}
		else {
			level.Update();
			p.Update();
		}
	}

	/**************** Render **************/
	void Render(){
		if(!lvlSelected || curLvl == 0){
			overworld.Render();
		}
		else {
			level.Render();

			if(!p.invisible){
				p.Render();
			}
			
		    if(!level.isCutscene){
        		hud.OnGUI();
        		level.OnGUI();
    	    }
		}
	}

	void displayFps(num t, num old){
		dt = (t-old)/1000;

		if(t.toInt() % 12 == 0){
		  fps = (1~/dt);
		  fpsHolder.text = "Dungeon: $fps fps";
		}
		oldTime = t;
	}
}
