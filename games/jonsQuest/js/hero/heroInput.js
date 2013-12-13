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

                if (e.keyCode == 32)
                    e.preventDefault(); 			//----- space bar (scrolling to bottom of page)
                else if (e.keyCode == 77)			//----- mute/unmute (m)
                    audio.handleMuteButton();
                else if(e.keyCode == 70)            //----- resize (f)
                    $(".resize").trigger("click");
                else if (e.keyCode == 75 &&			//----- jump (k);       TODO: move to check() function
                       (!hero.isJumping && ((lastKeyDown != 75) || !(75 in keysDown))) &&
                       hero.isOnObj
                ) {
                    audio.jump.play();
                    hero.vY = 0;
                    hero.isJumping = true;
                    hero.isOnObj = false;
                }
                else if (e.keyCode == 74 &&		//----- shoot (j);          TODO: move to check() function
                        ((lastKeyDown != 74) || !(74 in keysDown))
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
                else if (e.keyCode == KeyCode.O) {      //----- options (o)
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
            if(65 in keysDown){
                hero.vX = (Math.abs(hero.vX - hero.aX) > maxVx) ? -maxVx : (hero.vX - hero.aX);
                hero.dir = Dir.LEFT;
                leftOrRight = true;
            }

		
            //----- right (d)
            if (68 in keysDown) {
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
            if (KeyCode.W in keysDown) {
                if (hero.onLadder) {
                    --hero.pos.y;
                }
            }

            //----- down (s)
            if (KeyCode.S in keysDown) {
                if (hero.onLadder) {
                    ++hero.pos.y;
                }
            }

	    
            //----- drop object (spacebar)
            if (32 in keysDown) {
                if (hero.isCarrying) {
                    hero.isCarrying = false;
                    hero.curItem.holding = false;
                    hero.curItem = null;
                }
            }

		
            //----- heal (h)
            if(72 in keysDown){
                if(hero.medKits > 0 && hero.health < hero.maxHealth){
                    ++hero.health;
                    --hero.medKits;

                    audio.play(audio.enchant, true);
                }
            }
		
		
            //----- restore (r)
            if(82 in keysDown && !(17 in keysDown)){	// 17 = ctrl
                if(hero.manaKits > 0 && hero.mana < hero.maxMana){
                    ++hero.mana;
                    --hero.manaKits;

                    audio.play(audio.enchant, true);
                }
            }
		
        }
    };
};
