(function (){
	var userResponseToggle = true,
		namespace;
	function EmbeddedTextReview(){
		var that = this;
		function initView(options){
			new that.EmbeddedTextView(options);
			namespace = options.namespace;
			namespace.canvas_controller.get('currentObject').addStudentResponse();
			namespace.canvas_controller.get('currentObject').disableFields();
			namespace.btn_reset.removeAttr('onClick');
		}
		function displayAnswer(options) {
            userResponseToggle = !userResponseToggle;
            that.displayAnswerBase(options);
            if (userResponseToggle) {
                namespace.canvas_controller.get('currentObject').addStudentResponse();
            }
        }

        this.initView = initView;
        this.displayAnswer = displayAnswer;
	}
	
	EmbeddedTextReview.prototype = new embeddedText();
	EmbeddedTextReview.prototype.constructor = EmbeddedTextReview;
	
	window.currentAMClass = EmbeddedTextReview;
	
})();



