
(function (){
	
	function choiceReview(){
		var that = this;
		function initView(options){
			new that.ChoicesView(options);
			var namespace = options.namespace;
			options.namespace.canvas_controller.get('currentObject').addStudentResponse();
			namespace.btn_reset.removeAttr('onClick');
		}
		
		this.initView = initView;
	}
	
	choiceReview.prototype = new choices();
	choiceReview.prototype.constructor = choiceReview;
	
	window.currentAMClass = choiceReview;
	
})();



