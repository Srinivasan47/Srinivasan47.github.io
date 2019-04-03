(function (){
	
	function choiceTest(){
		var that = this;
		function initView(options){
			new that.ChoicesView(options);
			options.namespace.canvas_controller.get('currentObject').addStudentResponse();
			options.namespace.canvas_controller.get('currentObject').answersSelectable();
		}
		
		this.initView = initView;
	}
	
	choiceTest.prototype = new choices();
	choiceTest.prototype.constructor = choiceTest;
	
	window.currentAMClass = choiceTest;
	
})();



