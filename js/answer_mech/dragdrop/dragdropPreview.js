
(function (){
	
	function dragdropPreview(){
		var that = this,
		userResponseToggle = true,
		namespace;
		function initView(options){
			new that.DragDropView(options);
			namespace = options.namespace;
			namespace.canvas_controller.get('currentObject').answersSelectable(false);
			$('#canvas-overlay').removeClass("hide");
		}
		function displayAnswer(options) {
			userResponseToggle = !userResponseToggle;
			if(userResponseToggle){
				namespace.canvas_controller.get('currentObject').resetQuestionForm();
			}else {
	            that.displayAnswerBase(options);
			}
        }
		
		this.initView = initView;
		this.displayAnswer = displayAnswer;
	}
	
	dragdropPreview.prototype = new dragdrop();
	dragdropPreview.prototype.constructor = dragdropPreview;
	window.currentAMClass = dragdropPreview;
	
})();



