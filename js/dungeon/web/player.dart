part of dungeon;

class Player extends GameObj{
  num vX, vY, maxVx, maxVy, maxV, health, maxHealth, invincibleTimer, atkDownTime, atkUpTime;
  int prevDir, dir;
  bool movLocked, invincible, invisible;
  GameObj heart;
  Item device, sword;
  List<Enemy> animal = new List<Enemy>();
  
  SpritePos 
      imgD = new SpritePos(2, 2),
      imgL = new SpritePos(32, 2),
      imgR = new SpritePos(2, 42),
      imgU = new SpritePos(32, 42),
      imgPicked = new SpritePos(2, 82);
  
  Player(num ix, num iy, num w, num h, [String str=null]) : super(ix, iy, w, h, str){
    vX = vY = atkDownTime = 0;
    atkDownTime = invincibleTimer = 50;
    maxVx = maxVy = 5.5;
    maxV = 8.5;
    health = maxHealth = 4;
    prevDir = dir = Direction.DOWN;
    
    invisible = invincible = movLocked = false;
    
    device = new Item(HALFW, HALFH+20, 14, 20, 
               new SpritePos(2, 2), 
               new SpritePos(2, 24), 
               new SpritePos(2, 24), 
               new SpritePos(2, 24), 
               'sprites/items/device/device.png'
    );
    sword = new Item(0, 0, 9, 20,
              new SpritePos(2, 2), 
              new SpritePos(12, 2), 
              new SpritePos(12, 2), 
              new SpritePos(12, 2), 
              'sprites/items/sword/sword.png'
    );
    heart = new GameObj(0, 0, 9, 9, 'heart.png');
  }
  
  void update(){
    //printPlayer();
    //movLocked = false;    // for debugging
    
    if(health <= 0){
      window.alert('You Died');
      
      vX = vY = 0;
      movLocked = true;
      
      heart.ready = false;   // prevent more alert boxes
      health = 1;
      
      window.location.assign(window.location.href);
    }
    
    if(invincible){
      if(--invincibleTimer < 0){
        invincible = false;
        invincibleTimer = 50;
        dir = prevDir;
      }
    }
    
    if(!movLocked){
      updatePosition();
      
      //++atkUpTime;
      
      if(key.isPressed(KeyCode.SPACE)){
//        if(--atkDownTime < 0){
//          attack = false;
//          atkDownTime = 45;
//        }
//        else
//          attack = true;
        
        /*if(++atkUpTime > 45){
          attack = true;
          atkUpTime = 0;
        }*/
      }
      
      sword.inUse = (sword.usable && key.isPressed(KeyCode.SPACE)) ? true : false;
      device.inUse = (device.usable && key.isPressed(KeyCode.SHIFT)) ? true : false;
    }
  }
  
  void updatePosition(){
    bool tooFastY = (vY.abs() > maxVy) ? true : false;
    bool tooFastX = (vX.abs() > maxVx) ? true : false;
    bool tooFast = ((vX.abs() + vY.abs()) > maxV) ? true : false;
    
    // friction
    if(vY > 0)
      vY -= .5;
    else if(vY < 0)
      vY += .5;
    
    if(vX > 0)
      vX -= .5;
    else if(vX < 0)
      vX += .5;
    
    if(vX.abs() < 0.5)
      vX = 0;
    
    if(vY.abs() < 0.5)
      vY = 0;
    
    // input
    if(!tooFastY){
      if(key.isPressed(KeyCode.UP)){
        --vY;
        dir = Direction.UP;
      }
      if(key.isPressed(KeyCode.DOWN)){
        ++vY;
        dir = Direction.DOWN;
      }
    }
    if(!tooFastX){
      if(key.isPressed(KeyCode.LEFT)){
        --vX;
        dir = Direction.LEFT;
      }
      if(key.isPressed(KeyCode.RIGHT)){
        ++vX;
        dir = Direction.RIGHT;
      }
    }
    
    if(key.isPressed(KeyCode.UP) && key.isPressed(KeyCode.LEFT) ||
       key.isPressed(KeyCode.UP) && key.isPressed(KeyCode.RIGHT) ||
       key.isPressed(KeyCode.DOWN) && key.isPressed(KeyCode.LEFT) ||
       key.isPressed(KeyCode.DOWN) && key.isPressed(KeyCode.RIGHT)
    ){
      dir = key.lastDirDown;
      
      if(tooFast){
        if(vX > 0)
          vX -= 0.2;
        else
          vX += 0.2;
        
        if(vY > 0)
          vY -= 0.2;
        else
          vY += 0.2;
      }
      
      // TODO: cross product??
    }
       
    // position and screen collision
    num newX = vX*42*dt + x;    // scale by constant
    num newY = vY*42*dt + y;
    
    if(newX < 0)
      x = 0;
    else if(newX > FULLW - w)
      x = FULLW - w;
    else
      x += newX-x;
    
    if(newY < 0)
      y = 0;
    else if(newY > FULLH - h)
      y = FULLH - h;
    else
      y += newY-y;
  }
  
  void hit(){
    --health;
    invincible = true;
    vX = -vX*1.3;
    vY = -vY*1.3;
    
    prevDir = dir;
    dir = Direction.HIT;
  }
  
  /**************** Render ****************/
  void render(){
    drawPlayer();
    
    if(sword.inUse)
      drawItem(sword);
    
    if(device.inUse)
      drawItem(device);
    
    if(!level.isCutscene)
      drawHUD();
  }
  
  void drawPlayer(){
    switch(dir){
      case Direction.UP:
        draw(imgU);
        break;
      case Direction.DOWN:
        draw(imgD);
        break;
      case Direction.LEFT:
        draw(imgL);
        break;
      case Direction.RIGHT:
        draw(imgR);
        break;
      case Direction.PICKED:
        draw(imgPicked);
        break;
      case Direction.HIT:
        
        if(invincibleTimer % 6 == 0)
          ctx.fillStyle = 'white';
        else
          ctx.fillStyle = 'red';
        
        ctx.fillRect(x, y, w, h);
        break;
    }

  }
  
  void drawItem(Item obj){
    switch(dir){
      case Direction.UP:
        obj.drawD(x+w/2-obj.w/2, y-25, obj.imgU);
        break;
      case Direction.DOWN:
        obj.drawD(x+w/2-obj.w/2, y+obj.h + 22, obj.imgD);
        break;
      case Direction.LEFT:
        obj.drawD(x-12, y+h/2 - obj.h, obj.imgL);
        break;
      case Direction.RIGHT:
        obj.drawD(x+w+2, y+h/2 - obj.h, obj.imgR);
        break;
    }
  }
  
  void drawHUD(){
    for(int i=0; i < health; i++){
      heart.drawD(8 + 13*i, 8);
    }
  }
  
  void printPlayer(){
    print('position: ${x.toInt()}, ${y.toInt()}; velocity: ${vX.toInt()}, ${vY.toInt()}');
  }
  
}
