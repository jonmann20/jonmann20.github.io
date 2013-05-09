<? ob_start(); ?>

<h2>Ball Pit:</h2>

<div class="canvasWrap ballPit">
	<canvas>unsupported browser</canvas>
	
	<div class='rangeInputs'>
		<div>
			<label>Number of Balls: <span class='litNumBalls'>20</span></label>
			<input type='range' value='20' min='1' class='numBalls' />
		</div>
		<div>
			<label>Size of Balls (radius): <span class='litSizeBalls'>3.5</span></label>
			<input type='range' value='3.5' min='0.5' step='0.5' max='50' class='sizeBalls' />
		</div>
		<div>
			<label>Speed of Balls: <span class='litSpeedBalls'>1</span></label>
			<input type='range' value='1' min='0.05' step='0.05' max='2.5' class='speedBalls' />
		</div>
	</div>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Ball Pit | Games';
      $pageDescription = 'A canvas example showcasing a ball pit.';
      $pageKeywords = 'canvas, html5';
	  $pageRoot = '../';
      $pageBodyClass = 'playground playInner nav3';
	  $pageJs = '<script src="../js/ballPit.js"></script>';
	  
	  include_once($pageRoot . 'master.php');
?>