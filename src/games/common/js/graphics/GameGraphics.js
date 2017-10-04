function GameGraphics(gEngine) {
    return {
        isAnimating: false,

        /*
         * timeStep The wait time between running the action (in ms).
         * numTimes The number to times to run the action.
         * callback The callback function.
         */
        repeatAction: function(timeStep, numTimes, callback) {
            this.isAnimating = true;

            let num = 0,
                that = this
            ;

            let theAnimation = setInterval(function() {
                if(num++ > numTimes) {
                    clearInterval(theAnimation);
                    that.isAnimating = false;
                }
                else {
                    callback();
                }
            }, timeStep);
        }
    };
}