<? ob_start(); ?>

<div class="colL">
	<h2 class="musicHeader">Music - Piano</h2>

	<? include_once('musicMaster.php'); ?>
	
	<!-- <h4>Listen to my students</h4> -->
	<!--<audio></audio>-->
	

</div>
<div class="colR noHeaderR">
	<img src="../img/jonPiano.jpg" alt="me playing piano" /> 
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Piano - Music';
	  $pageRoot = '../';
	  
	  include_once($pageRoot . 'master.php');
?>