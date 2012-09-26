<? ob_start(); ?>

<div class="colL">
	<h2 class="musicHeader">Music - Voice</h2>

	<? include_once('musicMaster.php'); ?>
	
	<!-- <h4>Listen to my students</h4> -->
	<!--
	<audio controls="controls"> 
		<source src="audio/xxxx.mp3" type="audio/mpeg" />
  		Your browser does not support the audio element.
	</audio>-->
	

</div>
<div class="colR noHeaderR">
<!-- 	<img src="../img/jonGuitar2.jpg" alt="me playing guitar" />  -->
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Voice - Music';
	  $pageRoot = '../';
	  
	  include_once($pageRoot . 'master.php');
?>