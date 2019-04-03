(function (){
	var userResponseToggle = true,
		namespace = {};
	function EmbeddedImagePreview(){
		var that = this;
		function initView(options){
			new that.EmbeddedImageView(options);
			namespace = options.namespace;
			namespace.canvas_controller.get('currentObject').disableFields();
			namespace.btn_reset.removeAttr('onClick');
		}
		function displayAnswer(options) {
            userResponseToggle = !userResponseToggle;
            that.displayAnswerBase(options);
        }
		
		this.initView = initView;
		this.displayAnswer = displayAnswer;
	}
	
	EmbeddedImagePreview.prototype = new embeddedImage();
	EmbeddedImagePreview.prototype.constructor = EmbeddedImagePreview;
	
	window.currentAMClass = EmbeddedImagePreview;
	
})();



