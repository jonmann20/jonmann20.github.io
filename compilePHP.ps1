$path = "C:\Program Files (x86)\phpServer\"
$path_in = "C:\Users\jwiedmann\git\jonwiedmann.com\"
$path_out = "C:\Users\jwiedmann\git\compiledNoUTF\"


function compile($files, $pathIn, $pathOut){
	foreach ($file in $files) {
		$base = $file.BaseName
	
		Write-Host "`tCompiling " $file.Name
	
		& ${path}php.exe $file.FullName > ${pathOut}"${base}.html"
	}
}

#----- root level -----
$files = Get-ChildItem -r $path_in -i *.php

compile $files $path_in $path_out

#----- music level -----
$pathIn = $path_in + "music\"
$pathOut = $path_out + "music\"
$files = Get-ChildItem -r $pathIn -i *.php

compile $files $pathIn $pathOut

#----- games level -----
$pathIn = $path_in + "games\"
$pathOut = $path_out + "games\"
$files = Get-ChildItem -r $pathIn -i *.php

compile $files $pathIn $pathOut

#----- playground level -----
$pathIn = $path_in + "playground\"
$pathOut = $path_out + "playground\"
$files = Get-ChildItem -r $pathIn -i *.php

compile $files $pathIn $pathOut

#----- portfolio level -----
$pathIn = $path_in + "portfolio\"
$pathOut = $path_out + "portfolio\"
$files = Get-ChildItem -r $pathIn -i *.php

compile $files $pathIn $pathOut




#----- Notes -----
#Get-ChildItem -r