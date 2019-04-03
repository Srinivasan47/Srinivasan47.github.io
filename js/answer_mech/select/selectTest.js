(function (){
	
	function selectTest(){
		var that = this;
		function initView(options){
			new that.MultiSelectView(options);
			options.namespace.canvas_controller.get('currentObject').addStudentResponse();
			options.namespace.canvas_controller.get('currentObject').answersSelectable();
		}
		
		this.initView = initView;
	}
	
	selectTest.prototype = new select();
	selectTest.prototype.constructor = selectTest;
	
	window.currentAMClass = selectTest;
	
})();