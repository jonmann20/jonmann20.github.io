<? ob_start(); ?>

<h2>Bouncing Object:</h2>

<div class="canvasWrap">
	<canvas>unsupported browser</canvas>
</div>

<div>
	<a href='#' class='bigBtn'>
		Reset
	</a>
</div>


<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Bouncing Object | Games';
      $pageDescription = 'A canvas example showcasing a bouncing object.';
      $pageKeywords = 'canvas, html5';
	  $pageRoot = '../';
      $pageBodyClass = 'playground playInner nav6';
	  $pageJs = '<script src="../js/bouncingObj.js"></script>';
	  
	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>


