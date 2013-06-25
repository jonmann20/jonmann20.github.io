part of dungeon;

class Stage{
  bool unlocked = false,
       beaten = false;
}

class Arena{
  num curStage = 0, numStages = 3, animalSelected = -1;
  List<Stage> stage;
  bool stageSelected = false;
  
  Arena(){
    stage = new List<Stage>(numStages);
    for(int i=0; i < numStages; i++){
      stage[i] = new Stage();
    }
    stage[0].unlocked = true;
    
    p.animal.add(new Enemy(5, 'fishCard.png', 'Fish', HALFW, 90, 71, 40, 'fish.png'));    // for debugging
    p.movLocked = true;
    //level.isCutscene = true; // hide HUD
  }
  
  void update(){
    if(!stageSelected && key.lastKeyDown == KeyCode.ENTER){
      key.resetKeys();
      
      stageSelected = true;
      p.x = 200;
      p.y = FULLH - p.h - 20;
      p.dir = Direction.UP;
    }
    else if(stageSelected){
      if(key.lastKeyDown == KeyCode.ENTER){
        animalSelected = 0;
        key.resetKeys();
      }
    }
  }
  
  void render(){
    if(!stageSelected)
      drawStageSelector();
    else{
      switch(curStage){
        case 0:
          drawStage1(); 
          break;
      }
    }
  }
  
  void drawStage1(){
    // bg
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, FULLW, FULLH);
    
    // platform
    ctx.fillStyle = Color.BROWN.name;
    ctx.fillRect(HALFW - 100, 70, HALFW, HALFH);
    
    if(animalSelected != -1){
      p.animal[animalSelected].drawD(HALFW - p.animal[animalSelected].w/2, FULLH - 120);
    }
    else{
      drawAnimalSelector();
    }
    
    // opponent
    ctx.fillStyle = 'orange';
    ctx.fillRect(FULLW - 250, 20, 35, 35);
  }
  
  void drawAnimalSelector(){
    ctx.fillStyle = '#ccc';
    ctx.fillRect(HALFW-50, FULLH- 90, 155, 65);
    
    ctx.font = "9px 'Press Start 2P'";
    ctx.fillStyle = '#000';
    ctx.fillText('SELECT ANIMAL', HALFW-30, FULLH-74);
    
    ctx.font = "8px 'Press Start 2P'";
    ctx.fillStyle = '#333';
    int len = p.animal.length;
    for(int i=0; i < len; i++){
      ctx.fillText(p.animal[i].name, HALFW-42, FULLH-58);
    }
  }
  
  void drawStageSelector(){
    // bg
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, FULLW, FULLH);
    
    // stages
    ctx.font = "9px 'Press Start 2P'";
    for(int i=1; i <= numStages; i++){
      ctx.fillStyle = (stage[i-1].unlocked) ? Color.TAN.name : Color.BROWN.name;
      ctx.fillRect(HALFW-60 + (i-1)*90, HALFH-60, 40, 40);
    
      ctx.fillStyle = (stage[i-1].unlocked) ? '#e1e1e1' : '#aaa';
      ctx.fillText('STAGE $i', HALFW-70 +(i-1)*90, HALFH);
    }
    
    util.blinkText(9, HALFW, HALFH - 120);
  }
}