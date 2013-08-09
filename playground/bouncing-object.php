<? ob_start(); ?>

<h2>Bouncing Object:</h2>

<div class="canvasWrap">
	<canvas>unsupported browser</canvas>
</div>


<a href='#' class='bigBtn'>
	Reset
</a>

<? /*
<div class='rangeInputs'>
	<div>
		<label>Size of Ball (radius): <span class='litSizeBalls'>3.5</span></label>
		<input type='range' value='3.5' min='0.5' step='0.5' max='50' class='sizeBalls' />
	</div>
	<div>
		<label>Speed of Ball: <span class='litSpeedBalls'>1</span></label>
		<input type='range' value='1' min='0.05' step='0.05' max='2.5' class='speedBalls' />
	</div>
</div>

*/?>


<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Bouncing Object | Games';
      $pageDescription = 'A canvas example showcasing a bouncing object.';
      $pageKeywords = 'canvas, html5';
	  $pageRoot = '../';
      $pageBodyClass = 'playground playInner nav6';
	  $pageJs = '<script src="/js/bouncingObj.js"></script>';
	  
	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>


