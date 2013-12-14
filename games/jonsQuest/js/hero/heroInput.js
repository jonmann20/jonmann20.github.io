/// <reference path="hero.js" />
/// <reference path="heroGraphics.js" />
/// <reference path="heroPhysics.js" />
/// <reference path="../physics/physics.js" />

/*
    The input component of hero.
*/
var HeroInputComponent = function () {

    var maxVx = 2.6,       // TODO: should be const
        maxVy = 10         // TODO: should be const
    ;


    return {
        init: function () {
            // global key vars
	        keysDown = {};
            lastKeyDown = -1;

            $(document).on("click", ".resize", function () {
                if ($(this).hasClass("off")) {
                    $(this).removeClass("off").addClass("on");
                    $(this).children("span").removeClass("icon-expand").addClass("icon-contract");
                }
                else if ($(this).hasClass("on")) {
                    $(this).removeClass("on").addClass("off");
                    $(this).children("span").removeClass("icon-contract").addClass("icon-expand");
                }

                utils.toggleFullScreen();
            });

            addEventListener("keydown", function (e) {

                if (e.keyCode === KeyCode.SPACEBAR)
                    e.preventDefault(); 			    // scrolling to bottom of page
                else if (e.keyCode === KeyCode.M)	    // mute/unmute
                    audio.handleMuteButton();
                else if(e.keyCode === KeyCode.F)        // resize
                    $(".resize").trigger("click");
                else if (e.keyCode === KeyCode.K &&		// jump; TODO: move to check() function
                       (!hero.isJumping && ((lastKeyDown !== KeyCode.K) || !(keysDown[KeyCode.K]))) &&
                       hero.isOnObj
                ) {
                    audio.jump.play();
                    hero.vY = 0;
                    hero.isJumping = true;
                    hero.isOnObj = false;
                }
                else if (e.keyCode === KeyCode.J &&		// shoot; TODO: move to check() function
                        ((lastKeyDown != KeyCode.J) || !(keysDown[KeyCode.J]))
                ) {
                    if (hero.ammo > 0 && !hero.isCarrying) {
                        audio.play(audio.effort);

                        hero.bulletArr[hero.bulletArr.length] = {
                            pos: {
                                x: hero.pos.x,
                                y: hero.pos.y
                            },
                            w: bullet.w,
                            h: bullet.h,
                            dirR: (hero.dir === Dir.RIGHT),
                            deg: 0
                        };

                        --hero.ammo;
                    }
                }
                else if (e.keyCode == KeyCode.O) {      // options
                    utils.toggleMenu();
                }

                lastKeyDown = e.keyCode;
                keysDown[e.keyCode] = true;
            }, false);
	
            addEventListener("keyup", function (e) { delete keysDown[e.keyCode];}, false);
        },

        check: function () {
            var doGravity = false;

            if (hero.isJumping) {
                if (hero.jumpMod > 0) {
                    hero.vY -= hero.aY * hero.jumpMod--;
                }
                else {
                    doGravity = true;
                }
            }
            else {
                hero.jumpMod = hero.jumpMod0;
                doGravity = true;
            }


            if (doGravity && !hero.onLadder) {
                var fixVy = hero.vY + game.gravity*2;

                if (fixVy > maxVy) {
                    hero.vY = maxVy;
                }
                else {
                    hero.vY = fixVy;
                }
            }


            // --------- keys pressed --------
            var leftOrRight = false;
            //----- left (a)
            if(keysDown[65]){
                hero.vX = (Math.abs(hero.vX - hero.aX) > maxVx) ? -maxVx : (hero.vX - hero.aX);
                hero.dir = Dir.LEFT;
                leftOrRight = true;
            }

		
            //----- right (d)
            if (keysDown[68]) {
                hero.vX = (Math.abs(hero.vX + hero.aX) > maxVx) ? maxVx : (hero.vX + hero.aX);
                hero.dir = Dir.RIGHT;
                leftOrRight = true;
            }
	    
            if(Math.abs(hero.vX) < hero.aX){    
                hero.vX = 0;
            }
            else if(!leftOrRight){
                //hero.vX += (hero.vX > 0) ? -game.friction : game.friction;
                hero.vX /= 1.26;
            }
	    

            //----- up (w)
            if (keysDown[KeyCode.W]) {
                if (hero.onLadder) {
                    --hero.pos.y;
                }
            }

            //----- down (s)
            if (keysDown[KeyCode.S]) {
                if (hero.onLadder) {
                    ++hero.pos.y;
                }
            }

	    
            //----- drop object (spacebar)
            if (keysDown[32]) {
                if (hero.isCarrying) {
                    hero.isCarrying = false;
                    hero.curItem.holding = false;
                    level.items.push(hero.curItem);
                    hero.curItem = null;
                }
            }

		
            //----- heal (h)
            if(keysDown[72]){
                if(hero.medKits > 0 && hero.health < hero.maxHealth){
                    ++hero.health;
                    --hero.medKits;

                    audio.play(audio.enchant, true);
                }
            }
		
		
            //----- restore (r)
            if(keysDown[82] && !(keysDown[17])){	// 17 = ctrl
                if(hero.manaKits > 0 && hero.mana < hero.maxMana){
                    ++hero.mana;
                    --hero.manaKits;

                    audio.play(audio.enchant, true);
                }
            }
		
        }
    };
};
