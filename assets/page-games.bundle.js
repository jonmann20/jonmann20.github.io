!function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=34)}({19:function(e,t,i){"use strict";i.d(t,"a",function(){return s});var n=i(7);const s=n["b"]`
	* {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3,
	h4 {
		margin: 0.4em 0 0.6em;
		font-size: 1.75em;
		font-weight: 300;
		color: #fcfcfa;
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: #66d9ef;
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

	button {
		transition: all 0.35s ease-out;
		cursor: pointer;
	}

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	iron-icon {
		display: inline-block;
		width: 24px;
	}

	.card {
		display: inline-block;
		background: #2d2a2e;
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}

	.caption {
		color: #919091;
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
		color: #ffd866;
	}

	.big-btn:hover,
	.big-btn:focus {
		color: #ffd866;
		box-shadow: 0 3px 0 #ffd866;
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

	.carousel-list-page .col-left {
		display: none;
	}

	.carousel-list-page .col-right {
		margin-top: 0;
	}

	.carousel-list-page .col-right > div {
		opacity: 1;
		visibility: visible;
		transition: 450ms opacity;
		position: static;
		width: 100%;
		margin-bottom: 20px;
	}

	.carousel-list-page .col-right > div:last-child {
		margin-bottom: 100px;
	}

	.carousel-list-page .col-right > div.fade-in {
		opacity: 1 !important;
		visibility: visible !important;
		transition: 300ms opacity;
	}

	#div-default {
		display: none;
	}

	/* > mobile */
	@media (min-width: 458px) {
		#div-default {
			display: block;
		}
	}

/*
@media (min-width: 801px) {
	.col-left {
		float: left;
		width: 37%;
	}

	.col-right {
		float: right;
		width: 58%;
		margin-top: 0;
	}

	.carousel-list-page .col-left {
		display: block;
	}

	.carousel-list-page .col-right > div {
		opacity: 0;
		visibility: hidden;
		width: 44%;
		position: absolute;
		max-width: 728px;
	}

	.carousel-list-page .col-right > div:last-child {
		margin-bottom: 20px;
	}
}

@media (min-width: 801px) and (max-width: 1265px) {
	.col-left {
		width: 100%;
		margin-bottom: 0;
	}

	.col-right {
		width: 100%;
		margin-top: 25px;
	}

	.carousel-list-page .col-right {
		margin-top: 25px;
	}

	.carousel-list-page .col-right > div {
		width: 100%;
		max-width: 490px;
	}
}
*/
`},34:function(e,t,i){"use strict";i.r(t);var n=i(7),s=i(19);customElements.define("page-games",class extends n.a{constructor(){super(),document.title="Games",document.body.classList.add("games","carousel-list-page")}firstUpdated(){Util.require("/assets/listCarousel.js").then(()=>{new ListCarousel(this.shadowRoot.querySelector(".col-left ul"),this.shadowRoot)})}render(){return n["b"]`
			<style>
				${s.a}

				:host {
					display: block;
				}

				.lh {
					list-style-type: none;
					margin: 12px 0 8px;
					padding-left: 0;
					color: #919091;
				}

				.col-right iron-icon[icon="i:videogame-asset"],
				.col-right iron-icon[icon="i:code"] {
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
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/jonsQuest" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
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
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/dungeon" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
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
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/GameJam14" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
					</a>
				</div>
				<div id="div-defend" class="card">
					<h2>Defend Thy Kingdom</h2>
					<p>A third person wave survival game about wizards.  This game was created as part of a four person team as a final project for EECS 494 - Computer Game Design at the University of Michigan - College of Engineering.</p>

					<img src="/img/defend-thy-kingdom.jpg">

					<p>
						<a class="big-btn" href="/games/defendThyKingdom/">
							<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
						</a>&nbsp;
						<a class="big-btn alt" href="https://github.com/jonmann20/WizardSurvival" target="_blank" rel="noopener" title="Source Code on Github">
							<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
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
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/IntelGameJamW14" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
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
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/Deflection" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
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
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/ZeldaReservanted" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
					</a>
				</div>
				<div id="div-dormanticide" class="card">
					<h2>Dormanticide</h2>
					<p>A battle simulator (very early in development).</p>

					<a class="big-btn" href="/games/dormanticide">
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/dormanticide" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
					</a>
				</div>
				<div id="div-vamp" class="card">
					<h2>Vamp: The Great and Powerful</h2>
					<p>A game about a vamprie with the ability to save your game (very early in development)</p>

					<a class="big-btn" href="/games/vamp">
						<iron-icon icon="i:videogame-asset"></iron-icon>Play Game
					</a>&nbsp;
					<a class="big-btn alt" href="https://github.com/jonmann20/jonmann20.github.com/tree/master/games/vamp" target="_blank" rel="noopener" title="Source Code on Github">
						<iron-icon icon="i:code"></iron-icon>Source Code &#8599;
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
        `}})},7:function(e,t,i){"use strict";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const n=new WeakMap,s=e=>"function"==typeof e&&n.has(e),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(e,t,i=null)=>{let n=t;for(;n!==i;){const t=n.nextSibling;e.removeChild(n),n=t}},r={},l={},d=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${d}--\x3e`,h=new RegExp(`${d}|${c}`),p="$lit$";class u{constructor(e,t){this.parts=[],this.element=t;let i=-1,n=0;const s=[],o=t=>{const a=t.content,r=document.createTreeWalker(a,133,null,!1);let l=0;for(;r.nextNode();){i++;const t=r.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const s=t.attributes;let o=0;for(let e=0;e<s.length;e++)s[e].value.indexOf(d)>=0&&o++;for(;o-- >0;){const s=e.strings[n],o=f.exec(s)[2],a=o.toLowerCase()+p,r=t.getAttribute(a).split(h);this.parts.push({type:"attribute",index:i,name:o,strings:r}),t.removeAttribute(a),n+=r.length-1}}"TEMPLATE"===t.tagName&&o(t)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(d)>=0){const o=t.parentNode,a=e.split(h),r=a.length-1;for(let e=0;e<r;e++)o.insertBefore(""===a[e]?g():document.createTextNode(a[e]),t),this.parts.push({type:"node",index:++i});""===a[r]?(o.insertBefore(g(),t),s.push(t)):t.data=a[r],n+=r}}else if(8===t.nodeType)if(t.data===d){const e=t.parentNode;null!==t.previousSibling&&i!==l||(i++,e.insertBefore(g(),t)),l=i,this.parts.push({type:"node",index:i}),null===t.nextSibling?t.data="":(s.push(t),i--),n++}else{let e=-1;for(;-1!==(e=t.data.indexOf(d,e+1));)this.parts.push({type:"node",index:-1})}}};o(t);for(const e of s)e.parentNode.removeChild(e)}}const m=e=>-1!==e.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class b{constructor(e,t,i){this._parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this._parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let i=0,n=0;const s=e=>{const o=document.createTreeWalker(e,133,null,!1);let a=o.nextNode();for(;i<t.length&&null!==a;){const e=t[i];if(m(e))if(n===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(a,e.name,e.strings,this.options));i++}else n++,"TEMPLATE"===a.nodeName&&s(a.content),a=o.nextNode();else this._parts.push(void 0),i++}};return s(e),o&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class y{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="";for(let i=0;i<e;i++){const e=this.strings[i],n=f.exec(e);t+=n?e.substr(0,n.index)+n[1]+n[2]+p+n[3]+d:e+c}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const v=e=>null===e||!("object"==typeof e||"function"==typeof e);class _{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new w(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let n=0;n<t;n++){i+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)i+="string"==typeof t?t:String(t);else i+="string"==typeof e?e:String(e)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===r||v(e)&&e===this.value||(this.value=e,s(e)||(this.committer.dirty=!0))}commit(){for(;s(this.value);){const e=this.value;this.value=r,e(this)}this.value!==r&&this.committer.commit()}}class S{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(g()),this.endNode=e.appendChild(g())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=g()),e._insert(this.endNode=g())}insertAfterPart(e){e._insert(this.startNode=g()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;s(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}const e=this._pendingValue;e!==r&&(v(e)?e!==this.value&&this._commitText(e):e instanceof y?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):e===l?(this.value=l,this.clear()):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const i=new b(t,e.processor,this.options),n=i._clone();i.update(e.values),this._commitNode(n),this.value=i}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const s of e)void 0===(i=t[n])&&(i=new S(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(s),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){a(this.startNode.parentNode,e.nextSibling,this.endNode)}}class x{constructor(e,t,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this._pendingValue=e}commit(){for(;s(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}if(this._pendingValue===r)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=r}}class P extends _{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends w{}let k=!1;try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class A{constructor(e,t,i){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this._boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this._pendingValue=e}commit(){for(;s(this._pendingValue);){const e=this._pendingValue;this._pendingValue=r,e(this)}if(this._pendingValue===r)return;const e=this._pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=T(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=r}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const T=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const j=new class{handleAttributeExpressions(e,t,i,n){const s=t[0];return"."===s?new P(e,t.slice(1),i).parts:"@"===s?[new A(e,t.slice(1),n.eventContext)]:"?"===s?[new x(e,t.slice(1),i)]:new _(e,t,i).parts}handleTextExpression(e){return new S(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function N(e){let t=E.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},E.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(d);return void 0===(i=t.keyString.get(n))&&(i=new u(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const E=new Map,U=new WeakMap,R=(e,...t)=>new y(e,t,"html",j),O=133;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function V(e,t){const{element:{content:i},parts:n}=e,s=document.createTreeWalker(i,O,null,!1);let o=M(n),a=n[o],r=-1,l=0;const d=[];let c=null;for(;s.nextNode();){r++;const e=s.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==a&&a.index===r;)a.index=null!==c?-1:a.index-l,a=n[o=M(n,o)]}d.forEach(e=>e.parentNode.removeChild(e))}const G=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,O,null,!1);for(;i.nextNode();)t++;return t},M=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(m(t))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const z=(e,t)=>`${e}--${t}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),q=!1);const D=["html","svg"],L=new Set,W=(e,t,i)=>{L.add(i);const n=e.querySelectorAll("style");if(0===n.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,i);const s=document.createElement("style");for(let e=0;e<n.length;e++){const t=n[e];t.parentNode.removeChild(t),s.textContent+=t.textContent}if((e=>{D.forEach(t=>{const i=E.get(z(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),V(e,i)})})})(i),function(e,t,i=null){const{element:{content:n},parts:s}=e;if(null==i)return void n.appendChild(t);const o=document.createTreeWalker(n,O,null,!1);let a=M(s),r=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(r=G(t),i.parentNode.insertBefore(t,i));-1!==a&&s[a].index===l;){if(r>0){for(;-1!==a;)s[a].index+=r,a=M(s,a);return}a=M(s,a)}}(t,s,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,i),window.ShadyCSS.nativeShadow){const i=t.element.content.querySelector("style");e.insertBefore(i.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(s,t.element.content.firstChild);const e=new Set;e.add(s),V(t,e)}},B=(e,t)=>e,F=(e,t)=>{if(e in t)for(;t!==Object.prototype;){if(t.hasOwnProperty(e))return Object.getOwnPropertyDescriptor(t,e);t=Object.getPrototypeOf(t)}},I={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},J=(e,t)=>t!==e&&(t==t||e==e),H={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:J},Q=Promise.resolve(!0),$=1,Z=4,K=8,X=16,Y=32;class ee extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=Q,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const e=[];for(const[t,i]of this._classProperties){const n=this._attributeNameForProperty(t,i);void 0!==n&&(this._attributeToPropertyMap.set(n,t),e.push(n))}return e}static _ensureClassProperties(){if(!this.hasOwnProperty(B("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=H){if(this._ensureClassProperties(),this._classProperties.set(e,t),!t.noAccessor){const t=F(e,this.prototype);let i;if(void 0!==t&&t.set&&t.get){const{set:n,get:s}=t;i={get(){return s.call(this)},set(t){const i=this[e];n.call(this,t),this.requestUpdate(e,i)},configurable:!0,enumerable:!0}}else{const t="symbol"==typeof e?Symbol():`__${e}`;i={get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdate(e,n)},configurable:!0,enumerable:!0}}Object.defineProperty(this.prototype,e,i)}}static _finalize(){if(this.hasOwnProperty(B("finalized",this))&&this.finalized)return;const e=Object.getPrototypeOf(this);if("function"==typeof e._finalize&&e._finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(B("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=J){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||I,s="function"==typeof n?n:n.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||I.toAttribute)(e,i)}initialize(){this._saveInstanceProperties()}_saveInstanceProperties(){for(const[e]of this.constructor._classProperties)if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}_applyInstanceProperties(){for(const[e,t]of this._instanceProperties)this[e]=t;this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Y,this._hasConnectedResolver?(this._hasConnectedResolver(),this._hasConnectedResolver=void 0):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=H){const n=this.constructor,s=n._attributeNameForProperty(e,i);if(void 0!==s){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=this._updateState|K,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=this._updateState&~K}}_attributeToProperty(e,t){if(this._updateState&K)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i._classProperties.get(n)||H;this._updateState=this._updateState|X,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~X}}requestUpdate(e,t){let i=!0;if(void 0!==e&&!this._changedProperties.has(e)){const n=this.constructor,s=n._classProperties.get(e)||H;n._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.set(e,t),!0!==s.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}return!this._hasRequestedUpdate&&i&&this._enqueueUpdate(),this.updateComplete}async _enqueueUpdate(){let e;this._updateState=this._updateState|Z;const t=this._updatePromise;this._updatePromise=new Promise(t=>e=t),await t,this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);const i=this.performUpdate();null!=i&&"function"==typeof i.then&&await i,e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Y}get _hasRequestedUpdate(){return this._updateState&Z}get hasUpdated(){return this._updateState&$}performUpdate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const e=this._changedProperties;this.update(e),this._markUpdated(),this._updateState&$||(this._updateState=this._updateState|$,this.firstUpdated(e)),this.updated(e)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Z}get updateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[e,t]of this._reflectingProperties)this._propertyToAttribute(e,this[e],t);this._reflectingProperties=void 0}}updated(e){}firstUpdated(e){}}ee.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
