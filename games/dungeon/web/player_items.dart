part of dungeon;

class Item extends GameObj{
  bool usable, inUse;  
  SpritePos imgD, imgL, imgR, imgU; 
  
  Item(num ix, num iy, num w, num h, this.imgD, this.imgL, this.imgR, this.imgU, [String str=null]) : super(ix, iy, w, h, str){
      usable = inUse =  false;
  }
}