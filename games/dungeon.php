<? ob_start(); ?>

<div class="games">
	<h2>Dungeon:</h2>

	<div class="canvasWrap dungeon clr">
		<p>Under Contruction</p>
		
		<canvas width='720' height='180'>
			Your Browser Does Not Support Canvas =(. Try <a href="//www.google.com/intl/en/chrome/browser/">Google Chrome</a>
		</canvas>
	</div>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = "Dungeon - Games";
	  $pageRoot = '../';
      $pageBodyClass = 'games';
	  $pageJs = '
	  	<script src="../js/dungeon/main.js"></script>
	  ';
	  include_once($pageRoot . 'master.php');
?>
     