(function (){
	function sortingTest(){
		var that = this;
		function initView(options){
			new that.SortingView(options);
			options.namespace.canvas_controller.get('currentObject').answersSelectable(true);
			setTimeout(function(){
				options.namespace.canvas_controller.get('currentObject').addStudentResponse();
        		},500);
			
		}
		
		this.initView = initView;
	}
	
	sortingTest.prototype = new sorting();
	sortingTest.prototype.constructor = sortingTest;
	window.currentAMClass = sortingTest;
	
})();


