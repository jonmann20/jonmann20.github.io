part of dungeon;

class HUD {
	GameObj heart;
	
    HUD(){
    	heart = new GameObj(0, 0, 9, 9, "heart.png");
    }
    
    void OnGUI(){
    	// level title
    	String litLvlName = "LEVEL $curLvl";
	    
	    ctx.font = "18px 'Press Start 2P'";
	    ctx.fillStyle = "#000";
	    ctx.fillText(litLvlName, HALFW - ctx.measureText(litLvlName).width/2 + 2, 34);
	    ctx.fillStyle = "#e1e1e1";
	    ctx.fillText(litLvlName, HALFW - ctx.measureText(litLvlName).width/2, 32);
	    
	    // health
	    for(int i=0; i < p.health; ++i){
          heart.drawD(8 + 13*i, 8);
        }
    }
}