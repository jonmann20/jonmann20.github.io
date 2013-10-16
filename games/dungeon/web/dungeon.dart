library dungeon;

import 'dart:html';
//import 'dart:math';
//import 'package:js/js.dart' as js;

part 'game.dart';
part 'input.dart';
part 'utils.dart';
part 'game_object.dart';
part 'start_screen.dart';
part 'player.dart';
part 'player_items.dart';
part 'enemies/enemy.dart';
part 'overworld.dart';
part 'levels/level.dart';
part 'levels/level1/level1.dart';
part 'levels/arena.dart';


// globals
var cWrap, canvasListener, canvas, ctx;
Keyboard key;
Utils util;
Game game;
Player p;
Level level;
Overworld overworld;
//AudioContext bgMusic;
bool lvlSelected,
     DEBUG_LVL = true,
     DEBUG_OVERWORLD = false;   // skip start screen
num curLvl, dt;
num FULLW = 854,                // 480p; 16:9 ==> 53.375*16 x 53.375*9
    FULLH = 480,
    HALFW = FULLW/2,
    HALFH = FULLH/2,
    NUM_LVLS = 3,               // includes 0 ==> startpad/overworld
    DEBUG_LVL_NUM = 1;
//var boundingRect;

// globally used elements
GameObj stairs = new GameObj(0, 0, 40, 40, 'stairsR.png');

void main(){
	window.onLoad.listen((e){

	//    var j = js.context;
	//
	//    js.scoped((){
	//      j.audioJS();
	//    });
	//
	//    // works in latest non Dartium
	//    var a = query('audio');
	//    a.play();


	  game = new Game();
	});
}
