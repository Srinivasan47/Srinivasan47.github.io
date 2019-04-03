(function (){
	
	function EmbeddedTextPreview(){
		var that = this;
		function initView(options){
			new that.EmbeddedTextView(options);
			var namespace = options.namespace;
			namespace.canvas_controller.get('currentObject').disableFields();
			namespace.btn_reset.removeAttr('onClick');
		}
		function displayAnswer(options) {
            that.displayAnswerBase(options);
        }

        this.initView = initView;
        this.displayAnswer = displayAnswer;
	}
	
	EmbeddedTextPreview.prototype = new embeddedText();
	EmbeddedTextPreview.prototype.constructor = EmbeddedTextPreview;
	
	window.currentAMClass = EmbeddedTextPreview;
	
})();



