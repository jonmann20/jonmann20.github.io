'use strict';

class GameUtils {
    constructor(gEngine) {
        this.gEngine = gEngine;
    }

    /*
     * Resets the newView's private variables.
     * Changes the view.
     */
    switchView(newView) {
        newView.init();
        this.gEngine.view = newView;
    }
}

const Dir = {
    RIGHT: 0,
    LEFT: 1
};