
(function (){
	
	function selectReview(){
		var that = this;
		function initView(options){
			new that.MultiSelectView(options);
			options.namespace.canvas_controller.get('currentObject').addStudentResponse();
			var namespace = options.namespace;
			namespace.btn_reset.removeAttr('onClick');
		}
		
		this.initView = initView;
	}
	
	selectReview.prototype = new select();
	selectReview.prototype.constructor = selectReview;
	
	window.currentAMClass = selectReview;
	
})();



