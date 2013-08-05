<? ob_start(); ?>

<div class="colL">
	<h2>Games</h2>
    <ul>
        <li>
        	<a href="jonsQuest" id="jonsQuest">
        		Jon&#700;s Quest
    		</a>
    	</li>
        <li>
        	<a href="dungeon" id="dungeon">
        		Dungeon
    		</a>
    	</li>
        <li>
        	<a href="//github.com/jkotzian/Interactive-Platformer" target='_blank' id="interactive">
        		Interactive Platformer
    		</a>
    	</li>
    </ul>
</div>
<div class="colR">
	<div id="divDefault">
		<h3>Discover More</h3>
		<p>Hover over the links to find out more.</p>
	</div>
	<div id="divJonsQuest">
		<h5>Jon&#700;s Quest</h5>
		<p>A platformer game engine demo written in pure Javascript.</p>
		
		<a href='jonsQuest/' class='opaque' id='jonsQuest'>
    		<img src='jonsQuest/img/player.png' alt='hero sprite' />
    		<img src='jonsQuest/img/monster.gif' alt='monster' />
    		<img src='jonsQuest/img/syringe.png' alt='syringe' />
    		<img src='jonsQuest/img/cash.png' alt='cash' />
    		<img src='jonsQuest/img/sack.png' alt='sack' />
    		<img src='jonsQuest/img/shuriken.png' alt='shuriken' />
    		<img src='jonsQuest/img/medKit.png' alt='medical kit' />
		</a>
		
		<ul class='techUsed'>
			<li class='lh'>Tech used in making the game:</li>
			<li><a href='https://github.com/wjaguar/mtPaint' target='_blank'>mtPaint</a> &mdash; A pixel art application.</li>
			<li><a href='http://www.aptana.com/products/studio3' target='_blank'>Aptana Studio 3</a> &mdash; A web IDE.</li>
		</ul>
		
		<a class='bigBtn' href='https://github.com/jonmann20/jonmann20.github.com/tree/master/games/jonsQuest' target="_blank" title='Source Code on Github'>
			<span aria-hidden='true' class='icon-github'></span>Source Code 
		</a>
	</div>
	<div id="divDungeon">
		<h3>Dungeon</h3>
		<p>A top down RPG.</p>
		
		<a href='dungeon'>
			<img src='../img/playerBig.png' alt='Dungeon player' />
		</a>
		
		<ul class='techUsed'>
			<li class='lh'>Tech used in making the game:</li>
			<li><a href='https://github.com/wjaguar/mtPaint' target='_blank'>mtPaint</a> &mdash; A pixel art application.</li>
			<li><a href='//www.dartlang.org/' target='_blank'>Dart</a> &mdash; An intermediary language (created by google) which is then compiled into Javascript.</li>
		</ul>
		
		<a class='bigBtn' href='https://github.com/jonmann20/jonmann20.github.com/tree/master/games/dungeon' target="_blank" title='Source Code on Github'>
			<span aria-hidden='true' class='icon-github'></span>Source Code 
		</a>
	</div>
	<div id="divInteractive">
	    <h3>Interactive Platformer</h3>
	    <p>Currently in development with my student organization group <a href='//www.wolverinesoft.org/member/jonwied' target='_blank'>Wolverine Soft</a>.</p>
	    <a href='//github.com/jkotzian/Interactive-Platformer' class='opaque' target='_blank'>
	        <img src="../img/characterConcepts1.jpg" alt="Interactive Platformer" />
	    </a>
	    
	    <a class='bigBtn' href='//github.com/jkotzian/Interactive-Platformer' target="_blank" title='Source Code on Github'>
			<span aria-hidden='true' class='icon-github'></span>Source Code 
		</a>
	</div>
</div> 

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Games';
      $pageDescription = 'Simple Javascript and HTML5 canvas games.';
      $pageKeywords = 'Video Game Developer, Jon Wiedmann, jQuery, Javascript, canvas, HTML5 game, dart';
	  $pageRoot = '../';
	  $pageBodyClass = 'absHover games';
	  $pageJs = '
		<script src="/js/plugins/jquery.hoverIntent.min.js"></script>
		<script src="/js/plugins/jquery.hoverCarousel.js"></script>
		<script>
			$(function(){
				$(".colL ul").hoverCarousel();
			})
		</script>
	';
	 
	 require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>