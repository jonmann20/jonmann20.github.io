#---notes
#
#  run in powershell with:
#         ./build.ps1 <arg(s)>

#--globals
# $phpExe = "C:\xampp\php\php"
# $yuiJar = "C:\Program Files (x86)\yuicompressor-2.4.8.jar"

$path = "C:\git\jonmann20.github.com\"

$yuiJar = "${path}bin\yuicompressor-2.4.8.jar"

# $htmlFiles = gci ${path}"*" *.html
# $htmlFiles += gci ${path}"portfolio\*" *.html
# $htmlFiles += gci ${path}"playground\*" *.html
# $htmlFiles += gci ${path}"music\*" *.html
# $htmlFiles += gci ${path}"games\*" *.html
# $htmlFiles += gci ${path}"games\jonsQuest\*" *.html
# $htmlFiles += gci ${path}"games\dungeon\*" *.html
# $htmlFiles += gci ${path}"blog\*" *.html

# $phpFiles = gci ${path}"*" *.php
# $phpFiles += gci ${path}"portfolio\*" *.php
# $phpFiles += gci ${path}"playground\*" *.php
# $phpFiles += gci ${path}"music\*" *.php
# $phpFiles += gci ${path}"games\*" *.php
# $phpFiles += gci ${path}"games\jonsQuest\*" *.php
# $phpFiles += gci ${path}"games\dungeon\*" *.php
# $phpFiles += gci ${path}"blog\*" *.php

# function deleteHTML(){
    # echo "----- deleting HTML -----"
     
    # foreach($f in $htmlFiles) {
        # $count=0
        # $name=""
    
        # $f.fullname.split("\") | ForEach {
            
            # if($count -gt 2) {
                # $name += "$_/"
            # }
            
            # $count++
        # }
        # $name = $name.substring(0, $name.length-1)
    
        # Write-Host "`t Deleting" $name -foregroundcolor "green"
        # Remove-Item $f.fullname
    # }
    
    # echo ""
# }

# function compilePHP(){
    # echo "----- compiling PHP to HTML -----"
    
    # foreach($f in $phpFIles){
        # $count=0
        # $name=""
    
        # $f.fullname.split("\") | ForEach {
            
            # if($count -gt 2) {
                # $name += "$_\"
            # }
            
            # $count++
        # }
        # $name = $name.substring(0, $name.length-5)
    
        # if(($name -eq "master") -or 
           # ($name -eq "games\gamesMaster") -or
           # ($name -eq "games\gamesNav") -or
           # ($name -eq "music\musicNav") -or
           # ($name -eq "playground\playgroundNav")
        # ){
            # Write-Host "`t -Skipped" $name -foregroundcolor "red"
        # }
        # else {
            # Write-Host "`t Compiling" $name -foregroundcolor "green"
            
            # #& $phpExe ${path}${name}".php" > ${path}${name}".html"
            
            
            # #--- compile async
            # $phpFile = $path + $name + ".php" 
            # $htmlFile = $path + $name + ".html"

            # $job = Start-Job -ScriptBlock {
               # & $args[0] $args[1] > $args[2]
            # } -argumentlist @($phpExe, $phpFile, $htmlFile)
            
            # Wait-Job $job
            
            # #--- convert to utf8
            # $htmlFileContent = gc $htmlFile
            # $htmlFileContent | Set-Content -Encoding UTF8 $htmlFile
        # }
    # }
    
    # echo ""
# }

function compressCSS() {
	echo "----- Compressing CSS -----";
	$absCssFiles = @();  #empty array
	
    $cssFiles = "normalize.css","the.css";
    
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


function pushToGithub($msg) { # $1= commit msg
	echo "----- Pushing to GitHub -----";
	
	if($msg){ 
		git add -A
		git commit -m $msg
    }
	else{
		git add -A
		git commit -m "default push"
	}
	
	git push
}


#--- Check Command Line Arguments

if($args[0] -eq "prd") {
    compressCSS
	compressJS
    
    if($args[1]){
        pushToGithub $args[1]
    }

}
elseif($args[0] -eq "css") {
    compressCSS
}
elseif($args[0] -eq "js") {
    compressJS
}
elseif($args[0] -eq "push"){
    pushToGithub $args[1]
}
else {
    echo "must append 'prd | css | js | push'"
}