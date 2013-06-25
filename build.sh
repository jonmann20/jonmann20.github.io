#!/bin/bash

#---color aliases
RED=${txtbld}$(tput setaf 1)
GREEN=$(tput setaf 2)
RESET=$(tput sgr0)

#---globals
phpExe="/opt/lampp/bin/php"
yuiJar="/usr/share/yui-compressor/yui-compressor.jar"

path="/home/jon/git/jonmann20.github.com/"

htmlFiles=$(find ${path} -name '*.html')
phpFiles=$(find ${path} -name '*.php')
cssFiles="the.css" #reset.css 


#---functions----
function deleteHTML {
	echo "----- deleting HTML -----"
	for f in $htmlFiles
	do
		ff=${f#/home/jon/git/jonmann20.github.com/} #TODO: change to path???
		fname=${ff%.*}
	
		if [[ ("$fname" == "js/computerGraphics/web/computergraphics") || "$fname" == "games/dungeon/web/dungeon" ]]
		then
			echo -e "\t $RED  -skipped $fname $RESET"	
		else
			echo -e "\t $GREEN deleting $fname $RESET"
			rm $f
		fi
		
	done
	echo ""
}
function compilePHP {
	echo "----- compiling PHP to HTML -----"

	for f in $phpFiles
	do
		ff=${f#/home/jon/git/jonmann20.github.com/} #TODO: change to path???
		fname=${ff%.*}
		
		if [[ ("$fname" == "master") || ("$fname" == "controllers/contactController") || ("$fname" == "games/gamesMaster") || ("$fname" == "games/gamesNav") || ("$fname" == "music/musicNav") || ("$fname" == "playground/playgroundNav") ]]
		then
			echo -e "\t $RED -skipped $fname $RESET"
		else
			echo -e "\t $GREEN compiling $fname $RESET"
			$phpExe $f > ${path}${fname}.html
		fi
		
	done
	echo ""
}

function compressCSS {
	echo -e "----- Compressing CSS -----"
	absCssFiles=""
	
	for f in $cssFiles
	do
		echo -e "\tcombining $f"
		absCssFiles+="${path}css/$f "
	done
	
	cat $absCssFiles > ${path}css/combined.css
	
	
	echo -e "\n\tminifying combined.css";
	java -jar $yuiJar ${path}css/combined.css -o ${path}css/the.min.css
	
	echo -e "\tremoving combined.css";
	rm ${path}css/combined.css
}

function pushToGithub {
	echo "----- Pushing to GitHub -----"
	d=$(date +"%b %d, %Y")" "
	d+=$(date +%r)
	
	echo -e "\t$d"
	git commit -am 'from build.sh $d'
	git push
}


#----- Run Program -----

if [[ "$1" == "dev" ]]
then
	deleteHTML
elif [[ "$1" == "prd" ]]
then
	compilePHP
	compressCSS
elif [[ "$1" == "test" ]]
then
	echo "in test"
	#pushToGithub
else
	echo -e "\t $RED must append 'dev | prd' $RESET"
fi


