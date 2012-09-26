<? ob_start(); ?>

<div class="colL">
	<h2 class="musicHeader">Music - Trumpet</h2>

	<?php include_once('musicMaster.php'); ?>
	
	<!-- <h4>Listen to my students</h4> -->
	<!--<audio></audio>-->
	
</div>
<div class="colR noHeaderR">
<!-- 	<img src="../img/jonGuitar2.jpg" alt="me playing guitar" />  -->
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Trumpet - Music';
	  $pageRoot = '../';
	  
	  include_once($pageRoot . 'master.php');
?>