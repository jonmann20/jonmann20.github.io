part of dungeon;

class StartScreen{
  StartScreen(){
    ImageElement img = new ImageElement();
    img.src = 'img/startScreen.jpg';        // images must be uploades as games/img/filename.jpb
    img.width = canvas.width;
    img.height = canvas.height;
    //img.onLoad.
    img.onLoad.listen((e){
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'red';
      ctx.font = "18px Helvetica";
      ctx.fillText('Press', (canvas.width / 2) - 2, canvas.height/2 + 27);
    });
  }
  
  bool startGame(){  
      if(key.isPressed(KeyCode.ENTER) || lvlSelected)
        return true;
      else
        return false;
  }
  
}