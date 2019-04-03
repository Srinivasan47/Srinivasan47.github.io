(function (){
	function dragdropPreview(){
		var that = this;
		function initView(options){
			new that.DragDropView(options);
			
			setTimeout(function(){
			options.namespace.canvas_controller.get('currentObject').addStudentResponse();
			options.namespace.canvas_controller.get('currentObject').answersSelectable(true);
        		},300);
		}
		
		this.initView = initView;
	}
	
	dragdropPreview.prototype = new dragdrop();
	dragdropPreview.prototype.constructor = dragdropPreview;
	window.currentAMClass = dragdropPreview;
	
})();