/*
    The graphics component of GameEngine.
*/
var GameGraphics = function(gEngine) {
    return {
        isAnimating: false,

        /*
            @param(number) timeStep The wait time between running the action (in ms).
            @param(number) numTimes The number to times to run the action.
            @param(function) callback The callback function.
        */
        repeatAction: function(timeStep, numTimes, callback) {
            this.isAnimating = true;

            var num = 0,
                that = this
            ;

            var theAnimation = setInterval(function() {
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
};
