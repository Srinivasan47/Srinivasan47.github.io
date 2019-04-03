(function (){
	function dragdropReview(){
		var that = this,
		userResponseToggle = true,
        namespace;
		function initView(options){
			new that.DragDropView(options);
			namespace = options.namespace;
			setTimeout(function(){
				options.namespace.canvas_controller.get('currentObject').addStudentResponse();
				options.namespace.canvas_controller.get('currentObject').answersSelectable(false);
        		},300);
			$('#canvas-overlay').removeClass("hide");
		}
		function displayAnswer(options) {
            userResponseToggle = !userResponseToggle;
            if (userResponseToggle) {
            	namespace.canvas_controller.get('currentObject').resetQuestionForm(false);
            	/*setTimeout(function(){
            		namespace.canvas_controller.get('currentObject').addStudentResponse();
            		},1000);*/
                
            }else{
            	namespace.canvas_controller.get('currentObject').resetQuestionForm(true, options);
            	/*setTimeout(function(){
            		that.displayAnswerBase(options);
            		},1000);*/
            	
            }
        }
		this.initView = initView;
		this.displayAnswer = displayAnswer;
	}
	
	dragdropReview.prototype = new dragdrop();
	dragdropReview.prototype.constructor = dragdropReview;
	window.currentAMClass = dragdropReview;
	
})();

