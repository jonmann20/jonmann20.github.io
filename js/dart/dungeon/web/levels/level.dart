part of dungeon;

class startPos{
  num x, y;
  
  startPos(){
    x = y = 0;
  }
}

class Level{
  num NUM_LVLS;
  List<startPos> startPositions;
  Level_1 level1;
  
  Level(){
    level1 = new Level_1();   // TODO: move to overworld
    
    NUM_LVLS = 2;
    startPositions = new List<startPos>.fixedLength(NUM_LVLS);
     
    for(int i=0; i < NUM_LVLS; i++){
      startPositions[i] = new startPos();
    }
    
    // level 1
    startPositions[1].x = canvas.width / 2;
    startPositions[1].y = canvas.height - p.h - 10;
  }
  
  void update(){
    if(curLvl == 1)
      level1.update();
  }
  
  void render(){
    // draw background
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if(curLvl == 1)
      level1.render();
  }
}