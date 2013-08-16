<? ob_start(); ?>

<div class="colL">
	<h2 class="musicHeader">Music - Trumpet</h2>
    <p>I have been playing trumpet for the past <?= (date("Y") - 1998) ?> years.</p>
    
	<?php include_once('musicNav.php'); ?>
	
    <?// <h4>Listen to my students</h4> ?>
    <?// <audio></audio> ?>
	
</div>
<div class='colR noHeaderR'>
    <?// <img src='../img/trumpet.jpg' alt='trumpet' /> ?>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Trumpet | Music';
      $pageBodyClass = 'music trumpet';
	  $pageRoot = '../';
	  
	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>