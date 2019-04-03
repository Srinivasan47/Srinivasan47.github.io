(function () {

    function hotspotReview() {
        var that = this,
            userResponseToggle = true,
            namespace;

        function initView(options) {
            new that.HotSpotView(options);
            namespace = options.namespace;
            namespace.canvas_controller.get('currentObject').addStudentResponse();
            $('#canvas-overlay').removeClass("hide");
        }

        function displayAnswer(options) {
            userResponseToggle = !userResponseToggle;
            that.displayAnswerBase(options);

            if (userResponseToggle) {
                namespace.canvas_controller.get('currentObject').addStudentResponse();
                //hot_spot.addStudentResponse();
            }
        }

        this.initView = initView;
        this.displayAnswer = displayAnswer;
    }

    hotspotReview.prototype = new hotspot();
    hotspotReview.prototype.constructor = hotspotReview;

    window.currentAMClass = hotspotReview;

})();