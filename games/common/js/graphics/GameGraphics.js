'use strict';

class GameGraphics {
    constructor() {
        this.isAnimating = false;
    }

    /*
     * timeStep The wait time between running the action (in ms).
     * numTimes The number to times to run the action.
     * callback The callback function.
     */
    repeatAction(timeStep, numTimes, callback) {
        this.isAnimating = true;

        let num = 0;
        let theAnimation = setInterval(() => {
            if(num++ > numTimes) {
                clearInterval(theAnimation);
                this.isAnimating = false;
            }
            else {
                callback();
            }
        }, timeStep);
    }
}