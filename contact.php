<?
	if(isset($_GET['sent']) && $_GET['sent'] == "yes")
		$sent = true;
	else 
		$sent = false;
	
	ob_start(); 
?>

<div class="colL contact">
	<h2>Contact Me</h2>

<? if(!$sent){ ?>
	<form action="controllers/contactController.php" method="post">
		<div>
			<label for="name">Name:</label>
			<input
				type="text" 
				value="<?= $name; ?>"
				name="name"
				class="required"
				placeholder="John Doe"
				x-webkit-speech
				autofocus
				required
			/>
		</div>
		<div>
			<label for="email">Email:</label>
			<input
				type="email"
				value="<?= $email; ?>"
				class="required email"
				name="email"
				placeholder="me@example.com"
				x-webkit-speech
				required
			/>
		</div>
		<div>
			<label for="msg">Message:</label>
			<textarea
				value="<?= $msg; ?>"
				name="msg"
				placeholder="I am interested in taking lessons."
				x-webkit-speech
				required
			></textarea>
		</div>
		<div>
			<label class="avail toggle">Availability: <span>(optional)</span></label>
			
			<div class='toggleShow'>
				<input type="checkbox" name="cbM" /> Monday<br />
				<input type="checkbox" name="cbT" /> Tuesday<br />
				<input type="checkbox" name="cbW" /> Wednesday<br />
				<input type="checkbox" name="cbR" /> Thursday<br />
				<input type="checkbox" name="cbF" /> Friday<br />
				<input type="checkbox" name="cbS" /> Saturday<br />
				<input type="checkbox" name="cbU" /> Sunday<br />
			</div>
		</div>
		<div class="clrB">
			<label>&nbsp;</label>
			<input type="submit" name="submit" value="Send" />
		</div>
	</form>

<?  } else { ?>
		<p>Thank you!</p>
<?  } ?>
</div>
<div class="colR noHeaderR">
	<img src="../img/jonPiano.jpg" alt="me playing piano" /> 
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Contact Me';
	  $pageDescription = 'A page enabling contact to Jon Wiedmann.';
      $pageKeywords = 'contact';
	  $pageRoot = '';
	  $pageJs = "
		  <script>
			$(function(){
					
				var blurItems = $('nav:first a');
					
				
			  	$('input[type=submit]').hover(function(){
			  		blurItems.css('-webkit-transition', 'all .4s ease-out');
			  		blurItems.css('-webkit-filter', 'blur(7px)');
			  	},function(){
			  		blurItems.css('-webkit-filter', 'blur(0)');
			  	});
			  	
				$('.toggle').click(function(){
					$('.toggleShow').slideToggle();
				});
			});
		  </script>
	  ";
	  
	  include_once($pageRoot . 'master.php');
?>