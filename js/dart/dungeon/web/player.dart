part of dungeon;

class Player{
  num x, y, vX, vY, w, h, maxVx, maxVy;
  bool attack, pImgReady;
  ImageElement pImg;
  
  Player(){
    x = canvas.width / 2;
    y = canvas.height / 2;
    vX = 0;
    vY = 0;
    maxVx = maxVy = 5;
    w = 28;
    h = 52;
    
    attack = pImgReady = false;
    
    pImg = new ImageElement();
    pImg.src = 'img/player.gif';        // images must be uploaded as games/img/filename.jpb
    pImg.width = w;
    pImg.height = h;
    
    pImg.onLoad.listen((e){
      pImgReady = true;
    });
  }
  
  void update(){
    bool tooFastY = (vY.abs() > maxVy) ? true : false;
    bool tooFastX = (vX.abs() > maxVx) ? true: false; 
    
    if(!tooFastY && key.isPressed(KeyCode.W)){          // up
      --vY;
    }
    else if(!tooFastY && key.isPressed(KeyCode.S)){     // down
        ++vY;
    }
    else{
      if(vY > 0){
        vY += (vY == 1) ? -1 : -2; 
      }
      else if(vY < 0)
        vY += (vY == -1) ? 1 : 2; 
    }
    
    if(!tooFastX && key.isPressed(KeyCode.A)){               // left
      --vX;
    }
    else if(!tooFastX && key.isPressed(KeyCode.D)){          // right
      ++vX;
    }
    else{
      if(vX > 0){
        vX += (vX == 1) ? -1 : -2; 
      }
      else if(vX < 0)
        vX += (vX == -1) ? 1 : 2; 
    }
    
    attack = key.isPressed(KeyCode.SPACE) ? true : false;
    
    x += vX;
    y += vY;
  }
  
  void render(){
    draw();
    
    if(attack)
      drawAttack();
  }
  
  void draw(){
    //ctx.fillStyle = 'yellow';
    //ctx.fillRect(x, y, w, h);
    

    if(pImgReady){
      ctx.drawImage(pImg, x, y, w, h);
    }
  }
  
  void drawAttack(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(x+32, y - p.h/2, 7, 20);
    ctx.fillStyle = '#222';
    ctx.fillRect(x+29, y - p.h/2 + 11, 14, 4);
  }
  
  void printPlayer(){
    //print(x);
    //print(', ');
    //print(y);
  }
  
}

