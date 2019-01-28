(window.webpackJsonp=window.webpackJsonp||[]).push([[9,4,5,6],{11:function(t,e,n){"use strict";n.r(e);e.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"},12:function(t,e,n){"use strict";n.r(e);e.default="\n\t.col-left {\n\t\tmin-width: 121px;\n\t\twidth: 100%;\n\t}\n\n\t.col-left ul {\n\t\tfont-size: 1.15em;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 25px;\n\t\tpadding-bottom: 13px;\n\t}\n\n\t.col-right img {\n\t\tmax-width: 100%;\n\t}\n\n\t.col-right > div {\n\t\tpadding-bottom: 13px !important;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\t.col-left {\n\t\t\tfloat: left;\n\t\t\twidth: 46%;\n\t\t\tmargin-right: 2%;\n\t\t}\n\n\t\t.col-right {\n\t\t\tfloat: right;\n\t\t\twidth: 50%;\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-left {\n\t\t\twidth: 100%;\n\t\t\tmargin-bottom: 0;\n\t\t}\n\n\t\t.col-right {\n\t\t\twidth: 100%;\n\t\t\tmargin-top: 25px;\n\t\t}\n\t}\n"},13:function(t,e,n){"use strict";n.r(e);e.default="\n\t:host {\n\t\tposition: relative;\n\t}\n\n\t.big-btn {\n\t\tdisplay: inline-block;\n\t\tmargin: 10px auto;\n\t\tpadding: 9px 14px;\n\t\tborder-radius: 10px;\n\t\tfont-weight: bold;\n\t\tfont-size: 1.2em;\n\t\tbackground: rgba(107, 107, 107, 0.64);\n\t\tbox-shadow: 0 3px 0 rgba(54, 54, 54, 0.94);\n\t\topacity: 1;\n\t\ttransition: all 0.19s;\n\t\tcolor: #ffd866;\n\t}\n\n\t.big-btn:hover,\n\t.big-btn:focus {\n\t\tcolor: #ffd866;\n\t\tbox-shadow: 0 3px 0 #ffd866;\n\t\ttext-shadow: none;\n\t}\n\n\t.big-btn:active {\n\t\tbox-shadow: none !important;\n\t\ttransform: translateY(3px);\n\t}\n\n\t.big-btn span {\n\t\tpadding-right: 10px;\n\t\tvertical-align: -1px;\n\t}\n\n\t.col-left {\n\t\tdisplay: none;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 0;\n\t}\n\n\t.col-right > div {\n\t\topacity: 1;\n\t\tvisibility: visible;\n\t\ttransition: 450ms opacity;\n\t\tposition: static;\n\t\twidth: 100%;\n\t\tmargin-bottom: 20px;\n\t}\n\n\t.col-right > div:last-child {\n\t\tmargin-bottom: 100px;\n\t}\n\n\t.col-right > div.fade-in {\n\t\topacity: 1 !important;\n\t\tvisibility: visible !important;\n\t\ttransition: 300ms opacity;\n\t}\n\n\t#div-default {\n\t\tdisplay: none;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\tul {\n\t\t\tlist-style-type: inherit;\n\t\t\tpadding-left: 20px;\n\t\t}\n\n\t\t.col-left {\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.col-right > div {\n\t\t\topacity: 0;\n\t\t\tvisibility: hidden;\n\t\t\twidth: 44%;\n\t\t\tposition: absolute;\n\t\t\tmax-width: 728px;\n\t\t}\n\n\t\t.col-right > div:last-child {\n\t\t\tmargin-bottom: 20px;\n\t\t}\n\n\t\t#div-default {\n\t\t\tdisplay: block;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-right {\n\t\t\tmargin-top: 25px;\n\t\t}\n\n\t\t.col-right > div {\n\t\t\twidth: 100%;\n\t\t\tmax-width: 490px;\n\t\t}\n\t}\n"},15:function(t,e,n){"use strict";n.r(e);var a=n(22),i=n(11),o=n(12),l=n(13),s=n(23);customElements.define("page-games",class extends a.a{constructor(){super(),document.title="Games"}firstUpdated(){new s.a(this.shadowRoot.querySelector(".col-left ul"),this.shadowRoot)}render(){return a.b`
			<style>
				${i.default}
				${o.default}
				${l.default}

				.lh {
					list-style-type: none;
					margin: 12px 0 8px;
					padding-left: 0;
					color: #919091;
				}

				.caption {
					color: #919091;
				}

				.col-right .videogame-asset,
				.col-right .code {
					margin-right: 10px;
					vertical-align: -6px;
				}

				.tech-used {
					margin-top: 26px;
					margin-bottom: 22px;
				}

				.tech-used .lh {
					margin-left: -30px;
				}

				#div-default img {
					margin-top: 15px;
				}

				#div-separate img {
					width: 38px;
				}

				#div-separate .big-img {
					display: block;
					width: 375px;
					margin: 14px auto 0;
				}

				/* > mobile */
				@media (min-width: 801px) {
					#div-separate .big-img {
						margin: 14px 0 0;
					}
				}

				.additional-links ul {
					line-height: 1.6;
				}

				.additional-links ul .lh {
					margin-top: 25px;
				}
			</style>

			<div class="col-left card">
				<h1>Games</h1>
				<ul>
					<li class="lh">-Made with Unity-</li>
					<li><a id="blood-cell-brigade">Blood Cell Brigade</a></li>
					<li><a id="deflection">Deflection</a></li>
					<li class="lh">(pre WebGL Unity builds)</li>
					<li><a id="defend">Defend Thy Kingdom</a></li>
					<li><a id="zelda">The Legend of Zelda: Reservanted</a></li>
					<li><a id="separate">Divide & Conquer</a></li>
					<li class="lh">-Made with Unreal Engine 4-</li>
					<li>
						<a href="https://github.com/ddolsen23/Unlit" target="_blank" rel="noopener">Unlit &#8599;</a>
					</li>
					<li>
						<a href="https://github.com/jonmann20/TigerWoods" target="_blank" rel="noopener">TigerWoods &#8599;</a> (prototype mobile game)
					</li>
					<li>
						<a href="https://github.com/jonmann20/Uneven" target="_blank" rel="noopener">Uneven &#8599;</a> (prototype)
					</li>
					<li class="lh">-Custom engine demos-</li>
					<li><a id="jons-quest">Jon&#700;s Quest</a></li>
					<li><a id="dungeon">Dungeon</a></li>
					<li><a id="dormanticide">Dormanticide</a> (prototype)</li>
					<li><a id="vamp">Vamp: The Great and Powerful</a> (prototype)</li>
					<li>
						<a href="https://github.com/jonmann20/Ray2d" target="_blank" rel="noopener">Ray2d &#8599;</a> (parallel game engine)
					</li>
					<li>
						<a href="https://github.com/jonmann20/EZGui" target="_blank" rel="noopener">EZGui &#8599;</a> (Unity utility library)
					</li>
				</ul>
			</div>
			<div class="col-right">
				<div id="div-default" class="card fade-in">
					<img src="/img/jon-and-timS.jpg" alt="Tim Schafer and Jon Wiedmann at PAX East 2014">
					<p class="caption">PAX East 2014 with Tim Schafer</p>
					<p>
						As a hobbyist Game Developer, I have created several game prototypes using technologies like Unity with C# and custom game engines in HTML<sub>5</sub> Canvas with Javascript or Dart.
						Unless otherwise noted, all audio, graphics, and develepment was handmade.
					</p>

				</div>
				<div id="div-jons-quest" class="card">
					<h2>Jon's Quest</h2>
					<p>A platformer game engine demo written in pure Javascript.</p>

					<img src="/games/common/img/player/playerDown.png" alt="hero" width="48" height="65">
					<img src="/games/common/img/player/playerUp.png" alt="hero" width="48" height="65">
					<img src="/games/common/img/player/playerRight_Run3.png" alt="hero" width="48" height="65">
					<img src="/games/jonsQuest/img/syringe.png" alt="syringe" width="25" height="25">
					<img src="/games/jonsQuest/img/cash.png" alt="cash" width="22" height="24">
					<img src="/games/jonsQuest/img/sack.png" alt="sack" width="30" height="36">
					<img src="/games/jonsQuest/img/shuriken.png" alt="shuriken" width="31" height="31">
					<img src="/games/jonsQuest/img/medKit.png" alt="medical kit" width="31" height="30">
					<img src="/games/jonsQuest/img/cyborgBnW.png" alt="cyborg" width="40" height="55">
					<img src="/games/jonsQuest/img/crate.png" alt="crate" width="34" height="37">

					<ul class="tech-used">
						<li class="lh">Tech used in making the game:</li>
						<li><a href="https://github.com/wjaguar/mtPaint" target="_blank" rel="noopener">mtPaint</a> &mdash; A pixel art application.</li>
						<li><a href="http://famitracker.com/" target="_blank" rel="noopener">FamiTracker</a> &mdash; A NES/Famicom music creation app.</li>
					</ul>

					<a class="big-btn" href="/games/jonsQuest">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/jonsQuest" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>
				<div id="div-dungeon" class="card">
					<h2>Dungeon</h2>
					<p>A top down RPG engine demo.</p>

					<img src="/games/dungeon/build/web/img/heart.png" alt="heart" width="9" height="9">
					<img src="/games/dungeon/build/web/img/stairsR.png" alt="stairs" width="40" height="40">
					<img src="/games/dungeon/build/web/img/wiseMan.png" alt="wise man" width="30" height="43">
					<img src="/games/dungeon/build/web/img/fish.png" alt="fish" width="69" height="40">
					<img src="/games/dungeon/build/web/img/sprites/items/sword/sword.png" alt="sword" width="24" height="24">
					<img src="/games/dungeon/build/web/img/sprites/items/device/device.png" alt="device" width="18" height="46">

					<ul class="tech-used">
						<li class="lh">Tech used in making the game:</li>
						<li><a href="https://github.com/wjaguar/mtPaint" target="_blank" rel="noopener">mtPaint</a> &mdash; A pixel art application.</li>
						<li><a href="https://www.dartlang.org" target="_blank" rel="noopener">Dart</a> &mdash; An intermediary language (created by google) which is then compiled into Javascript.</li>
					</ul>

					<a class="big-btn" href="/games/dungeon/build/web">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/dungeon" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>
				<div id="div-separate" class="card">
					<h2>Divide & Conquer</h2>
					<p>A space shooter with an atypical splitting mechanic.  Created at my first 48-hour Game Jam (see source code for collaborators).  We took 2nd place!</p>

					<img src="/games/common/img/separate/spray_powerup.png">
					<img src="/games/common/img/separate/chain_powerup.png">
					<img src="/games/common/img/separate/Enemy0.png">
					<img src="/games/common/img/separate/Enemy1.png">
					<img src="/games/common/img/separate/Enemy2.png">
					<img src="/games/common/img/separate/Enemy3.png">
					<img src="/games/common/img/separate/Player.png">
					<img src="/games/common/img/separate/shield_powerup.png">
					<img src="/games/common/img/separate/spaceshipBlue.png">
					<img src="/games/common/img/separate/spaceshipFull.png">
					<img src="/games/common/img/separate/spaceshipRed.png">
					<img src="/games/common/img/separate/speed_powerup.png">

					<img class="big-img" src="/img/game-jam14.jpg">

					<ul class="tech-used">
						<li class="lh">Tech used in making the game:</li>
						<li><a href="https://unity3d.com" target="_blank" rel="noopener">Unity</a></li>
						<li>C#</li>
						<li><a href="https://www.apple.com/mac/garageband" target="_blank" rel="noopener">Garage Band</a></li>
					</ul>

					<a class="big-btn" href="/games/separate">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/GameJam14" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>
				<div id="div-defend" class="card">
					<h2>Defend Thy Kingdom</h2>
					<p>A third person wave survival game about wizards.  This game was created as part of a four person team as a final project for EECS 494 - Computer Game Design at the University of Michigan - College of Engineering.</p>

					<img src="/img/defend-thy-kingdom.jpg">

					<p>
						<a class="big-btn" href="/games/defendThyKingdom/">
							<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
						</a>&nbsp;
						<a class="big-btn alt" href="https://github.com/jonmann20/WizardSurvival" target="_blank" rel="noopener" title="Source Code on Github">
							<i-con name="code" class="code"></i-con>Source Code &#8599;
						</a>
					</p>
				</div>
				<div id="div-blood-cell-brigade" class="card">
					<h2>Blood Cell Brigade</h2>
					<p>Created for the Intel Code for Good Game Jam in 40 hours.</p>

					<img class="big-img" src="/img/blood-cell-brigade-title.jpg">

					<ul class="tech-used">
						<li class="lh">Tech used in making the game:</li>
						<li><a href="https://unity3d.com" target="_blank" rel="noopener">Unity</a> &mdash; A game development engine.</li>
						<li>C#</li>
					</ul>

					<a class="big-btn" href="/games/bloodCellBrigade">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/IntelGameJamW14" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>
				<div id="div-deflection" class="card">
					<h2>Deflection</h2>
					<p>A one week class project prototype.</p>

					<ul class="tech-used">
						<li class="lh">Tech used in making the game:</li>
						<li><a href="https://unity3d.com" target="_blank" rel="noopener">Unity</a> &mdash; A game development engine.</li>
						<li>C#</li>
					</ul>

					<a class="big-btn" href="/games/deflection">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/Deflection" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>
				<div id="div-zelda" class="card">
					<h2>The Legend of Zelda: Reservanted</h2>
					<p>A class project with the help of <a href="mailto:ayarger@umich.edu" target="_blank">Austin Yarger</a>, remaking part of the original Legend of Zelda plus an original level.  Coming in at around 5,500 lines of code.  How did they ever fit this all on an NES cartridge? I'm guessing they had more than 3 weeks.</p>

					<ul class="tech-used">
						<li class="lh">Tech used in making the game:</li>
						<li><a href="https://unity3d.com" target="_blank" rel="noopener">Unity</a> &mdash; A game development engine.</li>
						<li>C#</li>
						<li>Sprites from <a href="http://www.spriters-resource.com/nes/thelegendofzelda/" target="_blank" rel="noopener">The Spriters Resource</a></li>
						<li>Overworld tilemap idea from <a href="http://inventwithpython.com/blog/2012/12/10/8-bit-nes-legend-of-zelda-map-data/" target="_blank" rel="noopener">Invent with Python Blog</a></li>
						<li>Audio from <a href="http://www.zeldadungeon.net/Zelda01-the-legend-of-zelda-soundtrack-music.php" target="_blank" rel="noopener">ZeldaDungeon.net</a> and <a href="http://www.sounds-resource.com/nes/legendofzelda/sound/598/" target="_blank" rel="noopener">The Sounds Resource</a></li>
					</ul>

					<p>Original game is copyrighted by Nintendo.</p>

					<a class="big-btn" href="/games/zeldaReservanted">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/ZeldaReservanted" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>
				<div id="div-dormanticide" class="card">
					<h2>Dormanticide</h2>
					<p>A battle simulator (very early in development).</p>

					<a class="big-btn" href="/games/dormanticide">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/dormanticide" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>
				<div id="div-vamp" class="card">
					<h2>Vamp: The Great and Powerful</h2>
					<p>A game about a vamprie with the ability to save your game (very early in development)</p>

					<a class="big-btn" href="/games/vamp">
						<i-con name="videogameAsset" class="videogame-asset"></i-con>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/vamp" target="_blank" rel="noopener" title="Source Code on Github">
						<i-con name="code" class="code"></i-con>Source Code &#8599;
					</a>
				</div>

				<!-- Show links without deails -->
				<div class="additional-links card">
					<h2>Additional Links</h2>
					<ul>
						<li class="lh">-Made with Unreal Engine 4-</li>
						<li><a href="https://github.com/ddolsen23/Unlit" target="_blank" rel="noopener">Unlit &#8599;</a></li>
						<li><a href="https://github.com/jonmann20/TigerWoods" target="_blank" rel="noopener">TigerWoods &#8599;</a> (prototype mobile game)</li>
						<li><a href="https://github.com/jonmann20/Uneven" target="_blank" rel="noopener">Uneven &#8599;</a> (prototype)</li>
						<li class="lh">-Custom engine demos-</li>
						<li><a href="https://github.com/jonmann20/Ray2d" target="_blank" rel="noopener">Ray2d &#8599;</a> (parallel game engine)</li>
						<li><a href="https://github.com/jonmann20/EZGui" target="_blank" rel="noopener">EZGui &#8599;</a> (Unity utility library)</li>
					</ul>
				</div>
			</div>
        `}})},23:function(t,e,n){"use strict";e.a=class{constructor(t,e){let n,a="default",i=Array.from(t.querySelectorAll("a"));e=e||document,i.forEach(t=>{t.addEventListener("click",t=>{(n=t.target.id)&&a!==n&&(t.preventDefault(),e.querySelector(`#div-${a}`).classList.remove("fade-in"),e.querySelector(`#div-${n}`).classList.add("fade-in"),a=n)})})}}}}]);