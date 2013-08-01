#---notes
#
#  run in powershell with:
#         ./build.ps1 <args>

#--globals
$phpExe = "C:\xampp\php\php"
$path = "C:\Users\jwiedmann\git\jonmann20.github.com\"

$htmlFiles = gci ${path}"*" *.html
$htmlFiles += gci ${path}"portfolio\*" *.html
$htmlFiles += gci ${path}"playground\*" *.html
$htmlFiles += gci ${path}"music\*" *.html
$htmlFiles += gci ${path}"games\*" *.html
$htmlFiles += gci ${path}"games\jonsQuest\*" *.html
$htmlFiles += gci ${path}"games\dungeon\*" *.html

$phpFiles = gci ${path}"*" *.php
$phpFiles += gci ${path}"portfolio\*" *.php
$phpFiles += gci ${path}"playground\*" *.php
$phpFiles += gci ${path}"music\*" *.php
$phpFiles += gci ${path}"games\*" *.php
$phpFiles += gci ${path}"games\jonsQuest\*" *.php
$phpFiles += gci ${path}"games\dungeon\*" *.php

#---functions---
function deleteHTML(){
    echo "----- deleting HTML -----"
    
    foreach($f in $htmlFiles) {
        $count=0
        $name=""
    
        $f.fullname.split("\") | ForEach {
            
            if($count -gt 4) {
                $name += "$_/"
            }
            
            $count++
        }
        $name = $name.substring(0, $name.length-1)
    
        Write-Host "`t Deleting" $name -foregroundcolor "green"
        Remove-Item $f.fullname
    }
    
    echo ""
}

function compilePHP(){
    echo "----- compiling PHP to HTML -----"
    
    foreach($f in $phpFIles){
        $count=0
        $name=""
    
        $f.fullname.split("\") | ForEach {
            
            if($count -gt 4) {
                $name += "$_/"
            }
            
            $count++
        }
        $name = $name.substring(0, $name.length-1)
    
        if(($name -eq "master.php") -or 
           ($name -eq "games/gamesMaster.php") -or
           ($name -eq "games/gamesNav.php") -or
           ($name -eq "music/musicNav.php") -or
           ($name -eq "playground/playgroundNav.php")
        ){
            Write-Host "`t -Skipped" $name -foregroundcolor "red"
        }
        else {
            Write-Host "`t Compiling" $name -foregroundcolor "green"
            
            
            $name = $name.substring(0, $name.length-4)
            
            & $phpExe ${path}${name}".php" > ${path}${name}".html"
        }
    }
    
    echo ""
}


if($args[0] -eq "prd") {

    if(!$phpfiles){
        echo "---- no php files found to compile ----"
    }
    else {
        compilephp
    }

}
elseif($args[0] -eq "dev") {
    if(!$htmlfiles){
        echo "---- no html files found to delete ----"
    }
    else {
        deletehtml
    }
}
else {
    echo "must append 'dev | prd'"
}





#Get-ChildItem -Path $path -Recurse -Include "*.html" | Write-Host $_.FullName 
#gci $path -r *.html -Exclude 














# function compile($files, $pathIn, $pathOut){
	# foreach ($file in $files) {
		# $base = $file.BaseName
	
		# Write-Host "`tCompiling " $file.Name
	
		# & ${path}php.exe $file.FullName > ${pathOut}"${base}.html"
	# }
# }

# #----- root level -----
# $files = Get-ChildItem -r $path_in -i *.php

# compile $files $path_in $path_out

# #----- music level -----
# $pathIn = $path_in + "music\"
# $pathOut = $path_out + "music\"
# $files = Get-ChildItem -r $pathIn -i *.php

# compile $files $pathIn $pathOut

# #----- games level -----
# $pathIn = $path_in + "games\"
# $pathOut = $path_out + "games\"
# $files = Get-ChildItem -r $pathIn -i *.php

# compile $files $pathIn $pathOut

# #----- playground level -----
# $pathIn = $path_in + "playground\"
# $pathOut = $path_out + "playground\"
# $files = Get-ChildItem -r $pathIn -i *.php

# compile $files $pathIn $pathOut

# #----- portfolio level -----
# $pathIn = $path_in + "portfolio\"
# $pathOut = $path_out + "portfolio\"
# $files = Get-ChildItem -r $pathIn -i *.php

# compile $files $pathIn $pathOut




#----- Notes -----
#Get-ChildItem -r