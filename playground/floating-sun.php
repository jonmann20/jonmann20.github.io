<? ob_start(); ?>

<h2>Floating Sun:</h2>

<div class="canvasWrap floatingSun">
    <canvas>unsupported browser</canvas>
</div>

<div class='rangeInputs'>
	<?/*<div>
		<label>Add a Ball:</label>
		<input type='range' value='20' class='numBalls' />
	</div>*/?>
	<div>
		<label>Diffusion Rate [0,1]: <span class='litDiffusion'>0.18</span></label>
		<input type='range' value='0.18' step='0.01' max='1' class='diffusionRate' />
	</div>
</div>

<?
      $pageMainContent = ob_get_contents();
      ob_end_clean();
      
      $pageTitle = 'Floating Sun | Games';
      $pageDescription = 'A canvas example showcasing a computer graphics simulation.';
      $pageKeywords = 'canvas, html5, computer graphics';
      $pageRoot = '../';
      $pageBodyClass = 'playground playInner nav4';
      $pageJs = '<script src="../js/computerGraphics/web/computergraphics.dart.js"></script>';
      
      include_once($pageRoot . 'master.php');
?>