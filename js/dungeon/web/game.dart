part of dungeon;

class Game{
  var fpsHolder;
  num oldTime, fps;
  
  Game(){
    cWrap = query('.canvasWrap');
    canvas = query('canvas');
    ctx = canvas.context2d;
    canvas.width = FULLW;
    canvas.height = FULLH;
    
    fpsHolder = query('title');
    dt = oldTime = fps = curLvl =  0;
        
    resizeGame();
    window.onResize.listen((e){resizeGame();});
    window.onDeviceOrientation.listen((e){resizeGame();});
    
    key = new Keyboard();
    util = new Utils();
    p = new Player(0, 0, 28, 38, 'sprites/player/player.png');
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
  
  void resizeGame(){
    num gW = window.innerWidth;
    num gH = window.innerHeight;
    num ogH = gH;
    num scaleX = gW / FULLW;
    num scaleY = gH / FULLH;
    num ratio = gW / gH;
    optimalRatio = (scaleX < scaleY) ? scaleX : scaleY;
    
    if(ratio >= 1.77 && ratio <= 1.79){    //1080p
      optimalRatio = ratio;
    }
    else {
      gW = FULLW * optimalRatio;
      gH = FULLH * optimalRatio;
    }
    
    cWrap.style.width = '$gW\px';
    cWrap.style.height = '$gH\px';
    cWrap.style.marginTop = '${(ogH - gH)/2}\px';
  }
  
  void gameLoop(num time){
    displayFps(time, oldTime);

    update();
    render();
    
    window.requestAnimationFrame(gameLoop);
  }
  
  void displayFps(num t, num old){
    dt = (t-old)/1000;
    
    if(t.toInt() % 12 == 0){
      fps = (1/dt).toInt();
      fpsHolder.text = 'Dungeon: $fps fps';
    }
    oldTime = t;
  }
  
  /**************** Update **************/
  void update(){
    if(!lvlSelected || curLvl == 0){
      overworld.update();
    }
    else{
      level.update();      
      p.update();
    }
  }
    
  /**************** Render **************/
  void render(){
    if(!lvlSelected || curLvl == 0){
      overworld.render();
    }
    else{
      level.render();
      
      if(!p.invisible)
        p.render();
    }
  }
}

