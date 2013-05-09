

      /* ******** Up/Down ******** */
      if(!tooFastY && key.isPressed(KeyCode.W)){        // up
        --vY;
        upDown = true;
      }
      
      if(!tooFastY && key.isPressed(KeyCode.S)){       // down
          ++vY;
          upDown = true;
      }
      
      if(!upDown){
        if(vY > 0){
          vY += (vY == 1) ? -1 : -2; 
        }
        else if(vY < 0)
          vY += (vY == -1) ? 1 : 2; 
      }
      
      /* ******** Left/Right ******** */
      if(!tooFastX && key.isPressed(KeyCode.A)){          // left
        --vX;
        leftRight = true;
      }
      
      if(!tooFastX && key.isPressed(KeyCode.D)){          // right
        ++vX;
        leftRight = true;
      }
      
      if(!leftRight){
        if(vX > 0){
          vX += (vX == 1) ? -1 : -2; 
        }
        else if(vX < 0)
          vX += (vX == -1) ? 1 : 2; 
      }
      
      attack = key.isPressed(KeyCode.SPACE) ? true : false;
      
      x += vX*33*dt; // scale by 33
      y += vY*33*dt;