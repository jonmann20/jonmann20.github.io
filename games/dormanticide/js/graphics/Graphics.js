var Graphics = (function () {
    return {
        /*
            @param(number) timeStep The wait time between running the action (in ms).
            @param(number) numTimes The number to times to run the action.
            @param(function) callback The callback function.
        */
        repeatAction: function (timeStep, numTimes, callback) {
            var num = 0;
            var theAnimation = setInterval(function () {
                if (num++ > numTimes) {
                    clearInterval(theAnimation);
                }
                else {
                    callback();
                }
            }, timeStep);
        }
    };
})();