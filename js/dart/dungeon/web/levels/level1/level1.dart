part of dungeon;

class WiseMan{
  num x, y, w, h;
  
  WiseMan(){
    x = canvas.width/2;
    y = canvas.height/2;
    
    w = 25;
    h = 25;
  }
}

class Level_1{
  WiseMan wise;
  
  Level_1(){
    wise = new WiseMan(); 
  }
  
  void update(){
    // position player (bottom middle) set in overworld
  }
  
  void render(){
    ctx.fillStyle = '#e1e1e1';
    ctx.font = "18px Helvetica";
    ctx.fillText('Level 1', (canvas.width / 2) - 12, 19);
    
    // display wise man
    ctx.fillStyle = 'green';
    ctx.fillRect(wise.x, wise.y, wise.w, wise.h);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(wise.x + 19, wise.y - 56, 130, 50);
    ctx.fillStyle = '#e1e1e1';
    ctx.fillRect(wise.x + 20, wise.y - 55, 128, 48);
    
    ctx.fillStyle = '#000';
    ctx.font = "12px Helvetica";
    ctx.fillText('Hello, I am Wise Man.', wise.x + 24, wise.y - 30);
  }
}
