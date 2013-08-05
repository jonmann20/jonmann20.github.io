<? ob_start(); ?>


<h1 class='blogTitle'>Blog</h1>

<article>
	
	<section>
		<h1>Coming Soon?</h1>
	</section>
	
	<!-- <section>
		<h1>Post Title</h1>
		<h2>Author: Jon Wiedmann</h2>
		<h3>Date: August 05, 2013</h3>
	</section>
	<section>
		<p>The first sentence is this.</p>
	</section> -->
</article>
 
<?
	$pageMainContent = ob_get_contents();
	ob_end_clean();
	  
	$pageTitle = 'Jon Wiedmann';
	$pageDescription = "Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability.  
	  		This site has information regarding my work experience and hobbies.";
    $pageKeywords = 'Web Developer, Jon Wiedmann, PHP, HTML5, CSS, jQuery, Javascript';
	$pageRoot = '../';
    $pageBodyClass = 'blog';
	$pageHeader = '<link rel="stylesheet" type="text/css" href="/css/blog.css" />';
	 
	$pageJs = "";
	  
	require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>