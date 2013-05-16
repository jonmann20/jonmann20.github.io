part of dungeon;

class Keyboard {
  Map<int, int> _keys = new Map<int, int>();    // TODO: convert to HashMap (once library available? or write own)
  int lastKey;

  Keyboard() {
    lastKey = KeyCode.BACKSPACE;
    
    window.onKeyDown.listen((KeyboardEvent e) {
      e.preventDefault();
      lastKey = e.keyCode; 
      
      // If the key is not set yet, set it with a timestamp.
      if (!_keys.containsKey(e.keyCode)){
        _keys[e.keyCode] = e.timeStamp;
      }
    });

    window.onKeyUp.listen((KeyboardEvent e) {
      e.preventDefault();
      _keys.remove(e.keyCode);
    });
  }

  // Check if the given key code is pressed. You should use the [KeyCode] class.
  isPressed(int keyCode) => _keys.containsKey(keyCode);
}

