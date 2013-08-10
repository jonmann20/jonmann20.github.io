<? ob_start(); ?>

<div class='canvasWrap clr'>
	<canvas>
		Your Browser Does Not Support Canvas =(. Try <a href='//www.google.com/intl/en/chrome/browser/'>Google Chrome</a>
	</canvas>
</div>
<div class="debug"></div>

<? 
	$pageGameInstructions = '
		<h1 class="titleHeader">Jon&#700;s Quest</h1>
		<h2>Instructions</h2>
		<ul class="goals">
			<li><span>GOAL:</span> Become the world\'s most powerful ninja.</li>
		</ul>
		<ul>
			<li><span class="keyAction">A:</span> LEFT</li>
			<li><span class="keyAction">D:</span> RIGHT</li><br />
			<li><span class="keyAction">J:</span> THROW</li>
			<li><span class="keyAction">K:</span> JUMP</li>
			<li><span class="keyAction">SPACE</span> DROP</li><br />
			<li><span class="keyAction">H:</span> HEAL</li>
			<li><span class="keyAction">R:</span> RESTORE</li><br />
			<li class="audioSwitch">
				<span class="keyAction">M:</span>
				Audio .... <button class="audioState off"><span aria-hidden="true" class="icon-volume-mute"></span> </button>
			</li>
		</ul>
	';
	$pageMainContent = ob_get_contents();
	ob_end_clean();
	  
	$pageFullWidth = true;
    $pageBack = 'games';
	  
	$pageTitle = "Jon&rsquo;s Quest | Games";
	$pageRoot = '../../';
    $pageBodyClass = 'games pageFullW jonsQuest';
	$pageHeader = '<link rel="stylesheet" type="text/css" href="css/jonsQuest.css" />';
	
	$pageJs = defined('STDIN') ?
				'<script src="/js/min/jonsQuest.js"></script>' :

				'<script src="js/utils.js"></script>
				<script src="js/gameObject.js"></script>
				<script src="js/gameItem.js"></script>
				<script src="js/enemy/enemy.js"></script>
				<script src="js/startScreen.js"></script>
				<script src="js/input.js"></script>
			  	<script src="js/level/level.js"></script>
				<script src="js/level/level0.js"></script>
			  	<script src="js/game.js"></script>
			  	<script src="js/hero.js"></script>
			  	<script src="js/main.js"></script>
	';
     
	require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>
     