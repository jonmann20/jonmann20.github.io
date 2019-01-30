(window.webpackJsonp=window.webpackJsonp||[]).push([[10,4,5,6,7],{11:function(e,a,i){"use strict";i.r(a),i.d(a,"BLACK",function(){return n}),i.d(a,"BLUE",function(){return o}),i.d(a,"GREEN",function(){return l}),i.d(a,"WHITE",function(){return s}),i.d(a,"PURPLE",function(){return r}),i.d(a,"YELLOW",function(){return d}),i.d(a,"GRAY",function(){return c}),i.d(a,"RED",function(){return g});var t=i(23);const n=Object(t.d)("#2d2a2e"),o=Object(t.d)("#66d9ef"),l=Object(t.d)("#a6e22e"),s=Object(t.d)("#fcfcfa"),r=Object(t.d)("#ab9df2"),d=Object(t.d)("#ffd866"),c=Object(t.d)("#919091"),g=Object(t.d)("#ff6188")},12:function(e,a,i){"use strict";i.r(a);var t=i(23),n=i(11);a.default=t.b`
	:host {
		display: block;
	}

	* {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3 {
		margin: 0.4em 0 0.6em;
		font-size: 1.75em;
		font-weight: 300;
		color: ${n.WHITE};
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: ${n.BLUE};
		text-decoration: none;
		outline: none;
		cursor: pointer;
	}

	a:hover {
		color: #7ddff1;
		text-shadow: #7ddff1 0 0 6px;
	}

	a:active {
		color: #4fd3ed;
	}

	a:focus {
		outline: 0;
	}

	a[selected] {
		color: ${n.RED} !important;
	}

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	/* utils */

	.card {
		display: inline-block;
		background: ${n.BLACK};
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`},13:function(e,a,i){"use strict";i.r(a);var t=i(23);a.default=t.b`
	.col-left {
		min-width: 121px;
		width: 100%;
	}

	.col-left ul {
		font-size: 1.15em;
	}

	.col-right {
		margin-top: 25px;
		padding-bottom: 13px;
	}

	.col-right img {
		max-width: 100%;
	}

	.col-right > div {
		padding-bottom: 13px !important;
	}

	/* > mobile */
	@media (min-width: 801px) {
		.col-left {
			float: left;
			width: 46%;
			margin-right: 2%;
		}

		.col-right {
			float: right;
			width: 50%;
			margin-top: 0;
		}
	}

	/* tablet */
	@media (min-width: 801px) and (max-width: 1265px) {
		.col-left {
			width: 100%;
			margin-bottom: 0;
		}

		.col-right {
			width: 100%;
			margin-top: 25px;
		}
	}
`},14:function(e,a,i){"use strict";i.r(a);var t=i(23),n=i(11);a.default=t.b`
	:host {
		position: relative;
	}

	.big-btn {
		display: inline-block;
		margin: 10px auto;
		padding: 9px 14px;
		border-radius: 10px;
		font-weight: bold;
		font-size: 1.2em;
		background: rgba(107, 107, 107, 0.64);
		box-shadow: 0 3px 0 rgba(54, 54, 54, 0.94);
		opacity: 1;
		transition: all 0.19s;
		color: ${n.YELLOW};
	}

	.big-btn:hover,
	.big-btn:focus {
		color: ${n.YELLOW};
		box-shadow: 0 3px 0 ${n.YELLOW};
		text-shadow: none;
	}

	.big-btn:active {
		box-shadow: none !important;
		transform: translateY(3px);
	}

	.big-btn span {
		padding-right: 10px;
		vertical-align: -1px;
	}

	.col-left {
		display: none;
	}

	.col-right {
		margin-top: 0;
	}

	.col-right > div {
		opacity: 1;
		visibility: visible;
		transition: 450ms opacity;
		position: static;
		width: 100%;
		margin-bottom: 20px;
	}

	.col-right > div:last-child {
		margin-bottom: 100px;
	}

	.col-right > div.fade-in {
		opacity: 1 !important;
		visibility: visible !important;
		transition: 300ms opacity;
	}

	#div-default {
		display: none;
	}

	/* > mobile */
	@media (min-width: 801px) {
		ul {
			list-style-type: inherit;
			padding-left: 20px;
		}

		.col-left {
			display: block;
		}

		.col-right > div {
			opacity: 0;
			visibility: hidden;
			width: 44%;
			position: absolute;
			max-width: 728px;
		}

		.col-right > div:last-child {
			margin-bottom: 20px;
		}

		#div-default {
			display: block;
		}
	}

	/* tablet */
	@media (min-width: 801px) and (max-width: 1265px) {
		.col-right {
			margin-top: 25px;
		}

		.col-right > div {
			width: 100%;
			max-width: 490px;
		}
	}
`},17:function(e,a,i){"use strict";i.r(a);var t=i(23),n=i(12),o=i(13),l=i(14),s=i(25),r=i(11);customElements.define("page-games",class extends t.a{static get styles(){return[n.default,o.default,l.default,t.b`
				.lh {
					list-style-type: none;
					margin: 12px 0 8px;
					padding-left: 0;
					color: ${r.GRAY};
				}

				.caption {
					color: ${r.GRAY};
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
			`]}constructor(){super(),document.title="Games"}firstUpdated(){new s.a(this.shadowRoot.querySelector(".col-left ul"),this.shadowRoot)}render(){return t.c`
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
        `}})},25:function(e,a,i){"use strict";a.a=class{constructor(e,a){let i,t="default",n=Array.from(e.querySelectorAll("a"));a=a||document,n.forEach(e=>{e.addEventListener("click",e=>{(i=e.target.id)&&t!==i&&(e.preventDefault(),a.querySelector(`#div-${t}`).classList.remove("fade-in"),a.querySelector(`#div-${i}`).classList.add("fade-in"),t=i)})})}}}}]);