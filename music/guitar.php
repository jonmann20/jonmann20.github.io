<? ob_start(); ?>

<div class="colL">
	<h1 class="musicHeader">Music - Guitar</h1>
	<p>I have been playing guitar for the past <?= (date("Y") - 2002) ?> years.</p>

	<? include_once('musicNav.php'); ?>
	
	<?// <h4>Listen to my students</h4> ?>
	<?// <audio></audio> ?>

</div>
<div class="colR noHeaderR">
	<iframe width="440" height="360" src="http://www.youtube.com/embed/1Ogsbo8HF5U" frameborder="0" allowfullscreen></iframe>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Guitar | Music';
      $pageBodyClass = 'music';
	  $pageRoot = '../';
	  
	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>