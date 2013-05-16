part of dungeon;

class Utils{
  num alpha, tmpW, textPos;
  bool fadeOut, slideOut, flashTxtDone;
  
  Utils(){
    tmpW = alpha = 0;
    textPos = FULLH;
    fadeOut = false;
    slideOut = true;
  }
  
  bool checkCollision(GameObj a, GameObj b, [num moe=0]){
    if((a.x + moe <= (b.x + b.w)) &&    // player is to the left of the right side of the obj
       (b.x + moe <= (a.x + a.w)) &&    // player is to the right of the left side of the obj
       (a.y + moe <= (b.y + b.h)) &&    // player is higher than the bot of obj
       (b.y + moe <= (a.y + a.h))       // player is lower than the top of obj
    ){
      return true;
    }
    
    return false;
  }
  
  /*********** Graphics ***********/
  void drawEllipse(num x, num y, num w, num h) {
      num kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle
  
        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        ctx.closePath();
        ctx.fill();
   }
  
  void blinkText(num fontSize, num x, num y, [String str='PRESS ENTER']){
    if(alpha <= 0)
      fadeOut = false;
    else if(alpha > 1.55)
      fadeOut = true;
    
    alpha += fadeOut ? -dt : dt;
    
    // press enter
    ctx.font = "$fontSize\px Press Start 2P";
    tmpW = ctx.measureText(str).width;
    ctx.fillStyle = 'rgba(233, 233, 233, $alpha)';
    ctx.fillText(str, x - tmpW/2, y);
  }
  
  bool flashText(num fontSize, String str){
    if(textPos < (FULLH/2 - 45))
      slideOut = false;
    else if(textPos > FULLH)
      return true;
    
    textPos += slideOut ? -dt*120 : dt*450;
    num tmpY = (textPos < FULLH/2) ? FULLH/2 : textPos;
    
    // press enter
    ctx.font = "$fontSize\px Press Start 2P";
    TextMetrics strDimensions = ctx.measureText(str);
    
    ctx.fillStyle = 'rgba(12, 12, 12, .5)';
    ctx.fillRect(FULLW/2-strDimensions.width/2-8, tmpY-18, strDimensions.width+15, 25);
    
    ctx.fillStyle = '#e1e1e1';
    ctx.fillText(str, FULLW/2 - strDimensions.width/2, tmpY);
    
    return false; // not finished
  }
}


/**************** Enums/Helpers ***************/
class Color{
  static const LOCKED = const Color('#f42805');
  static const TAN = const Color('#efce9b');
  static const BROWN = const Color('#ae7446');
  static const BG = const Color('#333');
  
  final String name;
  const Color(this.name);
}

class Pair{
  var first = 0, second = 0;
   
  Pair(this.first, this.second);
}

class Direction{
  static const UP = KeyCode.UP,
               DOWN = KeyCode.DOWN,
               LEFT = KeyCode.LEFT,
               RIGHT = KeyCode.RIGHT,
               PICKED = KeyCode.BACKSPACE;
  final KeyCode toInt;
  const Direction(this.toInt);
}

class SpritePos{
  num sx, sy;
  SpritePos(this.sx, this.sy);
}


class Dialog{
  num dialogW, dialogLine;
  List<String> dialog;
  
  Dialog(){
    dialogW = dialogLine = 0;
    dialog = new List<String>(5);
    
    dialog[0] = 'HELLO, I AM WISE MAN.';
    dialog[1] = 'WELCOME TO DUNGEON.';
    dialog[2] = 'I HAVE COME ACROSS';
    dialog[3] = 'A WONDERFUL DEVICE!';
    dialog[4] = 'YOU MAY HAVE IT.';
  }
}
