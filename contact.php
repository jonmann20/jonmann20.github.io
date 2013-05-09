<?
	if(isset($_GET['sent']) && $_GET['sent'] == "yes")
		$sent = true;
	else 
		$sent = false;
	
	// TODO: fix blah@att.net not working
	
	ob_start(); 
?>

<div class='colL contact'>
	<h2>Contact Me</h2>

<? if(!$sent){ ?>
	<form action='controllers/contactController.php' method='post'>
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
				<input type="checkbox" name="cbM" id="monday" /> <label for="monday">Monday</label><br />
				<input type="checkbox" name="cbT" id="tuesday" /> <label for="tuesday">Tuesday</label><br />
				<input type="checkbox" name="cbW" id="wednesday" /> <label for="wednesday">Wednesday</label><br />
				<input type="checkbox" name="cbR" id="thursday" /> <label for="thursday">Thursday</label><br />
				<input type="checkbox" name="cbF" id="friday" /> <label for="friday">Friday</label><br />
				<input type="checkbox" name="cbS" id="saturday" /> <label for="saturday">Saturday</label><br />
				<input type="checkbox" name="cbU" id="sunday" /> <label for="sunday">Sunday</label><br />
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
			  	$('input[type=submit]').hover(function(){
			  		$(this).css('-webkit-transition', 'all .45s ease-out');
			  		$(this).css('-webkit-filter', 'blur(3px)');
			  	},function(){
			  		$(this).css('-webkit-filter', 'blur(0)');
			  	});
			  	
				$('.toggle').click(function(){
					$('.toggleShow').slideToggle();
				});
			});
		  </script>
	  ";
	  
	  include_once($pageRoot . 'master.php');
?>