<? ob_start(); ?>

<div class="colL">
	<h1 class="musicHeader">Music - Guitar</h1>

	<? include_once('musicMaster.php'); ?>
	
	<!-- <h4>Listen to my students</h4> -->
	<!--<audio></audio>-->

</div>
<div class="colR noHeaderR">
	<iframe width="440" height="360" src="http://www.youtube.com/embed/1Ogsbo8HF5U" frameborder="0" allowfullscreen></iframe>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Guitar - Music';
	  $pageRoot = '../';
	  
	  include_once($pageRoot . 'master.php');
?>