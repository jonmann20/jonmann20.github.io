<? ob_start(); ?>

<div class='canvasWrap dungeon'>
	<canvas class='preTransition'>
		Your Browser Does Not Support HTML<sub>5</sub> Canvas =(. Try <a href='//www.google.com/intl/en/chrome/browser/'>Google Chrome</a>
	</canvas>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = "Dungeon - Games";
	  $pageDescription = 'A top down RPG built for the web with original pixel art.';
	  $pageKeywords = 'dart js canvas html5 css3 RPG pixel art';
	  $pageRoot = '../';
      $pageBodyClass = 'games dungeon';
	  $pageJs = '<script src="../js/dungeon/web/dungeon.dart.js"></script>';
	  
	  require_once('gamesMaster.php');
?>
     
