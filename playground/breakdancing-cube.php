<? ob_start(); ?>

<h2>Breakdancing Cube:</h2>

<section class="container">
  <div id="cube" class="animate">
        <div><span>Code</span></div>
        <div><span class='long'>Wiedmann</span></div>
        <div><span>.com</span></div>
        <div><span>Games</span></div>
        <div><span>Music</span></div>
        <div><span>Jon</span></div>
   </div>
</section>

<div class='iframeWrap'>
	<iframe width="300" height="410" style="position: relative; display: block; width: 300px; height: 410px;" src="http://bandcamp.com/EmbeddedPlayer/v=2/album=1886256771/size=grande3/bgcol=FFFFFF/linkcol=5dafd7/transparent=true/" allowtransparency="true" frameborder="0"><a href="http://billkiley.bandcamp.com/album/your-soundtrack-for-becoming-invisible-in-a-crowd-of-strange-people">Your Soundtrack for Becoming Invisible in a Crowd of Strange People by Bill Kiley</a></iframe>
</div>

<?
      $pageMainContent = ob_get_contents();
      ob_end_clean();
      
      $pageTitle = 'Breakdancing Cube | Games';
      $pageDescription = 'Pure CSS3 animation demo.';
      $pageKeywords = 'CSS3, HTML5';
      $pageRoot = '../';
      $pageBodyClass = 'playground playInner bDancingCube nav1';
      $pageJs = '
      <script>
  			$(function() {
			    $("#cube").click(function(e){
			       e.preventDefault(); 
			    });
			});
	  </script>
      ';
      
      include_once($pageRoot . 'master.php');
?>