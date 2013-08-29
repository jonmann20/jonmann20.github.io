#--- notes
#
#  run in powershell with:
#         ./build.ps1 <arg(s)>

#--- globals
$path = "C:\git\jonmann20.github.com\"
$yuiJar = "${path}bin\yuicompressor-2.4.8.jar"


#--- combines /index.html css includes
function compressCSS() {
	echo "----- Compressing CSS -----";
	$absCssFiles = @();  #empty array
	
    $cssFiles = "normalize.css", "overrideUtils.css", "layout.css";
    
    foreach($f in $cssFiles){
		Write-Host "`t combining $f";
		$absCssFiles += "${path}css/$f";
	}
    
    Get-Content $absCssFiles | Out-File -Encoding UTF8 "${path}css\combined.css";    # concatenate
	
	Write-Host "`n`t minifying combined.css --> /min/master.css";
    iex 'java -jar $yuijar "${path}css\combined.css" > "${path}css\min\master.css"'; # minify
    
	Write-Host "`t removing combined.css";
	rm "${path}css/combined.css";
}

#--- combines /index.html js includes + google analytics
function compressJS() {
	echo "----- Compressing JS -----";
	$absJsFiles = @();  # empty array
	
    $jsFiles = "analytics.js", "/plugins/sammy.js","utils.js", "/models/home.js", "/models/about.js", "/models/contact.js", "/models/blog.js", "/models/games.js", "/models/music.js", "/models/playground.js", "/models/portfolio.js", "routing.js", "main.js";
    
    foreach($f in $jsFiles){
		Write-Host "`t combining $f";
		$absJsFiles += "${path}js/$f";
	}
    
    Get-Content $absJsFiles | Out-File -Encoding UTF8 "${path}js\combined.js";    # concatenate
	
	Write-Host "`n`t minifying combined.js --> /min/master.js";
    iex 'java -jar $yuijar "${path}js\combined.js" > "${path}js\min\master.js"';  # minify
    
	Write-Host "`t removing combined.js";
	rm "${path}js/combined.js";
}


function pushToGithub($msg, $dst) {
	echo "----- Pushing to GitHub -----";
	
	Write-Host "`tTracking files";
	git add -A
	
	Write-Host "`tCommiting files";
	git commit -m $msg
	
	Write-Host "`tPushing dev branch";
	git push -u origin dev
	
	if($dst -eq "master"){
		Write-Host "`tPushing master branch";
		
		git checkout master
		git merge dev
		git push
		git checkout dev
	}
}


#--- Check Command Line Arguments

if($args[0] -eq "prd") {
    compressCSS
	compressJS
    
    if($args[1] -and $args[2]){
        pushToGithub $args[1] $args[2]
    }
}
elseif($args[0] -eq "css") {
    compressCSS
}
elseif($args[0] -eq "js") {
    compressJS
}
elseif($args[0] -eq "push"){
	if($args[1]){
		pushToGithub $args[1] $args[2]
	}
	else{
		echo "must append <commit msg> and <target dest>";
	}
}
else {
    echo "must append 'prd | css | js | push'"
}
