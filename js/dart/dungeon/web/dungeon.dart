/*

http://dartgamedevs.org/


http://makepixelart.com/free/

*/

library dungeon;

import 'dart:html';
import 'dart:math';

part 'input.dart';
part 'start_screen.dart';
part 'player.dart';
part 'overworld.dart';
part 'levels/level.dart';
part 'levels/level1/level1.dart';

// declare globals
var canvas, ctx;
Keyboard key;
Player p;
Level level;
//AudioContext bgMusic;
bool lvlSelected;
num curLvl;

void main() {
  new Game();
}

class Game{
  Overworld overworld;
  StartScreen s;
  
  Game(){
    canvas = query('canvas');
    ctx = canvas.context2d;
    canvas.width = 540;
    canvas.height = 360;
    
    lvlSelected = false;
    //lvlSelected = true;       // for debugging
    curLvl = 1;
    
    key = new Keyboard();
    p = new Player();
    overworld = new Overworld();
    level = new Level();
    
    
    // start screen position
    p.x = overworld.lvlArr[overworld.ovrCurLvl].x + overworld.boxW / 2 - p.w / 2;
    p.y = overworld.lvlArr[overworld.ovrCurLvl].y + overworld.boxH / 2 - p.h;
    
    s = new StartScreen();
    
    if(lvlSelected){ // for debugging
      overworld.setStartPosition();
    }
    
    window.requestAnimationFrame(preGame);
  }
  
  void preGame(num time){
    if(s.startGame())
      window.requestAnimationFrame(gameLoop);
    else    
      window.requestAnimationFrame(preGame);
  }
  
  void gameLoop(num time){
    update();
    render();
    
    window.requestAnimationFrame(gameLoop);
  }
  
  /* *************** Update ************* */
  void update(){
    if(!lvlSelected){
      overworld.update();
    }
    else{
      level.update();      
      p.update();
    }
    
  }
    
  /* *************** Render ************* */
  void render(){
    if(!lvlSelected){
      overworld.render();
    }
    else{
      level.render();
      p.render();
    }
  }
}
