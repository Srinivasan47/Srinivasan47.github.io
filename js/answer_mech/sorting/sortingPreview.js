
(function (){
	
	function sortingPreview(){
		var that = this,
		userResponseToggle = true,
		namespace;
		function initView(options){
			new that.SortingView(options);
			namespace = options.namespace;
			$('#canvas-overlay').removeClass("hide")
		}
		function displayAnswer(options) {
			userResponseToggle = !userResponseToggle;
			if(userResponseToggle){
				namespace.canvas_controller.get('currentObject').resetQuestionForm();
			}else {
	            that.displayAnswerBase(options);
			}
			namespace.canvas_controller.get('currentObject').answersSelectable(false);
        }
		
		this.initView = initView;
		this.displayAnswer = displayAnswer;
	}
	
	sortingPreview.prototype = new sorting();
	sortingPreview.prototype.constructor = sortingPreview;
	window.currentAMClass = sortingPreview;
	
})();



