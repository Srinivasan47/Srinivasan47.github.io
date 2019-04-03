(function (){
	function sortingReview(){
		var that = this,
		userResponseToggle = true,
        namespace;
		function initView(options){
			new that.SortingView(options);
			namespace = options.namespace;
			setTimeout(function(){
				options.namespace.canvas_controller.get('currentObject').addStudentResponse();
        		},500);
			$('#canvas-overlay').removeClass("hide")
		}
		function displayAnswer(options) {
            userResponseToggle = !userResponseToggle;
            namespace.canvas_controller.get('currentObject').resetQuestionForm();
            
            if (userResponseToggle) {
                namespace.canvas_controller.get('currentObject').addStudentResponse();
                
            }else{
            	
            	that.displayAnswerBase(options);
            	
            }
       
        }
		this.initView = initView;
		this.displayAnswer = displayAnswer;
	}
	
	sortingReview.prototype = new sorting();
	sortingReview.prototype.constructor = sortingReview;
	window.currentAMClass = sortingReview;
	
})();

