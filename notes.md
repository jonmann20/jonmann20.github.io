Filtering Search
================
-dungeon, -font, -dist, -*.map, -games/common/img/sprites/player/player.tps, -games/common/js/physics/SAT.js, -games/jonsQuest/img/sprites/player/player.tps, -games/jonsQuest/node_modules

Node
----
nvm ls-remote
nvm install x.x.x
nvm use x.x.x
nvm alias default x.x.x

npm i -g npm

Other
-------
* [2d-hero art](http://opengameart.org/content/2d-hero)
* Theme inspiration: https://www.monokai.nl

Vars
----
```scss
// Monakai theme
$black: #2d2a2e;
$blue: #66d9ef;
$green: #a6e22e;
$white: #fcfcfa;
$red: #ff6188;
$purple: #ab9df2;
$yellow: #ffd866;
$gray: #919091;

$html-background: darken($black, 6%);
$card-background: $black;
$txt-color: $white;
$link-color: $blue;
$link-color-hover: lighten($link-color, 5%);
$link-color-active: darken($link-color, 5%);
$nav-link-color: $yellow;
$nav-link-active-color: $red;
$header-txt-color: $white;

@mixin desktop {
	@media (min-width: 801px) {
		@content;
	}
}

@mixin tablet {
	@media (min-width: 801px) and (max-width: 1265px) {
		@content;
	}
}
```