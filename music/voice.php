<? ob_start(); ?>

<div class="colL">
	<h2 class="musicHeader">Music - Voice</h2>
	<p>I have been singing (correctly) for the past <?= (date("Y") - 2009) ?> years.</p>

	<? include_once('musicNav.php'); ?>
	
	<?// <h4>Listen to my students</h4> ?>
	<?/*
	<audio controls="controls"> 
		<source src="audio/xxxx.mp3" type="audio/mpeg" />
  		Your browser does not support the audio element.
	</audio> */?>
	

</div>
<div class="colR noHeaderR">
    <?// <img src="../img/jonGuitar2.jpg" alt="me playing guitar" />  ?>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Voice | Music';
	  $pageBodyClass = 'music';
	  $pageRoot = '../';
	  
	  include_once($pageRoot . 'master.php');
?>