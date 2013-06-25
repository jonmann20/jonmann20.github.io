part of dungeon;

class Enemy extends GameObj{
  num initHealth, health, invincibleTimer;
  bool invincible, captured, imgCardReady, animate;
  String cardSrc, name;
  ImageElement imgCard;
  int hdir, vdir;
  
  Enemy(this.initHealth, this.cardSrc, this.name, num ix, num iy, num w, num h, [String src=null]) : super(ix, iy, w, h, src){
    health = initHealth;
    animate = imgCardReady = captured = invincible = false;
    invincibleTimer = 30;
    
    hdir = Direction.RIGHT;
    vdir = Direction.DOWN;
    
    if(cardSrc != null){
      imgCard = new ImageElement();
      imgCard.src = 'img/$cardSrc';
      
      imgCard.width = 100;
      imgCard.height = 150;
      
      imgCard.onLoad.listen((e){imgCardReady = true;});
    }
    
  }
  
  void update(){
    if(invincible){
      if(--invincibleTimer < 0){
        invincible = false;
        invincibleTimer = 30;
      }
    }
    
    if(animate){
      
      if(x < 0){
        x = 0;
        hdir = Direction.RIGHT;
      }
      else if(x > FULLW - w){
        x = FULLW - w;
        hdir = Direction.LEFT;
      }
      else{
        if(hdir == Direction.RIGHT)
          ++x;
        else
          --x;
      }
      
      
      if(y < 0){
        y = 0;
        vdir = Direction.DOWN;
      }
      else if(y > FULLH - h){
        y = FULLH - h;
        vdir = Direction.UP;
      }
      else{
        if(vdir == Direction.DOWN)
          ++y;
        else
          --y;
      }
      
    }
    
    
    if(p.sword.inUse && util.checkCollision(p.sword, this)){
      if(!invincible){
        --health;
        invincible = true;
      }
    }
  }
  
  void drawCard(){
    if(imgCardReady){
      level.bgColor[1] = '#111';
      p.invisible = true;
      p.animal.add(this);
      
      ctx.drawImageScaled(imgCard, HALFW-imgCard.width/2, HALFH-imgCard.height/2, imgCard.width, imgCard.height);

      overworld.reset();
    }
  }
  
  void drawHealth(){
    
    // border; TODO: change to strokeRect 
    ctx.fillStyle = '#000';
    ctx.fillRect(x+w/2-1, y-15, initHealth*5+2, 8.2);
    
    ctx.fillStyle = '#777';
    ctx.fillRect(x+w/2, y-14, initHealth*5, 6);
    ctx.fillStyle = 'red';
    
    for(int i=0; i < health; i++){
      ctx.fillRect(x+w/2 + 5*i, y-14, 5, 6);
    }
  }
  
  /*void captureCutscene(){
    p.movLocked = true;
    p.vX = p.vY = 0;
    canvas.classes.remove("preTransition");
    canvas.classes.add("duringTransition");
    
    canvas.onTransitionEnd.listen((e){
        level.bgColor[1] = '#000';
//      p.x = HALFW - p.w/2;
//      p.y = FULLH - p.h - 20;
      
      canvas.classes.remove("duringTransition");
      canvas.classes.add("preTransition");
      
      p.movLocked = false;
      //transitionOver = true;
      return true;
    });
    
  }*/
}

//class Fish extends GameObj{
//  num health;
//}

