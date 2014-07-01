
//// uses speculative contacts
//solidRectCollision: function (collisionDir, obj) {
//    if (collisionDir != Dir.NONE) {
//        if (collisionDir == Dir.LEFT) {
//            hero.onObjX = obj.x - hero.lvlX - hero.w;
//            hero.onObjLvlX = hero.lvlX;
//        }
//        else if (collisionDir == Dir.RIGHT) {
//            hero.onObjX = obj.x - hero.lvlX + obj.w;
//            hero.onObjLvlX = hero.lvlX;
//        }
//        else if (collisionDir == Dir.TOP) {
//            hero.onObjY = hero.y = obj.y - hero.h;
//            hero.isJumping = false;
//            hero.isOnObj = true;
//        }
//        else if (collisionDir == Dir.BOT) {
//            if (hero.vY < -4) {
//                audio.play(audio.thud, true);
//            }

//            hero.onObjY = hero.y = obj.y + obj.h;
//            hero.jumpMod = 0;
//            hero.vY = 0;

//        }

//        if ((collisionDir == Dir.LEFT) || (collisionDir == Dir.RIGHT)) {
//            hero.x = hero.onObjX;
//            hero.lvlX = hero.onObjLvlX;
//        }
//    }
//}



///*
//    Checks for a collision between hero and obj.  Uses speculative contacts.
//    Returns a collision direction.
//*/
//objCollision: function(obj) {
//    var collisionDir = Dir.NONE;

//    // using player dimensions as the moe
//    if (Physics.isCollision(hero, obj, 0, true)) {

//        collisionDir = Dir.IN;

//        if (hero.dir == Dir.RIGHT && (hero.lvlX - hero.x < obj.x)) {        // left side of obj
//            collisionDir = Dir.LEFT;
//        }
//        else if ((hero.x + hero.lvlX + hero.w) > (obj.x + obj.w)) {         // right side of obj
//            collisionDir = Dir.RIGHT;
//        }


//        if ((hero.x != hero.onObjX) && ((hero.y + hero.h - ((obj.h / 2) + 1)) < obj.y) &&  // top of obj
//            (hero.vY > 0) || hero.isOnObj   // moving down OR already on
//        ) {
//            collisionDir = Dir.TOP;
//        }
//        else if ((hero.y + hero.h) > (obj.y + obj.h)) {                     // bot of obj
//            collisionDir = Dir.BOT;
//        }
//    }

//    return collisionDir;
//}