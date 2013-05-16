<? ob_start(); ?>

<div class="colL">
	<h2>Music</h2>
	<p>Welcome artists &mdash; thank you for visiting.  If you would like more information regarding teaching rates please 
		<a href="../contact">contact me</a>.</p>
	
	<? include_once('musicNav.php'); ?>
	
	<h4 class='subHead'>My Experience:</h4>
	<p>I have been teaching for over <?= (date("Y") - 2008) ?> years, and playing for over <?= (date("Y") - 1994) ?>.  I have taken collegiate level music theory, recording, and performance.</p>
</div>
<div class='colR noHeaderR'>
	<img src='../img/jonGuitar.jpg' alt='me playing guitar' /> 
</div>
<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Music';
	  $pageRoot = '../';
      $pageBodyClass = 'music musicHome';
	  
	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>