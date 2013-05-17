part of dungeon;

class StartScreen{
  
  StartScreen(){
    window.requestAnimationFrame(preGame);
  }
  
  void preGame(num time){
    game.displayFps(time, game.oldTime);
    
    if(startGame())
      window.requestAnimationFrame(game.gameLoop);
    else    
      window.requestAnimationFrame(preGame);
  }
  
  bool startGame(){  
    if(key.isPressed(KeyCode.ENTER) || DEBUG_OVERWORLD || DEBUG_LVL)
      return true;
    
    render();
    return false;
  }
  
  void render(){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, FULLW, FULLH);
    ctx.fillRect(HALFW - 108, HALFH - 25, 228, 40); // helps with text fade
   
    util.blinkText(19, HALFW, HALFH - 5, 'ENTER COIN');
    util.blinkText(8, HALFW, HALFH + 15, '(OR PRESS ENTER)');
    
    final String title = 'DUNGEON',
                 strControls = 'W,A,S,D OR ARROW MOVEMENT',
                 cRite = '© 2013 JON WIEDMANN';
    
    // controls
    ctx.font = "7px 'Press Start 2P'";
    ctx.fillStyle = 'rgb(213, 213, 213)';
    ctx.fillText(strControls, HALFW - ctx.measureText(strControls).width/2, FULLH - 62);
    
    // copyright
    ctx.font = "13px 'Press Start 2P'";
    ctx.fillStyle = 'rgb(233, 233, 233)';
    ctx.fillText(cRite, HALFW - ctx.measureText(cRite).width/2, FULLH - 24);
    
    // dungeon
    ctx.font = "43px 'Press Start 2P'";
    num tmpW = ctx.measureText(title).width;
    num titleW = HALFW - tmpW/2;
    
    ctx.fillStyle = 'rgb(21, 21, 21)';                // shadow
    ctx.fillText(title, titleW + 3, 80 + 4);
    
    ctx.fillStyle = 'rgb(192, 0, 0)';                 // actual text
    ctx.fillText(title, titleW, 80);
    
  }
}