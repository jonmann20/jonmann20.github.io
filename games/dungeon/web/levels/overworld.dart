part of dungeon;

// TODO: fix hitting enter too quickly bug (pre load?) (may have fixed with resetKeys() function)

class lvl_t{
  bool unlocked, beaten;
  String name, color;
  num x, y;
  
  lvl_t(){
    color = Color.BROWN.name;
    beaten = unlocked = false;
    x = y = 0;
    name = 'UNKNOWN';
  }
}

class Overworld{
  List<lvl_t> lvlArr;
  num ovrCurLvl, fixX, fixY, boxW, boxH, boxPadBot;
  
  Overworld(){
    ovrCurLvl = 0;
    boxW = boxH = 38;
    boxPadBot = 59;
    
    fixX = boxW/2 - p.w/2;
    fixY = boxH/2 - p.h;
    
    lvlArr = new List<lvl_t>(NUM_LVLS);
    for(int i=0; i < NUM_LVLS; i++)
      lvlArr[i] = new lvl_t();
    
    lvlArr[0].name = 'START';
    lvlArr[0].x = 30;
    lvlArr[0].y = FULLH / 3;
    lvlArr[0].color = Color.TAN.name;
    
    lvlArr[1].name = 'LEVEL 1';
    lvlArr[1].unlocked = true;
    lvlArr[1].x = 135;
    lvlArr[1].y = FULLH / 3;
    
    lvlArr[2].name = 'ARENA';
    lvlArr[2].x = 220;
    lvlArr[2].y = FULLH - 150;
    lvlArr[2].color = '#555';
  }
  
  /**************** Update ****************/
  void update(){
    switch(key.lastDirDown){
      case KeyCode.UP:
        //transition(Direction.UP);
        break;
      case KeyCode.DOWN:
        //transition(Direction.DOWN);
        break;
      case KeyCode.LEFT:
        transition(Direction.LEFT);
        break;
      case KeyCode.RIGHT:
        transition(Direction.RIGHT);
        break;
    }
      
    if(key.lastKeyDown == KeyCode.ENTER && lvlArr[ovrCurLvl].unlocked && !lvlArr[ovrCurLvl].beaten){
      key.resetKeys();
      
      canvas.classes.remove("preTransition");
      canvas.classes.add("duringTransition");
      canvasListener = canvas.onTransitionEnd.listen((e){
        canvas.classes.remove("duringTransition");
        canvas.classes.add("preTransition");
        initLevel();
      });
    }
  }
  
  void initLevel(){
    lvlSelected = true;
    curLvl = DEBUG_LVL ? DEBUG_LVL_NUM : ovrCurLvl;
    
    switch(curLvl){
      case 0:
        break;
      case 1:
        level.level1 = new Level_1();
        break;
      case 2:
        level.arena = new Arena();
        break;
    }
    
    key.resetKeys();
    level.setStartPosition();
    
    if(!DEBUG_LVL)
        canvasListener.cancel();
  }
  
  void transition(int dir){
    if(ovrCurLvl == 0 && dir == Direction.RIGHT && lvlArr[1].unlocked){   // start pad
      p.x = lvlArr[++ovrCurLvl].x + fixX;
      p.y = lvlArr[ovrCurLvl].y + fixY;
    }
    else if(ovrCurLvl == 1){
      if(dir == Direction.LEFT){
        p.x = lvlArr[--ovrCurLvl].x + fixX;
        p.y = lvlArr[ovrCurLvl].y + fixY;
      }
      else if(dir == Direction.RIGHT && lvlArr[2].unlocked){
        p.x = lvlArr[++ovrCurLvl].x + fixX;
        p.y = lvlArr[ovrCurLvl].y + fixY;
      }
    }
    else if(ovrCurLvl == 2 && dir == Direction.LEFT){
      p.x = lvlArr[--ovrCurLvl].x + fixX;
      p.y = lvlArr[ovrCurLvl].y + fixY;
    }
    
    key.resetKeys();
  }

  void reset(){
    util.blinkText(10, FULLW - 100, HALFH);
    
    if(key.lastKeyDown == KeyCode.ENTER){
      key.resetKeys();
      canvasListener.cancel();
      
      lvlArr[curLvl].beaten = true;
      lvlArr[curLvl+1].unlocked = true;
      
      p.x = lvlArr[curLvl].x + fixX;
      p.y = lvlArr[curLvl].y + fixY;
      
      ovrCurLvl = curLvl;
      
      p.dir = Direction.DOWN;
      p.invisible = false;
      lvlSelected = false;
    }
  }
  
  /**************** Render ****************/
  void render(){
    // background
    ctx.fillStyle = Color.BG.name;
    ctx.fillRect(0, 0, FULLW, FULLH);
    
    ctx.font = "18px 'Press Start 2P'";
    final String worldName = 'TOWN OF DUNGEON';
    ctx.fillStyle = '#000';
    ctx.fillText(worldName, HALFW - ctx.measureText(worldName).width/2 + 2, 32);
    ctx.fillStyle = "#e1e1e1";
    ctx.fillText(worldName, HALFW - ctx.measureText(worldName).width/2, 30);
    
    for(int i=0; i < NUM_LVLS; i++){
      // level name
      ctx.fillStyle = "#e1e1e1";
      ctx.font = "9px 'Press Start 2P'";
      
      String lvlName;
      if(lvlArr[i].unlocked || i == 0)
        lvlName = lvlArr[i].name;
      else
        lvlName = 'UNKNOWN';
      
      ctx.fillText(lvlName, lvlArr[i].x - ctx.measureText(lvlName).width/14, lvlArr[i].y + boxPadBot);   
      
      // line to next lvl
      if(i != NUM_LVLS-1){
        ctx.strokeStyle = (i == 0 || lvlArr[i-1].unlocked || lvlArr[i].beaten) ? '#ae7446' : '#222'; // TODO: better logic here
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lvlArr[i].x + boxW, lvlArr[i].y + boxH/2);
        
        if(lvlArr[i].y == lvlArr[i+1].y){
          ctx.lineTo(lvlArr[i+1].x, lvlArr[i+1].y + boxH/2);
        }
        else{
          ctx.lineTo(lvlArr[i+1].x + boxW/2, lvlArr[i].y + boxH/2);
          
          ctx.moveTo(lvlArr[i+1].x + boxW/2, lvlArr[i].y + boxH/2);
          ctx.lineTo(lvlArr[i+1].x + boxW/2, lvlArr[i+1].y + boxH/2);
        }
        
        ctx.stroke();
        ctx.closePath();
      }
      
      // level pad
      ctx.fillStyle = lvlArr[i].color;
      if(lvlArr[i].unlocked && !lvlArr[i].beaten)
        stairs.drawD(lvlArr[i].x, lvlArr[i].y);
      else
        ctx.fillRect(lvlArr[i].x, lvlArr[i].y, boxW, boxH);
      
      // 'X' through beaten levels
      if(lvlArr[i].beaten){
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lvlArr[i].x+1, lvlArr[i].y+1);
        ctx.lineTo(lvlArr[i].x + boxW-1, lvlArr[i].y + boxH-1);
        ctx.moveTo(lvlArr[i].x+1, lvlArr[i].y+boxH-1);
        ctx.lineTo(lvlArr[i].x + boxW-1, lvlArr[i].y+1);
        ctx.stroke();
        ctx.closePath();
      }
    }
    
    p.drawPlayer();
  }
  
}

