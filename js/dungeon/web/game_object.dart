part of dungeon;

class GameObj{
  num ix, iy, w, h, x, y;
  bool ready;
  ImageElement img;
  String src;
  
  GameObj(this.ix, this.iy, this.w, this.h, [String str=null]){
    x = ix - w/2;
    y = iy - h/2;
    src = str;
    
    ready = false;
    
    if(src != null){
      img = new ImageElement();
      img.src = '../js/dungeon/img/$src';
      
      img.width = this.w;
      img.height = this.h;
      
      img.onLoad.listen((e){ready = true;});
    }
  }
  
  void draw([SpritePos sp=null]){
    if(src != null && ready){
      if(sp != null)
        ctx.drawImageScaledFromSource(img, sp.sx, sp.sy, w, h, x, y, w, h);
      else
        ctx.drawImageScaled(img, x, y, w, h);
    }
    else{
      ctx.fillStyle = '#444';
      ctx.fillRect(x, y, w, h);
    }
  }
  
  void drawD(num inX, num inY, [SpritePos sp=null]){
    x = inX;
    y = inY;
    
    if(sp != null)
      draw(sp);
    else
      draw();
  }
}
