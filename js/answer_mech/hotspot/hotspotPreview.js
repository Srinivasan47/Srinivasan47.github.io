(function () {

    function hotspotPreview() {
        var that = this;

        function initView(options) {
            new that.HotSpotView(options);
            $('#canvas-overlay').removeClass("hide");
        }

        function displayAnswer(options) {
            that.displayAnswerBase(options);
        }

        this.initView = initView;
        this.displayAnswer = displayAnswer;
    }

    hotspotPreview.prototype = new hotspot();
    hotspotPreview.prototype.constructor = hotspotPreview;

    window.currentAMClass = hotspotPreview;

})();