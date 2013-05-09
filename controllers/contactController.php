<?php
header('Location: ../contact.php?sent=yes');

if(isset($_POST['name'])){
	$name = $_POST['name'];
	$name = filter_var($name, FILTER_SANITIZE_STRING); 
}

if(isset($_POST['email'])){
	$email = $_POST['email'];
	$email = filter_var($email, FILTER_SANITIZE_EMAIL); 
}

if(isset($_POST['msg'])){
	$msg = $_POST['msg'];
	$msg = filter_var($msg, FILTER_SANITIZE_STRING); 
}

$avl = array(
	'Monday' => false,
	'Tuesday' => false,
	'Wednesday' => false,
	'Thursday' => false,
	'Friday' => false,
	'Saturday' => false,
	'Sunday' => false
);

if(isset($_POST['cbM'])){
	$avl['Monday'] = true;
}

if(isset($_POST['cbT'])){
	$avl['Tuesday'] = true;
}
if(isset($_POST['cbW'])){
	$avl['Wednesday'] = true;
}
if(isset($_POST['cbR'])){
	$avl['Thursday'] = true;
}
if(isset($_POST['cbF'])){
	$avl['Friday'] = true;
}
if(isset($_POST['cbS'])){
	$avl['Saturday'] = true;
}
if(isset($_POST['cbS'])){
	$avl['Sunday'] = true;
}
	

$headers = "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$message = "
	<p>Name: $name</p>
	<p>Availability:</p>
	<ul>
";

foreach ($avl as $k => $v) {
	if($v){
		$message .= "<li>$k</li>";
	}
}

$message .= "
	</ul>
	<p>$msg</p>
";


/*
echo "
	headers: $headers<br /><br /><br />
	message: $message
";
*/

mail('jonwiedmann@gmail.com', 'Contact Me', $message, $headers);

?>