ne((e,t)=>e.querySelector(t)),ne((e,t)=>e.querySelectorAll(t));const te=(e,t,i)=>{Object.defineProperty(t,i,e)},ie=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e});function ne(e){return t=>(i,n)=>{const s={get(){return e(this.renderRoot,t)},enumerable:!0,configurable:!0};return void 0!==n?te(s,i,n):ie(s,i)}}const se="adoptedStyleSheets"in Document.prototype;i.d(t,"a",function(){return oe}),i.d(t,"b",function(){return R});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class oe extends ee{static get styles(){return[]}static get _uniqueStyles(){if(void 0===this._styles){const e=this.styles.reduceRight((e,t)=>(e.add(t),e),new Set);this._styles=[],e.forEach(e=>this._styles.unshift(e))}return this._styles}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._uniqueStyles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?se?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._uniqueStyles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}oe.finalized=!0,oe.render=((e,t,i)=>{const n=i.scopeName,s=U.has(t),o=t instanceof ShadowRoot&&q&&e instanceof y,r=o&&!L.has(n),l=r?document.createDocumentFragment():t;if(((e,t,i)=>{let n=U.get(t);void 0===n&&(a(t,t.firstChild),U.set(t,n=new S(Object.assign({templateFactory:N},i))),n.appendInto(t)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:(e=>t=>{const i=z(t.type,e);let n=E.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},E.set(i,n));let s=n.stringsArray.get(t.strings);if(void 0!==s)return s;const o=t.strings.join(d);if(void 0===(s=n.keyString.get(o))){const i=t.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,e),s=new u(t,i),n.keyString.set(o,s)}return n.stringsArray.set(t.strings,s),s})(n)},i)),r){const e=U.get(l);U.delete(l),e.value instanceof b&&W(l,e.value.template,n),a(t,t.firstChild),t.appendChild(l),U.set(t,e)}!s&&o&&window.ShadyCSS.styleElement(t.host)})}});