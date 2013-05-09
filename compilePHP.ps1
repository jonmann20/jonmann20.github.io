$path = "C:\Program Files (x86)\phpServer\"
$path_in = "C:\Users\jwiedmann\Documents\GitHub\jonwiedmann.com\"
$path_out = "C:\Users\jwiedmann\Documents\GitHub\zz_compiled\"

$files = Get-ChildItem -r $path_in -i *.php

foreach ($file in $files) {
	$base = $file.BaseName

	Write-Host "`tCompiling " $file.Name " --> " ${path_out}"${base}.html"

  

  & ${path}php.exe $file.FullName > ${path_out}"${base}.html"
  
  #$a = Get-Acl $file.FullName
  #$aces =$a.GetAccessRules($true, $false, [System.Security.Principal.NTAccount])

  #foreach ($ace in $aces) {
    #if ($ace.IdentityReference.ToString() -match "^DOMAIN\\GROUP") {
      #$file.FullName + ": " + $ace.IdentityReference.ToString() | Add-Content $outfile
    #}
  #}
}