function GameUtils(gEngine) {
    return {
        /*
         * Resets the newView's private variables.
         * Changes the view.
         */
        switchView: function(newView) {
            newView.init();
            gEngine.view = newView;
        }
    };
}

// Global enums
const Dir = {
    RIGHT: 0,
    LEFT: 1
};