part of dungeon;

class startPos{
  num x, y;
  int dir;
  
  startPos(){
    x = y = 0;
    dir = Direction.DOWN;
  }
}

class Level{
  List<startPos> startPositions;
  Level_1 level1;
  Arena arena;
  String litLvlName;
  List<String> bgColor;
  bool isCutscene;
  
  Level(){
    isCutscene = true;
    
    startPositions = new List<startPos>(NUM_LVLS);
    bgColor = new List<String>(NUM_LVLS); 
    
    for(int i=0; i < NUM_LVLS; i++)
      startPositions[i] = new startPos();
     
    for(int i=0; i < NUM_LVLS; i++)
      bgColor[i] = '#666';
    
    // overworld (level 0) (also defined in Game class)
    startPositions[0].x = overworld.lvlArr[0].x + overworld.boxW / 2 - p.w / 2;
    startPositions[0].y = overworld.lvlArr[overworld.ovrCurLvl].y + overworld.boxH / 2 - p.h;
    
    // level 1
    startPositions[1].x = HALFW - p.w/2;
    startPositions[1].y = FULLH - p.h - 10;
    startPositions[1].dir = Direction.UP;
    
    // arena
    startPositions[2].x = HALFW - 70 + p.w/2;
    startPositions[2].y = HALFH - 55 - p.h/2;
    startPositions[2].dir = Direction.DOWN;
  }
  
  void setStartPosition(){
    p.x = startPositions[curLvl].x;
    p.y = startPositions[curLvl].y;
    p.dir = startPositions[curLvl].dir;
  }
  
  /**************** Update ****************/
  void update(){
    switch(curLvl){
      case 1:
        level1.update();
        break;
      case 2:
        arena.update();
        break;
    }
  }
  
  /**************** Render ****************/
  void render(){
    switch(curLvl){
      case 1:
        level1.render();
        break;
      case 2:
        arena.render();
        break;
    }
  }
  
  void drawBg(){
    // draw background
    ctx.fillStyle = '${bgColor[curLvl]}';
    ctx.fillRect(0, 0, FULLW, FULLH);
    
    litLvlName = 'LEVEL $curLvl';
    
    ctx.font = "18px 'Press Start 2P'";
    ctx.fillStyle = '#000';
    ctx.fillText(litLvlName, HALFW - ctx.measureText(litLvlName).width/2 + 2, 34);
    ctx.fillStyle = '#e1e1e1';
    ctx.fillText(litLvlName, HALFW - ctx.measureText(litLvlName).width/2, 32);
  }
  
}