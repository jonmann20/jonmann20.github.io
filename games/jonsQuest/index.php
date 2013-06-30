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
			<li><span class="keyAction">LEFT:</span> A</li>
			<li><span class="keyAction">RIGHT:</span> D</li>
			<li><span class="keyAction">THROW:</span> J</li>
			<li><span class="keyAction">JUMP:</span> K</li><br />
			<li class="audioSwitch">
				<span class="keyAction">
					AUDIO:
				</span>
				M .... <button class="audioState off">Off</button>
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
	$pageJs = '
		<script src="js/utils.js"></script>
		<script src="js/gameObject.js"></script>
		<script src="js/gameItem.js"></script>
		<script src="js/startScreen.js"></script>
	  	<script src="js/level/level.js"></script>
		<script src="js/level/level0.js"></script>
	  	<script src="js/game.js"></script>
	  	<script src="js/hero.js"></script>
	  	<script src="js/monster.js"></script>
	  	<script src="js/main.js"></script>
	  ';
     
    // $pageJs = '<script src="js/jonsQuest.min.js.gz"></script>';
      
      
	require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>
     