part of dungeon;

class lvl_t{
  bool unlocked;
  num x, y;
  
  lvl_t(){
    unlocked = false;
    x = y = 0;
  }
}

class Overworld{
  List<lvl_t> lvlArr;
  num ovrCurLvl, boxW, boxH;
  
  Overworld(){
    ovrCurLvl = 0;
    boxW = boxH = 44;
    
    lvlArr = new List<lvl_t>.fixedLength(10);
    for(int i=0; i < 10; i++){
      lvlArr[i] = new lvl_t();
    }
    
    // level 0
    lvlArr[0].unlocked = false;
    lvlArr[0].x = 30;
    lvlArr[0].y = canvas.height / 3;
    
    // level 1
    lvlArr[1].unlocked = true;
    lvlArr[1].x = 120;
    lvlArr[1].y = canvas.height / 3;
    
    // level 2
    lvlArr[2].unlocked = false;
    lvlArr[2].x = 210;
    lvlArr[2].y = canvas.height / 2;
  }
  
  /* ********** Update ********** */
  void update(){
      if(key.lastKey == KeyCode.W){     // up
        transition('u');
      }
      
      if(key.lastKey == KeyCode.S){     // down
        transition('d');
      }
      
      if(key.lastKey == KeyCode.A){     // left
        transition('l');
      }
      
      if(key.lastKey == KeyCode.D){     // right
        transition('r');
      }
      
      if(key.lastKey == KeyCode.ENTER && lvlArr[ovrCurLvl].unlocked){
        lvlSelected = true;
        setStartPosition();
      }
  }
  
  void setStartPosition(){
    p.x = level.startPositions[curLvl].x;
    p.y = level.startPositions[curLvl].y;
  }
  
  void transition(var dir){
    num fixX = boxW/2 - p.w/2,
        fixY = boxH/2 - p.h;
    
    if(ovrCurLvl == 0 && dir == 'r' && lvlArr[1].unlocked){   // start pad
      p.x = lvlArr[++ovrCurLvl].x + fixX;
      p.y = lvlArr[ovrCurLvl].y + fixY;
    }
    else if(ovrCurLvl == 1){
      if(dir == 'l'){
        p.x = lvlArr[--ovrCurLvl].x + fixX;
        p.y = lvlArr[ovrCurLvl].y + fixY;
      }
      else if(dir == 'r' && lvlArr[2].unlocked){
        p.x = lvlArr[++ovrCurLvl].x - fixX/2;
        p.y = lvlArr[ovrCurLvl].y + fixY;
      }
    }
    else if(ovrCurLvl == 2 && dir == 'l'){
      p.x = lvlArr[--ovrCurLvl].x + fixX;
      p.y = lvlArr[ovrCurLvl].y + fixY;
    }
    
    key.lastKey = KeyCode.BACKSPACE;  // return to default
  }

  
  /* ********** Render ********** */
  void render(){
    // draw background
    var grd = ctx.createRadialGradient(238, 50, 10, 238, 50, 300);
    // light blue
    grd.addColorStop(0, '#8ed6ff');
    // dark blue
    grd.addColorStop(1, '#004cb3');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#e1e1e1";
    ctx.font = "18px Helvetica";
    ctx.fillText('World 1', (canvas.width / 2) - 20, 28);
    
    // level 0 (start pad)
    ctx.fillStyle = 'red';
    ctx.fillRect(lvlArr[0].x, lvlArr[0].y, boxW, boxH);
    ctx.fillStyle = "#e1e1e1";
    ctx.font = "10px Helvetica";
    ctx.fillText('Start', lvlArr[0].x + 10, lvlArr[0].y + 61);   
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lvlArr[0].x + boxW, lvlArr[0].y + boxH/2);
    ctx.lineTo(lvlArr[1].x, lvlArr[1].y + boxH/2);
    ctx.stroke();
    ctx.closePath();
    
    // level 1
    ctx.fillStyle = 'red';
    ctx.fillRect(lvlArr[1].x, lvlArr[1].y, boxW, boxH);
    ctx.fillStyle = "#e1e1e1";
    ctx.fillText('Level 1', lvlArr[1].x + 6, lvlArr[1].y + 61);
    
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(lvlArr[1].x + boxW, lvlArr[1].y + boxH/2);
    ctx.lineTo(lvlArr[2].x, lvlArr[1].y + boxH/2);
    ctx.lineTo(lvlArr[2].x, lvlArr[2].y);
    ctx.stroke();
    ctx.closePath();
    
    // level 2
    ctx.fillStyle = lvlArr[2].unlocked ? 'red' : 'blue';
    ctx.fillRect(lvlArr[2].x - boxW/2, lvlArr[2].y, boxW, boxH);
    ctx.fillStyle = "#e1e1e1";
    ctx.fillText('Level 2', lvlArr[2].x + 6 - boxW/2, lvlArr[2].y + 61);
    
    p.draw();
  }
  
}

