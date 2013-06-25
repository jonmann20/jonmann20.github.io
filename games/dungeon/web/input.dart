part of dungeon;

class IntBool{
  int key;
  bool isDirectionKey;
}

class Keyboard {
  Map<int, int> _keys = new Map<int, int>();    // TODO: convert to HashMap (not Map; once library available? or write own)
  int lastKeyDown, lastKeyUp, lastDirDown, lastDirUp;
  IntBool theKey = new IntBool(),
          r = new IntBool();

  Keyboard() {
    resetKeys(); // sentinel
    
    window.onKeyDown.listen((KeyboardEvent e) {
      theKey = convertWASD(e.keyCode);
      
      if(theKey == KeyCode.SPACE)
        e.preventDefault();
      
      // If the key is not set yet, set it with a timestamp.
      if(!_keys.containsKey(theKey.key)){
        
        if(theKey.isDirectionKey)
          lastDirDown = theKey.key;
        
        lastKeyDown = theKey.key;
        
        _keys[theKey.key] = e.timeStamp;
      }
    });

    window.onKeyUp.listen((KeyboardEvent e) {
      theKey = convertWASD(e.keyCode);
      e.preventDefault();
      
      if(theKey.isDirectionKey)
        lastDirUp = theKey.key;
      
      lastKeyUp = theKey.key;
      
      _keys.remove(theKey.key);
    });
  }

  // Check if the given key code is pressed. You should use the [KeyCode] class.
  isPressed(int keyCode) => _keys.containsKey(keyCode);
  
  IntBool convertWASD(int k){
    r.key = k;
    r.isDirectionKey = true;
    
    switch(k){
      case KeyCode.W:
      case KeyCode.UP:
        r.key = KeyCode.UP;
        break;
      case KeyCode.A:
      case KeyCode.LEFT:
        r.key = KeyCode.LEFT;
        break;
      case KeyCode.S:
      case KeyCode.DOWN:
        r.key = KeyCode.DOWN;
        break;
      case KeyCode.D:
      case KeyCode.RIGHT:
        r.key = KeyCode.RIGHT;
        break;
      default:
        r.isDirectionKey = false;
        break;
    }
    
    return r;
  }
  
  void resetKeys(){ // TODO: clear _keys map
    lastKeyDown = lastKeyUp = lastDirDown = lastDirUp = KeyCode.BACKSPACE;
  }
  
}
