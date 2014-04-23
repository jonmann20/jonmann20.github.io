part of dungeon;

class StartScreen {
	bool isOptions = false, linkClicked = false;
	int OPEN_GAME = 1, OPEN_START = 2;
	Rect mouse = new Rect(-1, -1, 8, 8);
	String linkColor = "rgb(213, 213, 213)";
	String btnColor = "#fff";
	var mouseMoveE, mouseClickE;

	StartScreen(){
		window.requestAnimationFrame(startScreenLoop);
		
		// back button event
		canvas.onMouseMove.listen((MouseEvent e){
			//print("${e.offset.x}, ${e.offset.y}");
			
			if(e.offset.x < 80 && e.offset.y < 25){
				btnColor = "#00ff00";
				canvas.style.cursor = "pointer";
			}
			else {
				btnColor = "#fff";
				canvas.style.cursor = "default";
			}
		});
		
		canvas.onClick.listen((MouseEvent e){
			if(e.offset.x < 80 && e.offset.y < 25){
				window.location.assign("http://jonmann20.github.io/#games");
			}
		});
	}

	/**** Common ****/
	void drawBg([String color="#000"]){
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, FULLW, FULLH);
	}

	void drawTitle(){
		final String title = "DUNGEON";

		ctx.font = "43px 'Press Start 2P'";
		final num tmpW = ctx.measureText(title).width;
		final num titleW = HALFW - tmpW/2;

		ctx.fillStyle = "rgb(21, 21, 21)";                // shadow
		ctx.fillText(title, titleW + 3, 80 + 4);

		ctx.fillStyle = "rgb(192, 0, 0)";                 // actual text
		ctx.fillText(title, titleW, 80);
	}


	/***** Start Screen *****/
	void startScreenLoop(num time){
		game.displayFps(time, game.oldTime);

		if(startScreen())
		  window.requestAnimationFrame(homeScreenLoop);
		else
		  window.requestAnimationFrame(startScreenLoop);
	}

	bool startScreen(){
		if(key.isPressed(KeyCode.ENTER) || DEBUG_OVERWORLD || DEBUG_LVL){
		  key.lastKeyDown = KeyCode.BACKSPACE;
		  mouseEvents();
		  return true;
		}

		drawStartScreen();
		return false;
	}

	void drawStartScreen(){
		drawBg();
		ctx.fillRect(HALFW - 108, HALFH - 25, 228, 40); // helps with text fade

		
		// back button
		util.placeTxt("Back", 14, 30, 20, btnColor);
		
		util.blinkTxt(19, HALFW, HALFH - 5, "ENTER COIN");
		util.blinkTxt(8, HALFW, HALFH + 15, "(OR PRESS ENTER)");

		final String strControls = "W,A,S,D OR ARROW MOVEMENT",
		             cRite = "© 2013 JON WIEDMANN";

		// controls
		ctx.font = "7px 'Press Start 2P'";
		ctx.fillStyle = "rgb(213, 213, 213)";
		ctx.fillText(strControls, HALFW - ctx.measureText(strControls).width/2, FULLH - 62);

		// copyright
		ctx.font = "13px 'Press Start 2P'";
		ctx.fillStyle = "rgb(233, 233, 233)";
		ctx.fillText(cRite, HALFW - ctx.measureText(cRite).width/2, FULLH - 24);

		drawTitle();
	}

	/***** Home Screen *****/
	void homeScreenLoop(num time){
		game.displayFps(time, game.oldTime);

		if(homeScreen() == OPEN_GAME)
			window.requestAnimationFrame(game.gameLoop);
		else if(homeScreen() == OPEN_START)
			window.requestAnimationFrame(startScreenLoop);
		else
			window.requestAnimationFrame(homeScreenLoop);
	}

	int homeScreen(){
		if(isOptions){
			if(key.lastKeyDown == KeyCode.ESC){
				isOptions = false;
			  	key.lastKeyDown = KeyCode.BACKSPACE;
				//mouseEvents();
			}

			drawOptions();
		}
		else if(/*linkClicked*/ key.lastKeyDown == KeyCode.ENTER || DEBUG_OVERWORLD || DEBUG_LVL){
			key.lastDirDown = KeyCode.BACKSPACE; // prevent navigating overworld
			//resetMouseEvents();
			return OPEN_GAME;
		}
		else if(key.lastKeyDown == KeyCode.O){
			isOptions = true;
			//resetMouseEvents();
		}
		else if(key.lastKeyDown == KeyCode.ESC){
			//resetMouseEvents();
			return OPEN_START;
		}
		else {
			drawHomeScreen();
		}

		return 0;
	}

	void drawHomeScreen(){
		drawBg(Color.BROWN.name);
		drawTitle();
		
		util.placeTxt("NEW GAME", 15, HALFW, HALFH - 35, linkColor);
		util.placeTxt("LOAD GAME", 15, HALFW, 232, "rgb(163, 163, 163)");

		util.placeTxt('PRESS "ENTER" TO START', 13, HALFW, 382, "rgb(223, 223, 223)");
		util.placeTxt('PRESS "o" FOR OPTIONS', 13, HALFW, 407, "rgb(223, 223, 223)");
		util.placeTxt('PRESS "ESC" TO RETURN', 13, HALFW, 432, "rgb(223, 223, 223)");
	}

	void drawOptions(){
		drawBg(Color.BROWN.name);
		drawTitle();

		final String opt = "OPTIONS", ret = 'PRESS "ESC" TO RETURN';

		// Title
		ctx.font = "19px 'Press Start 2P'";
		ctx.fillStyle = "rgb(213, 213, 213)";
		ctx.fillText(opt, HALFW - ctx.measureText(opt).width/2, 122);

		ctx.font = "14px 'Press Start 2P'";
		ctx.fillText("AUDIO ....................... OFF", 40, 222);
		ctx.fillText("RESOLUTION .................. 540p", 40, 262);

		ctx.font = "13px 'Press Start 2P'";
		ctx.fillText(ret, HALFW - ctx.measureText(ret).width/2, 442);
	}

	void mouseEvents(){
		//var boundingRect = canvas.getBoundingClientRect();

		//    mouseMoveE = canvas.onMouseMove.listen((e){
		//      mouse.x = e.clientX - boundingRect.left;
		//      mouse.y = e.clientY - boundingRect.top;
		//
		//      print(mouse.x);
		//      print(mouse.y);
		//
		//      if(util.checkCollision(mouse, newGame)){
		//        canvas.style.cursor = "pointer";
		//        linkColor = "blue";
		//      }
		//      else{
		//        canvas.style.cursor = "auto";
		//        linkColor = "rgb(213, 213, 213)";
		//      }
		//
		//    });
		//
		//    mouseClickE = canvas.onClick.listen((e){
		//      if(util.checkCollision(mouse, newGame))
		//        linkClicked = true;
		//    });
	}

	void resetMouseEvents(){
		mouseMoveE.cancel();
		mouseClickE.cancel();
		canvas.style.cursor = "auto";
		linkColor = "rgb(213, 213, 213)";
	}
}
