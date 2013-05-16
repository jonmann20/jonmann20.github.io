<? ob_start(); ?>

<div class="colL">
	<h2 class="musicHeader">Music - Piano</h2>
    <p>I have been playing piano for the past <?= (date("Y") - 1994) ?> years.</p>
    
	<? include_once('musicNav.php'); ?>
	
    <?// <h4>Listen to my students</h4> ?>
    <?// <audio></audio> ?>
	
</div>
<div class="colR noHeaderR">
	<img src="../img/jonPiano.jpg" alt="me playing piano" /> 
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Piano | Music';
      $pageBodyClass = 'music';
	  $pageRoot = '../';
	  
	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>