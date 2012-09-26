<? ob_start(); ?>

<div class="colL">
	<h2>Games</h2>
	<ul>
		<li><a href="jonsQuest" id="jonsQuest">Jon&#700;s Quest</a></li>
		<li><a href="dungeon" id="dungeon">Dungeon</a></li>
	</ul>
</div>
<div class="colR">
	<div id="divDefault">
		<h3>Find Out More</h3>
		<p>Hover over the links to find out more.</p>
	</div>
		<div id="divJonsQuest">
		<h5>Jon&#700;s Quest</h5>
		<p>A simple game example</p>
		<!--<a href="jonsQuest"><img src="../img/jonsQuest.jpg" alt="Jons Quest" /></a>-->
	</div>
	<div id="divDungeon">
		<h3>Dungeon</h3>
		<p>Code focused on Object Oriented Javascript.</p>
		<!--<a href="stars"><img src="../img/stars.jpg" alt="Starry Background" /></a>-->
	</div>
</div> 

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Games';
	  $pageRoot = '../';
	  $pageBodyClass = 'absHover';
	  $pageJs = '
		<script src="../js/jquery.hoverIntent.min.js"></script>
		<script async defer>
			$(function() {
				
				var active = "Default";
				
				function hideOld(name){
					if(active != name){
						$("#div" + active).fadeOut(250);
						$("#div" + name).fadeIn(250);
					}
				};
				
				function keepNew(name){
					active = name;
				};
				
				$("#jonsQuest").hoverIntent({
					over: function(){
		         		hideOld("JonsQuest");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("JonsQuest");
		      		}
				});
				
				$("#dungeon").hoverIntent({
					over: function(){
		         		hideOld("Dungeon");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("Dungeon");
		      		}
				});
				
			});
		
		</script> 
	';
	  include_once($pageRoot . 'master.php');
?>