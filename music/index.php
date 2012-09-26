<? ob_start(); ?>

<div class="colL">
	<h2 class="noHeaderR">Music</h2>
	<p>Welcome Students &mdash; thank you for visiting.  If you would like more information regarding teaching rates please 
		<a href="../contact">contact me</a>.</p>
	
	<? include_once('musicMaster.php'); ?>
	
	<h4>My Experience:</h4>
	<p>I have been teaching for over 4 years.  I have taken collegiate level music theory, recording, and performance.</p>
</div>
<div class="colR noHeaderR">
	<img src="../img/jonGuitar.jpg" alt="me playing guitar" /> 
</div>
<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Music';
	  $pageRoot = '../';
      $pageBodyClass = 'musicHome';
	  
	  include_once($pageRoot . 'master.php');
?>